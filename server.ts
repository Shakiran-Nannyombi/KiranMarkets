import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Gemini AI initialization helper
function getGeminiAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// System instructions for Marketing Discovery Agent
const AGENCY_NAME = "Kiran Markets";
const FOUNDER_NAME = "Kiran";

const SYSTEM_INSTRUCTION = `You are Nova, the AI Marketing Specialist at ${AGENCY_NAME}. Your goal is to conduct an initial discovery session with prospective clients and brainstorm tailored marketing ideas.

Tone & Style: Professional, creative, inquisitive, and direct. 

Instructions & Workflow:
1. Greet the visitor warmly and ask what project or business they are currently working on.
2. Guide the conversation through 3 key areas (ask ONLY ONE question at a time):
   - Target audience & main product/service
   - Current marketing tactics and budget scale
   - Biggest growth bottleneck or goal for the next 3-6 months
3. Once you have sufficient context, summarize their situation in 2 sentences.
4. Present 2 distinct, highly specific marketing strategy ideas tailored to their responses.
5. Conclude by offering to schedule a deep-dive call with our founder, ${FOUNDER_NAME}, to turn those ideas into an action plan.`;

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Interactive Chat Endpoint with Gemini Nova Agent
app.post("/api/nova/chat", async (req, res) => {
  const { messages, userMessage } = req.body;
  const ai = getGeminiAI();

  if (!ai) {
    return res.status(500).json({
      success: false,
      error: "GEMINI_API_KEY environment variable is missing or not configured.",
    });
  }

  try {
    // Format conversation history for Gemini API
    const formattedHistory = (messages || []).map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    if (userMessage) {
      formattedHistory.push({
        role: "user",
        parts: [{ text: userMessage }],
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: formattedHistory.length > 0 ? formattedHistory : [{ role: "user", parts: [{ text: "Hello!" }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text?.trim() || "I am analyzing your response to craft your strategy. What are your main target goals?";

    return res.json({
      success: true,
      reply,
    });
  } catch (error: any) {
    console.error("Error in /api/nova/chat:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to communicate with Nova AI Agent.",
    });
  }
});

// Nova AI Strategy Endpoint
app.post("/api/nova", async (req, res) => {
  const { stage, step, context } = req.body;
  const { productService, targetAudience, channelsAndBudget, growthBottleneck } = context || {};

  const ai = getGeminiAI();

  try {
    if (stage === 3) {
      // Stage 3: Synthesis & Validation
      let synthesisText = "";
      if (ai) {
        const prompt = `You are Nova, AI Marketing Specialist at Kiran Markets.
Synthesize the user's business context into EXACTLY 2 clear, executive-level, concise sentences summarizing their current marketing situation and core growth goal.
Do NOT include any introduction. Just 2 sentences.

User Details:
- Business / Product / Service: ${productService || "B2B Enterprise Solutions"}
- Target Audience: ${targetAudience || "Executive Decision Makers"}
- Current Channels & Budget: ${channelsAndBudget || "Omnichannel mix"}
- Growth Bottleneck / Goal: ${growthBottleneck || "Scaling qualified pipeline"}
`;
        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
        });
        synthesisText = response.text?.trim() || "";
      }

      if (!synthesisText) {
        synthesisText = `You are scaling ${productService || "your business"} targeting ${targetAudience || "your ideal market"} via ${channelsAndBudget || "your current channels"}. Your primary objective over the next 3-6 months is overcoming ${growthBottleneck || "your key growth bottleneck"} to accelerate high-margin revenue.`;
      }

      const fullMessage = `${synthesisText}\n\nDoes this summarize your current focus accurately, or is there anything else I should know before we brainstorm?`;

      return res.json({
        success: true,
        synthesis: synthesisText,
        message: fullMessage,
      });
    }

    if (stage === 4) {
      // Stage 4: Tailored Brainstorming
      let strategies = null;
      if (ai) {
        const prompt = `You are Nova, AI Marketing Specialist at Kiran Markets.
Generate 3 high-impact marketing campaign hooks tailored specifically to the user's details.

User Details:
- Business / Product: ${productService}
- Target Audience: ${targetAudience}
- Channels & Spend: ${channelsAndBudget}
- Bottleneck / Goal: ${growthBottleneck}

Return a valid JSON array of 3 objects with this exact structure:
[
  {
    "title": "Short Punchy Strategy Title",
    "strategicAngle": "Exact 2-sentence description of the strategic angle.",
    "expectedOutcome": "Clear business outcome or ROI expectation.",
    "kpi": "Measurable KPI projection, e.g., +3.2x Pipeline Velocity"
  }
]
Return JSON ONLY, no markdown backticks.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
        });

        const rawText = response.text?.trim() || "";
        const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        try {
          strategies = JSON.parse(cleanJson);
        } catch (e) {
          console.warn("Failed to parse Gemini JSON output, using fallback", e);
        }
      }

      if (!strategies || !Array.isArray(strategies) || strategies.length === 0) {
        strategies = [
          {
            title: `Account-Based Intent Capture for ${productService || "Enterprise Solutions"}`,
            strategicAngle: `Target key decision-makers within ${targetAudience || "target accounts"} using dynamic high-intent content hubs and bespoke pitch decks. By aligning sales triggers directly with search intent, we eliminate drop-offs and accelerate deal cycles.`,
            expectedOutcome: "Immediate 35-45% increase in qualified sales pipeline velocity within 90 days.",
            kpi: "+3.8x Pipeline Velocity"
          },
          {
            title: `Omnichannel Performance Funnel Optimization`,
            strategicAngle: `Re-architect ${channelsAndBudget || "your active channels"} with automated lead scoring, programmatic remarketing, and personalized landing experiences. This directly addresses ${growthBottleneck || "conversion friction"} by delivering hyper-relevant value offers at every touchpoint.`,
            expectedOutcome: "Reduction in Customer Acquisition Cost (CAC) by 30% alongside a 2.5x increase in MQL-to-SQL conversions.",
            kpi: "-32% Acquisition Cost"
          },
          {
            title: `Executive Thought Leadership & Organic Authority Moat`,
            strategicAngle: `Position Kiran Markets & your executive team as the definitive market authority through data-backed research reports, LinkedIn video series, and strategic podcast placements. This builds long-term organic trust that bypasses rising ad costs.`,
            expectedOutcome: "Establishment of an inbound organic engine generating top-tier enterprise inquiries predictably.",
            kpi: "+180% Organic Inbound Enquiries"
          }
        ];
      }

      return res.json({
        success: true,
        strategies,
        ctaMessage: "These strategic concepts are just starting points. To map out a complete execution plan and timeline, let's schedule a deep-dive strategy call with Kiran, our founder."
      });
    }

    return res.json({ success: true });
  } catch (error: any) {
    console.error("Error in /api/nova:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

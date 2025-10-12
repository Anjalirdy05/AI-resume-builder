
import "dotenv/config";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { callOpenAI, mockAI, TailorRequest } from "./ai";

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const MOCK = (process.env.MOCK_AI || "true").toLowerCase() === "true";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req,res)=>res.json({ ok:true, mock: MOCK, model: process.env.MODEL || "gpt-4o-mini" }));

app.post("/api/ai/tailor", async (req,res)=>{
  const schema = z.object({ resume: z.any(), jobDescription: z.string().min(10) });
  const parsed = schema.safeParse(req.body);
  if(!parsed.success) return res.status(400).json({ error: "Provide a jobDescription (min 10 chars)" });
  try{
    const data = MOCK ? mockAI(parsed.data as TailorRequest) : await callOpenAI(parsed.data as TailorRequest);
    res.json(data);
  }catch(err:any){
    console.error("AI error:", err?.response?.data || err?.message || err);
    const msg = err?.response?.data?.error?.message || err?.message || "AI generation failed";
    res.status(502).json({ error: msg });
  }
});

app.listen(PORT, ()=>{
  console.log(`API listening on http://localhost:${PORT}`);
  console.log(`CORS allowed origin: ${CLIENT_ORIGIN}`);
  console.log(`Mock mode: ${MOCK}`);
});

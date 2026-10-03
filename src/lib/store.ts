import { promises as fs } from "fs";
import path from "path";

// Simple append-only JSONL storage in ./data. Swap for a real database
// (Postgres, Supabase, etc.) before deploying to a serverless host.
const DATA_DIR = path.join(process.cwd(), "data");

export type VisitEvent = {
  ts: string;
  ip: string;
  method: string;
  path: string;
  query: string;
  kind: "page" | "client-nav" | "api";
  visitorId: string;
  // First request from this browser (no visitor cookie yet). Optional because
  // events recorded before this field existed don't have it.
  newVisitor?: boolean;
  ref: string | null;
  userAgent: string;
  referer: string | null;
  country: string | null;
  city: string | null;
};

export type InterestSubmission = {
  ts: string;
  ip: string;
  visitorId: string | null;
  name: string;
  email: string;
  whatsapp: string;
  role: string;
  programs: string[];
  callDay: string;
  callSlot: string;
  message: string;
};

export type QuizResult = {
  ts: string;
  ip: string;
  visitorId: string | null;
  ref: string | null;
  role: string;
  program: string;
  answers: { question: string; answer: string }[];
};

async function append(file: string, record: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(path.join(DATA_DIR, file), JSON.stringify(record) + "\n");
}

async function readAll<T>(file: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as T);
  } catch {
    return [];
  }
}

export const saveVisit = (v: VisitEvent) => append("visits.jsonl", v);
export const readVisits = () => readAll<VisitEvent>("visits.jsonl");
export const saveInterest = (i: InterestSubmission) => append("interests.jsonl", i);
export const readInterests = () => readAll<InterestSubmission>("interests.jsonl");
export const saveQuiz = (q: QuizResult) => append("quiz.jsonl", q);
export const readQuiz = () => readAll<QuizResult>("quiz.jsonl");

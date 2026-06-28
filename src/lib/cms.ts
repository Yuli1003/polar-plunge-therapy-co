import { items } from "@wix/data";
import { auth } from "@wix/essentials";

/**
 * CMS service module — typed reads of the seeded collections.
 * Pattern per wix-headless skill: items.query("Collection").find() + auth.elevate.
 * Every SSR await is guarded; on failure we return [] so the page still renders.
 */

export interface ResearchSummary {
  _id: string;
  title: string;
  topic: string;
  claim: string;
  studyType: string;
  sampleSize: string;
  effectStrength: string;
  summary: string;
  year: number;
  sortOrder?: number;
}

export interface StoryBlock {
  _id: string;
  heading: string;
  body: string;
}

export interface Outcome {
  _id: string;
  name: string;
  quote: string;
  detail: string;
  sortOrder?: number;
}

export async function getResearchSummaries(): Promise<ResearchSummary[]> {
  try {
    const elevated = auth.elevate(items.query);
    const { items: results } = await elevated("ResearchSummary")
      .ascending("sortOrder")
      .limit(50)
      .find();
    return results as unknown as ResearchSummary[];
  } catch (err) {
    console.error("[cms:ResearchSummary] query failed:", err);
    return [];
  }
}

export async function getStoryBlock(): Promise<StoryBlock | null> {
  try {
    const elevated = auth.elevate(items.query);
    const { items: results } = await elevated("StoryBlock").limit(1).find();
    return (results[0] as unknown as StoryBlock) ?? null;
  } catch (err) {
    console.error("[cms:StoryBlock] query failed:", err);
    return null;
  }
}

export async function getOutcomes(): Promise<Outcome[]> {
  try {
    const elevated = auth.elevate(items.query);
    const { items: results } = await elevated("Outcome")
      .ascending("sortOrder")
      .limit(20)
      .find();
    return results as unknown as Outcome[];
  } catch (err) {
    console.error("[cms:Outcome] query failed:", err);
    return [];
  }
}

export interface ScreeningSubmission {
  fullName: string;
  email: string;
  age?: number;
  primaryGoal?: string;
  cardiacHistory?: string;
  currentMedications?: string;
  prRaynaudsOrPregnancy?: string;
  clearedByPhysician?: string;
}

export async function createScreeningSubmission(data: ScreeningSubmission) {
  const elevatedInsert = auth.elevate(items.insert);
  return elevatedInsert("ScreeningIntake", data as Record<string, unknown>);
}

import { SnakeToCamelCaseNested } from "../utils/types";
import { definitions } from "./supabase";

export type ReviewSessionsDef = definitions["review_sessions"];
export type ReviewSession = SnakeToCamelCaseNested<ReviewSessionsDef>;

export type CardsDef = definitions["cards"];
export type Card = SnakeToCamelCaseNested<CardsDef>;

export interface DataClient {
  getNextCards(): Promise<Card[]>;
  getReviewSession(): Promise<ReviewSession>;
}

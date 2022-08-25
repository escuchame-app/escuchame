import { SnakeToCamelCaseNested } from "../utils/types";
import { definitions } from "./supabase";

export type CardsDef = definitions["cards"];
export type Card = SnakeToCamelCaseNested<CardsDef>;

export type ReviewSessionsDef = definitions["review_sessions"];
export type ReviewSession = SnakeToCamelCaseNested<ReviewSessionsDef>;

export type ReviewResponsesDef = definitions["review_responses"];
export type ReviewResponse = SnakeToCamelCaseNested<ReviewResponsesDef>;

export type GetNextCardsResponse = {
  data: Card[];
  error: any;
};
export type StartSessionResponse = {
  data: ReviewSession;
  error: any;
};
export type SubmitResponseResponse = {
  data: ReviewResponse;
  error: any;
};

export interface DataClient {
  getNextCards(): Promise<GetNextCardsResponse>;
  startSession(): Promise<StartSessionResponse>;
  submitResponse(correct: boolean): Promise<SubmitResponseResponse>;
}

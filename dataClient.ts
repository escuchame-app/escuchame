import { Card, ReviewSession, DataClient } from "./types";

function createDataClient(): DataClient {
  const getNextCards = async () => {
    return [{ id: "1" }, { id: "2" }] as Card[];
  };

  const getReviewSession = async () => {
    // await supabase.from<ReviewSessionsDef>
    return { id: "1" } as ReviewSession;
  };

  return {
    getNextCards,
    getReviewSession,
  };
}
export const dataClient = createDataClient();

import { supabase } from "./lib/supabase";
import {
  Card,
  ReviewSession,
  DataClient,
  GetNextCardsResponse,
  StartSessionResponse,
  SubmitResponseResponse,
} from "./types";

/**
 * Wrapper function to easily give a type to supabase functions
 * @param name name of the supabase function
 * @returns data from the function call
 */
function createSupabaseFunction<ResponseType>(name: string) {
  return async () => {
    const { data, error } = await supabase.functions.invoke<ResponseType>(name);
    if (!data) {
      console.error(error);
      throw new Error("no data");
    }
    return data;
  };
}

function createDataClient(): DataClient {
  // TODO can pull these all in to same generic function
  const getNextCards =
    createSupabaseFunction<GetNextCardsResponse>("get-next-cards");
  const startSession =
    createSupabaseFunction<StartSessionResponse>("start-session");
  const submitResponse =
    createSupabaseFunction<SubmitResponseResponse>("start-session");

  return {
    getNextCards,
    startSession,
    submitResponse,
  };
}
export const dataClient = createDataClient();

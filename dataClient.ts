import { supabase } from "./lib/supabase";
import {
  Card,
  ReviewSession,
  DataClient,
  GetNextCardsResponse,
  StartSessionResponse,
  SubmitResponseResponse,
} from "./types";

interface SupabaseResponseBody {
  data?: any;
  error?: any;
}

/**
 * Wrapper function to easily give a type to supabase functions
 * @param name name of the supabase function
 * @returns data from the function call
 */
function createSupabaseFunction<T extends SupabaseResponseBody>(name: string) {
  return async () => {
    const { data: body, error } =
      await supabase.functions.invoke<SupabaseResponseBody>(name);
    if (error) {
      throw error;
    }
    if (!body.data) {
      let error = body.error;
      if (!error) {
        error = `ts assert: no body`;
      }
      throw new Error(`error in supabase function '${name}': ${error}`);
    }

    return body.data;
  };
}

function createDataClient(): DataClient {
  // TODO can pull these all in to same generic function
  const getNextCards =
    createSupabaseFunction<GetNextCardsResponse>("get-next-cards");
  const startSession =
    createSupabaseFunction<StartSessionResponse>("start-session");
  const submitResponse =
    createSupabaseFunction<SubmitResponseResponse>("submit-response");

  return {
    getNextCards,
    startSession,
    submitResponse,
  };
}
export const dataClient = createDataClient();

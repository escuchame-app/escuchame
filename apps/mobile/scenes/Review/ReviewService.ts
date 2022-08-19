import { createContext } from "react";
import { ReviewActor } from "./reviewMachine";

export const ReviewServiceContext = createContext<ReviewActor>(
  {} as ReviewActor
);

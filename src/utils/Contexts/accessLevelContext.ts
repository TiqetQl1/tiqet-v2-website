import { type AccessLevel, defaultAccessLevel} from "@/hooks/useAuthorization";
import { createContext, } from "react";

export const AccessLevelContext = createContext<AccessLevel>(defaultAccessLevel)
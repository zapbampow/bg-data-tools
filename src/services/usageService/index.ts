import firebaseService from "../firebase/firebaseService.ts";
import type { UserUsageService } from "./types.ts";

/**
 * Currently uses firebase service,
 * but could be changed to a different backend
 * as long as it uses the same UsageService interface.
 * */
const usageService: UserUsageService = firebaseService;

export default usageService;

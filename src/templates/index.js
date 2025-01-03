import { createFlow } from "@builderbot/bot";
import { welcomeFlow } from "./welcomeFlow.js";
import { voiceFlow } from "./voiceFlow.js";

export default createFlow([welcomeFlow, voiceFlow]);

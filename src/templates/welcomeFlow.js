import { addKeyword, EVENTS } from "@builderbot/bot";
import { getResponse } from "../services/gemini.js";

const welcomeFlow = addKeyword(EVENTS.WELCOME).addAction(async (ctx, ctxFn) => {
  const response = await getResponse(ctx.body);
  return ctxFn.endFlow(response);
});

export { welcomeFlow };

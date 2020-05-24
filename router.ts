import { Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
import { HTTP_STATUS_CODE } from "./constants.ts";
import { setupAuthRouter } from "./auth/auth_router.ts";

export const router = new Router();

function setupDefaultRouter() {
  router
    .get("/", async (ctx: RouterContext) => {
      ctx.response.status = HTTP_STATUS_CODE.OK;
      ctx.response.body = {
        code: HTTP_STATUS_CODE.OK,
        message: "Default Homepage",
      };
    });
}

//Setup router
setupDefaultRouter();
setupAuthRouter();

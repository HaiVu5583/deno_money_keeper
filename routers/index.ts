import { Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
import { HTTP_STATUS_CODE } from "../constants.ts";
import AuthController from "../controllers/AuthController.ts";

export const router = new Router();

router
  .get("/", async (ctx: RouterContext) => {
    ctx.response.status = HTTP_STATUS_CODE.OK;
    ctx.response.body = {
      code: HTTP_STATUS_CODE.OK,
      message: "Default Homepage",
    };
  });

router
  .post("/generate_token", AuthController.generateToken)
  .get("/user_info", AuthController.getUserInfo);

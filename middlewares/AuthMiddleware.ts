import {
  Context,
} from "https://deno.land/x/oak/mod.ts";
import { HTTP_STATUS_CODE } from "../constants.ts";
import { UNAUTHORIZED_ROUTER } from "../routers/index.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import * as dotenv from "https://deno.land/x/denoenv/mod.ts";

export const validateToken = async (ctx: Context, next: Function) => {
  const _sendUnauthorizedResponse = () => {
    ctx.response.status = HTTP_STATUS_CODE.UNAUTHORIZED;
    ctx.response.body = {
      code: HTTP_STATUS_CODE.UNAUTHORIZED,
      message: "Unauthorized",
    };
  };

  const pathname = ctx.request.url.pathname;
  if (UNAUTHORIZED_ROUTER.includes(pathname)) {
    await next();
  } else {
    const token = ctx.request?.headers?.get("authorization");
    if (!token) {
      _sendUnauthorizedResponse();
      return;
    }
    const config = dotenv.config();
    try {
      const isValidToken = await validateJwt(
        token?.split(" ")?.[1],
        config.JWT_SECRET,
        { isThrowing: true },
      );
      console.log("token", token?.split(" ")?.[1]);
      console.log("isValidToken", isValidToken);
      if (isValidToken) {
        await next();
        return;
      }
      _sendUnauthorizedResponse();
    } catch (error) {
      console.log("error", error.name, error.message);
      _sendUnauthorizedResponse();
    }
  }
};

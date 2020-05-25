import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { router } from "../router.ts";
import * as dotenv from "https://deno.land/x/denoenv/mod.ts";
// import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { ErrorResponse } from "../network/error_response.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
import { HTTP_STATUS_CODE } from "../constants.ts";

export function setupAuthRouter() {
  router.post("/generate_token", async function (ctx: RouterContext) {
    try {
      const body = await ctx.request.body();
      const username = body?.value?.username;
      const password = body?.value?.password;
      console.log("user name password", body);
      const config = dotenv.config();
      console.log(config.JWT_SECRET);
      const payload: Payload = {
        iss: "haivl",
        exp: setExpiration(new Date().getTime() + 60000),
        username: "haivu",
        role: "admin",
      };
      const header: Jose = {
        alg: "HS256",
        typ: "JWT",
      };
      const jwt = makeJwt({ header, payload, key: config.JWT_SECRET });
      ctx.response.body = {
        token: jwt,
      };
      ctx.response.status = HTTP_STATUS_CODE.OK;
    } catch (error) {
      if (error instanceof SyntaxError) {
        const errorRes: ErrorResponse = {
          code: HTTP_STATUS_CODE.INVALID_PARAM,
          message: "Invalid JSON param",
        };
        ctx.response.body = errorRes;
        ctx.response.status = HTTP_STATUS_CODE.INVALID_PARAM;
      }
      console.log("Error generate_token: ", error);
    }
  });

  router.get("/user_info", async function (ctx: RouterContext) {
    ctx.response.body = {
      username: "haivl",
      dob: "1993-11-16",
      role: "admin",
      joinDate: "2011-01-30",
      star: 3,
    };
    ctx.response.status = HTTP_STATUS_CODE.OK;
  });
}

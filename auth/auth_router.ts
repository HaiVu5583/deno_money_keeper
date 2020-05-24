import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { router } from "../router.ts";
import * as dotenv from "https://deno.land/x/denoenv/mod.ts";
// import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
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
      throw error;
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

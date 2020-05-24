import {
  Application,
  Status,
  Context,
} from "https://deno.land/x/oak/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { router } from "./router.ts";
import { HTTP_STATUS_CODE } from "./constants.ts";

const app = new Application(); // Global error
// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     console.log("err status");
//     if (isHttpError(err)) {
//       switch (err.status) {
//         case Status.NotFound:
//           // handle NotFound
//           break;
//         default:
//           // handle other statuses
//       }
//     } else {
//       // rethrow if you can't handle the error
//       throw err;
//     }
//   } finally {
//     console.log("Ctx not catch", ctx.response);
//   }
// });

function notFound(ctx: Context) {
  ctx.response.status = Status.NotFound;
  ctx.response.body = {
    code: HTTP_STATUS_CODE.NOT_FOUND,
    message: "API not found!",
  };
}

// Logger
app.use(async (ctx: Context, next) => {
  await next();
  const status = ctx.response.status;
  console.log(
    `${ctx.request.method} ${ctx.request.url} ${status} - ${
      moment().format("YYYY-MM-DD HH:mm:ss")
    }`,
  );
});

// Use the router
app.use(router.routes());
app.use(router.allowedMethods());

// A basic 404 page
app.use(notFound);

await app.listen({ port: 8000 });

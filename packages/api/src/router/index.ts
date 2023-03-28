import { router } from "../trpc";

import { authRouter } from "./auth";
import { listRouter } from "./list";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  list: listRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

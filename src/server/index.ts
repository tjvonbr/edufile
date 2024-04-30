import { router } from "./trpc";
import { userRouter } from "./routers/users";

export const appRouter = router({
  users: userRouter,
});

export type AppRouter = typeof appRouter;

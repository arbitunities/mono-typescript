import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  currentUser: publicProcedure.input(z.null()).query(({ ctx }) => {
    return ctx.prisma.user.findFirstOrThrow({
      where: { address: ctx.auth?.userId ?? undefined },
    })
  }),
  byId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: { id: input },
      include: {
        lists: true,
        profile: true,
        memberships: true,
      }
    })
  }),
  byAddress: publicProcedure.input(z.string()).query(({ ctx , input }) => {
    return ctx.prisma.user.findFirst({
      where: { address: input },
      include: {
        lists: true,
        profile: true,
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ address: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({ data: input });
    }),
});


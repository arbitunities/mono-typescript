import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const listRouter = router({
  byId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.list.findFirst({
      where: { id: input },
      include: { members: true },
    });
  }),
  byOwnerId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.list.findFirst({
      where: { ownerId: input },
      include: { members: true },
    });
  }),
  addMember: protectedProcedure
    .input(
      z.object({
        listId: z.number(),
        userId: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.member.create({ data: input });
    }),
  removeMember: protectedProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.member.delete({ where: { id: input } });
    }),
  create: protectedProcedure
    .input(
      z.object({
        ownerId: z.number(),
        title: z.string().nullable(),
        description: z.string().nullable(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.list.create({ data: input });
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.prisma.list.delete({ where: { id: input } });
  }),
});

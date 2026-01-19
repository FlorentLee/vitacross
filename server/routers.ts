import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { 
  createPatientConsultation, 
  getPatientConsultations, 
  getPatientConsultationById,
  updatePatientConsultation,
  createMedicalFile,
  getMedicalFilesByConsultationId
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // 患者咨询路由
  consultation: router({
    create: publicProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return createPatientConsultation(input);
      }),
    list: publicProcedure
      .input(z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        const limit = input?.limit || 10;
        const offset = input?.offset || 0;
        return getPatientConsultations(limit, offset);
      }),
    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return getPatientConsultationById(input);
      }),
    update: protectedProcedure
      .input(z.any())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can update consultations");
        }
        const { id, ...data } = input;
        return updatePatientConsultation(id, data);
      }),
  }),

  // 医疗文件路由
  medicalFile: router({
    create: publicProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return createMedicalFile(input);
      }),
    getByConsultationId: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return getMedicalFilesByConsultationId(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;

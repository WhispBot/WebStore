import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
    createUser: publicProcedure.query(async ({ input, ctx }) => {
        const saltRounds = 10;
        const myPlaintextPassword = "1234";
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(myPlaintextPassword, salt);

        console.log(hash);
    }),
});

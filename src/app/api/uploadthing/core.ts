import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "2MB", maxFileCount: 8 } })
        // Set permissions and file types for this FileRoute
        .input(z.object({ productId: z.string() }))
        .middleware(async ({ req, input }) => {
            // This code runs on your server before
            const session = await getServerAuthSession();

            // If you throw, the user will not be able to upload
            if (!session) throw new Error("Unauthorized");
            if (session.user.role !== "admin") throw new Error("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: session.user.id, productId: input.productId };
        })
        .onUploadComplete(({ metadata, file }) => {
            console.log(file);
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

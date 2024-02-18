
import { db } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const create = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  updateBrokerImage: create({ image: { maxFileSize: "4MB" } })
    .middleware(({ req }) => {
      // Get auth 
      const { userId } = getAuth(req);

      // Validate auth
      if (!userId) throw new Error("Unauthorized");

      // Return to metadata
      return { userId };
    })
    .onUploadError(async (error) => {
      console.log(error)
    })
    .onUploadComplete(async ({ metadata, file }) => {

      // if (!user) throw Error("Unauthorized")

      // const url = `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`

      console.log(file.url)
      return;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

import { db } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const create = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  uploadImage: create({ image: { maxFileSize: "4MB" } })
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

      const user = await db.user.findUnique({
        where: {
          authId: metadata.userId
        }
      })

      if (!user) throw Error("Unauthorized")

      const { key, name, size } = file

      const url = `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`

      const data = await db.file.create({
        data: {
          name,
          size,
          url,
          userId: user.id
        }
      })

      const response = {
        id: data.id,
        url: data.url,
        name: data.name,
        size: data.size
      }

      return response;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
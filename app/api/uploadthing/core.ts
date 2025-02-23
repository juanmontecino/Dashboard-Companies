import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async ({ req }: { req: NextRequest }) => {
  const { userId } = getAuth(req);
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => handleAuth({ req }))
    .onUploadComplete(async ({ metadata,}) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
  try {
    // Check if the bucket already exists
    await storage.getBucket(questionAttachmentBucket);
    console.log("Storage Bucket Found and Connected.");
  } catch (error) {
    console.warn("Storage bucket not found. Attempting to create...");

    try {
      await storage.createBucket(
        questionAttachmentBucket, // Unique bucket ID
        questionAttachmentBucket, // Name of the bucket
        [
          Permission.create("users"),
          Permission.read("any"),
          Permission.read("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ],
        false, // Not public
        undefined, // No encryption
        undefined, // No compression
        ["jpg", "png", "gif", "jpeg", "webp", "heic"] // Allowed file types
      );

      console.log("Storage Bucket Created Successfully.");
    } catch (creationError) {
      console.error("Error Creating Storage Bucket:", creationError);
    }
  }
}

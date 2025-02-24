import { Permission, IndexType } from "node-appwrite";
import { db, voteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
  // Creating Collection
  await databases.createCollection(db, voteCollection, voteCollection, [
    Permission.create("users"),
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Vote Collection Created");

  // Creating Attributes
  await Promise.all([
    databases.createEnumAttribute(
      db,
      voteCollection,
      "type",
      ["question", "answer"],
      true
    ),
    databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
    databases.createEnumAttribute(
      db,
      voteCollection,
      "voteStatus",
      ["upvoted", "downvoted"],
      true
    ),
    databases.createStringAttribute(db, voteCollection, "votedById", 50, true),
  ]);
  console.log("Vote Attributes Created");

  // Creating Indexes
  await Promise.all([
    databases.createIndex(db, voteCollection, "typeId_index", IndexType.Key, [
      "typeId",
    ]),
    databases.createIndex(
      db,
      voteCollection,
      "voteStatus_index",
      IndexType.Key,
      ["voteStatus"]
    ),
    databases.createIndex(
      db,
      voteCollection,
      "votedById_index",
      IndexType.Key,
      ["votedById"]
    ),
    databases.createIndex(
      db,
      voteCollection,
      "typeId_voteStatus_index",
      IndexType.Key,
      ["typeId", "voteStatus"]
    ),
  ]);
  console.log("Vote Indexes Created");
}

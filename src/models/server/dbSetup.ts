import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getCreateDB() {
  try {
    await databases.get(db);
    console.log("Database connection");
  } catch (error) {
    console.log(error);
    try {
      await databases.create(db, db);
      console.log("database created");
      await Promise.all([
        createAnswerCollection(),
        createCommentCollection(),
        createQuestionCollection(),
        createVoteCollection(),
      ]);

      console.log("collection created");
    } catch (error) {
      console.log("Error creating databases or collection", error);
    }
  }

  return databases;
}

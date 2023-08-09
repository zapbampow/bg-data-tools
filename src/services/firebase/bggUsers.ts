import { db } from "./firebaseDB.ts";
import { collection, getDocs } from "firebase/firestore";

async function getAll() {
  const snapshot = await getDocs(collection(db, "bggUsers"));
  const data = snapshot.docs.map((doc) => {
    const docData = doc.data();
    // TODO: convert the timestamp to a date string
    // TODO: create a function that converts timestamp that I can use in multiple places
    return { ...docData, id: doc.id };
  });
  console.log("data", data);
  //   snapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
}

export default {
  getAll,
};

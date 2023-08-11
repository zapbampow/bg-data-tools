import { db } from "./firebaseDB.ts";
import {
  collection,
  getDocs,
  doc,
  where,
  query,
  and,
  serverTimestamp,
} from "firebase/firestore";
import type {
  CollectionReference,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import epochToDateString from "~/utils/conversion/epochToDataString.ts";
import { UserData } from "~/services/usageService/types.ts";
import dayjs from "dayjs";

const bggUsersCollection: CollectionReference = collection(db, "bggUsers");
const snapshot = await getDocs(bggUsersCollection);

async function getAll() {
  return convertUsersSnapshot(snapshot);
}

async function getByUserId(bggUserId: number): Promise<UserData> {
  const q = query(bggUsersCollection, where("bggUserId", "==", bggUserId));
  const querySnapshot = await getDocs(q);
  const data = convertUsersSnapshot(querySnapshot);
  return data[0];
}

async function getByUsername(username: string): Promise<UserData> {
  const q = query(bggUsersCollection, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  const data = convertUsersSnapshot(querySnapshot);
  return data[0];
}

const today = dayjs().format("YYYY-MM-DD");

async function getByCreatedDate(
  startDate: string,
  endDate = today
): Promise<UserData[]> {
  const start = dateStringToJSDate(startDate);
  const end = dateStringToJSDate(endDate, true);
  console.log({ start, end });

  const q = query(
    bggUsersCollection,
    where("createdAt", ">=", start),
    where("createdAt", "<=", end)
  );
  const querySnapshot = await getDocs(q);
  // console.log("querySnapshot", querySnapshot);
  const data = convertUsersSnapshot(querySnapshot);
  return data;
}

// UTILS
const convertUsersSnapshot = (snapshot: QuerySnapshot): UserData[] => {
  const data = snapshot.docs.map((doc: DocumentData) => {
    const docData = doc.data();
    const { createdAt, bggUserId, username } = docData;
    const createdAtDate = epochToDateString(createdAt.seconds);

    return {
      bggUserId,
      username,
      createdAt: createdAtDate,
      id: doc.id,
    };
  });

  return data;
};

const dateStringToJSDate = (dateString: string, end: boolean = false) => {
  const date = dayjs(dateString);
  let year = date.year();
  let month = date.month();
  let day = date.date();
  let hour = end ? 23 : 0;
  let minute = end ? 59 : 0;
  let second = end ? 59 : 0;

  const jsDate = new Date(year, month, day, hour, minute, second);
  return jsDate;
};

export default {
  getAll,
  getByUserId,
  getByUsername,
  getByCreatedDate,
};

import { db } from "./firebaseDB.ts";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  where,
  query,
  serverTimestamp,
} from "firebase/firestore";
import epochToDateString from "~/utils/conversion/epochToDataString.ts";
import dayjs from "dayjs";

import type {
  CollectionReference,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import type {
  UserService,
  UserData,
  UserToAdd,
} from "~/services/usageService/types.ts";

const bggUsersCollection: CollectionReference = collection(db, "bggUsers");
const snapshot = await getDocs(bggUsersCollection);

// TODO: add try catch to all these functions and update the types in the types file to include undefined

// CREATE
async function add(user: UserToAdd) {
  try {
    const newUser = await setDoc(
      doc(bggUsersCollection, user.bggUserId.toString()),
      {
        bggUserId: user.bggUserId,
        username: user.username,
        createdAt: serverTimestamp(),
      }
    );
    console.log({ newUser });

    // const docRef = await addDoc(bggUsersCollection, {
    //   bggUserId: user.bggUserId,
    //   username: user.username,
    //   createdAt: serverTimestamp(),
    // });
    return "newUser";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// READ
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

const firebaseUserService: UserService = {
  add,
  getAll,
  getByUserId,
  getByUsername,
  getByCreatedDate,
};

export default firebaseUserService;

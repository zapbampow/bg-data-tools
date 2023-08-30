import { db } from "./firebaseDB.ts";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  getDoc,
  where,
  query,
  serverTimestamp,
  orderBy,
  limit,
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
  UsageData,
  UsageHistoryService,
} from "~/services/usageService/types.ts";
import { usersCollectionName } from "./bggUsers.ts";

const isDev = import.meta.env.DEV;
const historyCollectionName = isDev ? "usageHistoryDev" : "usageHistory";

const historyCollection: CollectionReference = collection(
  db,
  historyCollectionName
);
const snapshot = await getDocs(historyCollection);

async function add(userId: number, page: string, uniqueId: string) {
  try {
    await setDoc(
      doc(historyCollection),
      {
        bggUserId: userId,
        page,
        user: `/${usersCollectionName}/${userId.toString()}`,
        uniqueId,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    const latest = await getLastestByUsername(user.username);

    return latest;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getAll(): Promise<UsageData[]> {
  try {
    const snapshot = await getDocs(historyCollection);
    const data = convertUsageHistorySnapshot(snapshot);
    return data;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
}

async function getById(docId: string): Promise<UsageData> {
  try {
    const docRef = await getDoc(doc(historyCollection, docId));
    const docData = docRef.data();
    if (!docData) throw new Error("No document data found");

    const data = convertUserSnapshotData(docData);
    return data;
  } catch (e) {
    console.error("Error getting document: ", e);
    throw e;
  }
}

const convertUserSnapshotData = (docData: DocumentData): UsageData => {
  const { bggUserId, page, createdAt, user } = docData;
  const userDocData = user.data();
  const { username } = userDocData;

  const data = {
    bggUserId,
    page,
    createdAt: epochToDateString(createdAt.seconds),
    user: {
      bggUserId,
      username,
      createdAt: epochToDateString(userDocData.createdAt.seconds),
    },
  };

  return data;
};

const convertUsageHistorySnapshot = (
  snapshot: QuerySnapshot | DocumentData
): UsageData[] => {
  const data = snapshot.docs.map((doc: DocumentData) => {
    const docData = doc.data();
    return convertUserSnapshotData(docData);
  });

  return data;
};

const firebaseUsageHistoryService: UsageHistoryService = {
  add,
  getAll,
  getById,
};

export default firebaseUsageHistoryService;

import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "./useLocalStorage.tsx";

export default function useStoredUniqueId() {
  const [uniqueId, setUniqueId] = useLocalStorage("uniqueId", "");

  useEffect(() => {
    if (uniqueId) return;
    let newId = generateUniqueId();
    setUniqueId(newId);
  }, []);

  return uniqueId;
}

function generateUniqueId() {
  return uuid();
}

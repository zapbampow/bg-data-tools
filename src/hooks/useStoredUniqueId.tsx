import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage.tsx";
import { v4 as uuidv4 } from "uuid";

export default function useStoredUniqueId() {
  const [uniqueId, setUniqueId] = useLocalStorage("uniqueId", "");

  useEffect(() => {
    if (uniqueId) return;
    let newId = generateUniqueId();
    setUniqueId(newId);
  }, []);

  console.log({ uniqueId });
  return uniqueId;
}

function generateUniqueId() {
  return uuidv4();
}

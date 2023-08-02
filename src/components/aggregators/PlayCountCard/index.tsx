import PlayCountCard from "./PlayCountCard";
import { DatesCardProvider } from "../DatesCard/DatesCardContext";

type Props = { userId: number };

export default function index({ userId }: Props) {
  return (
    <DatesCardProvider>
      <PlayCountCard />
    </DatesCardProvider>
  );
}

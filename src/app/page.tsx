import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Danendra Dipa's portfolio. Frontend Developer and Machine Learning enthusiast building digital products with precision and purpose.",
};

export default function Home() {
  return <HomePage />;
}

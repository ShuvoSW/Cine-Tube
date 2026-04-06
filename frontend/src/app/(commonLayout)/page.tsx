import HeroSection from "@/components/layouts/sections/HeroSection";
import { meta } from "zod/v4/core";


export const dynamic = "force-dynamic";

export const metadata = {
  title: "Home || CineTube",
  description: "Welcome to CineTube, your ultimate movie streaming platform. Explore a vast collection of films, TV shows, and exclusive content. Start watching now!",
};

export default function Home() {
  return (
    <div>
       <HeroSection></HeroSection>
    </div>
  );
}
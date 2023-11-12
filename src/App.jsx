import React from "react";
import { Navbar, Router } from "./components/Imports";

export default function App() {
  return (
    <section className="h-screen w-full px-[60px] overflow-auto bg-[#F7F7F7]">
      <Navbar />
      <Router />
    </section>
  );
}

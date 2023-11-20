import React from "react";
import { Navbar, Router } from "./components/Imports";

export default function App() {
  return (
    <section className="h-screen w-full overflow-auto bg-[#F7F7F7] p-0 md:px-[30px]">
      <Navbar />
      <Router />
    </section>
  );
}

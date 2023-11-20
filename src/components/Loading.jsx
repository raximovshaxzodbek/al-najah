import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ReactLoading type="bubbles" color="#000" width={100} height={100} />
    </div>
  );
}

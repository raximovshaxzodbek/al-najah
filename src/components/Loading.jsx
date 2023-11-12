import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ReactLoading type="bubbles" color="#000" width={100} height={100} />
    </div>
  );
}

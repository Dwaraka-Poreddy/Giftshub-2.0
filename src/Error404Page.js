import React from "react";
import img404 from "./Images/404Error.jpg";

export default function Error404Page() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: "url(" + img404 + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    ></div>
  );
}

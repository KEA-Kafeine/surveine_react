import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

setInterval(() => {
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}, 1000);

reportWebVitals();

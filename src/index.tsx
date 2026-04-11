import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./styles.css";

const container = document.getElementById("root");
if (!container) {
	throw new Error("No se encontro el elemento root en el DOM");
}

const root = createRoot(container);

root.render(<App />);

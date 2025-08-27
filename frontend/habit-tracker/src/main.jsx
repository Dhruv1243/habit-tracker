import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*Thanks to this we can now use the routing in our entire app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

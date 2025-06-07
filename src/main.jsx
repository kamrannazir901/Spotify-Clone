import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import MyContext from "./context/MyContext.jsx";
import PlayerContextProvider from "./context/PlayerContext.jsx";
import DBoperations from "./context/DBoperations.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Spotify-Clone">
    <DBoperations>
      <PlayerContextProvider>
        <MyContext>
          <App />
        </MyContext>
      </PlayerContextProvider>
    </DBoperations>
  </BrowserRouter>
);

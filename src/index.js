import React from "react";
import { FirebaseAppProvider } from "reactfire";
import { createRoot } from "react-dom/client";
import App from "./routes/App";

const firebaseConfig = {
  apiKey: "AIzaSyBG8TGssPs_39NVTsHPcXVlgeJHwn5x6GU",
  authDomain: "termoconfort-5d960.firebaseapp.com",
  projectId: "termoconfort-5d960",
  storageBucket: "termoconfort-5d960.appspot.com",
  messagingSenderId: "543790644750",
  appId: "1:543790644750:web:58e6bc6483ed0642c0865f",
  measurementId: "G-LFHCHCVDTQ",
};

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>
);

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

//rainbowkit imports
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

function App() {
  // rainbowkit code
  const { chains, publicClient } = configureChains(
    [polygonMumbai],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  const myCustomTheme = {
    colors: {
      accentColor: "#7d33f6",
      modalBackdrop: "5px",
      modalBackground: "#f5f5f4",
      actionButtonSecondaryBackground: "#000000",
      accentColorForeground: "#fff",
      generalBorder: "#000",
      modalBorder: "#000",
      profileAction: "#f5f5f4",
      profileActionHover: "#f5f5f4",
      profileForeground: "#ffffff",
      // actionButtonBorder: "...",
      // actionButtonBorderMobile: "...",
      // actionButtonSecondaryBackground: "...",
    },
    radii: {
      actionButton: "10px",
      connectButton: "10px",
      menuButton: "10px",
      modal: "10px",
      modalMobile: "10px",
    },
  };
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        // theme={darkTheme({
        //   accentColor: "#7d33f6",
        //   accentColorForeground: "white",
        //   borderRadius: "medium",
        //   fontStack: "system",
        //   overlayBlur: "small",
        // })}
        theme={myCustomTheme}
      >
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
          </Router>
        </div>{" "}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;

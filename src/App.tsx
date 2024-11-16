import DrawerAppBar from "./components/mui/DrawerAppBar";
import BottomNav from "./components/mui/BottomNav";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { styled } from "@mui/system";
import { Suspense, useEffect } from "react";
import PWABadge from "./PWABadge";
import { theme } from "./styles/theme";

import { Outlet } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, filecoinCalibration, flowTestnet,sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "ThanQ",
  projectId: "fc8b5ed20be8c39819928d4a45318f7e",
  chains: [mainnet, filecoinCalibration, flowTestnet,sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const RootContainer = styled(Box)({
  // maxWidth:"480px",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // overflow: "hidden",
  padding: 0,
  backgroundColor: "#f5f5f5",
});

const ContentBox = styled(Box)({
  maxWidth: "480px",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  // overflow: "hidden",
  marginTop: "56px",
  marginBottom: "56px",
  backgroundColor: "#ffffff",
});

const queryClient = new QueryClient();

function App() {
  useEffect(() => { }, []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <RootContainer>
                <DrawerAppBar />

                <ContentBox>
                  {/* 여기에 콘텐츠를 추가하세요 */}
                  <Outlet />
                </ContentBox>
                <BottomNav />
                <PWABadge />
              </RootContainer>
            </ThemeProvider>
          </Suspense>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

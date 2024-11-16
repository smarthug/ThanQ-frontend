import { Button, Box, Typography, Avatar, CircularProgress, Card, CardContent, CardMedia } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";



import { useCallNext } from "../../hooks/useWriteThanQContract";

import { providers, ethers } from 'ethers'

import { QRCodeSVG } from 'qrcode.react';



const wallet = "0xfa6Cc5134a2e81a2F19113992Ef61F9BE81cafdE"
export default function JoinQueue() {
  const params = useParams();
  const [queueInfo, setQueueInfo] = useState(null);
  const callNext = useCallNext(params.queueId);

  useEffect(() => {
    // Assume that we fetch booth information via an API call here.
    // In an actual project, this can be implemented using fetch to retrieve the data below.
    const fetchQueueInfo = async () => {
      const response = await fakeApiFetchQueueInfo(params.queueId);
      setQueueInfo(response);
    };
    fetchQueueInfo();
  }, [params.queueId]);

  function onClick() {
    console.log("Call Next");
    // callNext();
    fetchNotification();
  }

  if (!queueInfo) {
    return <CircularProgress />;
  }


  const fetchNotification = async () => {
    // Demo only supports MetaMask (or other browser based wallets) and gets provider that injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Switch to sepolia
    await provider.send('wallet_switchEthereumChain', [
      { chainId: '0xAA36A7' },
    ]);

    // Get provider
    await provider.send('eth_requestAccounts', []);

    // Grabbing signer from provider
    const signer = provider.getSigner();

    // 1. window.ethereum을 사용하여 WalletClient 생성
    // const walletClient = createWalletClient({
    //   chain: sepolia,
    //   transport: custom(window.ethereum),
    // });

    // // 2. Sepolia 네트워크로 전환
    // await walletClient.switchChain({id:sepolia.id});

    // // 3. 계정 요청
    // const accounts = await walletClient.request({ method: 'eth_requestAccounts' });
    // const account = accounts[0];

    // console.log(account);

    // const signer = clientToSigner(walletClient);

    // // 4. Signer 역할을 하는 Account 객체 생성
    // // const signer = getAccount(account);
    // // console.log(signer);

    // Initialize user for push
    const userAlice = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });

    // retrieve notifications for users
    const inboxNotifications = await userAlice.notification.list('INBOX', {
      account: `eip155:11155111:${wallet}`,
      limit: 5,
    });

    // set notifItems state so that react can render
    // setNotifItems(inboxNotifications);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: 4, boxShadow: 3 }}>
      <Card sx={{ mb: 3 }}>
        {/* Booth Logo and Name */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <QRCodeSVG value="https://thanq.io/joinqueue/1" />
          </Box>
        <CardContent>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
            {queueInfo.name}
          </Typography>
          {/* Waiting Count and Current Status */}
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>
            Number of people waiting: {queueInfo.waitingCount}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>
            Number of people demoed: {queueInfo.waitingCount}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
            Current Status: {queueInfo.status}
          </Typography>
        </CardContent>
      </Card>

      {/* Join Queue Button */}
      <Button
        sx={{
          background: (theme) => theme.palette.primary.main,
          color: 'white',
          fontWeight: 'bold',
          borderRadius: 2,
          transition: 'background 0.3s ease',
          '&:hover': {
            background: (theme) => theme.palette.primary.dark,
          },
        }}
        size="large"
        variant="contained"
        fullWidth
        onClick={onClick}
      >
        {/* Join Queue */}
        Call Next
      </Button>
    </Box>
  );
}

// Mock API data (In an actual project, implement with fetch or axios)
const fakeApiFetchQueueInfo = async (queueId) => {
  // This part is a mockup example. Replace it with actual data.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: queueId,
        name: "Flow Booth",
        logoUrl: "https://bafybeib3f6u3cs5ob2efhsrvlvgxu7fax7e5z5pdhu7ddlwkaerepebb7a.ipfs.w3s.link/flow.svg",
        waitingCount: 15,
        status: "In Progress",
      });
    }, 1000);
  });
};


export function clientToSigner(client) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)
  return signer
}
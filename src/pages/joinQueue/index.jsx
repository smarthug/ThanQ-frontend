import { Button, Box, Typography, Avatar, CircularProgress, Card, CardContent, CardMedia } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useJoinQueue } from "../../hooks/useWriteThanQContract";

import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js'

export default function JoinQueue() {
  const params = useParams();
  const joinQueue = useJoinQueue(params.queueId);
  const [queueInfo, setQueueInfo] = useState(null);

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
    console.log("joined queue");
    const worldMode = false;
    if (worldMode) {

      JoinQueueWorld();

    } else {

      joinQueue();
    }

    // if(MiniKit.isInstalled()){

    //   const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

    // joinQueue();

    // }else{

    // }
  }

  async function JoinQueueWorld() {
    const verifyPayload = {
      action: 'joinqueue', // This is your action ID from the Developer Portal
      // signal: '0x12312', // Optional additional data
      verification_level: VerificationLevel.Device, // Orb | Device
    }

    const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

    if (finalPayload.status === 'error') {
      return console.log('Error payload', finalPayload)
    }


    // Verify the proof in the backend
    const verifyResponse = await fetch('/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: finalPayload, // Parses only the fields we need to verify
        action: 'joinqueue',
        // signal: '0x12312', // Optional
      }),
    })

    // TODO: Handle Success!
    const verifyResponseJson = await verifyResponse.json()
    if (verifyResponseJson.status === 200) {
      console.log('Verification success!')
      joinQueue();
    }
  }

  if (!queueInfo) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: 4, boxShadow: 3 }}>
      <Card sx={{ mb: 3 }}>
        {/* Booth Logo and Name */}
        <CardMedia
          component="img"
          height="180"
          image={queueInfo.logoUrl}
          alt={queueInfo.name}
        />
        <CardContent>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
            {queueInfo.name}
          </Typography>
          {/* Waiting Count and Current Status */}
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>
            Number of people waiting: {queueInfo.waitingCount}
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
        Join Queue
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

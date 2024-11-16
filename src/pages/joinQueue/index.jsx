import { Button, Box, Typography, Avatar, CircularProgress, Card, CardContent, CardMedia } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function JoinQueue() {
  const params = useParams();
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
    console.log("clicked");
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
        logoUrl: "https://via.placeholder.com/150",
        waitingCount: 15,
        status: "In Progress",
      });
    }, 1000);
  });
};

import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import PolygonLogo from './polygon_logo.svg'; // Replace with the actual path to your logo

// Custom styled card component
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  height: '313px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
  textAlign: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
  },
}));

// Card component to display booth information
const QueueCard = ({ boothName, queueCount }) => {
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            src={null}
            alt="Polygon Logo"
            sx={{ width: 72, height: 72, border: '2px solid #3f51b5', padding: '4px', backgroundColor: 'white' }}
          />
        </Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          {boothName}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          Queue Count:
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
          {queueCount}
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          View Details
        </Button>
      </CardContent>
    </StyledCard>
  );
};

// Example usage of the card
const HomeScreen = () => {
  const booths = [
    { boothName: 'polygon ', queueCount: 2 },
    { boothName: 'ethereum ', queueCount: 5 },
    { boothName: 'solana ', queueCount: 3 },
    { boothName: 'avalanche ', queueCount: 1 },
    { boothName: 'binance ', queueCount: 4 },
    { boothName: 'cosmos ', queueCount: 6 },
  ];

  return (
    <Grid container spacing={2} justifyContent="center" p={3}>
      {booths.map((booth, index) => (
        <Grid item xs={6} sm={6} md={6} key={index}>
          <QueueCard
            boothName={booth.boothName}
            queueCount={booth.queueCount}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeScreen;

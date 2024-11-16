import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, BottomNavigation, BottomNavigationAction, Card, CardContent, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LanguageIcon from '@mui/icons-material/Language';
import ListIcon from '@mui/icons-material/List';

import { useGetUserQueuePositions } from '../../hooks/useReadThanQContract';
import { useAccount } from 'wagmi';

const JoinedQueuesPage = () => {
  const [queues, setQueues] = React.useState([
    { id: 1, name: "Booth A", position: 5, waitTime: "15 mins" },
    { id: 2, name: "Hospital B", position: 2, waitTime: "5 mins" },
  ]);
  const { address } = useAccount();
  const getUserQueuePositions = useGetUserQueuePositions(address);


  useEffect(() => {
    // const result = getUserQueuePositions();
    console.log(getUserQueuePositions);
  }, [getUserQueuePositions]);


  return (
    <div>
      {/* Main Content */}
      <Grid container spacing={2} style={{ padding: 16 }}>
        {queues.length === 0 ? (
          <Typography variant="h6" color="textSecondary" style={{ marginTop: 20, textAlign: 'center', width: '100%' }}>
            There are no joined queues currently.
          </Typography>
        ) : (
          queues.map(queue => (
            <Grid item xs={12} key={queue.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {queue.name}
                  </Typography>
                  <Typography color="textSecondary">
                    Current Position: {queue.position}
                  </Typography>
                  <Typography color="textSecondary">
                    Estimated Wait Time: {queue.waitTime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Bottom Navigation */}
      {/* <BottomNavigation showLabels style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <BottomNavigationAction label="Add Queue" icon={<AddCircleIcon />} />
        <BottomNavigationAction label="Explore" icon={<LanguageIcon />} />
        <BottomNavigationAction label="Joined Queues" icon={<ListIcon />} />
      </BottomNavigation> */}
    </div>
  );
};

export default JoinedQueuesPage;

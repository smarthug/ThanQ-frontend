// import TheButton from '../../components/TheButton';
import { Button, Card, CardContent, CardActions, Typography, Grid, Paper } from "@mui/material";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CreatedQueue() {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    // Simulate fetching created queues from an API or local storage
    const fetchedQueues = [
      { id: 1, name: "Queue 1", status: "Active" },
      { id: 2, name: "Queue 2", status: "Inactive" },
      { id: 3, name: "Queue 3", status: "Active" },
    ];
    setQueues(fetchedQueues);
  }, []);

  function onClick() {
    console.log("clicked");
  }

  return (
    <>
      <div>
        <Link to="/createQueue">
          <Button
            sx={{ background: (theme) => theme.palette.gradient.main }}
            size="large"
            variant="contained"
            onClick={onClick}
          >
            Create Queue
          </Button>
        </Link>
      </div>

      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {queues.map((queue) => (
          <Grid item key={queue.id} xs={12} sm={6} md={4}>
            <Card component={Paper} elevation={3}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {queue.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {queue.status}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">Manage Queue</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

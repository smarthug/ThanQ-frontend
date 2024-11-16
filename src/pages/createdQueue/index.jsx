// import TheButton from '../../components/TheButton';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
export default function CreatedQueue() {

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
          value={"test"}
          // fullWidth
          onClick={onClick}
        >
          Create Queue
        </Button>
        </Link>
      </div>

    </>
  );
}


// if queue is created, show this page

// card to manage queue


// get from useEffect  , Manage Queue Card display
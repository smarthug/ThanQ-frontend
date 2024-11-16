// import TheButton from '../../components/TheButton';
import { Button } from "@mui/material";
export default function CreatedQueue() {
  return (
    <>

      <div>
        <Button
          sx={{ background: (theme) => theme.palette.gradient.main }}
          size="large"
          variant="contained"
          value={"test"}
        >
          Create Queue
        </Button>
      </div>

    </>
  );
}

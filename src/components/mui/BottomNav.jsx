import PublicIcon from "@mui/icons-material/Public";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function LabelBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current path to set the value
  const currentPath = location.pathname;

  // Determine the value based on the current path
  let initialValue;
  switch (currentPath) {
    case "/createdQueue":
      initialValue = "0";
      break;
    case "/world":
      initialValue = "1";
      break;
    case "/joinedQueue":
      initialValue = "2";
      break;
    default:
      initialValue = "1";
      break;
  }

  const [value, setValue] = useState(initialValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "0":
        navigate("/createdQueue");
        break;
      case "1":
        navigate("/world");
        break;
      case "2":
        navigate("/joinedQueue");
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels={false}
        value={`${value}`}
        onChange={handleChange}
        sx={{
          '& .Mui-selected': {
            // color:(theme) => theme.palette.gradient.main
            color:"#4caf50"
          },
        }}
      >
        <BottomNavigationAction
          label="Created Queues"
          value="0"
          icon={<AddCircleIcon />}
        />
        <BottomNavigationAction label="World" value="1" icon={<PublicIcon />} />
        <BottomNavigationAction
          label="Joined Queues"
          value="2"
          icon={<ListAltIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

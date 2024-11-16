import PublicIcon from "@mui/icons-material/Public";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import { useState, useEffect } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function LabelBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Map paths to values
  const getValueFromPath = (path) => {
    switch (path) {
      case "/createdQueue":
        return "0";
      case "/world":
        return "1";
      case "/joinedQueue":
        return "2";
      default:
        return "1";
    }
  };

  const [value, setValue] = useState(getValueFromPath(location.pathname));

  useEffect(() => {
    setValue(getValueFromPath(location.pathname));
  }, [location.pathname]);

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
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "#072F4A",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels={false}
        value={value}
        onChange={handleChange}
        sx={{
          bgcolor: "#072F4A",
          "& .MuiBottomNavigationAction-root .MuiSvgIcon-root": {
            color: "#e6fff7", // Unselected icon color
          },
          "& .MuiBottomNavigationAction-root.Mui-selected .MuiSvgIcon-root": {
            color: "#00E3A0", // Selected icon color
          },
          "& .MuiBottomNavigationAction-label": {
            color: "#00E3A0",
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

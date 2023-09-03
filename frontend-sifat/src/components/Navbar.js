import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          <h2> HRXcelerate </h2>
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/departments">
            Departments
          </Button>
          <Button color="inherit" component={Link} to="/employees">
            Employees
          </Button>
          <Button
            color="inherit"
            onClick={handleMenuClick} // Open the menu on button click
          >
            Job
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              component={Link}
              to="/jobroles"
              onClick={handleMenuClose} // Close the menu on sub-menu click
            >
              Job Role
            </MenuItem>
            <MenuItem
              component={Link}
              to="/jobpostings"
              onClick={handleMenuClose} // Close the menu on sub-menu click
            >
              Job Posting
            </MenuItem>
            <MenuItem
              component={Link}
              to="/applicants"
              onClick={handleMenuClose} // Close the menu on sub-menu click
            >
              Applicants
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

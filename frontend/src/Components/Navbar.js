import React from "react";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Import the Link component for navigation
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton> 
            <CatchingPokemonIcon />
        </IconButton> */}
        <Typography sx={{ flexGrow: 1 }}>
          <h2> HRXcelerate </h2>
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/basicinfo">
            Basic Info
          </Button>
          <Button color="inherit" component={Link} to="/departments">
            Departments
          </Button>
          <Button color="inherit" component={Link} to="/employees">
            Employee
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

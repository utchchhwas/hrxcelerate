import React from "react";
import { AppBar, Toolbar, Typography, Stack , Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom"; // Import the Link component for navigation
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

const Navbar = () => {
  return (
    <AppBar position="static">
        <Toolbar>
            {/* <IconButton> 
                <CatchingPokemonIcon />
            </IconButton> */}
            <Typography sx={{flexGrow:1}}>
              <h2> HRXcelerate </h2>
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button color='inherit'>Basic Info</Button>
                <Button color='inherit'>Departments</Button>
                <Button color='inherit'>Employee</Button>
            </Stack>
        </Toolbar>
    </AppBar>
  );
};

export default Navbar;

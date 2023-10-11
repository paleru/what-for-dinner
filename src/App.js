import { useState } from "react";
import Typography from '@mui/material/Typography';
//import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AccountCircle, Logout } from "@mui/icons-material";
import { Routes, Route, Link } from 'react-router-dom';
import { createTheme } from "@mui/material";
import Button from '@mui/material/Button';
import List from "@mui/material/List";
import { ThemeProvider } from "@emotion/react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import Home from "./components/Home";
import searchRecipes from "./components/RecipeFetcher";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import AddRecipe from "./components/AddRecipe"
import UserRecipes from "./components/UserRecipes";
import UserProfile from "./components/UserProfile";


export const theme = createTheme({
  palette: {
    primary: {
      main: '#0e804d',
    },
    secondary: {
      main: '#b81b4c',
    },
  },
});

function App() {
  const [recipes, setRecipes] = useState([]);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSubmit = async (selectedIngredients) => {
    const result = await searchRecipes(selectedIngredients);
    setRecipes(result);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Chef Pål
          </Typography>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="secondary" startIcon={<Logout />}>
              Logout
            </Button>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton component={Link} to="/" >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton component={Link} to="/add-recipe">
            <ListItemIcon>
              <LibraryAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add recipe" />
          </ListItemButton>
          <ListItemButton component={Link} to="/user-recipes">
            <ListItemIcon>
              <FoodBankIcon />
            </ListItemIcon>
            <ListItemText primary="My recipes" />
          </ListItemButton>
          <ListItemButton component={Link} to="/profile">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: '#e6f6ed',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home handleSubmit={handleSubmit} recipes={recipes} />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/user-recipes" element={<UserRecipes />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
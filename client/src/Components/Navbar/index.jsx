import react, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../Utils/AuthContext';
import { Article } from '@mui/icons-material';

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:980px)');  // Detect mobile screen size
  const [anchorEl, setAnchorEl] = useState(null);  // For opening menu
  const [openMenu, setOpenMenu] = useState(false);
  const {token}=useContext(AuthContext)
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#A9B5DF', boxShadow: 'none' }}> {/* Light Blue Background */}
      <Toolbar sx={{ padding: 0 }}> {/* Removed padding for no space from corners */}
        <Typography variant="h6" sx={{ flexGrow: 1,padding:'0 100px' }}>
          <Link to="/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>Blog</Link> {/* Dark Blue Text */}
        </Typography>
        {isMobile ? (
          <>
            {/* Hamburger menu icon for mobile */}
            <IconButton color="inherit" onClick={handleMenuClick}>
              <MenuIcon sx={{ color: '#1e3a8a' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#ADD8E6', // Light blue background for the menu
                },
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                <HomeIcon sx={{ marginRight: 1 }} />
                Home
              </MenuItem>
              <MenuItem component={Link} to="/posts/:categoryId/categoryName" onClick={handleMenuClose}>
                <PostAddIcon sx={{ marginRight: 1 }} />
                Posts
              </MenuItem>
              <MenuItem component={Link} to="/auth" onClick={handleMenuClose}>
                <LoginIcon sx={{ marginRight: 1 }} />
                Login/Register
              </MenuItem>
              <MenuItem component={Link} to='/profile' onClick={handleMenuClose}>
                <AccountCircleIcon sx={{ marginRight: 1 }} />
                Profile
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2,padding:'0 100px' }}>
            {/* Desktop Menu */}
            <Button component={Link} to="/" startIcon={<HomeIcon />} sx={{ color: '#1e3a8a' }}>
              Home
            </Button>
            <Button component={Link} to="/posts/all/all-category" startIcon={<PostAddIcon />} sx={{ color: '#1e3a8a' }}>
              Posts
            </Button>
            <Button component={Link} to="/articles" startIcon={<Article />} sx={{ color: '#1e3a8a' }}>
              Articles
            </Button>
            {token?<Button component={Link} to='profile' startIcon={<AccountCircleIcon />} sx={{ color: '#1e3a8a' }}>
              My Profile
            </Button>:<Button component={Link} to="/auth" startIcon={<LoginIcon />} sx={{ color: '#1e3a8a' }}>
              Login/Register
            </Button>}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

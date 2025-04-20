import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import { Article } from '@mui/icons-material';
import { AuthContext } from '../../Utils/AuthContext';

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:980px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { token } = useContext(AuthContext);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#A9B5DF', boxShadow: 'none', direction: 'rtl' }}>
      <Toolbar sx={{ padding: 0 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, padding: '0 100px', fontWeight: 'bold' }}>
          <Link to="/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>
            بلاگ
          </Link>
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <MenuIcon sx={{ color: '#1e3a8a' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#ADD8E6',
                  direction: 'rtl'
                },
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose} sx={{ gap: 1 }}>
                <HomeIcon />
                <Typography sx={{ fontWeight: 'bold' }}>خانه</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/posts/all/all-category" onClick={handleMenuClose} sx={{ gap: 1 }}>
                <PostAddIcon />
                <Typography sx={{ fontWeight: 'bold' }}>مقالات</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/articles" onClick={handleMenuClose} sx={{ gap: 1 }}>
                <Article />
                <Typography sx={{ fontWeight: 'bold' }}>مطالب ویژه</Typography>
              </MenuItem>
              {token ? (
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose} sx={{ gap: 1 }}>
                  <AccountCircleIcon />
                  <Typography sx={{ fontWeight: 'bold' }}>پروفایل من</Typography>
                </MenuItem>
              ) : (
                <MenuItem component={Link} to="/auth" onClick={handleMenuClose} sx={{ gap: 1 }}>
                  <LoginIcon />
                  <Typography sx={{ fontWeight: 'bold' }}>ورود / ثبت‌نام</Typography>
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, padding: '0 100px' }}>
            <Button
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              sx={{ color: '#1e3a8a', fontWeight: 'bold', gap: 1 }}
            >
              خانه
            </Button>
            <Button
              component={Link}
              to="/posts/all/all-category"
              startIcon={<PostAddIcon />}
              sx={{ color: '#1e3a8a', fontWeight: 'bold', gap: 1 }}
            >
              مقالات
            </Button>
            <Button
              component={Link}
              to="/articles"
              startIcon={<Article />}
              sx={{ color: '#1e3a8a', fontWeight: 'bold', gap: 1 }}
            >
              مطالب ویژه
            </Button>
            {token ? (
              <Button
                component={Link}
                to="/profile"
                startIcon={<AccountCircleIcon />}
                sx={{ color: '#1e3a8a', fontWeight: 'bold', gap: 1 }}
              >
                پروفایل من
              </Button>
            ) : (
              <Button
                component={Link}
                to="/auth"
                startIcon={<LoginIcon />}
                sx={{ color: '#1e3a8a', fontWeight: 'bold', gap: 1 }}
              >
                ورود / ثبت‌نام
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

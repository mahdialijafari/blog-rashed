import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import { Instagram, Facebook, Twitter, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#2D336B',
        color: '#fff',
        textAlign: 'center',
        padding:'60px 0'
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">About Us</Typography>
          <Typography variant="body2">
            Welcome to our blog! We provide the latest articles and insights to help you stay informed.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Quick Links</Typography>
          <Link href="/" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>Home</Link>
          <Link href="/posts" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>Posts</Link>
          <Link href="/categories" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>Categories</Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Follow Us</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Instagram sx={{ color: '#fff', cursor: 'pointer' }} />
            <Facebook sx={{ color: '#fff', cursor: 'pointer' }} />
            <Twitter sx={{ color: '#fff', cursor: 'pointer' }} />
            <YouTube sx={{ color: '#fff', cursor: 'pointer' }} />
          </Box>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ marginTop: '20px' }}>
        &copy; 2025 Blog, All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

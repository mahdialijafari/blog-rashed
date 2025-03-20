import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box sx={{ backgroundColor: '#FFF2F2', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="h2" fontWeight="bold" color="#2D336B">404</Typography>
        <Typography variant="h5" color="#2D336B" sx={{ marginTop: 2 }}>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <Button variant="contained" component={Link} to="/" sx={{ backgroundColor: '#7886C7', color: 'white', fontWeight: 'bold' }}>
            Go Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;

import React from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f7ff', // Light background with blue tint
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" sx={{ fontSize: '100px', fontWeight: 'bold', color: '#1e3a8a' }}>
              404
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: '#334155', marginBottom: '20px' }}>
              Oops! Page Not Found
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ color: '#64748b', marginBottom: '30px' }}>
              The page you're looking for might have been moved or deleted.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              sx={{
                backgroundColor: '#1e3a8a', // Blue color root
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1e40af', // Slightly darker blue on hover
                },
              }}
            >
              Go Back to Dashboard
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NotFound;

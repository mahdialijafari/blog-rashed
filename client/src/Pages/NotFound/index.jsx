import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#FFF2F2',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        direction: 'rtl' // Important for Persian
      }}
    >
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="h2" fontWeight="bold" color="#2D336B">
          ۴۰۴
        </Typography>
        <Typography variant="h5" color="#2D336B" sx={{ marginTop: 2 }}>
          اوه! صفحه‌ای که دنبالش هستید پیدا نشد.
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            component={Link}
            to="/"
            sx={{ backgroundColor: '#7886C7', color: 'white', fontWeight: 'bold' }}
          >
            بازگشت به صفحه اصلی
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;

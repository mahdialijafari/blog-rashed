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
        padding: '60px 0',
        direction: 'rtl', // Important for Persian
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">درباره ما</Typography>
          <Typography variant="body2">
            به وبلاگ ما خوش آمدید! اینجا جدیدترین مقالات و دیدگاه‌ها را برای شما فراهم می‌کنیم تا همیشه به‌روز باشید.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">لینک‌های سریع</Typography>
          <Link href="/" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>خانه</Link>
          <Link href="/posts" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>مقالات</Link>
          <Link href="/categories" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>دسته‌بندی‌ها</Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">ما را دنبال کنید</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Instagram sx={{ color: '#fff', cursor: 'pointer' }} />
            <Facebook sx={{ color: '#fff', cursor: 'pointer' }} />
            <Twitter sx={{ color: '#fff', cursor: 'pointer' }} />
            <YouTube sx={{ color: '#fff', cursor: 'pointer' }} />
          </Box>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ marginTop: '20px' }}>
        &copy; ۲۰۲۵ وبلاگ فارسی، تمامی حقوق محفوظ است.
      </Typography>
    </Box>
  );
};

export default Footer;

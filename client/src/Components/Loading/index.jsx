import { Box, Typography } from "@mui/material";
import React from "react";
import { BounceLoader } from 'react-spinners';

export default function Loading() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      direction: 'rtl',
    }}>
      <BounceLoader
        color="#3894ff"
        loading
        size={80}
        speedMultiplier={1}
      />
      <Typography sx={{ mt: 2, fontSize: '18px', color: '#3894ff' }}>
        در حال بارگذاری... لطفاً صبور باشید
      </Typography>
    </Box>
  );
}

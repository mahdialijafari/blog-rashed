import { Box } from "@mui/material";
import React from "react";
import {BounceLoader} from 'react-spinners'
export default function Loading() {
  return (
    <Box sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }}>
      <BounceLoader
        color="#3894ff"
        cssOverride={{}}
        loading
        size={80}
        speedMultiplier={0}
      />{" "}
    </Box>
  );
}

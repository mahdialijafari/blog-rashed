  import React from "react";
  import { Outlet } from "react-router-dom";
  import { Typography, Paper,Container } from "@mui/material";

  export default function Users() {
    return (
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          paddingTop: 6,
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Header Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#3498db",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              marginBottom: 3,
            }}
          >
            Manage Users
          </Typography>
  
          
  
          {/* Create Post Button */}
          
        </Paper>
  
        {/* Nested Routes for Post Management */}
        <Container sx={{ marginTop: 2 }}>
          <Outlet />
        </Container>
      </Container>
    );
  }

import React from "react";
import { Container, Typography, Button, Paper } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Posts = () => {
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
          Manage Posts
        </Typography>

        <Typography
          variant="h5"
          sx={{
            marginBottom: 4,
            color: "#7f8c8d",
            fontStyle: "italic",
          }}
        >
          Create and manage your blog posts effortlessly.
        </Typography>

        {/* Create Post Button */}
        <Button
          component={Link}
          to="/posts/create"
          variant="contained"
          sx={{
            backgroundColor: "#1abc9c",
            color: "white",
            fontWeight: "bold",
            padding: "12px 24px",
            fontSize: "16px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#16a085" },
          }}
        >
          + Create New Post
        </Button>
      </Paper>

      {/* Nested Routes for Post Management */}
      <Container sx={{ marginTop: 4 }}>
        <Outlet />
      </Container>
    </Container>
  );
};

export default Posts;

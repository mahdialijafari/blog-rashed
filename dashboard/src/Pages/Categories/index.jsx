import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Categories = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", paddingTop: 4, color: "#ecf0f1" }}>
      <Typography variant="h2" sx={{ marginBottom: 4, fontWeight: "bold", color: "#3498db", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
        Create New Categories
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 6, color: "#bdc3c7", fontStyle: "italic" }}>
        Find articles that inspire you by browsing our different categories.
      </Typography>

      {/* Button to create a new category */}
      <Button
        component={Link}
        to="/categories/create" // Update with the correct path to the create category page
        variant="contained"
        sx={{
          backgroundColor: "#3498db",
          '&:hover': { backgroundColor: "#2980b9" },
          padding: "12px 24px",
          fontWeight: "bold",
        }}
      >
        Create a New Category
      </Button>
      <Outlet/>
    </Container>
  );
};

export default Categories;

import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", paddingTop: 4, color: "#ecf0f1" }}>
      <Typography variant="h2" sx={{ marginBottom: 2, fontWeight: "bold", color: "#3498db", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
        Welcome to Our Blog
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 4, color: "#bdc3c7", fontStyle: "italic" }}>
        Explore insightful articles, tips, and more from our passionate writers.
      </Typography>
      <Grid container spacing={4}>
        {[1, 2, 3].map((index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ backgroundColor: "#34495e", color: "#ecf0f1", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)", borderRadius: 2, padding: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#f39c12" }}>
                  Blog Post {index}
                </Typography>
                <Typography variant="body2" color="inherit" sx={{ marginBottom: 2, fontSize: "1.1rem" }}>
                  A short description of the blog post goes here. Learn more insights and tips to enhance your knowledge.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, backgroundColor: "#3498db", textTransform: "capitalize", '&:hover': { backgroundColor: "#2980b9" } }}
                  component={Link}
                  to={`/posts/${index}`}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;

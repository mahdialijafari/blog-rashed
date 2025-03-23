import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";

const Article = () => {
  // Sample article data
  const article = {
    title: "The Future of Artificial Intelligence",
    author: "John Doe",
    avatar: "https://via.placeholder.com/150", // Placeholder avatar
    date: "March 21, 2025",
    readTime: "6 min read",
    coverImage: "https://source.unsplash.com/800x400/?technology,ai",
    content: `
      Artificial Intelligence (AI) is revolutionizing industries across the globe. 
      From self-driving cars to smart assistants, AI is enhancing human capabilities 
      and redefining the way we interact with technology. 
      
      The rapid advancements in AI-driven models have opened new opportunities in healthcare, 
      finance, and creative fields. While many see AI as a tool for innovation, ethical concerns 
      remain a hot topic, especially in areas like deepfakes, bias in AI models, and job automation.
      
      What does the future hold? Experts predict that AI will become even more integrated into our 
      daily lives, improving efficiency, creativity, and personalized experiences. However, responsible 
      AI development and governance will play a key role in ensuring that these advancements benefit humanity as a whole.
    `,
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={8}
        sx={{
          padding: 5,
          m: 6,
          bgcolor: "#FFF2F2",
          borderRadius: "20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Article Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h3" fontWeight="bold" color="#2D336B" textAlign="center">
            {article.title}
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mt={2}>
            <Avatar src={article.avatar} sx={{ width: 50, height: 50 }} />
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#2D336B">
                {article.author}
              </Typography>
              <Typography variant="body2" color="#7886C7">
                {article.date} • {article.readTime}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Article Image */}
        <Box
          component="img"
          src={article.coverImage}
          alt="Article Cover"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "15px",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
            mb: 4,
          }}
        />

        {/* Article Content */}
        <Typography variant="body1" color="#2D336B" sx={{ lineHeight: 1.8 }}>
          {article.content}
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* Tags */}
        <Box display="flex" gap={1} flexWrap="wrap">
          <Chip label="Technology" sx={{ bgcolor: "#2D336B", color: "white" }} />
          <Chip label="AI" sx={{ bgcolor: "#7886C7", color: "white" }} />
          <Chip label="Future" sx={{ bgcolor: "#A9B5DF", color: "white" }} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Article;

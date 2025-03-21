import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia, CircularProgress, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import fetchData from '../../Utils/fetchData';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData(`posts?populate=categoryId`);
        if (res?.data && Array.isArray(res.data)) {
          setPosts(res.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
console.log(posts.title)
  return (
    <Box sx={{ backgroundColor: '#FFF2F2', minHeight: '100vh', paddingBottom: 4 }}>
      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#2D336B', color: 'white', padding: '50px 0', textAlign: 'center' }}>
        <Container>
          <Typography variant="h3" fontWeight="bold">
            All Blog Posts
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            Explore our wide range of blog posts on various topics and categories.
          </Typography>
        </Container>
      </Box>

      {/* Posts Section */}
      <Container sx={{ marginTop: 4 }}>
        {loading ? (
          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <CircularProgress />
          </Box>
        ) : posts.length > 0 ? (
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item xs={12} md={4} key={post._id}>
                <Card sx={{ backgroundColor: '#A9B5DF', color: '#2D336B', borderRadius: 2, boxShadow: 3 }}>
                  <CardMedia component="img" height="180" image={post?.image} alt={post?.title} sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{post?.title}</Typography>
                    <Typography variant="body2" sx={{ marginTop: 1, color: '#2D336B' }}>{post?.description.split(' ').slice(0,9).join(' ')}...</Typography>
                    <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip
                        label={post?.categoryId?.title}
                        sx={{ backgroundColor: '#7886C7', color: 'white', fontWeight: 'bold', padding: '5px 10px' }}
                      />
                      <Button component={Link} to={`/post-details/${post._id}/${post.title.replaceAll(' ','-')}`} sx={{ color: '#2D336B', fontWeight: 'bold' }}>    
                        Read More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 3, color: '#2D336B' }}>
            No posts available.
          </Typography>
        )}
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ textAlign: 'center', marginTop: 6 }}>
        <Typography variant="h5" fontWeight="bold" color="#2D336B">
          Join Our Community
        </Typography>
        <Typography variant="body1" color="#2D336B" sx={{ marginTop: 1 }}>
          Stay updated with the latest articles and insights by signing up.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/register"
          sx={{ backgroundColor: '#7886C7', color: 'white', marginTop: 2 }}
        >
          Register Now
        </Button>
      </Box>
    </Box>
  );
};

export default Posts;

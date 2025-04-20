import React, { useEffect, useState } from 'react';
import { 
  Box, Button, Container, Grid, Typography, Card, CardContent, 
  CardMedia, CircularProgress, Chip, TextField 
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import fetchData from '../../Utils/fetchData';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { categoryId, categoryName } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const trendingTopics = ["هوش مصنوعی", "برنامه‌نویسی وب", "بلاکچین و رمزارز", "طراحی رابط کاربری", "امنیت سایبری"];

  useEffect(() => {
    (async () => {
      try {
        let endpoint = "posts?populate=categoryId";

        if (categoryId && categoryId !== "all") {
          endpoint += `&filters[categoryId][$eq]=${categoryId}`;
        }

        const res = await fetchData(endpoint);

        if (res?.data && Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryId]);

  return (
    <Box sx={{ backgroundColor: '#FFF2F2', minHeight: '100vh', paddingBottom: 4, direction: 'rtl' }}>
      
      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#2D336B', color: 'white', padding: '50px 0', textAlign: 'center' }}>
        <Container>
          <Typography variant="h3" fontWeight="bold">به دنیای مقالات خوش آمدید</Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            با جدیدترین مطالب و اخبار از بهترین نویسندگان همراه شوید.
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            to="/posts/all/دسته‌بندی-همه" 
            sx={{ backgroundColor: '#A9B5DF', color: '#2D336B', marginTop: 2, fontWeight: 'bold' }}
          >
            شروع مطالعه
          </Button>
        </Container>
      </Box>

      {/* Featured Posts Section */}
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="#2D336B" gutterBottom>مطالب منتخب</Typography>
        {loading ? (
          <Box sx={{ textAlign: 'center', marginTop: 3 }}><CircularProgress /></Box>
        ) : posts.length > 0 ? (
          <Grid container spacing={3}>
            {posts.slice(0, 3).map((post) => (
              <Grid item xs={12} md={4} key={post._id}>
                <Card sx={{ backgroundColor: '#A9B5DF', color: '#2D336B' }}>
                  <CardMedia component="img" height="180" image={post?.image} alt={post?.title} />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{post?.title}</Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      {post?.description.split(' ').slice(0, 9).join(' ')}...
                    </Typography>
                    <Button 
                      component={Link} 
                      to={`/post-details/${post._id}/${post.title.replaceAll(' ', '-')}`} 
                      sx={{ marginTop: 2, color: '#2D336B', fontWeight: 'bold' }}
                    >
                      مطالعه بیشتر
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 3, color: '#2D336B' }}>
            مطلبی برای نمایش وجود ندارد.
          </Typography>
        )}
      </Container>

      {/* Popular Categories */}
      <Container sx={{ marginTop: 6 }}>
        <Typography variant="h4" fontWeight="bold" color="#2D336B" gutterBottom>دسته‌بندی‌های محبوب</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {posts.map((e, index) => (
            <Chip 
              key={index} 
              label={e?.categoryId?.title} 
              clickable 
              sx={{ backgroundColor: '#A9B5DF', color: '#2D336B', fontWeight: 'bold', padding: '10px', fontSize: '16px' }}
              onClick={() => navigate(`/posts/${e?.categoryId?._id}/${e?.categoryId?.title}`)}
            />
          ))}
        </Box>
      </Container>

      {/* Trending Topics */}
      <Container sx={{ marginTop: 6 }}>
        <Typography variant="h4" fontWeight="bold" color="#2D336B" gutterBottom>موضوعات داغ</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {trendingTopics.map((topic, index) => (
            <Chip 
              key={index} 
              label={topic} 
              clickable 
              sx={{ backgroundColor: '#7886C7', color: 'white', fontWeight: 'bold', padding: '10px', fontSize: '16px' }}
              onClick={() => navigate(`/categories/${topic.toLowerCase().replace(/\s+/g, '-')}`)}
            />
          ))}
        </Box>
      </Container>

      {/* Newsletter Signup */}
      <Container sx={{ marginTop: 6, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="#2D336B" gutterBottom>عضویت در خبرنامه</Typography>
        <Typography variant="body1" color="#2D336B">
          جدیدترین مقالات را مستقیم در ایمیل خود دریافت کنید!
        </Typography>
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
          <TextField label="ایمیل خود را وارد کنید" variant="outlined" sx={{ backgroundColor: 'white' }} />
          <Button variant="contained" sx={{ backgroundColor: '#7886C7', color: 'white', fontWeight: 'bold' }}>
            عضویت
          </Button>
        </Box>
      </Container>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', marginTop: 6 }}>
        <Typography variant="h5" fontWeight="bold" color="#2D336B">
          به جامعه ما بپیوندید
        </Typography>
        <Typography variant="body1" color="#2D336B" sx={{ marginTop: 1 }}>
          همین حالا ثبت‌نام کنید و از آخرین مطالب باخبر شوید.
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/register" 
          sx={{ backgroundColor: '#7886C7', color: 'white', marginTop: 2 }}
        >
          ثبت‌نام
        </Button>
      </Box>
    </Box>
  );
};

export default Home;

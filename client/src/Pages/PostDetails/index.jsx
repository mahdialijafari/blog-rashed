import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Chip,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import { AuthContext } from "../../Utils/AuthContext";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData(`posts/${id}?populate=categoryId`);
        const resCn = await fetchData(`comments/${id}`);
        setPost(res.data);
        setComments(resCn.data);
      } catch (error) {
        console.error("خطا در دریافت پست:", error);
      }
    })();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const res = await fetchData("comments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          content: newComment,
        }),
      });

      if (res.success) {
        setComments([...comments, res.data]);
        setNewComment("");
      }
    } catch (error) {
      console.error("خطا در ارسال دیدگاه:", error);
    }
    setLoading(false);
  };

  if (!post) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#FFF2F2", minHeight: "100vh", paddingBottom: 4, direction: "rtl" }}>
      {/* Hero Section */}
      <Box sx={{ backgroundColor: "#2D336B", color: "white", padding: "50px 0", textAlign: "center" }}>
        <Container>
          <Typography variant="h3" fontWeight="bold">{post.title}</Typography>
        </Container>
      </Box>

      {/* Post Content */}
      <Container sx={{ marginTop: 4 }}>
        <Card sx={{ backgroundColor: "#A9B5DF", color: "#2D336B", borderRadius: 2, boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="400"
            image={post.image}
            alt={post.title}
            sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
          />
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
              <Chip label={post.categoryId?.title} sx={{ backgroundColor: "#7886C7", color: "white", fontWeight: "bold" }} />
            </Box>

            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#2D336B" }}>
              {post.description}
            </Typography>
          </CardContent>
        </Card>
      </Container>

      {/* Comments Section */}
      <Container sx={{ marginTop: 6 }}>
        <Typography variant="h5" fontWeight="bold" color="#2D336B" gutterBottom>
          دیدگاه‌ها
        </Typography>

        {comments.length === 0 ? (
          <Typography variant="body1" color="#2D336B">هنوز دیدگاهی ثبت نشده است.</Typography>
        ) : (
          comments.map((comment, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#A9B5DF",
                padding: 2,
                borderRadius: 2,
                marginBottom: 2,
              }}
            >
              <Avatar sx={{ bgcolor: "#2D336B", marginLeft: 2 }}>
                {comment?.userId?.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight="bold" color="#2D336B">
                  {comment?.userId?.username || "مهمان"}
                </Typography>
                <Typography variant="body2" color="#2D336B">
                  {comment.content}
                </Typography>
              </Box>
            </Box>
          ))
        )}

        {/* Comment Form for logged-in users */}
        {!token ? (
          <Typography variant="body1" color="#2D336B">
            <Link to='/auth'>لطفاً برای ارسال دیدگاه وارد شوید.</Link>
          </Typography>
        ) : (
          <Box component="form" onSubmit={handleSubmitComment} sx={{ marginTop: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="دیدگاه خود را بنویسید..."
              variant="outlined"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 2, backgroundColor: "#7886C7", color: "white" }}
              disabled={loading}
            >
              {loading ? "در حال ارسال..." : "ارسال دیدگاه"}
            </Button>
          </Box>
        )}
      </Container>

      {/* Back to Posts */}
      <Box sx={{ textAlign: "center", marginTop: 6 }}>
        <Button
          variant="contained"
          component={Link}
          to="/posts"
          sx={{ backgroundColor: "#7886C7", color: "white" }}
        >
          بازگشت به مقالات
        </Button>
      </Box>
    </Box>
  );
};

export default PostDetails;

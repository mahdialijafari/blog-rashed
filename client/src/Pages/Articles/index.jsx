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
  // نمونه مقاله
  const article = {
    title: "آینده هوش مصنوعی",
    author: "علی رضایی",
    avatar: "https://via.placeholder.com/150", // آواتار نمونه
    date: "فروردین ۱۴۰۴",
    readTime: "۶ دقیقه مطالعه",
    coverImage: "https://source.unsplash.com/800x400/?technology,ai",
    content: `
      هوش مصنوعی (AI) در حال تحول صنایع در سراسر جهان است.
      از خودروهای خودران گرفته تا دستیارهای هوشمند، این فناوری در حال افزایش قابلیت‌های انسانی و تغییر نحوه تعامل ما با تکنولوژی است.
      
      پیشرفت‌های سریع در مدل‌های مبتنی بر هوش مصنوعی فرصت‌های تازه‌ای در حوزه‌های سلامت، مالی و خلاقیت ایجاد کرده است.
      با این حال، نگرانی‌های اخلاقی همچنان موضوع داغی هستند، به ویژه در زمینه‌هایی مانند دیپ‌فیک، تعصب در مدل‌های هوش مصنوعی و اتوماسیون مشاغل.
      
      آینده چه چیزی را برای ما رقم خواهد زد؟ کارشناسان پیش‌بینی می‌کنند که AI در زندگی روزمره ما حتی بیشتر ادغام خواهد شد
      و باعث بهبود بهره‌وری، خلاقیت و تجربه‌های شخصی‌تر خواهد شد.
      اما توسعه مسئولانه و مدیریت هوش مصنوعی نقش کلیدی در اطمینان از منافع بشری ایفا خواهد کرد.
    `,
  };

  return (
    <Container maxWidth="md" sx={{ direction: "rtl" }}>
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
        {/* هدر مقاله */}
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

        {/* تصویر مقاله */}
        <Box
          component="img"
          src={article.coverImage}
          alt="تصویر مقاله"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "15px",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
            mb: 4,
          }}
        />

        {/* محتوای مقاله */}
        <Typography variant="body1" color="#2D336B" sx={{ lineHeight: 1.8 }}>
          {article.content}
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* تگ‌ها */}
        <Box display="flex" gap={1} flexWrap="wrap">
          <Chip label="فناوری" sx={{ bgcolor: "#2D336B", color: "white", fontWeight: "bold" }} />
          <Chip label="هوش مصنوعی" sx={{ bgcolor: "#7886C7", color: "white", fontWeight: "bold" }} />
          <Chip label="آینده" sx={{ bgcolor: "#A9B5DF", color: "white", fontWeight: "bold" }} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Article;

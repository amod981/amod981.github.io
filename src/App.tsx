import { Routes, Route } from "react-router-dom";
import Project from "./components/Project";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import MyWebsiteBlogs from "./components/blogs/MyWebsite/MyWebsiteBlogs";
import Blog1 from "./components/blogs/MyWebsite/Blog1";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Blog2 from "./components/blogs/MyWebsite/Blog2";
import FloAIBlogs from "./components/blogs/FloAI/FloAIBlogs";
import FloAIBlog1 from "./components/blogs/FloAI/FloAIBlog1";
import FloAIBlog2 from "./components/blogs/FloAI/FloAIBlog2";
import BigDataBlogs from "./components/blogs/BigData/BigDataBlogs";
import BigDataBlog1 from "./components/blogs/BigData/BigDataBlog1";
import BigDataBlog2 from "./components/blogs/BigData/BigDataBlog2";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/MyWebsiteBlogs" element={<MyWebsiteBlogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog1" element={<Blog1 />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/FloAIBlogs" element={<FloAIBlogs />} />
        <Route path="/floAIBlog1" element={<FloAIBlog1 />} />
        <Route path="/FloAIBlog2" element={<FloAIBlog2 />} />
        <Route path="/bigDataBlogs" element={<BigDataBlogs />} />
        <Route path="/bigDataBlog1" element={<BigDataBlog1 />} />
        <Route path="/bigDataBlog2" element={<BigDataBlog2 />} />
      </Routes>
    </>
  );
}
import { Routes, Route } from "react-router-dom";
import Project from "./components/Project";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import MyWebsiteBlogs from "./components/blogs/MyWebsite/MyWebsiteBlogs";
import Blog1 from "./components/blogs/MyWebsite/Blog1";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/blog1" element={<Blog1 />} />
        <Route path="/MyWebsiteBlogs" element={<MyWebsiteBlogs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
import { Routes, Route } from "react-router-dom";
import Project from "./components/Project";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import BlogList from "./components/blogs/BlogList";
import BlogPost from "./components/blogs/BlogPost";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs/:category" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </>
  );
}

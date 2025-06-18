import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import LandingPage from "./components/landingPage";
import ResumePage from "./components/resume";
import ProjectsPage from "./components/projects";
import ContactPage from "./components/contact";
import RagBlog from "./components/RagBlog";

function App() {
  return (
    <Router>
      {" "}
      {/* ✅ This must wrap everything */}
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/rag-blog" element={<RagBlog />} />
      </Routes>
    </Router>
  );
}

export default App;

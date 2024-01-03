import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProjectsActive from "./pages/ProjectsActive";
import ProjectsPlanned from "./pages/ProjectsPlanned";
import ProjectsCompleted from "./pages/ProjectsCompleted";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />}/>
          <Route path="register" element={<Register />}/>
          <Route path="profile/projects/active" element={<ProjectsActive/>}/>
          <Route path="profile/projects/planned" element={<ProjectsPlanned/>}/>
          <Route path="profile/projects/completed" element={<ProjectsCompleted/>}/>


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
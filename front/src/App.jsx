import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import YarnStash from "./pages/YarnStash";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />}/>
          <Route path="register" element={<Register />}/>
          <Route path="profile/projects" element={<Projects/>}/>
          <Route path="profile/yarn-stash" element={<YarnStash/>}/>


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
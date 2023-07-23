import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserReposPage from "./components/UserRepos";
import NotFoundPage from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:username" element={<UserReposPage />} />
        <Route path="/" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;

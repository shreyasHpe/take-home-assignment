import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDetails from "./pages/UserDetails";
import UserNotFound from "./pages/UserNotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:username" element={<UserDetails />} />
        <Route path="/" element={<UserNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

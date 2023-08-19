import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserForm from "./pages/UserForm";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

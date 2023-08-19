import DepartmentList from "../components/DepartmentList";
import ProductList from "../components/ProductList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("User Data");

  useEffect(() => {
    if (!userData) {
      navigate("/");
      alert("Please fill the form.");
      return;
    }
  }, []);
  return (
    <>
      <ProductList />
      <DepartmentList />
    </>
  );
};

export default Home;

import { Outlet } from "react-router";
import "./App.css";
import { Footer, Nav } from "./Component/Comp";
import { useEffect, useState } from "react";

function App() {

  const [user, setuser] = useState();


  const fetchUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/current-user", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensure cookies are sent with the request
    });
      // console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      setuser(res.data);
    } catch (error) {
      throw new Error(error)
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className=" bg-gray-100 ">
        <Nav user =  {user} />
        <Outlet user = {user} />
        <Footer />
      </div>
    </>
  );
}

export default App;

import React, { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, setuser } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username);
    setuser(username);
  }

  return (
      <>
      <h1 className=" bg-white"> Hi this is Aman Katiyar</h1>
      <div className=" bg-gray-200 h-screen flex flex-col justify-center items-center gap-3 ">
        <h2>Login</h2>
        <input className=" border-2"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />{" "}
        <input className=" border-2"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button className="  px-3 py-1 bg-amber-700  shadow  shadow-amber-400 hover:cursor-pointer "
        onClick={handleSubmit}>Submit</button>
        <div className=" text-black" >Welcome {user}</div>
      </div>
    </>
  );
}

export default Home;

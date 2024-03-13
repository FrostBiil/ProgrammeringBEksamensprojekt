import React, { useEffect } from 'react';
import { Api } from '../utils/api'; // Juster stien efter din filstruktur
import Navbar from '../components/Navbar';

function LoginPage() {
  const handleLogin = async () => {
    // Api.login() vil redirecte til den side hvor brugeren var da funktionen blev kaldt
    Api.login();
  };

  useEffect(() => {
    Api.me().then((user) => {
      // Hvis brugeren er logget ind, så vil user være en object med brugerens information
      if (user) {
        console.log(user)
      } else {
        console.log("Not logged in")
      };
    });
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      <Navbar/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;

import React, { useEffect } from 'react';
import { Api } from '../utils/api'; // Juster stien efter din filstruktur

function LoginPage() {
  const handleLogin = async () => {
    Api.login();
  };

  useEffect(() => {
    Api.me().then((user) => {
      console.log(user);
    });
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;

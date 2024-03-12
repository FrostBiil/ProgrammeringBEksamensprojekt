import React from 'react';
import { Api } from '../utils/api'; // Juster stien efter din filstruktur

function LoginPage() {
  const handleLogin = async () => {
    try {
      const response = await Api.fetch('/login', 'POST', { username: 'user', password: 'pass' });
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Håndter succesfuld login
      } else {
        // Håndter fejl
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;

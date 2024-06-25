import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [users, setUsers] = useState<{ users?: string[] }>({});

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="container">
      <h1 className="text-3xl font-bold p-5">Closet</h1>
      {!users.users ? (
        <p className="text-base px-5 py-1">Loading...</p>
      ) : (
        users.users.map((user, index) => (
          <p key={index} className="text-base px-5 py-1">
            {user}
          </p>
        ))
      )}
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState<{ users?: string[] }>({});

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Closet</h1>
      {!users.users ? (
        <p>Loading...</p>
      ) : (
        users.users.map((user, index) => <p key={index}>{user}</p>)
      )}
    </div>
  );
}

export default App;

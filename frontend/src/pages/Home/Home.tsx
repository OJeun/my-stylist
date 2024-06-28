import { useEffect, useState } from 'react';
import LandingComponent from './LandingComponent';

export default function Home() {
  const [users, setUsers] = useState<{ users?: string[] }>({});

  useEffect(() => {
    const apiUrl = '/api';
    const fullUrl = `${window.location.origin}${apiUrl}`;
    console.log(`Fetching data from: ${fullUrl}`);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <LandingComponent />
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

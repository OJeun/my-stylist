// import { useEffect, useState } from 'react';
import LandingComponent from '../components/LandingComponent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  // const [users, setUsers] = useState<{ users?: string[] }>({});

  // useEffect(() => {
  //   fetch('/api')
  //     .then((response) => response.json())
  //     .then((data) => setUsers(data));
  // }, []);

  return (
    <div>
      <div className="mx-10">
        <LandingComponent />
        {/* <h1 className="text-3xl font-bold p-5">Closet</h1>
        {!users.users ? (
          <p className="text-base px-5 py-1">Loading...</p>
        ) : (
          users.users.map((user, index) => (
            <p key={index} className="text-base px-5 py-1">
              {user}
            </p>
          ))
        )} */}
      </div>
    </div>
  );
}

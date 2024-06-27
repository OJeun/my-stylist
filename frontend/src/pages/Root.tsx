import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Root() {
  return (
    <>
      <Navbar />
      <div className="mx-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

import { Routes } from './routes/Routes';
import { Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
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

export default App;

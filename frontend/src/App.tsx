import { Routes } from './routes/Routes';
import { Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AlertMessage from './components/AlertMessage';

function App() {
  return (
    <>
      <Navbar />

      <div className="mx-5 container">
        <Outlet />
        <AlertMessage />
      </div>
      <Footer />
    </>
  );
}

export default App;

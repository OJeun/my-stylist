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
      <div className="m-4 sm:m-6 md:m-8 lg:m-10 xl:m-12">
        <Outlet />
        <AlertMessage />
      </div>
      <Footer />
    </>
  );
}

export default App;

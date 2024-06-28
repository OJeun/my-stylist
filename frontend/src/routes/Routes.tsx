import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import App from '../App';
import MyCloset from '../pages/MyCloset';
import OutfitGenerator from '../pages/OutfitGenerator';
import Login from '../pages/Login';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        element: <AuthOutlet fallbackPath="/login" />, 
        children: [
          {
            path: '/outfit-generator',
            element: <OutfitGenerator />,
          },
          {
            path: '/my-closet',
            element: <MyCloset />,
          },
          ],
        }
      ]
    }
  ]
);

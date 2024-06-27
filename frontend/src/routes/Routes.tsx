import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import App from '../App';
import MyCloset from '../pages/MyCloset';
import OutfitGenerator from '../pages/OutfitGenerator';

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
        path: '/my-closet',
        element: <MyCloset />,
      },
      {
        path: '/outfit-generator',
        element: <OutfitGenerator />,
      }
    ],
  },
]);

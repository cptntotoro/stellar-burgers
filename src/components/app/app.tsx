import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { useEffect } from 'react';
import { getIngredientsAsync } from '../../services/slices/ingredientsSlice';
import { checkUserAuthAsync } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { routes } from './routes-config';

const App = () => {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div className={styles.app}>
          <AppHeader />
          <Outlet />
        </div>
      ),
      children: routes
    }
  ]);

  useEffect(() => {
    dispatch(getIngredientsAsync());
    dispatch(checkUserAuthAsync());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;

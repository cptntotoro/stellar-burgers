import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import React, { useEffect } from 'react';
import { getIngredientsAsync } from '../../services/slices/ingredientsSlice';
import { checkUserAuthAsync } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
  useRoutes
} from 'react-router-dom';
import { modalBackgroundMap, routes } from './routes-config';

const isModalPath = (pathname: string): boolean =>
  Object.keys(modalBackgroundMap).some(
    (prefix) =>
      pathname.startsWith(prefix) && pathname !== modalBackgroundMap[prefix]
  );

const getDefaultBackground = (pathname: string): Partial<Location> => {
  const prefix = Object.keys(modalBackgroundMap).find((p) =>
    pathname.startsWith(p)
  );
  if (prefix) {
    return { pathname: modalBackgroundMap[prefix] };
  }
  return { pathname: '/' };
};

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDirectAccess =
    !location.state?.background && isModalPath(location.pathname);

  useEffect(() => {
    if (isDirectAccess) {
      const defaultBackground = getDefaultBackground(location.pathname);
      navigate(location.pathname, {
        state: { background: defaultBackground },
        replace: true
      });
    }
  }, [isDirectAccess, location.pathname, navigate]);

  const background = (location.state && location.state.background) ?? null;
  const backgroundElement = useRoutes(routes, background ?? location);
  const modalElement = useRoutes(routes, location);
  return (
    <div className={styles.app}>
      <AppHeader />
      {backgroundElement}
      {background && modalElement}
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: '/*',
      element: <AppLayout />,
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

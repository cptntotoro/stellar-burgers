import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { IngredientDetails, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route';
import { ModalWithNavigation } from '../modal/modal-with-navigation';

export const routes = [
  {
    path: '*',
    element: <NotFound404 />
  },
  {
    path: '/',
    element: <ConstructorPage />
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute onlyUnAuthorized>
        <Register />
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute onlyUnAuthorized>
        <Login />
      </ProtectedRoute>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <ProtectedRoute onlyUnAuthorized>
        <ForgotPassword />
      </ProtectedRoute>
    )
  },
  {
    path: '/reset-password',
    element: (
      <ProtectedRoute onlyUnAuthorized>
        <ResetPassword />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        )
      },
      {
        path: 'orders/:number',
        element: (
          <ProtectedRoute>
            <ModalWithNavigation title={'Заказ'}>
              <OrderInfo />
            </ModalWithNavigation>
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/feed',
    element: <Feed />
  },
  {
    path: '/feed/:number',
    element: (
      <ModalWithNavigation title={'Заказ'}>
        <OrderInfo />
      </ModalWithNavigation>
    )
  },
  {
    path: '/ingredients/:id',
    element: (
      <ModalWithNavigation title={'Игридиент'}>
        <IngredientDetails />
      </ModalWithNavigation>
    )
  }
];

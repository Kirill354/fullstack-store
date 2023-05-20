import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import { Shop, Auth, DevicePage, Admin, Basket } from '../pages';
import {
   DEVICE_ROUTE,
   LOGIN_ROUTE,
   REGISTRATION_ROUTE,
   ADMIN_ROUTE,
   BASKET_ROUTE,
} from '../utils/paths';

const AppRouting = () => {
   return (
      <Routes>
         <Route index element={<Shop />} />
         <Route path={LOGIN_ROUTE} element={<Auth />} />
         <Route path={REGISTRATION_ROUTE} element={<Auth />} />
         <Route path={DEVICE_ROUTE + '/:id'} element={<DevicePage />} />

         {/* protected routes */}
         <Route
            path={ADMIN_ROUTE}
            element={
               <ProtectedRoute>
                  <Admin />
               </ProtectedRoute>
            }
         />
         <Route
            path={BASKET_ROUTE}
            element={
               <ProtectedRoute>
                  <Basket />
               </ProtectedRoute>
            }
         />

         {/* page not found */}
         <Route path="*" element={<div>Страница не найдена!</div>} />
      </Routes>
   );
};
export default AppRouting;

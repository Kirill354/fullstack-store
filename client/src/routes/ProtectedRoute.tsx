import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';

interface ProtectedRouteProps {
   children: ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
   const isAuth = useSelector((state: RootState) => state.user.isAuth);

   return <>{isAuth ? props.children : <Navigate to="/" />}</>;
};
export default ProtectedRoute;

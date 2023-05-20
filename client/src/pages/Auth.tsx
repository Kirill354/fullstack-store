import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form } from 'react-bootstrap';

import { login, registration } from '../services/userApi';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/paths';

import { useAppDispatch } from '../store';
import { setAuth } from '../store/slices/userSlice';
import { setUser } from '../store/slices/userSlice';

const Auth = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const isLogin = location.pathname === LOGIN_ROUTE;

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const auth = async () => {
      try {
         let data;
         if (isLogin) {
            data = await login(email, password);
         } else {
            data = await registration(email, password);
         }
         dispatch(setAuth(true));
         dispatch(setUser(data));

         navigate(SHOP_ROUTE);
      } catch (e) {
         //@ts-ignore
         alert(e.response.data.message);
      }
   };

   return (
      <Container
         className="d-flex justify-content-center align-items-center"
         style={{ height: window.innerHeight - 54 }}>
         <Card style={{ width: 600 }} className="p-5">
            <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
            <Form className="d-flex flex-column">
               <Form.Control
                  className="mt-3"
                  placeholder="Введите ваш email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <Form.Control
                  className="mt-3"
                  placeholder="Введите ваш пароль..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
               />
               <div className="d-flex align-items-center justify-content-between mt-3 ps-3 pe-3">
                  {isLogin ? (
                     <div>
                        Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                     </div>
                  ) : (
                     <div>
                        Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link>
                     </div>
                  )}
                  <Button onClick={auth} variant="outline-success">
                     {isLogin ? 'Войти' : 'Регистрация'}
                  </Button>
               </div>
            </Form>
         </Card>
      </Container>
   );
};

export default Auth;

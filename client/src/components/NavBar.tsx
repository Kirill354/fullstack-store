import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/paths';
import { RootState, useAppDispatch } from '../store';
import { setAuth, setUser } from '../store/slices/userSlice';

const NavBar = () => {
   const isAuth = useSelector((state: RootState) => state.user.isAuth);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const logOut = () => {
      dispatch(setUser({}));
      dispatch(setAuth(false));
      localStorage.removeItem('token');
   };

   return (
      <Navbar bg="dark" variant="dark">
         <Container>
            <Link style={{ color: 'white' }} to={SHOP_ROUTE}>
               КупиДевайс
            </Link>
            {isAuth ? (
               <Nav className="ms-auto" style={{ color: 'white' }}>
                  <Button variant={'outline-light'}>
                     <Link style={{ color: 'inherit', textDecoration: 'none' }} to={ADMIN_ROUTE}>
                        Админ панель
                     </Link>
                  </Button>
                  <Button variant={'outline-light'} className="ms-2">
                     <Link
                        onClick={logOut}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                        to={LOGIN_ROUTE}>
                        Выйти
                     </Link>
                  </Button>
               </Nav>
            ) : (
               <Nav className="ms-auto" style={{ color: 'white' }}>
                  <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>
                     Авторизация
                  </Button>
               </Nav>
            )}
         </Container>
      </Navbar>
   );
};

export default NavBar;

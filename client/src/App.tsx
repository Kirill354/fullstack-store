import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';

import AppRouting from './routes/AppRouting';
import { NavBar } from './components';
import { useAppDispatch } from './store';
import { check } from './services/userApi';
import { setAuth, setUser } from './store/slices/userSlice';

function App() {
   const dispatch = useAppDispatch();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      check()
         .then((data) => {
            dispatch(setAuth(true));
            dispatch(setUser(data));
         })
         .finally(() => setLoading(false));
   }, []);

   if (loading) {
      return <Spinner animation={'grow'} />;
   }
   return (
      <BrowserRouter>
         <NavBar />
         <AppRouting />
      </BrowserRouter>
   );
}

export default App;

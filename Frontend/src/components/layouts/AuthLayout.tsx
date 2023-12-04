import { useAppSelector } from '../../redux/store'
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function AuthLayout() {

  const currentUser = useAppSelector((state) => state.user.currentUser);
  return (
    <>
      <Header />
        {currentUser ? <Outlet /> : <Navigate to='/signin' />}
      <Footer />
    </>
  )
}

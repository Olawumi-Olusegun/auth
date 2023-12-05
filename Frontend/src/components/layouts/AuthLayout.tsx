import { useAppSelector } from '../../redux/store'
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function AuthLayout() {

  const currentUser = useAppSelector((state) => state.user.currentUser);
  return (
    <>
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900'>
      <Header />
        <div className='flex-1'>
        {currentUser ? <div className='h-full'><Outlet /> </div>: <Navigate to='/signin' />}
        </div>
      <Footer />
    </div>
    </>
  )
}

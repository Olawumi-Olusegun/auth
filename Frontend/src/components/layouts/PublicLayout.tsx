import { Outlet } from 'react-router-dom';
import { Header, Footer } from './../index';

export default function PublicLayout() {
  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900'>
        <Header />
        <div className='flex-1'>
          <Outlet />
        </div>
        <Footer />
    </div>
  )
}

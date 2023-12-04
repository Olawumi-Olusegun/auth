import { Outlet } from 'react-router-dom';
import {Header, Footer} from './../index';

export default function PublicLayout() {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

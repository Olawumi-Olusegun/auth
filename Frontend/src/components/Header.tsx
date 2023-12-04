import { Link } from 'react-router-dom'
import { useAppSelector } from '../redux/store'


export default function Header() {

  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <div className='bg-slate-200'>
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <Link to="/"><h1 className='font-bold'>Auth App</h1></Link>
        <ul className='flex items-center gap-4'>
          <li > <Link to="/">Home</Link> </li>
          <li ><Link to="/about">About</Link></li>
          <li ><Link to="/contact">Contact</Link></li>
          <li >
            {currentUser?.id ? (
              <Link to="/profile">
                <img src={currentUser?.avatar?.imgUrl || "./assets/images/avatar.png" } className='h-7 w-7 rounded-full object-cover ' />
              </Link>
            ) : <Link to="/signin">Signin</Link> }
          </li>
        </ul>
      </div>
    </div>
  )
}

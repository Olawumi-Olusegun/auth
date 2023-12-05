import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useAppDispatch } from '../redux/store';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {

      const provider = new GoogleAuthProvider();

      try {

          const result = await signInWithPopup(auth, provider);

          const response = await fetch('/api/v1/auth/google', {
            method: "POST",
            body: JSON.stringify({
              username: result.user.displayName,
              email: result.user.email,
              avatar: {
                id: result.user.getIdToken,
                imgUrl: result.user.photoURL,
              }
            }),
            headers: {
              'Content-Type': "application/json",
            }
          });

          const { data, message } = await response.json();
          if(!response.ok) {
            dispatch(signInFailure(message));
          }

          dispatch(signInSuccess(data));
          navigate('/');
        } catch (error) {
          dispatch(signInFailure((error as any)?.message || ""));
        } finally {
          setTimeout(() => {dispatch(signInFailure(""))}, 9000);
        }
    }

  return (
    <button type='button' onClick={handleGoogleAuth} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Continue with google</button>
  )
}

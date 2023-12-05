import { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import { userDeleteFailure, userDeleteStart, userDeleteSuccess, userSignoutFailure, userSignoutStart, userSignoutSuccess, userUpdateFailure, userUpdateStart, userUpdateSuccess } from '../redux/user/userSlice';
import { useNavigate,  } from 'react-router-dom';

export default function Profile() {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.user.isLoading);

  const imageRef = useRef<HTMLInputElement | null>(null);



  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",

    avatar: {
      id: "",
      imgUrl: ""
    }
  });

 useEffect(() => {
    if(imageFile) {
      handleFileUpload(imageFile);
    }
 }, [imageFile]);

 useEffect(() => {
    if(currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
    
        avatar: {
          id: currentUser.avatar?.id || "",
          imgUrl: currentUser.avatar?.imgUrl || "",
        }
      })

    }
 }, []);

  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches("image/.*")

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const profileImage = formData?.avatar?.imgUrl || currentUser?.avatar?.imgUrl || "./assets/images/avatar.png";

  const handleFileUpload = async (imageFile: File) => {
    if(!imageFile) return;
    try {
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);


      uploadTask.on("state_changed", (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setImageUploadProgress(Math.round(percent));
        },
        (err: any) => {
          setImageUploadError(err?.message)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setFormData({...formData, avatar: {
                  id: new Date(Date.now()).toString(),
                  imgUrl: url
                } })
            });
        }
    );

    } catch (error) {
      setImageUploadError((error as any)?.message);
    } finally {
      setTimeout(() => {setImageUploadError("")}, 9000);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevState) => ({...prevState, [name]:value}));
  }

  const handleUserUpdateRequest = async (event: React.FormEvent) => {

    event.preventDefault();

    if(!currentUser?.id) return;
    
    try {
      dispatch(userUpdateStart());
      const response = await fetch(`/api/v1/user/update/${currentUser?.id}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': "application/json"
        }
      });

      const { data, message } = await response.json();

      if(!response.ok) {
        dispatch(userUpdateFailure(message));
      }

      dispatch(userUpdateSuccess(data));

    } catch (error) {
      dispatch(userUpdateFailure((error as any).message));
    } finally {
      setTimeout(() => {dispatch(userUpdateFailure(""))}, 9000);
    }
  }

  const handleUserDeleteRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      dispatch(userDeleteStart());
      const response = await fetch(`/api/v1/user/delete/${currentUser?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { message } = await response.json();

      if(!response.ok) {
        return dispatch(userDeleteFailure(message));
      }

      dispatch(userDeleteSuccess());

      return navigate('/', { replace: true });

    } catch (error: any) {
      return dispatch(userDeleteFailure(error?.message));
    } finally {
      setTimeout(() => {dispatch(userDeleteFailure(""))}, 9000);
    }
  }

  const handleUserSignOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
   
    try {
      dispatch(userSignoutStart());
      const response = await fetch('/api/v1/auth/signout');

      const { message } = await response.json();
      console.log("message")
      if(!response.ok) {
        return dispatch(userSignoutFailure(message));
      }
      dispatch(userSignoutSuccess());
      return navigate('/', { replace: true });
    } catch (error: any) {
      return dispatch(userSignoutFailure(error?.message));
    } finally {
      setTimeout(() => {dispatch(userSignoutFailure(""))}, 9000);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleUserUpdateRequest} className='flex flex-col  gap-y-4'>
        <input onChange={(event) => setImageFile(event.target.files?.[0] || undefined)} type='file' ref={imageRef} hidden accept='image/*' />
        <img onClick={() => imageRef.current?.click()} src={profileImage} alt="profile image" className='h-24 w-24 p-1 border border-gray-300 cursor-pointer rounded-full object-contain self-center' />
        
        {imageUploadProgress && imageUploadProgress > 0 && imageUploadProgress < 100 
        ? (
          <span className='text-slate-700 text-center text-sm self-center'>
            {`Uploading: ${imageUploadProgress}%`}
          </span>
        )
        : imageUploadProgress === 100 ? <>
          <span className='text-green-700 text-center text-sm self-center'>Image upload successfully</span>
        </> : null 
        }
        <input type="text" onChange={handleInputChange} defaultValue={currentUser?.username} id='username' name='username' placeholder='Username' className="bg-slate-100 rounded-lg p-3 mt-2" />
        <input type="email" onChange={handleInputChange} defaultValue={currentUser?.email} id='email' name='email' placeholder='Email' className="bg-slate-100 rounded-lg p-3 mt-2" />
        <input type="password" autoComplete='off' onChange={handleInputChange} id='password' name='password' placeholder='Password' className="bg-slate-100 rounded-lg p-3 mt-2" />
        <button disabled={isLoading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
      {imageUploadError &&  <p className='text-sm text-red-600 mt-5 text-center bg-red-200 p-1 rounded'> {imageUploadError} </p>}
      <div className='flex items-center justify-between mt-5'>
        <button disabled={isLoading} onClick={handleUserDeleteRequest} type='button' className='text-red-700 cursor-pointer font-semibold hover:bg-red-100 p-3 rounded-lg duration-150'>Delete Account</button>
        <button disabled={isLoading} onClick={handleUserSignOut} type='button' className='text-red-700 cursor-pointer font-semibold hover:bg-red-100 p-3 rounded-lg duration-150'>Sign Out</button>
      </div>
    </div>
  )
}

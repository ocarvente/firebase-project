'use client';
import {useRouter} from 'next/navigation'
import {signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../utils/firebase/firebase.utils';
import {useState} from 'react';

export default function SignIn () {

  const router = useRouter();

  const defaultFormFields = {
    email:'',
    password:''
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async()  => {
    console.log('we got here before popup')
    const response = await signInWithGooglePopup();
    console.log('we got here before popup', response)

    router.push('/');
  }

  const handleSubmit  = async () => {
    event.preventDefault();
    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      router.push('/');
    } catch (error) {
      console.log('could not sign in', error);
    }
  }

  const handleChange = () => {

  }

  return (
    <div className="">
    <form
      className="flex flex-col items-center bg-lime-300"
      onSubmit={handleSubmit}
    >
      <h1>Sign In</h1>
      <p>Already have an account?</p>
      <p>Sign in with your email and password.</p>

      <div className="grid grid-cols-2 gap-4">
        <label className="col-start-1 col-span-1 text-2xl flex items-center justify-end">
          Email:
        </label>
        <input
          className="col-start-2 col-span-1 h-8 text-2xl"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        <label className="col-start-1 col-span-1 text-2xl flex items-center justify-end">
          Password:
        </label>
        <input
          className="col-start-2 col-span-1 h-8 text-2xl"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className="py-4 flex flex-row items-center justify-center">
        <div className="">
          <button className="" type="submit" variant="contained">
            Sign In
          </button>
        </div>
      </div>
      <p> Or sign in with Google.</p>
      <div className="pb-4">
        <button
          className="bg-slate-300"
          onClick={signInWithGoogle}
          variant="contained"
        >
          <span className="text-2xl pr-4">
              google
          </span>
          <span className="text-sky-600 text-lg">Google Sign In</span>
        </button>
      </div>
    </form>
  </div>
  )
}

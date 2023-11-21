import { Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createAuthUserWithEmailAndPassword,
  createUserProfileDocument,
} from "../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

export default function SignUp () {
const router = useRouter();
const [formFields, setFormFields] = useState(defaultFormFields);
const {displayName, email, password, confirmPassword} = formFields;

const resetFormFields = () => {
  setFormFields(defaultFormFields);
}
const handleSubmit = async(event) => {
  event.preventDefault();
  if(password !== confirmPassword) {
    alert('Passwords do not match');
  }
  try {
   const {user} = await createAuthUserWithEmailAndPassword(email, password);
    await createUserProfileDocument(user, {displayName})
    resetFormFields();
    router.push('/');
  }catch (error) {
    console.log('User creation encountered an error', error);
  }

}

const handleChange = (event) => {
  const{name, value} = event.target;
  setFormFields({...formFields, [name]:value});
}

  return (
    <div className="">
      <form
        className="flex flex-col items-center bg-lime-500"
        onSubmit={handleSubmit}
      >
        <h1>Sign up</h1>
        <p>Don&apos;t have an account?</p>
        <p>Create an account below.</p>
        <div className="grid grid-cols-2 gap-4">
          <label className="col-start-1 col-span-1 text-2xl flex items-center justify-end">
            Display Name:
          </label>
          <input
            className="col-start-2 col-span-1 h-8 text-2xl"
            type="text"
            required
            name="displayName"
            value={displayName}
            onChange={handleChange}
          />

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

          <label className="col-start-1 col-span-1 text-2xl flex items-center justify-end">
            Confirm Password:
          </label>
          <input
            className="col-start-2 col-span-1 h-8 text-2xl"
            type="password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="py-4">
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
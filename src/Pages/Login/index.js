import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import Navbar from  "../../components/Navbar";



const Login = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("data", event);
  };
  return (
    <>
    <Navbar/>
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <form
          onSubmit={onSubmit}
          className="border border-gray-300 bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-center text-2xl mb-5">Login</h3>
          <div className="mb-4">
            <Input
              label={'Username'}
              name={'username'}
              id={'username'}
              placeholder={'username'} />
              
          </div>

          <div className="mb-6">
            <Input
              label={'Password'}
              id={'password'}
              type={'password'}
              placeholder={'password'} />
          </div>

          <div className="flex items-center justify-between">
            <Button

              type="submit"
              size='large'
              varient="primary"
              className={'w-full' }
            >
              Sign In
            </Button>
          </div>
          <p className="text-center mt-3">
            If you don't have an account?
            <Link className="underline text-sky-600" to={"/register"}>
              {" "}
              Register{" "}
            </Link>
          </p>
        </form>
      </div>
    </div></>
    
  );
};

export default Login;

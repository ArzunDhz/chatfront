import React, { useState } from "react";
import { EarthImg } from "../assets/images";
import Button from "../components/Button";
import { GoogleIcon } from "../assets/icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
const API = import.meta.env.VITE_API;
import { FormSchema } from "../middlewares/ValidateForm";
import { toast } from "react-hot-toast";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await axios
        .post(
          `${API}/user/login`,
          {
            email: values.email,
            password: values.password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message), setIsUserRegistered(true);
        })
        .catch((err) => toast.error(err.response.data.message));
      setLoading(false);
    },
  });

  return (
    <>
      {isUserRegistered ? (
        <Navigate to={"/chat"} />
      ) : (
        <div className="flex justify-center w-full h-screen overflow-hidden sm:flex-col bg-primary">
          {/* contain both image and form */}
          <h1 className=" md:hidden sm:visible text-center bg-primary text-[40px] text-pop">
            Kuranai
          </h1>
          <div className="flex items-center w-full h-screen justify-evenly">
            {/* image container */}
            <div className=" sm:hidden">
              <img
                src={EarthImg}
                alt="EathImage"
                height={400}
                width={400}
                className="object-contain "
              />
              <h1 className=" text-[5vw]  text-pop text-center ">KuraKani</h1>
              <h1 className="text-center text-[2vw] text-white">
                Boli nai Goli ho
              </h1>
            </div>

            {/* form container */}
            <div className="">
              <form
                onSubmit={handleSubmit}
                className=" shadow-2xl   form lg:w-[450px] p-[90px] rounded-xl h-[450px] justify-center items-center flex flex-col space-y-3  "
              >
                <h1 className="text-xl text-pop"> Sign In </h1>

                <div className="">
                  <input
                    value={values.email.trim()}
                    onChange={handleChange}
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="rounded-full text-pop bg-secondary"
                  />
                  <br />
                  <span className="text-red-300 text-[10px] ml-6 ">
                    {errors.email}
                  </span>
                  <br />
                </div>
                <div className="">
                  <input
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    autoComplete
                    placeholder="Password"
                    className="rounded-full text-pop bg-secondary"
                  />
                  <br />
                  <span className="text-red-300 text-[10px] ml-6 ">
                    {errors.password}
                  </span>
                  <br />
                </div>

                <Button text="Sign Up" isLoading={{ loading }} />

                <div className="flex p-2 space-x-4 rounded-full bg-primary shadow-5xl text-pop google_container">
                  <img
                    src={GoogleIcon}
                    width={24}
                    height={24}
                    alt="googleImg"
                    srcset=""
                  />
                  <h1 className="leading-tight ">Continue with Google</h1>
                </div>
                <div className=" w-fit text-pop">
                  <h1>
                    Don't Have Account ?
                    <Link
                      className="ml-2 text-sm underline cursor-pointer hover:text-white"
                      to={"/"}
                    >
                      Sign Up
                    </Link>
                  </h1>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;

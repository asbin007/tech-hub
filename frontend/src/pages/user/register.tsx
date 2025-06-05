
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerUser, setStatus } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Status } from "../../globals/types/types";

const Register = () => {
  const { status } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerUser({
        ...data,
        id: "", 
        token: "", 
      })
    );
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      navigate("/login");
      dispatch(setStatus(Status.LOADING));
      return;
    }
    dispatch(setStatus(Status.ERROR));
  }, [status, dispatch, navigate]);

  return (
    <>
      <div className="p-10 mt-9">
        <h1 className="mb-8 font-extrabold text-4xl">Register</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold" htmlFor="username">
                Username
              </label>
              <input
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                id="name"
                type="text"
                name="username"
                value={data.username}
                required={true}
                autoFocus={true}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block font-semibold" htmlFor="email">
                Email
              </label>
              <input
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                id="email"
                type="email"
                name="email"
                value={data.email}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block font-semibold" htmlFor="password">
                Password
              </label>
              <input
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                id="password"
                type="password"
                name="password"
                value={data.password}
                required={true}
                autoComplete="new-password"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Register
              </button>
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Already registered?
              </Link>
            </div>
          </form>
          <aside className="w-full">
            <div className="bg-gray-100 p-8 rounded">
              <h2 className="font-bold text-2xl">Instructions</h2>
              <ul className="list-disc mt-4 list-inside">
                <li>
                  All users must provide a valid email address and password to
                  create an account.
                </li>
                <li>
                  Users must not use offensive, vulgar, or otherwise
                  inappropriate language in their username or profile information
                </li>
                <li>Users must not create multiple accounts for the same person.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Register;

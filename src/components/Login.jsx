import React, { use, useEffect, useState } from "react";
import { useDB } from "../context/DBoperations";
import { images, icons } from "../assets/Assets";
import { Link, useLocation } from "react-router-dom";

function Login() {
  const { isLogin, setisLogin, login, checkSession } = useDB();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [wait, setWait] = useState(false);
  const [validationActive, setValidationActive] = useState(false);
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    success: false,
    password: "",
  });

  useEffect(() => {
    const originalBg = document.body.style.background;
    document.body.style.background = `linear-gradient(to bottom, #242424 50%, #000000 100%)`;
    return () => {
      document.body.style.background = originalBg;
    };
  }, []);

  const validateStep0 = () => {
    const isValidEmail = /^[a-zA-Z0-9_.+-@]{1,}$/.test(formData.email);
    const isValidPassword = /^[\S]{1,}$/.test(formData.password);

    setFormErrors((prev) => ({
      ...prev,
      password: isValidPassword ? "" : "Please enter your password.",
      email: isValidEmail
        ? ""
        : "Please enter your Spotify username or email address.",
    }));
    return isValidEmail && isValidPassword;
  };

  useEffect(() => {
    if (validationActive) {
      validateStep0();
    }
  }, [formData]);

  const handleSubmit = async () => {
    setValidationActive(true);
    setWait(true);
    const isValid = validateStep0();
    if (!isValid) {
      setWait(false);
      return;
    }
    const { success, message } = await login(formData.email, formData.password);
    if (success) {
      setFormErrors({ email: message, success: true, password: "" });
      setTimeout(() => {
        setFormErrors({ email: "", success: false, password: "" });
        setFormData({ email: "", password: "" });
        setValidationActive(false);
      }, 4000);
    } else {
      setFormErrors({ email: message, success: false, password: "" });
    }
    setWait(false);
  };

  return (
    <form className="flex flex-col items-center justify-between min-h-[100vh]">
      <section className="w-full md:w-[750px] pt-8 pb-16 flex flex-col relative rounded md:mt-8 mb-2 bg-gradient-to-b from-[#121212] via-transparent to-[#121212]">
        <Link to="/" className="w-fit m-auto">
          <img src={images.spotify_logo} alt="" className="w-10 m-auto" />
        </Link>
        {/* zero */}
        <div className="flex flex-col w-[320px] m-auto">
          <h1
            style={{ wordSpacing: "-.1em" }}
            className="text-[2rem] font-extrabold text-center pt-2 mb-8"
          >
            Log in to Spotify
          </h1>

          <a
            href="#"
            className="border-1 hover:border-white flex items-center border-gray px-6 rounded-full text-center py-[12px] font-bold"
          >
            <span>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.1 12.2272C22.1 11.5182 22.0364 10.8363 21.9182 10.1818H12.5V14.05H17.8818C17.65 15.3 16.9455 16.3591 15.8864 17.0682V19.5772H19.1182C21.0091 17.8363 22.1 15.2727 22.1 12.2272Z"
                  fill="#4285F4"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.4998 21.9999C15.1998 21.9999 17.4635 21.1045 19.118 19.5772L15.8862 17.0681C14.9907 17.6681 13.8453 18.0227 12.4998 18.0227C9.89529 18.0227 7.69075 16.2636 6.90439 13.8999H3.56348V16.4908C5.20893 19.759 8.59075 21.9999 12.4998 21.9999Z"
                  fill="#34A853"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.90455 13.9C6.70455 13.3 6.59091 12.6591 6.59091 12C6.59091 11.3409 6.70455 10.7 6.90455 10.1V7.50909H3.56364C2.88636 8.85909 2.5 10.3864 2.5 12C2.5 13.6136 2.88636 15.1409 3.56364 16.4909L6.90455 13.9Z"
                  fill="#FBBC05"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.4998 5.97727C13.968 5.97727 15.2862 6.48182 16.3226 7.47273L19.1907 4.60455C17.4589 2.99091 15.1953 2 12.4998 2C8.59075 2 5.20893 4.24091 3.56348 7.50909L6.90439 10.1C7.69075 7.73636 9.89529 5.97727 12.4998 5.97727Z"
                  fill="#EA4335"
                ></path>
              </svg>{" "}
            </span>
            <span className="text-center w-full font-semibold">
              Sign up with Google
            </span>
          </a>
          <a
            href="#"
            className="border-1 mt-2 hover:border-white flex items-center border-gray px-6 rounded-full text-center py-[12px] font-bold"
          >
            <span>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12.5" cy="12" r="10" fill="white"></circle>
                <path
                  d="M22.5 12C22.5 6.477 18.023 2 12.5 2C6.977 2 2.5 6.477 2.5 12C2.5 16.991 6.157 21.128 10.938 21.878V14.891H8.398V12H10.938V9.797C10.938 7.291 12.43 5.907 14.715 5.907C15.808 5.907 16.953 6.102 16.953 6.102V8.562H15.693C14.45 8.562 14.063 9.333 14.063 10.125V12H16.836L16.393 14.89H14.063V21.878C18.843 21.128 22.5 16.991 22.5 12Z"
                  fill="#1877F2"
                ></path>
              </svg>{" "}
            </span>
            <span className="text-center w-full font-semibold">
              Sign up with Facebook
            </span>
          </a>
          <a
            href="#"
            className="border-1 mt-2 hover:border-white flex items-center border-gray px-6 rounded-full text-center py-[12px] font-bold"
          >
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.195 4.513C15.873 3.69 16.351 2.567 16.351 1.433C16.351 1.278 16.341 1.123 16.318 1C15.206 1.044 13.872 1.734 13.083 2.668C12.449 3.379 11.871 4.513 11.871 5.647C11.871 5.825 11.905 5.991 11.916 6.047C11.982 6.058 12.094 6.08 12.216 6.08C13.206 6.08 14.45 5.413 15.195 4.513ZM15.973 6.313C14.317 6.313 12.961 7.325 12.093 7.325C11.171 7.325 9.97 6.38 8.525 6.38C5.779 6.38 3 8.648 3 12.918C3 15.586 4.023 18.398 5.301 20.211C6.391 21.744 7.347 23 8.725 23C10.081 23 10.682 22.1 12.371 22.1C14.083 22.1 14.472 22.978 15.973 22.978C17.463 22.978 18.453 21.61 19.397 20.265C20.442 18.72 20.887 17.219 20.897 17.142C20.809 17.119 17.963 15.952 17.963 12.695C17.963 9.871 20.198 8.604 20.331 8.504C18.852 6.381 16.596 6.314 15.973 6.314V6.313Z"
                  fill="white"
                ></path>
              </svg>{" "}
            </span>
            <span className="text-center w-full font-semibold">
              Sign up with Apple
            </span>
          </a>
        </div>
        <div className="w-[80%] m-auto mt-10 mb-8 bg-gray h-px opacity-20"></div>
        <div className="flex flex-col w-[320px] m-auto">
          {message && <div className="bg-green-700 p-3 mb-3">{message}</div>}
          <label htmlFor="email" className="text-sm font-bold pb-2">
            Email or username
          </label>
          <input
            type="text"
            id="email"
            autoComplete="email"
            placeholder="Email or username"
            value={formData.email}
            onChange={(e) => {
              setFormData((p) => ({ ...p, email: e.target.value }));
            }}
            className={`border-[1px] px-2 py-3 rounded-[5px] text-white placeholder:text-gray outline-none 
              ${
                formErrors.email && !formErrors.success
                  ? "border-red-500"
                  : "border-gray hover:border-white focus:border-[2px] focus:border-white"
              }`}
          />
          {formErrors.email && (
            <div
              className={`flex items-center gap-1 mt-2 ${
                formErrors.success ? "text-green-500" : "text-[#F37263]"
              }`}
            >
              <span className="text-lg">{icons.info_icon}</span>
              <p className="text-sm !leading-[1.2]">{formErrors.email}</p>
            </div>
          )}
          <label htmlFor="password" className=" text-sm font-bold pb-2 mt-5">
            Password
          </label>
          <div className=" relative">
            <input
              type={showPass ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => {
                setFormData((p) => ({ ...p, password: e.target.value }));
              }}
              className={`border-[1px] w-full px-3 pr-12 py-3 rounded-[5px] text-white placeholder:text-gray outline-none 
  ${
    formErrors.password
      ? "border-red-500"
      : "border-[#858585] hover:border-white focus:border-[2px] focus:border-white"
  }`}
            />
            <span
              onClick={() => {
                setShowPass((pre) => !pre);
              }}
              className="text-gray hover:text-white cursor-pointer text-3xl absolute right-[10px] top-[50%] transform -translate-y-1/2"
            >
              {showPass ? icons.eye_icon : icons.eyeslash_icon}
            </span>
          </div>
          {formErrors.password && (
            <div
              className={`flex items-center gap-1 mt-2 ${
                formErrors.success ? "text-green-500" : "text-[#F37263]"
              }`}
            >
              <span className="text-lg">{icons.info_icon}</span>
              <p className="text-sm !leading-[1.2]">{formErrors.email}</p>
            </div>
          )}
          <a
            href="#"
            onClick={handleSubmit}
            className={`bg-green hover:bg-green-hover hover:scale-[1.05] text-black rounded-full text-center mt-5 py-3 font-bold ${
              wait ? "pointer-events-none cursor-default opacity-60" : ""
            }`}
          >
            Log In
          </a>
          <div className="hidden items-center gap-1 justify-center">
            <a
              href="#"
              className="underline font-semibold mt-8 hover:text-green"
            >
              Log in without password
            </a>
          </div>
          <div className="flex items-center gap-1 justify-center mt-8">
            <span className="text-gray font-semibold">
              Don't have an account?
            </span>
            <Link to="/signup" className="underline hover:text-green">
              Sign up for Spotify
            </Link>
          </div>
        </div>
      </section>
      <section className=" bg-[#121212] w-full py-8 px-2 text-gray text-center text-[.8rem]">
        This site is protected by reCAPTCHA and the Google
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        apply.
      </section>
    </form>
  );
}

export default Login;

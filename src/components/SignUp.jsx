import { useEffect, useRef, useState } from "react";
import { images, icons } from "../assets/Assets";
import { useDB } from "../context/DBoperations";
import { Link, useNavigate } from "react-router-dom";

const steps = 3;
const stepsName = [
  "",
  "Create a password",
  "Tell us about yourself",
  "Terms & Conditions",
];
function SignUp() {
  const { isLogin, setisLogin, signUpUser } = useDB();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();

  const [passUI, setPassUI] = useState({
    check1: false,
    check2: false,
    check3: false,
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dob: { d: "", m: 0, y: "" },
    gender: "",
    tos: {
      marketing: false,
      shareData: false,
    },
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    name: "",
    dob: {
      d: false,
      m: false,
      y: false,
      message: "",
    },
    gender: "",
  });
  const [validatedSteps, setValidatedSteps] = useState([]);

  useEffect(() => {
    if (responseMessage && responseMessage.success) {
      const timer = setTimeout(() => {
        navigate("/login", {
          state: {
            message: "You can login now",
          },
        });
      }, 1000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [responseMessage]);

  useEffect(() => {
    if (validatedSteps.includes(0)) {
      validateStep0();
      passwordUI();
    }
    if (validatedSteps.includes(1)) {
      validateStep1();
    }
    if (validatedSteps.includes(2)) {
      validateStep2();
    }

    setTimeout(() => {
      if (responseMessage && responseMessage.success) {
        setFormData({
          email: "",
          password: "",
          name: "",
          dob: { d: "", m: 0, y: "" },
          gender: "",
          tos: {
            marketing: false,
            shareData: false,
          },
        });

        setFormErrors({
          email: "",
          password: "",
          name: "",
          dob: {
            d: false,
            m: false,
            y: false,
            message: "",
          },
          gender: "",
        });
        setValidatedSteps([]);
      }
    }, 4000);
  }, [formData, responseMessage]);

  const validateStep0 = () => {
    const isValidEmail =
      /^(?!.*([-+._]{2,}))[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      );

    setFormErrors((prev) => ({
      ...prev,
      email: isValidEmail
        ? ""
        : "This email is invalid. Make sure it's written like example@email.com",
    }));
    return isValidEmail;
  };

  const passwordUI = () => {
    const hasLetter = /[a-zA-Z]/.test(formData.password);
    const hasSymbolOrDigit = /[\W\d]/.test(formData.password);
    const isLongEnough = /^[\S]{10,}$/.test(formData.password);

    setPassUI({
      check1: hasLetter,
      check2: hasSymbolOrDigit,
      check3: isLongEnough,
    });

    return hasLetter && hasSymbolOrDigit && isLongEnough;
  };

  const validateStep1 = () => {
    let isValidPassword = passwordUI();

    setFormErrors((prev) => ({
      ...prev,
      password: isValidPassword ? "" : "Password is not valid",
    }));
    return isValidPassword;
  };

  function validateDOB() {
    const errors = { d: false, m: false, y: false, message: "" };
    const { y, m, d } = formData.dob;

    const userDob = new Date(`${y}-${m}-${d}`);
    const now = new Date();

    let years = now.getFullYear() - userDob.getFullYear();
    let months = now.getMonth() - userDob.getMonth();
    let days = now.getDate() - userDob.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    if (d === "" && m === 0 && y === "") {
      errors.message = "Please enter your date of birth.";
      errors.d = errors.m = errors.y = true;
      setFormErrors((p) => ({ ...p, dob: errors }));
      return false;
    } else if (d <= 0 || d > 31) {
      errors.message =
        "Please enter the day of your birth date by entering a number between 1 and 31.";
      errors.d = true;
      setFormErrors((p) => ({ ...p, dob: errors }));
      return false;
    } else if (m < 1 || m > 12) {
      errors.message = "Please select your month.";
      errors.m = true;
      setFormErrors((p) => ({ ...p, dob: errors }));
      return false;
    } else if (y < 1900) {
      errors.message = "Please enter a birth year from 1900 onwards.";
      errors.y = true;
      setFormErrors((p) => ({ ...p, dob: errors }));
      return false;
    } else if (years < 13) {
      errors.message = "You’re too young to create a Spotify account.";
      errors.y = true;
      setFormErrors((p) => ({ ...p, dob: errors }));
      return false;
    } else {
      errors.d = errors.m = errors.y = false;
      errors.message = "";
      setFormErrors((p) => ({ ...p, dob: errors }));
      return true;
    }
  }

  const validateStep2 = () => {
    const nameValid = /^(?=.{1,}$)(?:[a-zA-Z]{1,})(?:\s[a-zA-Z]{1,})*$/.test(
      formData.name
    );

    const dobValid = validateDOB();
    const genderValid = ["man", "woman", "other"].includes(formData.gender);

    setFormErrors((prev) => ({
      ...prev,
      name: nameValid ? "" : "Enter a name for your profile.",
      gender: genderValid ? "" : "Select your gender.",
    }));

    return nameValid && dobValid && genderValid;
  };

  const nextStep = () => {
    setValidatedSteps((prev) => [...new Set([...prev, currentStep])]); // ensure no duplicates
    if (currentStep === 0 && validateStep0()) {
      setCurrentStep(1);
    } else if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    setCurrentStep((pre) => {
      if (pre > 0) {
        return --pre;
      }
    });
  };

  const progressPercentage = (currentStep / steps) * 100;

  return (
    <form className="flex flex-col items-center justify-between min-h-[100vh]">
      <section className="w-[450px] pt-8 flex flex-col">
        <Link to="/" className="w-fit m-auto">
          <img src={images.spotify_logo} alt="" className="w-10 m-auto" />
        </Link>
        {/* progress bar */}
        <div
          style={{
            height: currentStep === 0 ? "0" : "2px",
            marginTop: currentStep === 0 ? "0" : "2rem",
            marginBottom: currentStep === 0 ? "0" : "1rem",
          }}
          className="relative bg-gray w-[95%] m-auto"
        >
          <div
            className="absolute left-0 h-[3px] bg-green transition-[width] duration-800"
            style={{
              width: `${progressPercentage}%`,
              height: currentStep === 0 ? "0" : "2px",
            }}
          ></div>
        </div>
        {/* Step Name and Count */}
        <div
          style={{
            display: currentStep === 0 ? "none" : "",
          }}
          className="flex gap-3 items-center mx-4 mb-8"
        >
          <div
            className="text-gray text-3xl hover:text-white cursor-pointer"
            onClick={prevStep}
          >
            {icons.backarrow_icon}
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-gray">
              Step <span>{currentStep}</span> of <span>{steps}</span>
            </p>
            <p className="!font-bold">{stepsName[currentStep]}</p>
          </div>
        </div>
        {/* zero */}
        <div
          style={{ display: currentStep === 0 ? "flex" : "none" }}
          className="flex flex-col w-[320px] m-auto"
        >
          <h1 className="text-[2.5rem] font-extrabold scale-[1.2] text-center pt-6">
            Sign up to <br /> start listening
          </h1>
          <label htmlFor="email" className="text-sm font-bold pt-12 pb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            // autoComplete="offemail"
            onChange={(e) => {
              const value = e.target.value;
              setFormData((p) => ({ ...p, email: value }));
            }}
            placeholder="name@domain.com"
            className={`border-[1px] px-2 py-3 rounded-[5px] text-white placeholder:text-gray outline-none 
              ${
                formErrors.email
                  ? "border-red-500"
                  : "border-gray hover:border-white focus:border-[2px] focus:border-white"
              }`}
          />
          {formErrors.email && (
            <div className="text-[#F37263] flex items-cener gap-1 mt-2">
              <span className="text-lg">{icons.info_icon}</span>
              <p className="text-sm !leading-[1.2]">{formErrors.email}</p>
            </div>
          )}
          <a
            onClick={nextStep}
            href="#"
            className="bg-green hover:bg-green-hover text-black rounded-full text-center mt-5 py-3 font-bold"
          >
            Next
          </a>
          <div className="relative my-12 bg-gray h-[1px] opacity-70">
            <span className="absolute left-1/2 top-1/2 -translate-1/2 bg-black p-3">
              or
            </span>
          </div>
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

          <div className="my-10 bg-gray h-px opacity-25"></div>

          <div className="flex items-center gap-1 justify-center mt-[-10px]">
            <span className="text-gray font-semibold">
              Already have an account?
            </span>
            <Link to="/login" className="underline">
              Log in here.
            </Link>
          </div>
        </div>
        {/* first */}
        <div
          style={{
            display: currentStep === 1 ? "flex" : "none",
          }}
          className="flex-col w-[320px] m-auto"
        >
          <div
            className={`flex flex-col transition-opacity duration-500 ${
              currentStep === 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <label htmlFor="password" className="text-sm font-bold pb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((p) => ({ ...p, password: value }));
                }}
                placeholder="Enter your password"
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

            <p className="text-sm !font-bold mt-5 pb-2">
              Your password must contain at least
            </p>
            <div className="flex items-center gap-2 mb-1 ">
              <div
                className={`w-[12px] h-[12px] flex-center ${
                  passUI.check1 ? "bg-green text-black" : "border"
                } text-[.5rem] rounded-full`}
              >
                {passUI.check1 && icons.tick_icon}
              </div>
              <p className="text-sm">1 letter</p>
            </div>
            <div className="flex items-center gap-2 mb-1 ">
              <div
                className={`w-[12px] h-[12px] flex-center ${
                  passUI.check2 ? "bg-green text-black" : "border"
                } text-[.5rem] rounded-full`}
              >
                {passUI.check2 && icons.tick_icon}
              </div>
              <p className="text-sm">
                1 number or special character (example: # ? ! &)
              </p>
            </div>
            <div className="flex items-center gap-2 ">
              <div
                className={`w-[12px] h-[12px] flex-center ${
                  passUI.check3 ? "bg-green text-black" : "border"
                } text-[.5rem] rounded-full`}
              >
                {passUI.check3 && icons.tick_icon}
              </div>
              <p className="text-sm">10 characters (no space) </p>
            </div>
          </div>

          <a
            onClick={nextStep}
            href="#"
            className="bg-green hover:bg-green-hover text-black rounded-full text-center mt-5 py-3 font-bold"
          >
            Next
          </a>
        </div>
        {/* two */}
        <div
          style={{ display: currentStep === 2 ? "flex" : "none" }}
          className="flex flex-col w-[320px] m-auto"
        >
          <label htmlFor="name" className="text-sm font-bold  pb-2">
            Name
            <p className="text-sm text-gray">
              This name will appear on your profile
            </p>
          </label>
          <input
            type="text"
            value={formData.name}
            autoComplete="offname"
            onChange={(e) => {
              setFormData((p) => ({ ...p, name: e.target.value }));
            }}
            placeholder="Enter your name"
            className={`border-[1px] px-2 py-3 rounded-[5px] text-white placeholder:text-gray outline-none
  ${
    formErrors.name
      ? "border-red-500"
      : "border-gray hover:border-white focus:border-[2px] focus:border-white"
  }`}
          />

          {formErrors.name && (
            <div className="text-[#F37263] flex items-cener gap-1 mt-2">
              <span className="text-lg">{icons.info_icon}</span>
              <p className="text-sm !leading-[1.2]">{formErrors.name}</p>
            </div>
          )}

          <label htmlFor="dob" className="text-sm font-bold pt-5 pb-2">
            Date of birth
            <p className="text-sm text-gray">
              Why do we need your date of birth?
              <a href="#" className="pl-1 underline">
                Learn more.
              </a>
            </p>
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={formData.dob.d}
              autoComplete="offday"
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  dob: { ...p.dob, d: e.target.value },
                }))
              }
              placeholder="dd"
              className={`w-[65px] px-2 py-3 rounded-[5px] text-white placeholder:text-gray outline-none font-semibold
      ${
        formErrors.dob?.d
          ? "border-red-500 border-[1px]"
          : "border-[1px] border-gray hover:border-white focus:border-[2px] focus:border-white"
      }`}
            />

            <div className="relative w-full">
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray text-3xl opacity-70">
                {icons.downarrow_icon}
              </span>
              <select
                name="month"
                id="month"
                value={formData.dob.m}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    dob: { ...p.dob, m: e.target.value },
                  }))
                }
                className={`w-full px-2 py-3 rounded-[5px] text-white placeholder:text-gray outline-none font-semibold bg-black
      ${
        formErrors.dob?.m
          ? "border-red-500 border-[1px]"
          : "border-[1px] border-gray hover:border-white focus:border-[2px] focus:border-white"
      }`}
              >
                <option value="0" disabled>
                  Month
                </option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            <input
              type="number"
              value={formData.dob.y}
              autoComplete="offyear"
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  dob: { ...p.dob, y: e.target.value },
                }))
              }
              placeholder="yyyy"
              className={`w-[90px] px-2 py-3 rounded-[5px] text-white placeholder:text-gray outline-none font-semibold
      ${
        formErrors.dob?.y
          ? "border-red-500 border-[1px]"
          : "border-[1px] border-gray hover:border-white focus:border-[2px] focus:border-white"
      }`}
            />
          </div>

          {/* Single error message below all inputs */}
          {formErrors.dob.message && (
            <div className="text-[#F37263] flex items-cener gap-1 mt-2">
              <span className="text-lg">{icons.info_icon}</span>
              <p className="text-sm !leading-[1.2]">{formErrors.dob.message}</p>
            </div>
          )}

          <label htmlFor="gender" className="text-sm font-bold pt-5 pb-2">
            Gender{" "}
            <p className="text-sm text-gray pr-10">
              We use your gender to help personalize our content recommendations
              and ads for you.
            </p>
          </label>

          <div className="flex gap-6 flex-wrap">
            <label htmlFor="man" className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                id="man"
                value="man"
                checked={formData.gender === "man"}
                onChange={(e) =>
                  setFormData((p) => {
                    return { ...p, gender: e.target.value };
                  })
                }
                name="gender"
                className="border-gray border-21 accent-green w-[15px] h-[15px] bg-white"
              />
              Man
            </label>
            <label htmlFor="woman" className="flex items-center gap-2 text-sm ">
              <input
                type="radio"
                value="woman"
                checked={formData.gender === "woman"}
                onChange={(e) =>
                  setFormData((p) => {
                    return { ...p, gender: e.target.value };
                  })
                }
                id="woman"
                name="gender"
              />
              Woman
            </label>

            <label
              htmlFor="other"
              className="flex items-center gap-2 text-sm w-full mt-[-12px]"
            >
              <input
                type="radio"
                value="other"
                checked={formData.gender === "other"}
                onChange={(e) =>
                  setFormData((p) => {
                    return { ...p, gender: e.target.value };
                  })
                }
                id="other"
                name="gender"
              />
              Prefer not to say
            </label>
          </div>
          {formErrors.gender && (
            <div className="text-[#F37263] flex items-cener gap-1 mt-2">
              <span className="text-lg">{icons.info_icon}</span>
              <p className="text-sm !leading-[1.2]">{formErrors.gender}</p>
            </div>
          )}

          <a
            onClick={nextStep}
            href="#"
            className="bg-green hover:bg-green-hover text-black rounded-full text-center mt-5 py-3 font-bold"
          >
            Next
          </a>
        </div>
        {/* three */}
        <div
          style={{ display: currentStep === 3 ? "flex" : "none" }}
          className="flex flex-col w-[320px] m-auto"
        >
          <div className="bg-box rounded-[5px] p-6 mb-2">
            <label htmlFor="marketing" className="flex">
              <div>
                <input
                  type="checkbox"
                  checked={formData.tos.marketing}
                  onChange={(e) =>
                    setFormData((p) => {
                      return {
                        ...p,
                        tos: { ...p.tos, marketing: e.target.checked },
                      };
                    })
                  }
                  name="marketing"
                  id="marketing"
                />
              </div>
              <div className="ml-3 text-sm">
                I would prefer not to receive marketing messages from Spotify
              </div>
            </label>
          </div>
          <div className="bg-box rounded-[5px] p-6 mb-4">
            <label htmlFor="data" className="flex">
              <div>
                <input
                  type="checkbox"
                  checked={formData.tos.shareData}
                  onChange={(e) =>
                    setFormData((p) => {
                      return {
                        ...p,
                        tos: { ...p.tos, shareData: e.target.checked },
                      };
                    })
                  }
                  name="data"
                  id="data"
                />
              </div>
              <div className="ml-3 text-sm">
                Share my registration data with Spotify's content providers for
                marketing purposes.
              </div>
            </label>
          </div>
          <p className="text-sm my-2 !leading-tight">
            By clicking on sign-up, you agree to Spotify's
            <a href="#" className="pl-1 underline text-green">
              Terms and Conditions of Use
            </a>
            .
          </p>
          <p className="text-sm mb-2 mt-1 !leading-tight">
            To learn more about how Spotify collects, uses, shares and protects
            your personal data, please see
            <a href="#" className="pl-1 underline text-green">
              Spotify's Privacy Policy{" "}
            </a>
            .
          </p>

          {responseMessage && (
            <p
              className={`${
                responseMessage.success ? "bg-green-700" : "bg-red-800"
              } p-3 text-lg mt-2`}
            >
              {responseMessage.message}
            </p>
          )}
          <a
            href="#"
            onClick={async () => {
              const result = await signUpUser(formData);
              setResponseMessage(result);
            }}
            className="bg-green hover:bg-green-hover text-black rounded-full text-center mt-5 py-3 font-bold"
          >
            Sign up
          </a>
        </div>
      </section>
      <section className="w-[400px] py-6 text-gray text-center text-[.8rem]">
        This site is protected by reCAPTCHA and the Google <br />
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

export default SignUp;

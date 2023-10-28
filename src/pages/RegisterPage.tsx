// react query
import { useMutation } from "@tanstack/react-query";

// axios
import axios from "axios";

// useForm
import { useForm } from "react-hook-form";

// toast
import toast from "react-hot-toast";

// react router dom
import { Link, useNavigate } from "react-router-dom";

// interface
import { FormValues } from "../interfaces";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const RegisterPage = () => {
  // ** navigate
  const navigate = useNavigate();

  // ** useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();
  const password = watch("password");
  const registerOptions = {
    name: {
      required: "Name is required",
      pattern: {
        value: /^(?=.*[A-Za-z])[A-Za-z0-9]+$/,
        message: "Please enter a valid name that includes at least one letter.",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        message: "Invalid input. Please enter a valid value.",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
    confirmPassword: {
      required: "Confirm password is required",
      validate: (value: string) =>
        value === password || "Passwords do not match",
    },
  };

  // ** useQuery
  const mutation = useMutation({
    mutationFn: (formData: FormValues) =>
      axios.post(
        "https://morent-4li1.onrender.com/api/auth/local/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    onSuccess(data) {
      toast.success(`Wellcome to morent ${data.data.user.username}`);
      navigate("/", { replace: true });
    },
    onError(error: Error) {
      toast.error(error.message);
    },
  });

  // ** submit
  const handleRegistration = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex my-32 justify-center min-h-screen px-2">
      <form
        onSubmit={handleSubmit(handleRegistration)}
        className="bg-white rounded-md h-fit p-4 w-4/5 mx-auto md:w-1/2 md:py-6 md:px-8 shadow-sm"
      >
        <h1 className="text-secondinary-500 text-xl font-bold mb-8">Sign Up</h1>
        <div className="my-5 flex flex-col">
          <label
            htmlFor="username"
            className="font-semibold text-secondinary-500"
          >
            Name
          </label>
          <input
            {...register("username", registerOptions.name)}
            name="username"
            type="text"
            id="username"
            placeholder="Your name"
            className="rounded-lg border-none focus:ring-0 bg-[#F6F7F9] font-medium py-3"
          />
          <span className="text-red-500 text-sm font-bold w-fit px-1 py-[0.1rem] mt-1 rounded-lg">
            {errors?.username && errors.username?.message}
          </span>
        </div>
        <div className="my-5 flex flex-col">
          <label className="font-semibold text-secondinary-500" htmlFor="email">
            Email
          </label>
          <input
            {...register("email", registerOptions.email)}
            name="email"
            className="rounded-lg border-none focus:ring-0 bg-[#F6F7F9] font-medium py-3"
            type="email"
            id="email"
            placeholder="Your email"
          />
          <span className="text-red-500 text-sm font-bold w-fit px-1 py-[0.1rem] mt-1 rounded-lg">
            {errors?.email && errors?.email?.message}
          </span>
        </div>
        <div className="my-5 flex flex-col">
          <label
            className="font-semibold text-secondinary-500"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", registerOptions.password)}
            name="password"
            className="rounded-lg border-none focus:ring-0 bg-[#F6F7F9] font-medium py-3"
            type="password"
            id="password"
            placeholder="Your password"
          />
          <span className="text-red-500 text-sm font-bold w-fit px-1 py-[0.1rem] mt-1 rounded-lg">
            {errors?.password && errors?.password?.message}
          </span>
        </div>
        <div className="my-5 flex flex-col">
          <label
            className="font-semibold text-secondinary-500"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            {...register("confirmPassword", registerOptions.confirmPassword)}
            name="confirmPassword"
            className="rounded-lg border-none focus:ring-0 bg-[#F6F7F9] font-medium py-3"
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
          />
          <span className="text-red-500 text-sm font-bold w-fit px-1 py-[0.1rem] mt-1 rounded-lg">
            {errors?.confirmPassword && errors?.confirmPassword?.message}
          </span>
        </div>
        <div className="w-full mt-10 flex items-start justify-center flex-col">
          <button
            type="submit"
            className="bg-primary-500 text-base text-white px-4 py-3 rounded-[4px] w-full font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={mutation.isLoading}
          >
      
            {mutation.isLoading ? <LoadingSpinner /> : 'Submit'}
          </button>
          <Link
            className="text-sm font-medium text-secondinary-300 mt-2"
            to="/"
          >
            already have account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

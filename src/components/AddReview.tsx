import { Navigate } from "react-router-dom";
import { Fragment, useState } from "react";

// modal
import { Dialog, Transition } from "@headlessui/react";

// context
import { useAuth } from "../context/AuthContextProvider";

// svg
import Close from "../assets/svg/close.svg";

// post data
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// toast
import toast from "react-hot-toast";

type AddReviewProps = {
  id: string | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type InputsType = {
  username: string;
  position?: string;
  review: string;
};

type MutateType = {
  name: string;
  position?: string;
  message: string;
  car: number;
};

const AddReview = ({ isOpen, setIsOpen, id }: AddReviewProps) => {
  // ** state
  const [inputs, setInputs] = useState<InputsType>({
    username: "",
    position: "",
    review: "",
  });

  const { userData } = useAuth();

  // ** useQuery
  const mutation = useMutation({
    mutationFn: (d: MutateType) =>
      axios.post(
        "http://localhost:1337/api/reviews",
        {
          data: {
            name: d.name,
            position: d.position,
            message: d.message,
            car: +d.car,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      ),
    onSuccess() {
      toast.success(`Your review has been successfully added`, {
        duration: 10000,
      });
    },
    onError(error: any) {
      console.log(error);
    },
  });

  // ** handler
  const inputsHandler = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [e.currentTarget.name]: e.currentTarget.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputs.username && inputs.review && id) {
      mutation.mutate({
        name: inputs.username,
        position: inputs.position,
        message: inputs.review,
        car: +id,
      });
      setIsOpen(false);
    }
  };

  if (!userData.user && isOpen) {
    return <Navigate to={`/login?redirect=detailCar/${id}`} />;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen((prevState) => !prevState)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="flex items-center justify-between text-lg font-medium leading-6 text-gray-900"
                >
                  <h2 className="font-semibold">Add Review</h2>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 p-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen((prevState) => !prevState)}
                  >
                    <img src={Close} className="w-6 h-6" alt="" />
                  </button>
                </Dialog.Title>
                <form onSubmit={submitHandler}>
                  <div className="flex flex-col mt-4">
                    <label className="font-semibold" htmlFor="username">
                      Name
                    </label>
                    <input
                      onChange={inputsHandler}
                      placeholder="Your name"
                      className="font-medium rounded-lg focus:ring-0 border-2"
                      id="username"
                      type="text"
                      name="username"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="font-semibold" htmlFor="position">
                      Position
                    </label>
                    <input
                      onChange={inputsHandler}
                      placeholder="Your position"
                      className="font-medium rounded-lg focus:ring-0 border-2"
                      id="position"
                      type="text"
                      name="position"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="font-semibold" htmlFor="review">
                      Review
                    </label>
                    <textarea
                      onChange={inputsHandler}
                      placeholder="Your review"
                      className="font-medium rounded-lg focus:ring-0 border-2"
                      name="review"
                      id="review"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 bg-secondinary-200 py-2 rounded-lg font-semibold hover:text-white hover:bg-primary-500 w-full duration-200"
                  >
                    Send
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddReview;

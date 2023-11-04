import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import RentSummary from "../components/payment/RentSummary";
import BillingInfo from "../components/payment/BillingInfo";
import RentalInfo from "../components/payment/RentalInfo";
import PaymentMethod from "../components/payment/PaymentMethod";
import Confirmation from "../components/payment/Confirmation";

// context
import { useRentCar } from "../context/RentCarContextProvider";

// interfaces
import { InputsValueInterface, PickUpDropOffInterface } from "../interfaces";

// helpers
import { isFilled } from "../helper/functions";

// toast
import toast from "react-hot-toast";

const PaymentPage = () => {
  const { state, dispatch } = useRentCar();

  const navigate = useNavigate();

  // ** state
  const [pickUpDetails, setPickUpDetails] = useState<PickUpDropOffInterface>({
    location: "",
    date: "",
    time: "",
  });
  const [dropOffDetails, setDropOffDetails] = useState<PickUpDropOffInterface>({
    location: "",
    date: "",
    time: "",
  });

  const [inputsValue, setInputsValue] = useState<InputsValueInterface>({
    name: "",
    address: "",
    phone: "",
    town: "",
    card: "",
    holder: "",
    date: "",
    cvc: "",
    pay: "",
    check1: false,
  });

  // ** handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setInputsValue((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = () => {
    const inputsValueFilled = isFilled(inputsValue);
    const pickUpFilled = isFilled(pickUpDetails);
    const dropOffFilled = isFilled(dropOffDetails);

    if (!inputsValueFilled && !pickUpFilled && !dropOffFilled) {
      toast.error("Please fill all fields.");
    } else if (
      inputsValueFilled &&
      pickUpFilled &&
      dropOffFilled &&
      state.cart
    ) {
      dispatch({
        type: "CHECKOUT",
        payload: state.cart,
        dropOffDetails,
        pickUpDetails,
      });
      toast.success(
        "Your purchase has been successfully completed, please visit your dashboard to view",
        {
          duration: 6000,
        }
      );
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <>
      {state.cart ? (
        <div className="px-6 md:px-10 flex flex-col lg:flex-row-reverse lg:gap-x-2">
          <div className="flex-shrink lg:w-2/5 lg:px-6">
            <RentSummary
              startDate={pickUpDetails.date}
              endDate={dropOffDetails.date}
            />
          </div>
          <div className="flex-shrink-0 lg:w-3/5 lg:px-6">
            <BillingInfo
              inputsValue={inputsValue}
              handleInputChange={handleInputChange}
            />
            <RentalInfo
              pickUpDetails={pickUpDetails}
              setPickUpDetails={setPickUpDetails}
              dropOffDetails={dropOffDetails}
              setDropOffDetails={setDropOffDetails}
            />
            <PaymentMethod
              inputsValue={inputsValue}
              handleInputChange={handleInputChange}
            />
            <Confirmation
              inputsValue={inputsValue}
              handleInputChange={handleInputChange}
              submitHandler={submitHandler}
            />
          </div>
        </div>
      ) : (
        <div className=" bg-white flex items-center my-32 w-fit py-10 px-5 rounded-lg mx-auto flex-col">
          <h1 className="mb-2 text-2xl text-secondinary-500">
            No car available in your cart.
          </h1>
          <Link className="text-secondinary-300 font-semibold" to="/">
            Back To Home
          </Link>
        </div>
      )}
    </>
  );
};

export default PaymentPage;

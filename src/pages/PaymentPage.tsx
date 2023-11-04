import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// context
import { useRentCar } from "../context/RentCarContextProvider";

// react widgets
import Combobox from "react-widgets/Combobox";
import DatePicker from "react-widgets/DatePicker";
import TimeInput from "react-widgets/TimeInput";

// svg
import Star from "../assets/svg/star-icon.svg";
import EmptyStar from "../assets/svg/empty-star.svg";

// img
import MC from "../assets/images/mc.png";
import Visa from "../assets/images/visa.png";
import Bitcoin from "../assets/images/Bitcoin.png";
import Paypal from "../assets/images/PayPal.png";
import Walet from "../assets/images/walet.png";

// constant
import { citiesInIran } from "../constant";
import { PickUpDropOffInterface } from "../interfaces";
import {
  formatDate,
  formatTime,
  isFilled,
  numberOfDays,
} from "../helper/functions";
import toast from "react-hot-toast";

interface InputsValueInterface {
  name: string;
  address: string;
  phone: string;
  town: string;
  card: string;
  holder: string;
  date: string;
  cvc: string;
  pay: string;
  check1: boolean;
}

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
            <Comfirmation
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

function RentSummary({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const { state } = useRentCar();

  let totalPrice = (
    +numberOfDays(startDate, endDate) * state.cart?.attributes.price!
  ).toFixed(2);

  return (
    <div className="bg-white rounded-md p-4 my-8">
      <h1 className="text-secondinary-500 font-bold sm:text-xl">
        Rental Summary
      </h1>
      <p className="text-secondinary-300 text-xs font-medium sm:text-sm">
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </p>
      <Link
        to={`/detailCar/${state.cart?.id}`}
        className="flex items-center justify-start mt-12 mb-3 border-b pb-12"
      >
        <div className="w-1/2 bg-car-bg bg-cover bg-no-repeat rounded-xl py-3 sm:w-2/5">
          <img
            className="w-full h-auto"
            src={state.cart?.attributes.image.data.attributes.formats.small.url}
            alt={state.cart?.attributes.name}
          />
        </div>
        <div className="ml-3">
          <h1 className="text-secondinary-500 text-xl mb-3 font-bold sm:text-2xl">
            {state.cart?.attributes.name}
          </h1>
          <div className="xl:flex xl:items-center xl:justify-center xl:gap-x-3">
            <div className="flex items-center">
              <img className="w-3 h-3 sm:w-4 sm:h-4" src={Star} alt="star" />
              <img className="w-3 h-3 sm:w-4 sm:h-4" src={Star} alt="star" />
              <img className="w-3 h-3 sm:w-4 sm:h-4" src={Star} alt="star" />
              <img className="w-3 h-3 sm:w-4 sm:h-4" src={Star} alt="star" />
              <img
                className="w-3 h-3 sm:w-4 sm:h-4"
                src={EmptyStar}
                alt="star"
              />
            </div>
            <h3 className="text-[#3D5278] text-xs font-semibold mt-1 sm:mt-0 sm:text-sm">
              440+ Reviewer
            </h3>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-secondinary-300 text-xs font-semibold sm:text-base">
          Subtotal
        </h2>
        <h2 className="text-secondinary-500 text-base font-semibold ">
          ${state.cart?.attributes.price.toFixed(2)}
        </h2>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-secondinary-300 text-xs font-semibold sm:text-base">
          Tax
        </h2>
        <h2 className="text-secondinary-500 text-base font-semibold ">$0</h2>
      </div>
      <form className="flex items-center justify-between px-2 mb-6 bg-[#F6F7F9] rounded-lg sm:py-2">
        <input
          required={true}
          type="text"
          placeholder="Apply promo code"
          className="bg-transparent focus:ring-0 border-none text-secondinary-300 text-xs py-2 sm:text-sm"
        />
        <button className="text-secondinary-500 text-right text-xs font-semibold sm:text-sm sm:px-4">
          Apply now
        </button>
      </form>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-secondinary-500 text-base font-bold mb-1 sm:text-xl">
            Total Rental Price
          </h1>
          <h3 className="text-xs font-medium text-secondinary-300 sm:text-sm">
            Overall price rental
          </h3>
        </div>
        <h1 className="text-secondinary-500 text-xl font-bold sm:text-2xl">
          {/* calculate total price */}$
          {startDate && endDate && state.cart?.attributes.price
            ? totalPrice
            : state.cart?.attributes.price.toFixed(2)}
        </h1>{" "}
      </div>
    </div>
  );
}

interface PaymentCompoProps {
  inputsValue: InputsValueInterface;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function BillingInfo({ inputsValue, handleInputChange }: PaymentCompoProps) {
  return (
    <div className="my-8 rounded-md bg-white p-4">
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-secondinary-500 font-bold mb-1 sm:text-xl">
            Billing Info
          </h1>
          <p className="text-xs text-secondinary-300 font-medium sm:text-sm">
            Please enter your billing info
          </p>
        </div>
        <h2 className="text-secondinary-300 text-xs font-medium sm:text-sm">
          Step 1 of 4
        </h2>
      </div>

      <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-secondinary-500 mb-1 text-sm font-semibold sm:text-base"
          >
            Name
          </label>
          <input
            onChange={handleInputChange}
            value={inputsValue.name}
            name="name"
            required={true}
            type="text"
            id="name"
            placeholder="Your name"
            className="focus:ring-0 border-none bg-[#F6F7F9] rounded-lg px-6 py-3 text-sm font-medium"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-secondinary-500 mb-1 text-sm font-semibold sm:text-base"
            htmlFor="address"
          >
            Address
          </label>
          <input
            onChange={handleInputChange}
            value={inputsValue.address}
            name="address"
            required={true}
            className="focus:ring-0 border-none bg-[#F6F7F9] rounded-lg px-6 py-3 text-sm font-medium"
            type="text"
            id="address"
            placeholder="Your address"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-secondinary-500 mb-1 text-sm font-semibold sm:text-base"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            onChange={handleInputChange}
            value={inputsValue.phone}
            name="phone"
            required={true}
            className="focus:ring-0 border-none bg-[#F6F7F9] rounded-lg px-6 py-3 text-sm font-medium"
            type="text"
            id="phone"
            placeholder="Your phone"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-secondinary-500 mb-1 text-sm font-semibold sm:text-base"
            htmlFor="town"
          >
            Town/City
          </label>
          <input
            onChange={handleInputChange}
            value={inputsValue.town}
            name="town"
            required={true}
            className="focus:ring-0 border-none bg-[#F6F7F9] rounded-lg px-6 py-3 text-sm font-medium"
            type="text"
            id="town"
            placeholder="Town or city"
          />
        </div>
      </form>
    </div>
  );
}

interface RentalInfoProps {
  pickUpDetails: PickUpDropOffInterface;
  setPickUpDetails: React.Dispatch<
    React.SetStateAction<PickUpDropOffInterface>
  >;
  dropOffDetails: PickUpDropOffInterface;
  setDropOffDetails: React.Dispatch<
    React.SetStateAction<PickUpDropOffInterface>
  >;
}

function RentalInfo({
  pickUpDetails,
  setPickUpDetails,
  dropOffDetails,
  setDropOffDetails,
}: RentalInfoProps) {
  return (
    <div className="my-8 rounded-md bg-white p-4">
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-secondinary-500 font-bold mb-1 sm:text-xl">
            Rental Info
          </h1>
          <p className="text-xs text-secondinary-300 font-medium sm:text-sm">
            Please select your rental date
          </p>
        </div>
        <h2 className="text-secondinary-300 text-xs font-medium sm:text-sm">
          Step 2 of 4
        </h2>
      </div>

      <div className="mb-8">
        <h1 className="text-secondinary-500 font-semibold mt-6 mb-4">
          Pick-Up
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
          <div className="">
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Locations
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <Combobox
                onChange={(value) =>
                  setPickUpDetails({ ...pickUpDetails, location: value })
                }
                name="location"
                data={citiesInIran}
                placeholder="Select your city"
              />
            </div>
          </div>
          <div>
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Date
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <DatePicker
                onChange={(value) =>
                  setPickUpDetails({
                    ...pickUpDetails,
                    date: formatDate(value),
                  })
                }
                name="date"
                min={new Date()}
              />
            </div>
          </div>
          <div>
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Time
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <TimeInput
                onChange={(value) =>
                  setPickUpDetails({
                    ...pickUpDetails,
                    time: formatTime(value),
                  })
                }
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-secondinary-500 font-semibold mt-6 mb-4">
          Drop-Off
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
          <div>
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Locations
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <Combobox
                onChange={(value) =>
                  setDropOffDetails({ ...dropOffDetails, location: value })
                }
                data={citiesInIran}
                placeholder="Select your city"
              />
            </div>
          </div>
          <div>
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Date
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <DatePicker
                onChange={(value) =>
                  setDropOffDetails({
                    ...dropOffDetails,
                    date: formatDate(value),
                  })
                }
                min={new Date(pickUpDetails.date)}
              />
            </div>
          </div>
          <div>
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Time
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <TimeInput
                onChange={(value) =>
                  setDropOffDetails({
                    ...dropOffDetails,
                    time: formatTime(value),
                  })
                }
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentMethod({ inputsValue, handleInputChange }: PaymentCompoProps) {
  return (
    <div className="my-8 rounded-md bg-white p-4">
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-secondinary-500 font-bold mb-1 sm:text-xl">
            Payment Method
          </h1>
          <p className="text-xs text-secondinary-300 font-medium sm:text-sm">
            Please enter your payment method
          </p>
        </div>
        <h2 className="text-secondinary-300 text-xs font-medium sm:text-sm">
          Step 3 of 4
        </h2>
      </div>

      <div className="bg-[#F6F7F9] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-secondinary-500 font-semibold">Credit Card</h1>
          <div className="flex items-center gap-x-2">
            <img src={MC} alt="mc" />
            <img src={Visa} alt="visa" />
          </div>
        </div>

        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 mt-5">
          <div className="flex flex-col">
            <label
              htmlFor="card"
              className="text-secondinary-500 mb-1 text-sm font-semibold sm:text-base"
            >
              Card Nubmber
            </label>
            <input
              onChange={handleInputChange}
              value={inputsValue.card}
              name="card"
              required={true}
              type="text"
              id="card"
              placeholder="Card number"
              className="focus:ring-0 border-none bg-white rounded-lg px-6 py-3 text-sm font-medium"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-secondinary-500 mb-1 text-sm font-semibold sm:text-base"
              htmlFor="holder"
            >
              Card Holder
            </label>
            <input
              onChange={handleInputChange}
              value={inputsValue.holder}
              name="holder"
              required={true}
              className="focus:ring-0 border-none bg-white rounded-lg px-6 py-3 text-sm font-medium"
              type="text"
              id="holder"
              placeholder="Card holder"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-secondinary-500 mb-1 text-sm font-semibold sm:text-base"
              htmlFor="date"
            >
              Expration Date
            </label>
            <input
              onChange={handleInputChange}
              value={inputsValue.date}
              name="date"
              required={true}
              className="focus:ring-0 border-none bg-white rounded-lg px-6 py-3 text-sm font-medium"
              type="text"
              id="date"
              placeholder="Expration date"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-secondinary-500 mb-1 text-sm font-semibold sm:text-base"
              htmlFor="CVC"
            >
              CVC
            </label>
            <input
              onChange={handleInputChange}
              value={inputsValue.cvc}
              name="cvc"
              required={true}
              className="focus:ring-0 border-none bg-white rounded-lg px-6 py-3 text-sm font-medium"
              type="text"
              id="CVC"
              placeholder="CVC"
            />
          </div>
        </form>
      </div>

      <div className="bg-[#F6F7F9] p-4 rounded-lg flex items-center justify-between mt-5">
        <div className="flex flex-row items-center gap-x-4">
          <input
            onChange={handleInputChange}
            value="paypal"
            name="pay"
            required={true}
            id="paypal"
            type="radio"
            checked={inputsValue.pay === "paypal"}
          />

          <label
            className="text-secondinary-500 text-sm font-semibold"
            htmlFor="paypal"
          >
            Paypal
          </label>
        </div>
        <img src={Paypal} alt="paypal" />
      </div>

      <div className="bg-[#F6F7F9] p-4 rounded-lg flex items-center justify-between mt-5">
        <div className="flex flex-row items-center gap-x-4">
          <input
            onChange={handleInputChange}
            value="bitcoin"
            name="pay"
            required={true}
            id="bit"
            type="radio"
            checked={inputsValue.pay === "bitcoin"}
          />

          <label
            className="text-secondinary-500 text-sm font-semibold"
            htmlFor="bit"
          >
            Bitcoin
          </label>
        </div>
        <img src={Bitcoin} alt="bitcoin" />
      </div>
    </div>
  );
}

function Comfirmation({
  inputsValue,
  handleInputChange,
  submitHandler,
}: {
  inputsValue: InputsValueInterface;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: () => void;
}) {
  return (
    <div className="my-8 rounded-md bg-white p-4">
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-secondinary-500 font-bold mb-1 sm:text-xl">
            Confirmation
          </h1>
          <p className="text-xs text-secondinary-300 font-medium sm:text-sm">
            Just few clicks and your rental is ready!{" "}
          </p>
        </div>
        <h2 className="text-secondinary-300 text-xs font-medium sm:text-sm">
          Step 4 of 4
        </h2>
      </div>

      <div className="bg-[#F6F7F9] p-4 rounded-lg flex items-center justify-between mt-5">
        <div className="flex flex-row items-center gap-x-4">
          <input
            name="check1"
            required={true}
            id="con1"
            type="checkbox"
            className="rounded-sm"
          />
          <label
            className="text-[#1F2544] text-sm font-semibold"
            htmlFor="con1"
          >
            I agree with sending an Marketing and newsletter emails. No spam,
            promissed!
          </label>
        </div>
      </div>

      <div className="bg-[#F6F7F9] p-4 rounded-lg flex items-center justify-between mt-5">
        <div className="flex flex-row items-center gap-x-4">
          <input
            required={true}
            name="check1"
            value="bitcoin"
            id="con2"
            type="checkbox"
            className="rounded-sm"
            checked={inputsValue.check1}
            onChange={handleInputChange}
          />
          <label
            className="text-[#1F2544] text-sm font-semibold"
            htmlFor="con2"
          >
            I agree with our terms and conditions and privacy policy!
          </label>
        </div>
      </div>

      <button
        onClick={submitHandler}
        className="bg-primary-500 text-white rounded py-2 px-4 my-8"
      >
        Rental Now
      </button>

      <img src={Walet} alt="walet" />

      <div className="mt-4">
        <h1 className="text-secondinary-500 font-bold mb-1 sm:text-xl">
          All your data are safe
        </h1>
        <p className="text-xs text-secondinary-300 font-medium sm:text-sm">
          We are using the most advanced security to provide you the best
          experience ever.
        </p>
      </div>
    </div>
  );
}

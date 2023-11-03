import { Link, useNavigate } from "react-router-dom";

// context
import { useRentCar } from "../../context/RentCarContextProvider";
import { useAuth } from "../../context/AuthContextProvider";

// interface
import { CarInterface } from "../../interfaces";

// svg
import GasStation from "../../assets/svg/gas-station.svg";
import Gear from "../../assets/svg/gear.svg";
import Capacity from "../../assets/svg/capacity.svg";

// toast
import toast from "react-hot-toast";

const Car = ({ car }: { car: CarInterface }) => {
  const { attributes } = car;
  const { dispatch } = useRentCar();
  const {userData} = useAuth()
  const navigate = useNavigate()

  const rentalHandler = () => {
    dispatch({ type: "ADD_TO_CART", payload: car });
    toast(
      "Please login to your account.",
      {
        duration: 6000,
      }
    );
    navigate(`${userData.user ? '/payment' : '/login?redirect=payment'}`)
  };

  return (
    <div className="bg-white rounded-lg px-3 py-4 mt-5 w-full">
      <div className="mb-4">
        <h2 className="text-secondinary-500 font-semibold text-base">
          {attributes.name}
        </h2>
        <h3 className="text-secondinary-300 text-sm">{attributes.type}</h3>
      </div>

      <Link
        to={`/detailCar/${car.id}`}
        className="flex items-center justify-between sm:flex-col sm:mt-10"
      >
        <div className="w-2/3 sm:w-full mr-2 h-32 flex items-center justify-center">
          <img
            src={attributes.image.data.attributes.formats.small.url}
            alt="car"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="sm:flex sm:mt-12 sm:w-full justify-between md:items-center">
          <div className="flex items-center mb-4">
            <img className="mr-1 w-4 h-4" src={GasStation} alt="gas station" />
            <span className="text-secondinary-300 font-medium text-xs">
              {attributes.gasoline}L
            </span>
          </div>
          <div className="flex items-center mb-4">
            <img className="mr-1 w-4 h-4" src={Gear} alt="gear" />
            <span className="text-secondinary-300 font-medium text-xs">
              {attributes.steering}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <img className="mr-1 w-4 h-4" src={Capacity} alt="capacity" />
            <span className="text-secondinary-300 font-medium text-xs">
              {attributes.capacity} People
            </span>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between mt-5 sm:mt-3">
        <h3 className="text-secondinary-500 text-base font-semibold">
          ${attributes.price.toFixed(2)}/
          <span className="text-xs text-secondinary-300">day</span>
        </h3>
        <button
          onClick={rentalHandler}
          className="bg-primary-500 text-sm text-white px-4 py-2 rounded-[4px]"
        >
          Rental Now
        </button>
      </div>
    </div>
  );
};

export default Car;

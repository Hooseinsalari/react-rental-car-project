// interface
import { CarInterface } from "../../interfaces";

// svg
import GasStation from "../../assets/svg/gas-station.svg";
import Gear from "../../assets/svg/gear.svg";
import Capacity from "../../assets/svg/capacity.svg";

const Car = ({ car }: { car: CarInterface }) => {
  return (
    <div className="bg-white rounded-lg px-3 py-4 mt-5 w-full md:w-[17rem]">
      <div className="mb-4">
        <h2 className="text-secondinary-500 font-semibold text-base">
          {car.name}
        </h2>
        <h3 className="text-secondinary-300 text-sm">{car.typeCar}</h3>
      </div>

      <div className="flex items-center justify-between sm:flex-col sm:mt-10">
        <img src={car.image} alt="car" className="w-[10rem] mr-2 xs:w-7/12 md:w-[75%] md:h-[6rem] h-auto" />

        <div className="sm:flex sm:mt-12 sm:gap-x-5 md:w-full md:justify-between md:items-center">
          <div className="flex items-center mb-4">
            <img className="mr-2 w-4 h-4" src={GasStation} alt="gas station" />
            <span className="text-secondinary-300 font-medium text-xs xs:text-sm">
              {car.gasoline}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <img className="mr-2 w-4 h-4" src={Gear} alt="gear" />
            <span className="text-secondinary-300 font-medium text-xs xs:text-sm">
              {car.steering}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <img className="mr-2 w-4 h-4" src={Capacity} alt="capacity" />
            <span className="text-secondinary-300 font-medium text-xs xs:text-sm">
              {car.capacity} People
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 sm:mt-3">
        <h3 className="text-secondinary-500 text-base font-semibold">
          ${car.price.toFixed(2)}/
          <span className="text-xs text-secondinary-300">day</span>
        </h3>
        <button className="bg-primary-500 text-sm text-white px-4 py-2 rounded-[4px]">
          Rental Now
        </button>
      </div>
    </div>
  );
};

export default Car;

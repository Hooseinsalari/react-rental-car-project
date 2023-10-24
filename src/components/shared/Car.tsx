// interface
import { CarInterface } from "../../interfaces";

// svg
import GasStation from "../../assets/svg/gas-station.svg";
import Gear from "../../assets/svg/gear.svg";
import Capacity from "../../assets/svg/capacity.svg";

const Car = ({ car }: { car: CarInterface }) => {
  const { attributes } = car;

  return (
    <div className="bg-white rounded-lg px-3 py-4 mt-5 w-full">
      <div className="mb-4">
        <h2 className="text-secondinary-500 font-semibold text-base">
          {attributes.name}
        </h2>
        <h3 className="text-secondinary-300 text-sm">{attributes.type}</h3>
      </div>

      <div className="flex items-center justify-between sm:flex-col sm:mt-10">
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
      </div>

      <div className="flex items-center justify-between mt-5 sm:mt-3">
        <h3 className="text-secondinary-500 text-base font-semibold">
          ${attributes.price.toFixed(2)}/
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

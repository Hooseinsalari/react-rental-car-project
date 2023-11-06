import { Link } from "react-router-dom";

// bg
import AdsBg1 from "../assets/images/adsBg1.png";
import AdsBg2 from "../assets/images/adsBg2.png";

const AdsSection = () => {
  return (
    <div className="w-full flex items-center md:h-[22.5rem] h-[14.5rem] gap-10">
      <div
        style={{ backgroundImage: `url(${AdsBg1})` }}
        className="w-full h-full bg-no-repeat bg-cover rounded-lg bg-bottom md:bg-center p-3 md:p-6 text-white"
      >
        <h1 className="font-semibold mb-2 md:text-2xl md:mb-4">
          The Best Platform for Car Rental
        </h1>
        <p className="text-xs mb-6 md:text-base md:mb-14">
          Ease of doing a car rental safely and <br /> reliably. Of course at a
          low price.
        </p>
        <Link
          to="/vehicles"
          className="bg-primary-500 px-4 py-2 rounded-md text-sm md:text-base md:px-6 md:py-4"
        >
          Rental Car
        </Link>
      </div>
      <div
        style={{ backgroundImage: `url(${AdsBg2})` }}
        className="hidden md:block w-full h-full bg-no-repeat bg-cover rounded-lg bg-right-bottom md:bg-center  p-3 md:p-6 text-white"
      >
        <h1 className="font-semibold mb-2 md:text-2xl md:mb-4">
          Easy way to rent a car at a low price
        </h1>
        <p className="text-xs mb-6 md:text-base md:mb-14">
          Providing cheap car rental services <br /> and safe and comfortable
          facilities.
        </p>
        <Link
          to="/vehicles"
          className="bg-information-500 px-4 py-2 rounded-md text-sm md:text-base md:px-6 md:py-4"
        >
          Rental Car
        </Link>
      </div>
    </div>
  );
};

export default AdsSection;

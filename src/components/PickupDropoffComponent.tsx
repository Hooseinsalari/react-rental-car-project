// svg
import Swap from "../../public/swap.svg";
import Arrow from "../../public/arrow-down.svg";

const PickupDropoffComponent = () => {
  return (
    <div className="mt-6 flex flex-col md:flex-row md:justify-between">
      <div className="bg-white p-4 rounded-lg md:flex-grow">
        <div className="flex items-center">
          <Mark isPick={true} />
          <h2 className="text-secondinary-500 font-semibold ml-2 lg:text-lg">
            Pick-Up
          </h2>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="cursor-pointer">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Location
            </h3>
            <h4 className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm">
              Tehran <img src={Arrow} alt="arrow" className="ml-2 lg:w-4" />
            </h4>
          </div>
          <Br />
          <div className="cursor-pointer">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Date
            </h3>
            <h4 className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm">
              20 july 2023{" "}
              <img src={Arrow} alt="arrow" className="ml-2 lg:w-4" />
            </h4>
          </div>
          <Br />
          <div className="cursor-pointer">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Time
            </h3>
            <h4 className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm">
              07:00 <img src={Arrow} alt="arrow" className="ml-2 lg:w-4" />
            </h4>
          </div>
        </div>
      </div>
      <div className="w-14 h-14 my-4 md:my-auto mx-auto md:mx-4 rounded-lg bg-primary-500 flex items-center justify-center hover:shadow-md duration-200">
        <img src={Swap} alt="swap" />
      </div>
      <div className="bg-white p-4 rounded-lg md:flex-grow ">
        <div className="flex items-center">
          <Mark isPick={false} />
          <h2 className="text-secondinary-500 font-semibold ml-2 lg:text-lg">
            Drop-Off
          </h2>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="cursor-pointer">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Location
            </h3>
            <h4 className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm">
              Tehran <img src={Arrow} alt="arrow" className="ml-2 lg:w-4" />
            </h4>
          </div>
          <Br />
          <div className="cursor-pointer">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Date
            </h3>
            <h4 className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm">
              20 july 2023{" "}
              <img src={Arrow} alt="arrow" className="ml-2 lg:w-4" />
            </h4>
          </div>
          <Br />
          <div className="cursor-pointer">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Time
            </h3>
            <h4 className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm">
              07:00 <img src={Arrow} alt="arrow" className="ml-2 lg:w-4" />
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupDropoffComponent;

interface MarkProps {
  isPick: boolean;
}

function Mark({ isPick }: MarkProps) {
  return (
    <div className="w-4 h-4 rounded-full bg-primary-200 flex items-center justify-center">
      <div
        className={`w-2 h-2 rounded-full ${
          isPick ? "bg-primary-600" : "bg-information-500"
        }`}
      ></div>
    </div>
  );
}

function Br() {
  return <div className="w-[1px] h-10 bg-gray-300 rounded-xl"></div>;
}

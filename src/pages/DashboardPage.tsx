import { useState } from "react";
import { NavLink } from "react-router-dom";

// context
import { useRentCar } from "../context/RentCarContextProvider";

// component
import Chart from "../components/Chart";

// assets
import Maps from "../assets/images/Maps.png";
import Menu from "../assets/svg/menu.svg";
import Logout from "../assets/svg/logout2.svg";

// constant
import { mainMenuItems, preferencesItems } from "../constant";

const DashboardPage = () => {
  return (
    <div className="px-6 py-8 relative lg:static lg:flex lg:flex-row-reverse lg:justify-between lg:p-0 lg:gap-4">
      <DashboardContent />

      <Sidebar />
    </div>
  );
};

export default DashboardPage;

function DashboardContent() {
  const { state } = useRentCar();

  let lastCar = state.rentedCars.length - 1;

  return (
    <div className="lg:flex lg:justify-start lg:gap-x-8 lg:p-8 lg:w-full">
      {state.rentedCars[lastCar] ? (
        <div className="bg-white rounded-lg p-4 lg:w-1/2">
          <h1 className="text-secondinary-500 font-bold">Detail Rental</h1>

          <div className="my-6 w-full mx-auto">
            <img src={Maps} alt="map" className="mx-auto" />
          </div>

          <div className="flex items-center">
            <div className="bg-car-bg bg-cover w-1/2 bg-no-repeat rounded-lg lg:w-[40%] sm:w-[30%]">
              <img
                src={
                  state.rentedCars[lastCar].attributes.image.data.attributes
                    .formats.small.url
                }
                alt=""
              />
            </div>
            <div className="ml-2">
              <h1 className="text-secondinary-500 text-lg font-bold">
                {state.rentedCars[lastCar].attributes.name}
              </h1>
              <h1 className="text-[#3D5278] text-sm font-medium">
                {state.rentedCars[lastCar].attributes.type}
              </h1>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="text-secondinary-500 font-semibold">Pick-Up</h1>
            <div className="bg-[#F6F7F9] rounded-lg p-2 py-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-secondinary-500 font-semibold">Location</h1>
                <h1 className="text-secondinary-400 font-medium">
                  {state.rentedCars[lastCar].pickUpDetails?.location}
                </h1>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-secondinary-500 font-semibold">Time</h1>
                <h1 className="text-secondinary-400 font-medium">
                  {state.rentedCars[lastCar].pickUpDetails?.time}
                </h1>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-secondinary-500 font-semibold">Date</h1>
                <h1 className="text-secondinary-400 font-medium">
                  {state.rentedCars[lastCar].pickUpDetails?.date}
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="text-secondinary-500 font-semibold">Drop-Off</h1>
            <div className="bg-[#F6F7F9] rounded-lg p-2 py-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-secondinary-500 font-semibold">Location</h1>
                <h1 className="text-secondinary-400 font-medium">
                  {state.rentedCars[lastCar].dropOffDetails?.location}
                </h1>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-secondinary-500 font-semibold">Time</h1>
                <h1 className="text-secondinary-400 font-medium">
                  {state.rentedCars[lastCar].dropOffDetails?.time}
                </h1>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-secondinary-500 font-semibold">Date</h1>
                <h1 className="text-secondinary-400 font-medium">
                  {state.rentedCars[lastCar].dropOffDetails?.date}
                </h1>
              </div>
            </div>
          </div>

          <div className="py-4 border-t mt-8 flex items-center justify-between">
            <div>
              <h1 className="text-secondinary-500 font-bold">
                Total Rental Price
              </h1>
              <h2 className="text-secondinary-300 text-xs font-medium">
                Overall price rental
              </h2>
            </div>
            <h2 className="text-secondinary-500 font-bold text-lg lg:text-xl">
              ${state.rentedCars[0].attributes.price}
            </h2>
          </div>
        </div>
      ) : null}

      <div
        className={`${state.rentedCars[lastCar] ? "lg:w-1/2" : "lg:w-full"}`}
      >
        <div className="bg-white rounded-lg p-4 pb-0 mt-8 lg:m-0">
          <h1 className="text-secondinary-500 font-bold mb-5">
            Top 5 Car Rental
          </h1>
          <Chart />
        </div>

        <div className="bg-white rounded-lg p-4 mt-8">
          <h1 className="text-secondinary-500 font-bold">Recent Transaction</h1>
          {state.rentedCars.length ? (
            state.rentedCars?.map((car) => {
              return (
                <div
                  key={car.id}
                  className="flex items-center justify-between my-2 border-b py-2"
                >
                  <div className="flex items-center">
                    <div className="w-20">
                      <img
                        src={
                          car.attributes.image.data.attributes.formats.small.url
                        }
                        alt="car"
                      />
                    </div>
                    <div className="ml-2">
                      <h1 className="text-secondinary-500 font-bold text-sm">
                        {car.attributes.name}
                      </h1>
                      <h2 className="text-secondinary-300 text-xs font-medium">
                        {car.attributes.type}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xs font-medium">
                      {car.pickUpDetails?.date.split(" ")[0]}{" "}
                      {car.pickUpDetails?.date.split(" ")[1]}
                    </h2>
                    <h1 className="text-secondinary-500 text-sm font-bold">
                      ${car.attributes.price}
                    </h1>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-secondinary-500 text-center py-4 font-medium">
              <h1>There is nothing</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="w-full lg:w-[30%] xl:w-[25%]">
        <div
          className={`bg-white rounded-br-[5rem] p-6 pr-1 w-3/4 sm:w-1/2 absolute top-0 left-0 z-30 lg:translate-x-0 lg:sticky lg:w-full ${
            isOpen ? "translate-x-0" : "translate-x-[-100%]"
          } transition-transform duration-300 ease-in-out`}
        >
          <button
            onClick={() => setIsOpen((prevState) => !prevState)}
            className={`lg:hidden absolute -z-10 -top-0 -right-12 bg-white border border-l-0 p-2 pl-10 rounded-full cursor-pointer ${
              isOpen && "rounded-half pl-2"
            }`}
          >
            <img className="w-8 h-8" src={Menu} alt="menu" />
          </button>
          <div className="h-screen flex flex-col">
            <div className="flex-grow overflow-y-auto">
              <div className="w-full">
                <h1 className="text-secondinary-200 text-xs mb-5 tracking-wider ml-4">
                  MANIN MENU
                </h1>
                <ul>
                  {mainMenuItems.map((i) => (
                    <NavLink
                      to="/dashboard"
                      key={i.item}
                      className="flex items-center p-4 hover:bg-primary-500 duration-300 hover:fill-white rounded-xl text-secondinary-400 font-semibold hover:text-white mb-2"
                    >
                      <img src={i.icon} alt={i.item} className="mr-3" />
                      <span>{i.item}</span>
                    </NavLink>
                  ))}
                </ul>
              </div>

              <div className="mt-16 w-full">
                <h1 className="text-secondinary-200 text-xs mb-5 tracking-wider ml-4">
                  PREFERENCES
                </h1>
                <ul>
                  {preferencesItems.map((i) => (
                    <NavLink
                      to="/dashboard"
                      key={i.item}
                      className="flex items-center p-4 hover:bg-primary-500 duration-300 hover:fill-white rounded-xl text-secondinary-400 font-semibold hover:text-white mb-2"
                    >
                      <img src={i.icon} alt={i.item} className="mr-3" />
                      <span>{i.item}</span>
                    </NavLink>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full my-8 flex-1">
              <button className="flex w-full items-center p-4 hover:bg-primary-500 duration-300 hover:fill-white rounded-xl text-secondinary-400 font-semibold hover:text-white mb-2">
                <img src={Logout} alt="logout" className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`lg:hidden w-full absolute top-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] h-full ${
          isOpen ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
}

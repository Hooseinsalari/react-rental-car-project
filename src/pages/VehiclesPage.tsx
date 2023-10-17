import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { isShow } from "../features/showFilter/showFilterSlice";

// components
import PickupDropoffComponent from "../components/PickupDropoffComponent";
import Car from "../components/shared/Car";

// svg
import Arrow from "../assets/svg/arrow-down.svg";
import Close from "../assets/svg/close.svg";

// interfaces
import { CarInterface } from "../interfaces";
import { carCapasity, carTypes } from "../constant";

async function fetchAllData() {
  const response = await fetch("http://localhost:5000/api/product/seed");
  const data = response.json();
  return data;
}

const VehiclesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchAllData,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const { createdProducts: cars } = data as { createdProducts: CarInterface[] };

  return (
    <div className="">
      <MobileFilterBar />
      <div className="px-6 md:px-16 py-8">
        <PickupDropoffComponent />
        <div className="mt-5 flex items-center justify-center flex-wrap gap-x-6">
          {cars.map((car: CarInterface) => (
            <Car car={car} key={car._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;

function MobileFilterBar() {
  const isShowFilter = useSelector(
    (state: RootState) => state.showFilter.isShow
  );
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<{ first: boolean; second: boolean }>({
    first: false,
    second: false,
  });

  return (
    <div className="md:hidden">
      <div
        className={`fixed bg-white w-2/3 right-0 top-0 min-h-screen z-50 p-4 duration-500 ease-in-out ${
          isShowFilter ? "translate-x-0" : "translate-x-[1000px]"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-semibold text-lg">Filters</h3>
          <button onClick={() => dispatch(isShow())}>
            <img src={Close} className="w-6 h-6 cursor-pointer" alt="close" />
          </button>
        </div>
        <div className="mb-4">
          <div
            onClick={() => setIsOpen({ ...isOpen, first: !isOpen.first })}
            className="mb-2 flex items-center justify-between"
          >
            <h3 className="font-semibold text-secondinary-300">Type</h3>
            <img
              src={Arrow}
              alt="arrow"
              className={`w-4 h-4 duration-200 ${
                isOpen.first ? "rotate-180" : ""
              }`}
            />
          </div>
          <ul
            className={`px-2 ${
              isOpen.first ? "h-auto overflow-visible" : "h-0 overflow-hidden"
            }`}
          >
            {carTypes.map((i) => (
              <li key={i} className="mb-1 flex items-center">
                <input type="checkbox" className="rounded-sm mr-2" id={i} />
                <label htmlFor={i} className="font-medium text-secondinary-400">
                  {i}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <div
            onClick={() => setIsOpen({ ...isOpen, second: !isOpen.second })}
            className="mb-2 flex items-center justify-between"
          >
            <h3 className="font-semibold text-secondinary-300">Capacity</h3>
            <img
              src={Arrow}
              alt="arrow"
              className={`w-4 h-4 duration-200 ${
                isOpen.second ? "rotate-180" : ""
              }`}
            />
          </div>
          <ul
            className={`px-2 ${
              isOpen.second ? "h-auto overflow-visible" : "h-0 overflow-hidden"
            }`}
          >
            {carCapasity.map((i) => (
              <li key={i} className="mb-1 flex items-center">
                <input type="checkbox" className="rounded-sm mr-2" id={i} />
                <label htmlFor={i} className="font-medium text-secondinary-400">
                  {i}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <h3 className="font-semibold text-secondinary-300">Price</h3>
          <input
            type="range"
            className="w-full bg-secondinary-300 outline-none"
          />
          <h3 className="font-medium text-secondinary-400">Max $100.00</h3>
        </div>
      </div>

      <div
        className={`fixed z-40 inset-0 bg-black opacity-50 pointer-events-auto ${
          isShowFilter ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
}

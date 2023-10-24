import React, { useState } from "react";

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
import { CarInterface, FilterBarProps, FilterQuery } from "../interfaces";

// constant
import { carCapasity, carTypes } from "../constant";

async function fetchAllData() {
  const response = await fetch("https://morent-4li1.onrender.com/api/cars?populate=*");
  const data = response.json();
  return data;
}

const VehiclesPage = () => {
  const [filterQuery, setFilterQuery] = useState<FilterQuery>({
    type: [],
    capacity: [],
    price: 50,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchAllData,
  });
  
  console.log(data?.data);
  

  // useEffect(() => {
  //   console.log(filterQuery);
  // }, [filterQuery]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // const { createdProducts: cars } = data as { createdProducts: CarInterface[] };

  return (
    <div className="md:flex md:justify-between md:gap-x-10 min-h-screen">
      <MobileFilterBar />
      <FilterBar filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
      <div className="px-6 md:pr-10 md:pl-0 py-8 md:w-3/4 lg:w-4/5 mb-16">
        <PickupDropoffComponent />
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
          {data?.data.map((car: CarInterface) => (
            <Car car={car} key={car.id} />
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
    first: true,
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

function FilterBar({ filterQuery, setFilterQuery }: FilterBarProps) {
  // onChanges
  const typeCheckBoxHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;

    if (checked) {
      setFilterQuery({ ...filterQuery, type: [...filterQuery.type, value] });
    } else {
      const newType = filterQuery.type.filter((t) => t !== value);
      setFilterQuery({ ...filterQuery, type: newType });
    }
  };

  const capacityCheckBoxHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;

    if (checked) {
      setFilterQuery({
        ...filterQuery,
        capacity: [...filterQuery.capacity, value],
      });
    } else {
      const newCapacity = filterQuery.capacity.filter((c) => c !== value);
      setFilterQuery({ ...filterQuery, capacity: newCapacity });
    }
  };

  const rangeInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterQuery({ ...filterQuery, price: +e.currentTarget.value });
  };

  return (
    <div className="lg:w-1/5 md:w-1/4 lg:px-8 py-16 px-4 bg-white h-auto hidden md:block border-r">
      <div className="sticky top-10">
        <div className="mb-10">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-semibold text-secondinary-300 text-xs uppercase space-x-2 tracking-widest">
              Type
            </h3>
          </div>
          <ul className={`px-2`}>
            {carTypes.map((i) => (
              <li key={i} className="mb-1 flex items-center">
                <input
                  type="checkbox"
                  className="cursor-pointer rounded-sm mr-2"
                  id={i}
                  onChange={typeCheckBoxHandler}
                  value={i}
                  name="type"
                />
                <label
                  htmlFor={i}
                  className="text-sm lg:text-base font-medium text-secondinary-400"
                >
                  {i}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-10">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-semibold text-secondinary-300 text-xs uppercase space-x-2 tracking-widest">
              Capacity
            </h3>
          </div>
          <ul className={`px-2`}>
            {carCapasity.map((i) => (
              <li key={i} className="mb-1 flex items-center">
                <input
                  type="checkbox"
                  className="cursor-pointer rounded-sm mr-2"
                  id={i}
                  onChange={capacityCheckBoxHandler}
                  value={i}
                  name="capacity"
                />
                <label
                  htmlFor={i}
                  className="text-sm lg:text-base font-medium text-secondinary-400"
                >
                  {i}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-semibold text-secondinary-300 text-xs uppercase space-x-2 tracking-widest">
            Price
          </h3>
          <input
            name="price"
            value={filterQuery.price}
            min={20}
            max={500}
            onChange={rangeInputHandler}
            type="range"
            className="w-full bg-secondinary-300 outline-none"
          />
          <h3 className="font-medium text-secondinary-400 text-sm lg:text-base">
            Max ${filterQuery.price.toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
}

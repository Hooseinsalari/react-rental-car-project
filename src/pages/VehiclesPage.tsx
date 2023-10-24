import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

// components
import PickupDropoffComponent from "../components/PickupDropoffComponent";
import Car from "../components/shared/Car";

// interfaces
import { CarInterface, FilterQuery } from "../interfaces";
import FilterBar from "../components/FilterBar";

async function fetchAllData() {
  const response = await fetch(
    "https://morent-4li1.onrender.com/api/cars?populate=*"
  );
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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="md:flex md:justify-between md:gap-x-10 min-h-screen">
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

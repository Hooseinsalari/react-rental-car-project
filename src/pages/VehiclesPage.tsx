import { useState, useEffect } from "react";

// useQuery
import { useQuery } from "@tanstack/react-query";

// components
import PickupDropoffComponent from "../components/PickupDropoffComponent";
import Car from "../components/shared/Car";
import FilterBar from "../components/FilterBar";

// interfaces
import { CarInterface, FilterQuery } from "../interfaces";

// react router
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

// helper
import { generateParams } from "../helper/functions";

// ** fetcher
async function fetchAllData(price: string, type: string[], capacity: string[]) {
  const response = await fetch(
    `https://morent-4li1.onrender.com/api/cars?populate=*&filters[price][$gte]=${
      price || ""
    }&${generateParams(type, "type")}&${generateParams(capacity, "capacity")}`
  );
  const data = response.json();
  return data;
}

const VehiclesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = JSON.parse(searchParams.get("type")!);
  const capacity = JSON.parse(searchParams.get("capacity")!);
  const price = searchParams.get("price");

  // ** state
  // save this state in sessionStorage because after apply filters, page refreshes and all checkboxes checked value will be false
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(() => {
    const storedFilterQuery = sessionStorage.getItem("filterQuery");
    return storedFilterQuery
      ? JSON.parse(storedFilterQuery)
      : { type: [], capacity: [], price: 50 };
  });

  // ** useQuery
  const { data, isLoading } = useQuery({
    queryKey: ["cars", price, type, capacity],
    queryFn: () => fetchAllData(price!, type!, capacity!),
  });

  // ** useEffects
  useEffect(() => {
    sessionStorage.setItem("filterQuery", JSON.stringify(filterQuery));
  }, [filterQuery]);

  useEffect(() => {
    const encodedParams = createSearchParams({
      type: JSON.stringify(filterQuery.type),
      price: JSON.stringify(filterQuery.price),
      capacity: JSON.stringify(filterQuery.capacity),
    });

    navigate({
      pathname: "/vehicles",
      search: encodedParams.toString(),
    });
  }, [filterQuery]);

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();
      navigate("/vehicles");
      setFilterQuery({ type: [], capacity: [], price: 50 });
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

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

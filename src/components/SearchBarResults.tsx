import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SearchResultsInterface } from "../interfaces";
import axios from "axios";
import { Link } from "react-router-dom";

type SearchBarResultsProps = {
  search: string;
};

// ** fetcher
async function fetchAllData(search: string): Promise<SearchResultsInterface[]> {
  const { data } = await axios.get(
    `https://morent-4li1.onrender.com/api/cars?populate=*&filters[name][$containsi]=${
      search || ""
    }`
  );
  return data.data;
}

const SearchBarResults = ({ search }: SearchBarResultsProps) => {
  const [name, setName] = useState<string>(search);

  useEffect(() => {
    setName(search);
  }, [search]);

  // ** useQuery
  const { data, isLoading } = useQuery({
    queryKey: ["cars", name],
    queryFn: () => fetchAllData(name!),
  });

  if (!data?.length && isLoading && name.length >= 3) {
    return (
      <div className="absolute bg-white shadow-sm border z-[999] w-full top-12 right-0 rounded-lg md:rounded-3xl p-2 text-center">
        <h1 className="my-4 font-semibold">Loading</h1>
      </div>
    );
  }

  if (!data?.length && !isLoading && name.length >= 3) {
    return (
      <div className="absolute bg-white shadow-sm border z-[999] w-full top-12 right-0 rounded-lg md:rounded-3xl p-2 text-center">
        <h1 className="my-4 font-semibold">Nothing found</h1>
      </div>
    );
  }

  return (
    <>
      {data?.length && !isLoading && name.length >= 3 ? (
        <div className="absolute bg-white shadow-sm border z-[999] w-full top-12 right-0 rounded-lg md:rounded-3xl p-2">
          {data.map((car) => (
            <Link
              className="inline-block w-full my-4 sm:flex sm:flex-row sm:items-center sm:justify-between"
              key={car.id}
              to={`/detailCar/${car.id}`}
            >
              <div className="w-full sm:flex">
                <img
                  src={car.attributes.image.data.attributes.formats.small.url}
                  alt="car-image"
                  className="w-3/5 sm:w-1/4 sm:mr-2"
                />

                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h1 className="text-sm text-secondinary-500 font-bold sm:text-base">
                      {car.attributes.name}
                    </h1>
                    <h2 className="text-xs text-secondinary-300 font-semibold">
                      {car.attributes.type}
                    </h2>
                  </div>

                  <h3 className="text-xs text-secondinary-500 font-semibold sm:hidden">
                    ${car.attributes.price.toFixed(2)}
                  </h3>
                </div>
              </div>

              <h3 className="text-secondinary-500 font-semibold hidden sm:block">
                ${car.attributes.price.toFixed(2)}
              </h3>
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default SearchBarResults;

import { Link } from "react-router-dom";

// react query
import { useQuery } from "@tanstack/react-query";

// compoent
import Car from "./shared/Car";

// interface
import { CarInterface } from "../interfaces";
import CarSkeleton from "../skeleton/CarSkeleton";

async function fetchAllData() {
  const response = await fetch("https://morent-4li1.onrender.com/api/cars?populate=*");
  const data = response.json();
  return data;
}

const PopularCar = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchAllData,
  });

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-secondinary-300 font-semibold text-sm md:text-base">
          Popular Car
        </h2>
        <Link
          to="/vehicles"
          className="text-primary-500 font-semibold text-sm md:text-base"
        >
          View All
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
        
        {!isLoading && data ? data?.data.slice(0, 4).map((car: CarInterface) => (
            <Car car={car} key={car.id} />
        )) : <CarSkeleton cards={4} />}
      </div>
    </div>
  );
};

export default PopularCar;

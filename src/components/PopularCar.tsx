import { Link } from "react-router-dom";

// react query
import { useQuery } from "@tanstack/react-query";

// compoent
import Car from "./shared/Car";

// interface
import { CarInterface } from "../interfaces";

async function fetchAllData() {
  const response = await fetch("http://localhost:5000/api/product/seed");
  const data = response.json();
  return data;
}

const PopularCar = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchAllData,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const { createdProducts: cars } = data;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-secondinary-300 font-semibold text-sm md:text-base">
          Popular Car
        </h2>
        <Link
          to="/"
          className="text-primary-500 font-semibold text-sm md:text-base"
        >
          View All
        </Link>
      </div>
      <div className="mt-5 flex items-center justify-center flex-wrap gap-x-6">
        {cars.slice(0, 4).map((car: CarInterface) => (
            <Car car={car} key={car._id} />
        ))}
      </div>
    </div>
  );
};

export default PopularCar;

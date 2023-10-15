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

const RecomendationCar = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchAllData,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const { createdProducts: cars } = data as {createdProducts:  CarInterface[]}

  return (
    <div className="mt-16">
      <h2 className="text-secondinary-300 font-semibold text-sm md:text-base">
        Recomendation Car
      </h2>
      <div className="mt-5 flex items-center justify-center flex-wrap gap-x-6">
        {cars.slice(0, 8).map((car: CarInterface) => (
          <Car car={car} key={car._id} />
        ))}
      </div>
      <div className="flex items-center mt-16">
        <Link to="/" className="mr-auto ml-auto bg-primary-500 text-sm text-white px-4 py-2 rounded-[4px]">Show more car</Link>
        <h3 className="text-secondinary-300 text-sm font-medium">{cars.length} Car</h3>
      </div>
    </div>
  );
};

export default RecomendationCar;

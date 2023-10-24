import { Link } from "react-router-dom";

// react query
import { useQuery } from "@tanstack/react-query";

// compoent
import Car from "./shared/Car";

// interface
import { CarInterface } from "../interfaces";

async function fetchAllData() {
  const response = await fetch("https://morent-4li1.onrender.com/api/cars?populate=*");
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

  return (
    <div className="my-16">
      <h2 className="text-secondinary-300 font-semibold text-sm md:text-base">
        Recomendation Car
      </h2>
      <div className="mt-5 flex items-center justify-center flex-wrap gap-x-6">
        {data?.data.slice(0, 8).map((car: CarInterface) => (
          <Car car={car} key={car.id} />
        ))}
      </div>
      <div className="flex items-center mt-16">
        <Link to="/" className="mr-auto ml-auto bg-primary-500 text-sm text-white px-4 py-2 rounded-[4px]">Show more car</Link>
        <h3 className="text-secondinary-300 text-sm font-medium">{data?.data.length} Car</h3>
      </div>
    </div>
  );
};

export default RecomendationCar;

import { useState } from "react";

// react router
import { useParams } from "react-router-dom";

// components
import CarInfo from "../components/CarInfo";
import CarReviews from "../components/CarReviews";
import PopularCar from "../components/PopularCar";
import AddReview from "../components/AddReview";

// useQuery
import { useQuery } from "@tanstack/react-query";

// interfaces
import { DetailsCar } from "../interfaces";

// fetcher
async function fetchSingleData(id: string) {
  const response = await fetch(
    `https://morent-4li1.onrender.com/api/cars/${id}?populate=*`
  );
  const data = response.json();
  return data;
}

const DetailCarPage = () => {
  // ** params
  const { id } = useParams();

  // ** useQuery
  const { data, isLoading } = useQuery<DetailsCar>({
    queryKey: ["carDetail", id],
    queryFn: () => fetchSingleData(id!),
  });

  // ** state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-6 md:px-16 py-8">
      <CarInfo data={data} isLoading={isLoading} />
      <CarReviews data={data} isLoading={isLoading} setIsOpen={setIsOpen} />
      <PopularCar />
      <AddReview isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
    </div>
  );
};

export default DetailCarPage;

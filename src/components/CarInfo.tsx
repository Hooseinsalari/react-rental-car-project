import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// useQuery
import { useQuery } from "@tanstack/react-query";

// gallery
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";

// skeleton
import CarInfoSkeleton from "../skeleton/CarInfoSkeleton";

// svg
import Star from "../assets/svg/star-icon.svg";
import EmptyStar from "../assets/svg/empty-star.svg";

// interfaces
import { DetailsCar } from "../interfaces";

// context
import { useRentCar } from "../context/RentCarContextProvider";
import { useAuth } from "../context/AuthContextProvider";

// toast 
import toast from "react-hot-toast";

// fetcher
async function fetchSingleData(id: string) {
  const response = await fetch(
    `https://morent-4li1.onrender.com/api/cars/${id}?populate=*`
  );
  const data = response.json();
  return data;
}

const CarInfo = () => {
  // ** states
  const [open, setOpen] = useState<boolean>(false);

  // ** get params
  const { id } = useParams();
  const navigate = useNavigate();

  // ** useQuery
  const { data, isLoading } = useQuery<DetailsCar>({
    queryKey: ["carDetail", id],
    queryFn: () => fetchSingleData(id!),
  });

  // ** context
  const { dispatch } = useRentCar();
  const { userData } = useAuth();

  // ** handler
  const rentalHandler = () => {
    if (data?.data) {
      dispatch({ type: "ADD_TO_CART", payload: data?.data });
    }
    toast(
      "Please login to your account.",
      {
        duration: 6000,
      }
    );
    navigate(`${userData.user ? "/payment" : "/login?redirect=payment"}`);
  };

  const { attributes } = data?.data ?? {};

  const slides = data?.data.attributes.gallery?.data.map((i) => {
    return {
      src: i.attributes.formats.small.url,
      alt: "image 1",
      width: 3840,
      height: 2560,
      srcSet: [
        { src: i.attributes.formats.small.url, width: 320, height: 213 },
        { src: i.attributes.formats.small.url, width: 640, height: 427 },
        { src: i.attributes.formats.small.url, width: 1200, height: 800 },
        { src: i.attributes.formats.small.url, width: 2048, height: 1365 },
        { src: i.attributes.formats.small.url, width: 3840, height: 2560 },
      ],
    };
  });

  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Zoom]}
      />
      {!isLoading && data ? (
        <div className="flex items-center justify-center flex-col lg:flex-row lg:items-stretch lg:gap-x-8">
          <div className="mt-5 sm:flex lg:block lg:flex-1">
            <img
              className="w-[30rem] mx-auto cursor-pointer"
              src={data?.data.attributes.image.data.attributes.url}
              alt="image"
              onClick={() => setOpen(true)}
            />
            <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-x-7 sm:flex-nowrap sm:flex-col lg:flex-row">
              {data?.data.attributes.gallery?.data.map((g) => (
                <img
                  onClick={() => setOpen(true)}
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg cursor-pointer"
                  key={g.id}
                  src={g.attributes.formats.small.url}
                  alt="image"
                />
              ))}
            </div>
          </div>
          <div className="bg-white py-5 px-4 mt-8 rounded-lg shadow-sm lg:flex-1 lg:flex lg:flex-col">
            <h1 className="text-secondinary-500 text-xl font-bold lg:text-3xl">
              {attributes?.name}
            </h1>
            <div className="flex items-center gap-x-2 mt-2">
              <div className="flex items-center">
                <img className="w-3 h-3 sm:w-4 sm:h-4" src={Star} alt="star" />
                <img className="w-3 h-3 sm:w-4 sm:h-4" src={Star} alt="star" />
                <img className="w-3 h-3 sm:w-4 sm:h-4" src={Star} alt="star" />
                <img className="w-3 h-3 sm:w-4 sm:h-4" src={Star} alt="star" />
                <img
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  src={EmptyStar}
                  alt="star"
                />
              </div>
              <h3 className="text-[#3D5278] text-xs font-medium mt-1 sm:mt-0 sm:text-sm">
                440+ Reviewer
              </h3>
            </div>
            <p className="my-5 text-secondinary-300 font-normal text-sm leading-6 lg:text-base">
              NISMO has become the embodiment of Nissan's outstanding
              performance, inspired by the most unforgiving proving ground, the
              "race track".
            </p>
            <div className="grid grid-cols-2 gap-y-5 gap-x-5 lg:mt-auto lg:mb-14">
              <div className="flex items-center">
                <h1 className="text-secondinary-300 flex-1 font-medium text-sm lg:text-lg">
                  Type Car
                </h1>
                <h1 className="text-secondinary-500 text-sm font-semibold lg:text-lg">
                  {attributes?.type}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="text-secondinary-300 flex-1 font-medium text-sm lg:text-lg">
                  Capacity
                </h1>
                <h1 className="text-secondinary-500 text-sm font-semibold lg:text-lg">
                  {attributes?.capacity}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="text-secondinary-300 flex-1 font-medium text-sm lg:text-lg">
                  Steering
                </h1>
                <h1 className="text-secondinary-500 text-sm font-semibold lg:text-lg">
                  {attributes?.steering}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="text-secondinary-300 flex-1 font-medium text-sm lg:text-lg">
                  Gasoline
                </h1>
                <h1 className="text-secondinary-500 text-sm font-semibold lg:text-lg">
                  {attributes?.gasoline}
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-between mt-8 lg:mt-auto">
              <h3 className="text-secondinary-500 text-lg font-semibold lg:text-xl">
                ${attributes?.price.toFixed(2)}/
                <span className="text-xs text-secondinary-300">day</span>
              </h3>
              <button
                onClick={rentalHandler}
                className="bg-primary-500 text-sm text-white px-4 py-2 rounded-[4px] lg:text-lg"
              >
                Rental Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <CarInfoSkeleton />
      )}
    </>
  );
};

export default CarInfo;

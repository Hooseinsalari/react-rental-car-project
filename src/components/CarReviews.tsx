import { useState } from "react";

// svg
import ProfileCircle from "../assets/svg/profile-circle.svg";
import ArrowIcon from "../assets/svg/arrow-down.svg";
import AddReview from "../assets/svg/add.svg";

// interface
import { DetailsCar } from "../interfaces";

// helper
import { extractDate } from "../helper/functions";

const CarReviews = ({
  data,
  isLoading,
  setIsOpen,
}: {
  data: DetailsCar | undefined;
  isLoading: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { reviews } = data?.data.attributes ?? {};

  const [isShow, setIsShow] = useState<boolean>(false);

  const reviewsToShow = isShow ? reviews?.data : reviews?.data.slice(0, 2);

  return (
    <div className="bg-white py-5 px-4 mt-8 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-xl text-secondinary-500 font-semibold mr-5">
            Reviews
          </h1>
          <h2 className="bg-primary-500 px-5 w-11 h-7 flex items-center justify-center text-white font-bold rounded-md text-sm">
            {reviews?.data.length}
          </h2>
        </div>

        <button
          onClick={() => setIsOpen((prevState) => !prevState)}
          className="flex items-center gap-x-2 text-secondinary-500 font-semibold p-2 rounded-lg opacity-80 hover:opacity-100 duration-200"
        >
          Add review
          <img src={AddReview} alt="add" />
        </button>
      </div>

      <div>
        {reviews?.data.length! >= 1 && !isLoading ? (
          reviewsToShow?.map((r) => (
            <div key={r.id}>
              <Reviews items={r} />
            </div>
          ))
        ) : isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="text-center p-4 font-semibold">
            <h1>No reviews found.</h1>
          </div>
        )}

        {reviews?.data.length! > 2 ? (
          <button
            onClick={() => setIsShow((prevState) => !prevState)}
            className="cursor-pointer mt-9 text-secondinary-700 font-medium w-full text-sm flex items-center justify-center"
          >
            Show All{" "}
            <img
              src={ArrowIcon}
              alt="arrow"
              className={`ml-4 ${isShow && "rotate-180"} duration-300`}
            />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CarReviews;

function Reviews({
  items,
}: {
  items: {
    id: number;
    attributes: {
      name: string;
      position: string;
      message: string;
      createdAt: string;
    };
  };
}) {
  return (
    <div className="mb-8" key={items.id}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <img src={ProfileCircle} alt="avatar" className="w-11 h-11 mr-2" />
          <div>
            <h1 className="text-secondinary-500 font-semibold text-base mb-1">
              {items.attributes?.name}
            </h1>
            <h3 className="text-secondinary-300 text-xs fotn">
              {items.attributes?.position}
            </h3>
          </div>
        </div>
        <div>
          <h2 className="text-secondinary-300 text-sm font-medium">
            {extractDate(items.attributes?.createdAt)}
          </h2>
        </div>
      </div>
      <p className="mt-4 pl-2 text-secondinary-300 text-sm leading-6">
        {items.attributes?.message}
      </p>
    </div>
  );
}

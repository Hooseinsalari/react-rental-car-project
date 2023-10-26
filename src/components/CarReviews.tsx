// svg
import ProfileCircle from "../assets/svg/profile-circle.svg";
import ArrowIcon from "../assets/svg/arrow-down.svg";

const CarReviews = () => {
  return (
    <div className="bg-white py-5 px-4 mt-8 rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <h1 className="text-xl text-secondinary-500 font-semibold mr-5">
          Reviews
        </h1>
        <h2 className="bg-primary-500 px-5 w-11 h-7 flex items-center justify-center text-white font-bold rounded-md text-sm">
          13
        </h2>
      </div>

      <div>
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <img
                src={ProfileCircle}
                alt="avatar"
                className="w-11 h-11 mr-2"
              />
              <div>
                <h1 className="text-secondinary-500 font-semibold text-base mb-1">
                  Alex Stanton
                </h1>
                <h3 className="text-secondinary-300 text-xs fotn">
                  CEO at Bukalapak
                </h3>
              </div>
            </div>
            <div>
              <h2 className="text-secondinary-300 text-sm font-medium">
                21 July 2023
              </h2>
            </div>
          </div>
          <p className="mt-4 pl-2 text-secondinary-300 text-sm leading-6">
            We are very happy with the service from the MORENT App. Morent has a
            low price and also a large variety of cars with good and comfortable
            facilities. In addition, the service provided by the officers is
            also very friendly and very polite.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <img
                src={ProfileCircle}
                alt="avatar"
                className="w-11 h-11 mr-2"
              />
              <div>
                <h1 className="text-secondinary-500 font-semibold text-base mb-1">
                  Alex Stanton
                </h1>
                <h3 className="text-secondinary-300 text-xs fotn">
                  CEO at Bukalapak
                </h3>
              </div>
            </div>
            <div>
              <h2 className="text-secondinary-300 text-sm font-medium">
                21 July 2023
              </h2>
            </div>
          </div>
          <p className="mt-4 pl-2 text-secondinary-300 text-sm leading-6">
            We are very happy with the service from the MORENT App. Morent has a
            low price and also a large variety of cars with good and comfortable
            facilities. In addition, the service provided by the officers is
            also very friendly and very polite.
          </p>
        </div>
        <button className="cursor-pointer mt-9 text-secondinary-700 font-medium w-full text-sm flex items-center justify-center">
          Show All <img src={ArrowIcon} alt="arrow" className="ml-4" />
        </button>
      </div>
    </div>
  );
};

export default CarReviews;

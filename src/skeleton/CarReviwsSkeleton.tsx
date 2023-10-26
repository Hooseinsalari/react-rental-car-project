import Skeleton from "react-loading-skeleton";

const CarReviwsSkeleton = () => {
  return (
    <div className="bg-white py-5 px-4 mt-8 rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <h1 className="text-xl text-secondinary-500 font-semibold mr-5">
          <Skeleton width={80} height={24} />
        </h1>
        <h2 className="px-5 w-11 h-7 flex items-center justify-center text-white font-bold rounded-md text-sm">
          <Skeleton width={20} />
        </h2>
      </div>
      <div>
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <Skeleton circle width={44} height={44} className="mr-2" />
              <div>
                <h1 className="text-secondinary-500 font-semibold text-base mb-1">
                  <Skeleton width={120} />
                </h1>
                <h3 className="text-secondinary-300 text-xs fotn">
                  <Skeleton width={100} />
                </h3>
              </div>
            </div>
            <div>
              <h2 className="text-secondinary-300 text-sm font-medium">
                <Skeleton width={80} />
              </h2>
            </div>
          </div>
          <p className="mt-4 pl-2 text-secondinary-300 text-sm leading-6">
            <Skeleton count={3} />
          </p>
        </div>
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <Skeleton circle width={44} height={44} className="mr-2" />
              <div>
                <h1 className="text-secondinary-500 font-semibold text-base mb-1">
                  <Skeleton width={120} />
                </h1>
                <h3 className="text-secondinary-300 text-xs fotn">
                  <Skeleton width={100} />
                </h3>
              </div>
            </div>
            <div>
              <h2 className="text-secondinary-300 text-sm font-medium">
                <Skeleton width={80} />
              </h2>
            </div>
          </div>
          <p className="mt-4 pl-2 text-secondinary-300 text-sm leading-6">
            <Skeleton count={3} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarReviwsSkeleton;

import Skeleton from "react-loading-skeleton";

const ReviewsSkeleton = () => {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <Skeleton circle width={44} height={44} className="mr-2" />
          <div>
            <h1 className="text-secondinary-500 font-semibold text-base mb-1">
              <Skeleton width={80} />
            </h1>
            <h3 className="text-secondinary-300 text-xs font">
              <Skeleton width={50} />
            </h3>
          </div>
        </div>
        <div>
          <h2 className="text-secondinary-300 text-sm font-medium">
            <Skeleton width={50} />
          </h2>
        </div>
      </div>
      <p className="mt-4 pl-2 text-secondinary-300 text-sm leading-6">
        <Skeleton count={3} />
      </p>
    </div>
  );
};

export default ReviewsSkeleton;

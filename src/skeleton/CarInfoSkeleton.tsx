import Skeleton from "react-loading-skeleton";

const CarInfoSkeleton = () => {
  return (
    <div className="flex items-center justify-center flex-col lg:flex-row lg:items-stretch lg:gap-x-8">
      <div className="mt-5 sm:flex lg:block lg:flex-1 text-center">
        <Skeleton
          width={300}
          height={300}
          className="mx-auto sm:mr-10 lg:mr-0"
        />
        <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-x-7 sm:flex-nowrap sm:flex-col lg:flex-row">
          <Skeleton width={80} height={80} />
          <Skeleton width={80} height={80} />
          <Skeleton width={80} height={80} />
        </div>
      </div>
      <div className="bg-white w-full py-5 px-4 mt-8 rounded-lg shadow-sm lg:flex-1 lg:flex lg:flex-col">
        <Skeleton width={150} height={30} />
        <Skeleton
          count={3}
          width={200}
          height={20}
          className="my-5 leading-6 lg:text-base"
        />
        <div className="grid grid-cols-2 gap-y-5 gap-x-5 lg:mt-auto lg:mb-14">
          <Skeleton
            width={100}
            height={20}
            className="font-medium lg:text-lg"
          />
          <Skeleton
            width={100}
            height={20}
            className="font-medium lg:text-lg"
          />
          <Skeleton
            width={100}
            height={20}
            className="font-medium lg:text-lg"
          />
          <Skeleton
            width={100}
            height={20}
            className="font-medium lg:text-lg"
          />
        </div>
        <div className="flex items-center justify-between mt-8 lg:mt-auto">
          <Skeleton
            width={100}
            height={30}
            className="text-lg font-semibold lg:text-xl"
          />
          <Skeleton
            width={100}
            height={30}
            className="text-sm px-4 py-2 rounded-[4px] lg:text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CarInfoSkeleton;

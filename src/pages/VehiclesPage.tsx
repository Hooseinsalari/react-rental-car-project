import { useQuery } from "@tanstack/react-query";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { isShow } from "../features/showFilter/showFilterSlice";

// components
import PickupDropoffComponent from "../components/PickupDropoffComponent";
import Car from "../components/shared/Car";

// interfaces
import { CarInterface } from "../interfaces";

async function fetchAllData() {
  const response = await fetch("http://localhost:5000/api/product/seed");
  const data = response.json();
  return data;
}

const VehiclesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchAllData,
  });

  const isShowFilter = useSelector((state: RootState) => state.showFilter.isShow)
  const dispatch = useDispatch()

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const { createdProducts: cars } = data as { createdProducts: CarInterface[] };

  return (
    <div>
      <div className="">
        <div>
            <h3>Filter</h3>
            <button>Close</button>
        </div>
        
      </div>
      <div className="px-6 md:px-16 py-8">
        <PickupDropoffComponent />
        <div className="mt-5 flex items-center justify-center flex-wrap gap-x-6">
          {cars.map((car: CarInterface) => (
            <Car car={car} key={car._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;

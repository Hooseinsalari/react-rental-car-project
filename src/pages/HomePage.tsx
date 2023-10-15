// components
import AdsSection from "../components/AdsSection";
import PickupDropoffComponent from "../components/PickupDropoffComponent";
import PopularCar from "../components/PopularCar";


const HomePage = () => {
  return (
    <div className="px-6 md:px-16 py-8">
      <AdsSection />
      <PickupDropoffComponent />
      <PopularCar />
    </div>
  );
};

export default HomePage;

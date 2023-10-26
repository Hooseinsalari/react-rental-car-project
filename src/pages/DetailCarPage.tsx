// components
import CarInfo from "../components/CarInfo";
import CarReviews from "../components/CarReviews";

const DetailCarPage = () => {
  return (
    <div className="px-6 md:px-16 py-8">
      <CarInfo />
      <CarReviews />
    </div>
  );
};

export default DetailCarPage;

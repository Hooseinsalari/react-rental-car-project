import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center flex-col my-16 gap-y-3 px-10 text-center">
      <h1 className="text-6xl text-secondinary-800">404</h1>
      <h1 className="text-xl font-bold">Page Not Found</h1>
      <p className="font-semibold text-secondinary-400">
        We're sorry, but the page you are looking for does not exist.
      </p>
      <Link to="/" className="font-semibold text-secondinary-400">
        Please back to home page
      </Link>
    </div>
  );
};

export default NotFound;

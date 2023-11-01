import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

// context
import { useIsShow } from "../../context/ShowFilterContextProvider";
import { useAuth } from "../../context/AuthContextProvider";

// hooks
import useOutsideClick from "../../hooks/useOutsideClick";

// svg
import FilterIcon from "../../assets/svg/filter-icon.svg";
import SearchIcon from "../../assets/svg/search-icon.svg";
import UserIcon from "../../assets/svg/user-icon.svg";
import SettingIcon from "../../assets/svg/setting-icon.svg";
import NotificationIcon from "../../assets/svg/notification.svg";
import LoginIcon from "../../assets/svg/login.svg";
import DashboardIcon from "../../assets/svg/dashboard.svg";
import LogoutIcon from "../../assets/svg/logout.svg";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white md:items-center md:border-b md:border-[#C3D4E966] px-6 md:px-16 py-4">
      <div className="flex items-center justify-between mb-8 md:mb-0">
        <Link
          to="/"
          className="text-primary-500 font-bold text-2xl md:text-3xl md:mr-7"
        >
          MORENT
        </Link>
        <div className="md:hidden">
          <ProfileContainer />
        </div>
      </div>
      <SearchBar />
      <div className="hidden md:flex items-center justify-center gap-x-4 flex-row-reverse">
        <ProfileContainer />
        <div className="hover:shadow-md cursor-pointer duration-200 border border-[#C3D4E966] rounded-full p-2">
          <img src={SettingIcon} alt="setting" className="w-6 h-6" />
        </div>
        <div className="hover:shadow-md cursor-pointer duration-200 border border-[#C3D4E966] rounded-full p-2">
          <img src={NotificationIcon} alt="notification" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

function SearchBar() {
  const { setIsShow } = useIsShow();

  return (
    <div className="flex items-center md:mr-auto md:w-1/2 gap-4 md:border md:border-[#C3D4E966] md:rounded-3xl">
      <div className="flex items-center border border-[#C3D4E966] rounded-[10px] p-3 w-full md:border-none">
        <img className="w-6 h-6" src={SearchIcon} alt="search" />
        <input
          className="outline-none ml-3 w-full font-medium border-none p-0 focus:ring-0"
          placeholder="Search something here"
        />
      </div>
      <button
        onClick={() => setIsShow((prevState) => !prevState)}
        className="border border-[#C3D4E966] rounded-[10px] p-3 md:hidden"
      >
        <img className="w-8 h-6 " src={FilterIcon} alt="filter" />
      </button>
    </div>
  );
}

function ProfileContainer() {
  // ** context
  const { userData } = useAuth();

  return (
    <div className="">
      {userData.user ? (
        <Profile />
      ) : (
        <Link
          to="/login"
          className="hover:shadow-md block cursor-pointer duration-200 border border-[#C3D4E966] rounded-full p-2"
        >
          <img src={LoginIcon} alt="user" className="h-6 w-6" />
        </Link>
      )}
    </div>
  );
}

function Profile() {
  // ** state
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false);

  // ** ref
  const profileRef = useRef<HTMLDivElement>(null);

  // ** context
  const { userData, setUserData } = useAuth();

  // ** hooks
  useOutsideClick(profileRef, "profile", () => setIsShowProfile(false));

  // ** handler
  const logoutHandler = () => {
    setUserData({ jwt: null, user: null });
    localStorage.removeItem("authState");
    window.location.reload();
  };
  
  return (
    <div className="relative z-50">
      <div
        id="profile"
        onClick={() => setIsShowProfile((prevState) => !prevState)}
        className="hover:shadow-md cursor-pointer duration-200 border border-[#C3D4E966] rounded-full p-2"
      >
        <img id="profile" src={UserIcon} alt="user" className="h-6 w-6" />
      </div>
      <Transition
        show={isShowProfile}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="border border-[#C3D4E966] absolute top-12 right-1 rounded-lg min-w-max bg-white shadow-lg"
        ref={profileRef}
      >
        <div className="flex items-center gap-2 py-2 px-4">
          <div className="border border-[#C3D4E966] rounded-full p-2">
            <img src={UserIcon} alt="avatar" className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-secondinary-500">
              {userData?.user?.username}
            </h1>
            <h1 className="text-sm font-medium text-secondinary-400">
              {userData?.user?.email}
            </h1>
          </div>
        </div>
        <div className="w-full h-[0.01rem] bg-secondinary-100"></div>
        <div className="py-2 px-2">
          <span className="w-full flex items-center duration-200 p-2 rounded-xl hover:bg-slate-200">
            <img src={DashboardIcon} alt="dashboard" className="w-6 h-6 mr-1" />
            <Link to="/dashboard" className="font-semibold text-secondinary-500 text-sm">
              Dashboard
            </Link>
          </span>
          <button
            onClick={logoutHandler}
            className="w-full mt-3 flex items-center duration-200 p-2 rounded-xl hover:bg-slate-200"
          >
            <img src={LogoutIcon} alt="dashboard" className="w-5 h-5 mr-1" />
            <Link to="/" className="font-semibold text-secondinary-500 text-sm">
              Logout
            </Link>
          </button>
        </div>
      </Transition>
    </div>
  );
}

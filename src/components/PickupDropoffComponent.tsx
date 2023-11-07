import { useRef, useState } from "react";

// react widgets
import Calendar from "react-widgets/Calendar";
import TimeInput from "react-widgets/TimeInput";
import DropdownList from "react-widgets/DropdownList";
import { DateLocalizer } from "react-widgets/IntlLocalizer";
import "react-widgets/styles.css";
import { Localization } from "react-widgets";

// hooks
import useOutsideClick from "../hooks/useOutsideClick";

// interfaces
import {
  PickUpComponentProps,
  PickUpDropOffInterface,
  DropOffComponentProps,
  MarkProps,
} from "../interfaces";

// helper
import { formatDate, formatTime } from "../helper/functions";

// svg
import Swap from "../assets/svg/swap.svg";
import Arrow from "../assets/svg/arrow-down.svg";

// constant
import { citiesInIran } from "../constant";

const PickupDropoffComponent = () => {
  // ** states
  const [pickUp, setPickUp] = useState<PickUpDropOffInterface>({
    location: "",
    date: "",
    time: "",
  });

  const [dropOff, setDropOff] = useState<PickUpDropOffInterface>({
    location: "",
    date: "",
    time: "",
  });

  // ** Handler
  const swapHandler = () => {
    setPickUp(dropOff);
    setDropOff(pickUp);
  };

  return (
    <div className="mt-6 flex flex-col lg:flex-row lg:justify-between">
      <PickUpComponent pickUp={pickUp} setPickUp={setPickUp} />
      <div
        onClick={swapHandler}
        className="cursor-pointer w-14 h-14 my-4 lg:my-auto mx-auto lg:mx-4 rounded-lg bg-primary-500 flex items-center justify-center hover:shadow-md duration-200"
      >
        <img src={Swap} alt="swap" />
      </div>
      <DropOffComponent dropOff={dropOff} setDropOff={setDropOff} />
    </div>
  );
};

export default PickupDropoffComponent;

function PickUpComponent({ pickUp, setPickUp }: PickUpComponentProps) {
  // ** states
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showTime, setShowTime] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);

  // ** refs
  const calendarRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // ** hooks
  useOutsideClick(calendarRef, "calendar", () => setShowCalendar(false));
  useOutsideClick(timeRef, "time", () => setShowTime(false));
  useOutsideClick(locationRef, "location", () => setShowLocation(false));

  return (
    <Localization
      date={new DateLocalizer({ culture: "en-US", firstOfWeek: 1 })}
    >
      <div className="bg-white p-4 w-full lg:w-1/2 rounded-lg lg:flex-grow">
        <div className="flex items-center">
          <Mark isPick={true} />
          <h2 className="text-secondinary-500 font-semibold ml-2 lg:text-lg">
            Pick-Up
          </h2>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="cursor-pointer relative">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Location
            </h3>
            <h4
              id="location"
              role="button"
              tabIndex={0}
              onClick={() => setShowLocation((prevState) => !prevState)}
              className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm"
            >
              {pickUp.location || "select..."}
              <img
                src={Arrow}
                alt="arrow"
                className={`ml-2 lg:w-4 duration-300 ${
                  showLocation ? "rotate-180" : "rotate-0"
                }`}
              />
            </h4>
            {showLocation && (
              <div
                ref={locationRef}
                className={`duration-200 absolute top-12 md:-left-4 -left-7 xs:-left-5 mx-auto w-[290px] bg-white`}
              >
                <DropdownList
                  defaultValue="Search"
                  onChange={(value) =>
                    setPickUp({ ...pickUp, location: value })
                  }
                  data={citiesInIran}
                  open={true}
                  selectIcon={false}
                />
              </div>
            )}
          </div>
          <div className="md:ml-5 cursor-pointer relative z-50">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Date
            </h3>
            <h4
              id="calendar"
              onClick={() => setShowCalendar((prevState) => !prevState)}
              className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm"
            >
              {pickUp.date || "select..."}
              <img
                src={Arrow}
                alt="arrow"
                className={`ml-2 lg:w-4 duration-300 ${
                  showCalendar ? "rotate-180" : "rotate-0"
                }`}
              />
            </h4>
            {showCalendar && (
              <div
                ref={calendarRef}
                className={`duration-200 absolute top-12 -left-28 mx-auto w-[300px]`}
              >
                <Calendar
                  min={new Date()}
                  onChange={(value) =>
                    setPickUp({ ...pickUp, date: formatDate(value) })
                  }
                  culture="en"
                />
              </div>
            )}
          </div>
          <div className="md:ml-5 cursor-pointer relative">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Time
            </h3>
            <h4
              id="time"
              onClick={() => setShowTime((prevState) => !prevState)}
              className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm"
            >
              {pickUp.time || "select..."}
              <img
                src={Arrow}
                alt="arrow"
                className={`ml-2 lg:w-4 duration-300 ${
                  showTime ? "rotate-180" : "rotate-0"
                }`}
              />
            </h4>
            {showTime && (
              <div
                ref={timeRef}
                className={`duration-200 absolute top-12 -left-14 mx-auto w-[120px] bg-white shadow-lg`}
              >
                <TimeInput
                  onChange={(value) =>
                    setPickUp({ ...pickUp, time: formatTime(value) })
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Localization>
  );
}

function DropOffComponent({ dropOff, setDropOff }: DropOffComponentProps) {
  // ** states
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showTime, setShowTime] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);

  // ** refs
  const calendarRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // ** hooks
  useOutsideClick(calendarRef, "calendar", () => setShowCalendar(false));
  useOutsideClick(timeRef, "time", () => setShowTime(false));
  useOutsideClick(locationRef, "location", () => setShowLocation(false));

  return (
    <Localization
      date={new DateLocalizer({ culture: "en-US", firstOfWeek: 1 })}
    >
      <div className="bg-white p-4 w-full lg:w-1/2 rounded-lg lg:flex-grow">
        <div className="flex items-center">
          <Mark isPick={false} />
          <h2 className="text-secondinary-500 font-semibold ml-2 lg:text-lg">
            Drop-Off
          </h2>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="cursor-pointer relative">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Location
            </h3>
            <h4
              id="location"
              onClick={() => setShowLocation((prevState) => !prevState)}
              className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm"
            >
              {dropOff.location || "select..."}
              <img
                src={Arrow}
                alt="arrow"
                className={`ml-2 lg:w-4 duration-300 ${
                  showLocation ? "rotate-180" : "rotate-0"
                }`}
              />
            </h4>
            {showLocation && (
              <div
                ref={locationRef}
                className={`duration-200 absolute top-12 md:-left-4 -left-7 xs:-left-5 mx-auto w-[290px] bg-white`}
              >
                <DropdownList
                  defaultValue="Search"
                  onChange={(value) =>
                    setDropOff({ ...dropOff, location: value })
                  }
                  data={citiesInIran}
                  open={true}
                  selectIcon={false}
                />
              </div>
            )}
          </div>
          <div className="md:ml-5 cursor-pointer relative z-40">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Date
            </h3>
            <h4
              id="calendar"
              onClick={() => setShowCalendar((prevState) => !prevState)}
              className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm"
            >
              {dropOff.date || "select..."}
              <img
                src={Arrow}
                alt="arrow"
                className={`ml-2 lg:w-4 duration-300 ${
                  showCalendar ? "rotate-180" : "rotate-0"
                }`}
              />
            </h4>
            {showCalendar && (
              <div
                ref={calendarRef}
                className={`duration-200 absolute top-12 -left-28 mx-auto w-[300px]`}
              >
                <Calendar
                  min={new Date()}
                  onChange={(value) =>
                    setDropOff({ ...dropOff, date: formatDate(value) })
                  }
                  culture="en"
                />
              </div>
            )}
          </div>
          <div className="md:ml-5 cursor-pointer relative">
            <h3 className="font-bold text-secondinary-500 lg:text-base">
              Time
            </h3>
            <h4
              id="time"
              onClick={() => setShowTime((prevState) => !prevState)}
              className="text-secondinary-300 text-xs font-normal flex items-center lg:text-sm"
            >
              {dropOff.time || "select..."}
              <img
                src={Arrow}
                alt="arrow"
                className={`ml-2 lg:w-4 duration-300 ${
                  showTime ? "rotate-180" : "rotate-0"
                }`}
              />
            </h4>
            {showTime && (
              <div
                ref={timeRef}
                className={`duration-200 absolute top-12 -left-14 md:-left-10 mx-auto w-[120px] bg-white shadow-lg`}
              >
                <TimeInput
                  onChange={(value) =>
                    setDropOff({ ...dropOff, time: formatTime(value) })
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Localization>
  );
}

function Mark({ isPick }: MarkProps) {
  return (
    <div className="w-4 h-4 rounded-full bg-primary-200 flex items-center justify-center">
      <div
        className={`w-2 h-2 rounded-full ${
          isPick ? "bg-primary-600" : "bg-information-500"
        }`}
      ></div>
    </div>
  );
}

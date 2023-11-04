// helper
import { formatDate, formatTime } from "../../helper/functions";

// constant
import { citiesInIran } from "../../constant";

// interface
import { RentalInfoProps } from "../../interfaces";

// react widgets
import Combobox from "react-widgets/Combobox";
import DatePicker from "react-widgets/DatePicker";
import TimeInput from "react-widgets/TimeInput";

function RentalInfo({
  pickUpDetails,
  setPickUpDetails,
  dropOffDetails,
  setDropOffDetails,
}: RentalInfoProps) {
  return (
    <div className="my-8 rounded-md bg-white p-4">
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-secondinary-500 font-bold mb-1 sm:text-xl">
            Rental Info
          </h1>
          <p className="text-xs text-secondinary-300 font-medium sm:text-sm">
            Please select your rental date
          </p>
        </div>
        <h2 className="text-secondinary-300 text-xs font-medium sm:text-sm">
          Step 2 of 4
        </h2>
      </div>

      <div className="mb-8">
        <h1 className="text-secondinary-500 font-semibold mt-6 mb-4">
          Pick-Up
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
          <div className="">
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Locations
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <Combobox
                onChange={(value) =>
                  setPickUpDetails({ ...pickUpDetails, location: value })
                }
                name="location"
                data={citiesInIran}
                placeholder="Select your city"
              />
            </div>
          </div>
          <div>
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Date
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <DatePicker
                onChange={(value) =>
                  setPickUpDetails({
                    ...pickUpDetails,
                    date: formatDate(value),
                  })
                }
                name="date"
                min={new Date()}
              />
            </div>
          </div>
          <div>
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Time
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <TimeInput
                onChange={(value) =>
                  setPickUpDetails({
                    ...pickUpDetails,
                    time: formatTime(value),
                  })
                }
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-secondinary-500 font-semibold mt-6 mb-4">
          Drop-Off
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
          <div>
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Locations
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <Combobox
                onChange={(value) =>
                  setDropOffDetails({ ...dropOffDetails, location: value })
                }
                data={citiesInIran}
                placeholder="Select your city"
              />
            </div>
          </div>
          <div>
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Date
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <DatePicker
                onChange={(value) =>
                  setDropOffDetails({
                    ...dropOffDetails,
                    date: formatDate(value),
                  })
                }
                min={new Date(pickUpDetails.date)}
              />
            </div>
          </div>
          <div>
            <label className="text-secondinary-500 text-sm font-semibold mb-2 inline-block">
              Time
            </label>
            <div className="bg-[#F6F7F9] rounded-lg">
              <TimeInput
                onChange={(value) =>
                  setDropOffDetails({
                    ...dropOffDetails,
                    time: formatTime(value),
                  })
                }
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentalInfo;

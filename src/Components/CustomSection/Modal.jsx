import { format } from "date-fns";
import { ClockIcon, CalendarIcon } from "lucide-react";
// import CalendarComponent from "./CalendarComponent";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Modal = ({
  selectedDrinkDetails,
  input2,
  setInput2,
  formData,
  updateFormData,
  errors,
  onClose,
  handleOrderNow,
}) => {
  if (!selectedDrinkDetails) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4 sm:px-6"
      onClick={onClose}
    >
      <div
        className="bg-white pt-[75px] pb-[100px] px-6 sm:px-[40px] md:pl-[58px] md:pr-[91px] rounded-lg relative w-full max-w-[651px] max-h-[95vh] overflow-y-auto z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-4 text-2xl font-bold cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>

        {/* Drink Details */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="px-[38px] py-[15px] border border-[#DBA514] rounded-[6px] flex justify-center items-center">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${
                selectedDrinkDetails.image
              }`}
              alt={selectedDrinkDetails.name}
              className="max-w-full h-auto"
            />
          </div>

          <div className="flex-1">
            <p className="text-2xl font-instrument text-[#0E0E0E]">
              {selectedDrinkDetails.description}
            </p>
            <h3 className="text-base text-[#000] py-2">
              Brand: {selectedDrinkDetails.name}
            </h3>
            <div className="flex items-center gap-2">
              {/* You can pass renderStars function as a prop if needed */}
              {selectedDrinkDetails.review}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 py-2">
              <input
                type="number"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                className="px-2 py-2 border rounded-[4px] outline-none text-[#000] w-full sm:w-[75px]"
              />
              <select className="px-2 py-2 border rounded-[4px] text-[#000] w-full sm:w-[135px]">
                <option>Bottles</option>
                <option>Glass</option>
              </select>
            </div>

            <p className="text-2xl font-semibold text-[#000] mt-2">
              {input2 > 1
                ? `$${(input2 * selectedDrinkDetails.selling_price).toFixed(2)}`
                : `$${selectedDrinkDetails.selling_price}`}
            </p>
          </div>
        </div>

        {/* Shots Time */}
        <div className="pl-2 md:pl-6">
          <h3 className="text-[#0E0E0E] text-2xl font-normal font-instrument pt-5">
            Shots Time
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
            {/* Time Input */}
            <div>
              <Label
                htmlFor="hours"
                className="block font-normal text-lg text-[#000]"
              >
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                )}
                <span className="flex justify-between px-3 py-3 border border-[#6B6B6B] mb-2 text-lg rounded-[4px] items-center">
                  Time
                  <ClockIcon className="size-6 text-[#4E4E4E] opacity-90" />
                </span>
                <div className="flex gap-1 items-center bg-white rounded-md border border-input w-full max-w-[225px]">
                  <input
                    type="number"
                    placeholder="00"
                    value={formData.hours}
                    onChange={(e) => updateFormData("hours", e.target.value)}
                    className="bg-[#F8F8FF] text-black w-1/3 text-center outline-none h-10"
                  />
                  <input
                    type="number"
                    placeholder="00"
                    value={formData.minutes}
                    onChange={(e) => updateFormData("minutes", e.target.value)}
                    className="bg-[#F8F8FF] text-black w-1/3 text-center outline-none h-10"
                  />
                  <select
                    value={formData.ampm}
                    onChange={(e) => updateFormData("ampm", e.target.value)}
                    className="bg-[#F8F8FF] text-black w-1/3 text-center outline-none text-sm appearance-none h-10"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </Label>
            </div>

            {/* Date Picker */}
            <div>
              <Button
                variant="outline"
                className="w-full justify-between text-left h-14 font-normal text-lg text-[#000]"
                type="button"
              >
                {formData.date ? format(formData.date, "PPP") : "Date"}
                <CalendarIcon className="size-6" />
              </Button>
              <div className="mt-2">
                <CalendarComponent
                  className="border border-black/5 rounded-[4px] p-3 w-fit"
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => updateFormData("date", date)}
                  initialFocus
                />
              </div>
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Now Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleOrderNow}
            className="py-3 px-16 sm:py-4 sm:px-20 text-lg cursor-pointer rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] text-[#0E0E0E] font-semibold"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

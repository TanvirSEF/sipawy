import { cn } from "@/lib/utils";
import { useState } from "react";

const NotifyBtn = ({height="h-10"}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
  };

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      className={cn(
        "group relative inline-flex aspect-2/1 flex-shrink-0 items-center rounded-full bg-gray-200 transition-all duration-300 ease-in-out",
        isChecked ? "bg-[#DBA514]" : "bg-[#E0E0E0]", height
      )}
    >
      <span
        className={cn(
          "absolute bottom-[2px] top-[2px] flex aspect-square items-center justify-center rounded-full bg-transparent transition-all duration-500 ease-in-out",
          isChecked ? "translate-x-[22px]" : "translate-x-[2px]"
        )}
      >
        <span className="h-full w-full rounded-full border-1 border-white bg-transparent" />
      </span>
    </button>
  );
};

export default NotifyBtn;

import { useState } from "react";

const TextWithReadMore = ({ children, wordLimit=100, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = children;
  return (
    <p {...props}>
      {isExpanded ? text : text?.slice(0, wordLimit) + "..."}{" "}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[#DBA514] cursor-pointer"
      >
        {isExpanded ? " Read less" : " Read more"}
      </button>
    </p>
  );
};

export default TextWithReadMore;

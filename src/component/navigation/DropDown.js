import React from "react";

const DropDown = ({ open, onToggle, className, content, arrow }) => {
  return (
    open && (
      <div
        onClick={onToggle}
        className={`dropdown shadow-dropdown ${className && className}`}
      >
        {content ? content : null}
        <div
          className={`absolute inset-0 z-[-1] flex  
          ${
            arrow === "bottomRight" ? "rotate-180 justify-start mr-6 -mb-2" : ""
          } 
          ${arrow === "topLeft" ? "justify-start ml-6 -mt-2" : ""} 
          ${arrow === "centerTop" ? "justify-center -mt-2" : ""}
          ${arrow === "centerBottom" ? "rotate-180 justify-center -mb-2" : ""}
          ${arrow === "topRight" ? "justify-end mr-6 -mt-2" : ""}
          ${arrow === "bottomLeft" ? "rotate-180 justify-end ml-6 -mb-2" : ""}`}
        >
          <svg
            className={"text-right"}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path fill={"white"} d="M24 22h-24l12-20z" />
          </svg>
        </div>
      </div>
    )
  );
};
export default DropDown;

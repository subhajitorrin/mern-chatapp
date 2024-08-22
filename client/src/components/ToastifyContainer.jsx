import React from "react";
import { CiWarning } from "react-icons/ci";

function ToastifyContainer() {
  return (
    <div
      id="toast"
      className={`opacity-0 fixed top-[10%] w-full flex justify-center left-0 pointer-events-none transition-opacity duration-1000 `}
    >
      <div className="flex gap-[10px] w-[200px] py-[7px] bg-[#ffffff1f] border-[#ffffff37] border rounded-[5px] text-white justify-center">
        <span className="flex items-center gap-[5px] ml-[-5px]">
          <span>
            <CiWarning />
          </span>
          <span id="toasttext"></span>
        </span>
      </div>
    </div>
  );
}

export default ToastifyContainer;

import React from "react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";

const Dashboard = () => {
  return (
    <div className="border border-black min-h-[70vh]">
      {/* header */}
      <div className="flex border justify-evenly border-green-200 p-10 gap-2">
        <div className="flex items-center border border-black py-2 rounded-xl gap-4 cursor-pointer min-w-60 justify-center">
          <MdOutlineProductionQuantityLimits className="text-6xl text-blue-900" />
          <div className="text-2xl flex flex-col">
            <span>Product</span>
            <span>10</span>
          </div>
        </div>
        <div className="flex items-center border border-black py-2 rounded-xl gap-4 cursor-pointer min-w-60 justify-center">
          <BiCategoryAlt className="text-6xl text-blue-900" />
          <div className="text-2xl flex flex-col">
            <span>Category</span>
            <span>10</span>
          </div>
        </div>
        <div className="flex items-center border border-black py-2 rounded-xl gap-4 cursor-pointer min-w-60 justify-center">
          <MdOutlineProductionQuantityLimits className="text-6xl text-blue-900" />
          <div className="text-2xl flex flex-col">
            <span>Sold</span>
            <span>10</span>
          </div>
        </div>
        <div className="flex items-center border border-black py-2 rounded-xl gap-4 cursor-pointer min-w-60 justify-center">
          <MdOutlineProductionQuantityLimits className="text-6xl text-blue-900" />
          <div className="text-2xl flex flex-col">
            <span>Product</span>
            <span>10</span>
          </div>
        </div>
      </div>
      {/* Body */}
      <div>
        <p>Body</p>
      </div>
    </div>
  );
};

export default Dashboard;

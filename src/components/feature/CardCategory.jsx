import React, { useState } from "react";
import { getAllCategoryUser } from "../../storeReduxToolkit/thunksRedux/userCategoryThunk";
import { Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";

const CardCategory = ({ parmCategory, handleParamCategory }) => {
  const dispatch = useDispatch();
  const [showCategory, setShowCategory] = useState(false);
  // Redux
  const { userCategories, isLoading, isError } = useSelector(
    (state) => state.userCategory
  );

  const handleShowCategory = () => {
    setShowCategory(!showCategory);
    dispatch(getAllCategoryUser());
  };

  return (
    <div className="rounded-b-xl text-center sm:col-span-1">
      <h2
        className="py-2 px-1 bg-blue-600 rounded-t-xl font-bold text-md cursor-pointer"
        onClick={handleShowCategory}
      >
        Kategori
      </h2>
      {showCategory ? (
        <div
          className={`p-4 transition-opacity duration-300 border rounded-b-lg border-blue-400 ${
            showCategory ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 max-h-36 overflow-y-scroll">
            <Skeleton loading={isLoading} active>
              <span
                onClick={() => handleParamCategory("")}
                className={`font-semibold whitespace-nowrap hover:bg-blue-300 hover:text-black hover:cursor-pointer ${
                  parmCategory == "" ? "bg-blue-400" : ""
                }`}
              >
                All Category
              </span>
              {userCategories &&
                userCategories.map((category, index) => {
                  return (
                    <span
                      key={category.id}
                      onClick={() => handleParamCategory(category.id)}
                      className={`font-semibold whitespace-nowrap hover:bg-blue-300 hover:text-black hover:cursor-pointer ${
                        category.id == parmCategory ? "bg-blue-400" : ""
                      }`}
                    >
                      {category.name}
                    </span>
                  );
                })}
            </Skeleton>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CardCategory;

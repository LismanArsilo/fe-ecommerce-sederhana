import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../storeReduxToolkit/thunksRedux/categoryThunk";

const AboutPage = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, isError } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  return (
    <div>
      <h1>About Page</h1>
      {categories &&
        categories.map((category) => {
          return (
            <div key={category.id}>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
          );
        })}
    </div>
  );
};

export default AboutPage;

import React, { use } from "react";
import { EachLatestProduct } from "../EachLatestProduct/EachLatestProduct";

export const LatestProducts = ({ latestProductsPromise }) => {
  const latestProducts = use(latestProductsPromise);

  if (latestProducts.length === 0) {
    return (
      <p className="text-center my-10 text-gray-500">
        No latest products found.
      </p>
    );
  }

  return (
    <div className="text-center">
      <div className="my-10">
        <h1 className="text-3xl font-bold">Latest Products</h1>
        <p className="text-xl mt-5">
          Discover the newest additions to our global marketplace
        </p>
      </div>

      <div className="w-15/17 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {latestProducts.map((eachLatestProduct) => (
          <EachLatestProduct
            key={eachLatestProduct._id}
            eachLatestProduct={eachLatestProduct}
          />
        ))}
      </div>
    </div>
  );
};

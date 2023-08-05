import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  selectProductIds,
  useGetProductsQuery,
} from "./productSlice";
import Products from "./Products";
import PopupForm from "../../components/PopupForm";

const ProductsList = () => {
  const { isSuccess, isError, isLoading, error } = useGetProductsQuery({
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const orderedProductIds = useSelector(selectProductIds);
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = orderedProductIds.map((productId) => (
      <Products key={productId} productId={productId} />
    ));
  } else if (isError) {
    content = <p>{error.message}</p>;
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="my-3 mx-3">
      <div className="relative flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon3"
        />
        <button
          className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
          type="button"
          id="button-addon3"
          data-te-ripple-init
        >
          Search
        </button>
      </div>
      <div className="grid gap-4 place-content-center h-max">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <button
              className="mb-4 border rounded p-2 bg-blue-500"
              onClick={openPopup}
            >
              Add Product
            </button>
            <PopupForm isOpen={isPopupOpen} onClose={closePopup} />
            <div className="overflow-hidden">
              <table className="table-auto border-collapse border border-slate-500">
                <thead>
                  <tr>
                    <th className="border border-slate-600">Foto</th>
                    <th className="border border-slate-600">Nama Produk</th>
                    <th className="border border-slate-600">Harga Beli</th>
                    <th className="border border-slate-600">Harga Jual</th>
                    <th className="border border-slate-600">Stock</th>
                    <th className="border border-slate-600">Action</th>
                  </tr>
                </thead>
                {content}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;

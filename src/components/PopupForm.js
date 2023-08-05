import React, { useEffect, useState } from "react";
import { useAddNewProductMutation } from "../features/products/productSlice";

function PopupForm({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [pic, setPic] = useState(null);

  const [addNewProduct, { isSuccess, isLoading }] = useAddNewProductMutation();

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setPic(e.target.files[0].name);
  };

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setBuyPrice(0);
      setSellPrice(0);
      setStock(0);
      setPic("");
    }
  }, [isSuccess]);

  const onNameChange = (e) => setName(e.target.value);
  const onBuyPriceChange = (e) => setBuyPrice(e.target.value);
  const onSellPriceChange = (e) => setSellPrice(e.target.value);
  const onStockChange = (e) => setStock(e.target.value);

  const canSave =
    [name, buyPrice, sellPrice, stock, pic].every(Boolean) && !isLoading;

  const onCreateClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewProduct({ name, buyPrice, sellPrice, stock, pic });
    }
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl mb-4">Create Your Product</h2>
        <form onSubmit={onCreateClicked}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Your Product Name"
              value={name}
              onChange={onNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="buyPrice"
            >
              Buying Price
            </label>
            <input
              type="number"
              min="0"
              id="buyPrice"
              name="buyPrice"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Your Buying Price"
              value={buyPrice}
              onChange={onBuyPriceChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="sellPrice"
            >
              Selling Price
            </label>
            <input
              type="number"
              min="0"
              id="sellPrice"
              name="sellPrice"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Your Selling Price"
              value={sellPrice}
              onChange={onSellPriceChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="sellPrice"
            >
              Stock
            </label>
            <input
              type="number"
              min="0"
              id="stock"
              name="stock"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Your Stock"
              value={stock}
              onChange={onStockChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="pic">
              Image
            </label>
            <input
              type="file"
              id="pic"
              name="pic"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleImageChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            className="ml-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupForm;

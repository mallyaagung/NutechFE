import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectProductById,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./productSlice";
import { useNavigate } from "react-router-dom";

const Products = ({ productId }) => {
  const product = useSelector((state) => selectProductById(state, productId));

  const navigate = useNavigate();

  const [name, setName] = useState(product.name);
  const [buyPrice, setBuyPrice] = useState(product.buyprice);
  const [sellPrice, setSellPrice] = useState(product.sellprice);
  const [stock, setStock] = useState(product.stock);
  const [image, setImage] = useState(product.pic);

  const [updateProduct, { isLoading, isSuccess, isError, error }] =
    useUpdateProductMutation();

  const [deleteProduct, { isSuccess: isDelSuccess }] =
    useDeleteProductMutation();

  const onDeleteClicked = async () => {
    await deleteProduct({ id: product.id });
  };

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setBuyPrice("");
      setSellPrice("");
      setStock("");
      setImage("");
      navigate("/");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  return (
    <tbody>
      <tr>
        <td className="border border-slate-600 px-2">
          <img width="100" height="100" src={product.pic} alt={product.name} />
        </td>
        <td className="border border-slate-600 px-2">{product.name}</td>
        <td className="border border-slate-600 px-2">{product.buyprice}</td>
        <td className="border border-slate-600 px-2">{product.sellprice}</td>
        <td className="border border-slate-600 px-2">{product.stock}</td>
        <td className="border border-slate-600 px-2">
          <button className="border rounded">Update</button>
          <button className="border rounded" onClick={onDeleteClicked}>
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default Products;

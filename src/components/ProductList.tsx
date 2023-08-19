import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../types/product.interface";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      const productsAsModel: Product[] = response.data.map(
        (product: Product) => ({
          id: +product.id,
          name: product.title,
          description: product.description,
          price: +product.price,
          image: product.image,
          rating: {
            rate: +product.rating.rate,
            count: +product.rating.count,
          },
        })
      );

      const sortedProducts = productsAsModel.sort((a, b) => a.id - b.id);
      setProducts(sortedProducts);
    };
    getProducts();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "S No", width: 100 },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          style={{ width: 40, height: 40 }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 300 },
    { field: "description", headerName: "Description", width: 500 },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "rating",
      headerName: "Rating (Stock)",
      width: 120,
      renderCell: (params) => (
        <div>
          {params.value.rate} ({params.value.count})
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h3>Products</h3>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={products} columns={columns} />
      </div>
    </div>
  );
};

export default ProductList;

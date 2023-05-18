import { useEffect } from "react";

function Products() {
  useEffect(() => {
    fetch("https://localhost:7168/api/category")
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <div className="products" id="products">
      <h1>Products</h1>
    </div>
  );
}

export default Products;

import { useState, useEffect } from "react";
import { fetchData } from "../../functions/FetchData";
import DataTable from "../../components/table/Table";
import Loader from "../../components/loader/Loader";

export interface ICategories {
  categoryID: number;
  categoryName: string;
  description: string;
}

function Categories() {
  const [categoriesData, setCategoriesData] = useState<ICategories[]>([]);

  useEffect(() => {
    fetchData("https://localhost:7168/api/category").then((res) =>
      setCategoriesData(res)
    );
  }, []);

  if (categoriesData.length === 0) return <Loader />;
  return (
    <div className="categories" id="categories">
      <h1>Categories</h1>
      <DataTable<ICategories>
        data={categoriesData}
        setData={setCategoriesData}
        name="category"
      />
    </div>
  );
}

export default Categories;

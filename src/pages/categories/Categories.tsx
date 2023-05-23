import "./categories.css";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { fetchData } from "../../functions/FetchData";
import Loader from "../../components/loader/Loader";
import DataTable from "../../components/data-table/DataTable";
import ContentModal from "../../components/content-modal/ContentModal";

export interface ICategories {
  categoryID: number;
  categoryName: string;
  description: string;
}

function Categories() {
  const [categoriesData, setCategoriesData] = useState<ICategories[]>([]);
  const [openAddNew, setOpenAddNew] = useState(false);

  const { endpoint, loader, setLoader } = useGlobalContext();

  useEffect(() => {
    setLoader(true);
    fetchData(`${endpoint}/category`).then((res) => {
      setCategoriesData(res);
      setLoader(false);
    });
  }, [endpoint, setLoader]);

  if (loader) return <Loader />;
  return (
    <div className="categories" id="categories">
      <h1>Categories</h1>
      <DataTable<ICategories>
        name="category"
        data={categoriesData}
        setData={setCategoriesData}
        setOpenAddNew={setOpenAddNew}
      />
      <ContentModal<ICategories>
        name="category"
        setData={setCategoriesData}
        open={openAddNew}
        setOpen={setOpenAddNew}
      />
    </div>
  );
}

export default Categories;

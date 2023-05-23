import "./data-table.css";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { fetchData } from "../../functions/FetchData";
import { Table, Button, Input } from "antd";
import { PagesType } from "../../context/GlobalContext";
import type { ColumnsType } from "antd/es/table";
import type { PaginationProps } from "antd/es/pagination";

const { Search } = Input;

type DataTableProps<T extends Object> = {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  name: PagesType;
  setOpenAddNew: React.Dispatch<React.SetStateAction<boolean>>;
};

function DataTable<T extends Object>({
  data,
  setData,
  name,
  setOpenAddNew,
}: DataTableProps<T>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const { endpoint, setLoader } = useGlobalContext();

  useEffect(() => {
    const savedPage = localStorage.getItem("pageNumber");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    } else {
      setCurrentPage(1);
    }
  }, []);

  const onSearch = () => {
    const newData = data.filter((item: T | any) =>
      item[Object.keys(item)[1]]
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );

    console.log(newData);
    // if (newData.length > 0) {
    //   // setData(newData);
    // } else {
    //   // setData(newData);
    //   console.log("no match");
    // }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const deleteItems = () => {
    if (selectedRowKeys.length === 1) {
      fetchData(`${endpoint}/${name}/${selectedRowKeys[0]}`, {
        method: "delete",
      })
        .then(() => {
          setLoader(true);
          return fetchData(`${endpoint}/${name}`);
        })
        .then((res) => {
          setData(res);
          setLoader(false);
        });
      console.log(...selectedRowKeys);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem("pageNumber", `${page}`);
  };

  const columns: ColumnsType<T> =
    data && data.length
      ? [
          ...Object.keys(data[0])?.map((key) => ({
            title: key,
            dataIndex: key,
            key: key,
            sorter: {
              compare: (a: any, b: any) => {
                const valueA = a[key];
                const valueB = b[key];

                if (typeof valueA === "number" && typeof valueB === "number") {
                  return valueA - valueB;
                } else if (
                  typeof valueA === "string" &&
                  typeof valueB === "string"
                ) {
                  return valueA.localeCompare(valueB);
                } else {
                  return String(valueA).localeCompare(String(valueB));
                }
              },
              multiple: 0,
            },
          })),
          {
            title: "Action",
            key: "action",
            render: () => (
              <Button
                className="action-button d-flex justify-content-center align-items-center"
                title="Edit"
              >
                <img src="/assets/icons/edit.svg" alt="edit-icon" />
              </Button>
            ),
          },
        ]
      : [];

  const tableData =
    data && data.length
      ? data?.map((item: any) => ({
          ...item,
          key: item[Object.keys(item)[0]],
        }))
      : [];

  const paginationConfig: PaginationProps = {
    current: currentPage,
    pageSize: 8,
    onChange: onPageChange,
    showTotal: (total: any, range: any) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
    itemRender: (_, type, originalElement) => {
      if (type === "prev") {
        return <Button className="prev-button">Previous</Button>;
      }
      if (type === "next") {
        return <Button className="next-button">Next</Button>;
      }
      return originalElement;
    },
  };

  return (
    <div className="data-table">
      <div className="table-header d-flex justify-content-between align-items-center">
        <div className="delete d-flex align-items-center">
          <Button
            className="button"
            onClick={deleteItems}
            disabled={!hasSelected}
          >
            Delete
          </Button>
          <p className="m-0">
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <div className="search-bar">
            <Search
              placeholder={`Search ${name}...`}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setTimeout(() => onSearch(), 1000);
              }}
              value={searchValue}
            />
          </div>
          <div className="add-new-item">
            <Button className="button" onClick={() => setOpenAddNew(true)}>
              Add new {name}
            </Button>
          </div>
        </div>
      </div>
      <Table<T>
        className={`${name}-table`}
        columns={columns}
        dataSource={tableData}
        rowSelection={rowSelection}
        pagination={paginationConfig}
        tableLayout="auto"
      />
    </div>
  );
}

export default DataTable;

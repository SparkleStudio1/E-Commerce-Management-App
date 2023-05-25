import "./data-table.css";
import { useState, useEffect } from "react";
import { useGlobalContext, PagesType } from "../../context/GlobalContext";
import { fetchData } from "../../functions/FetchData";
import { Table, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { PaginationProps } from "antd/es/pagination";

const { Search } = Input;

type DataTableProps<T extends Object> = {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  name: PagesType;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
};

function DataTable<T extends Object>({
  data,
  setData,
  name,
  setOpenModal,
  setModalType
}: DataTableProps<T>) {
  const [tableData, setTableData] = useState<T[]>(data);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { endpoint, setLoader } = useGlobalContext();

  const hasSelected = selectedRowKeys.length > 0;

  // Detect Table Pagination Current Page
  useEffect(() => {
    const savedPage = localStorage.getItem("pageNumber");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    } else {
      setCurrentPage(1);
    }
  }, []);

  // ==================== Functions ====================

  // Filter Table Items With Name
  const onSearch = (search: string) => {
    if (search !== "") {
      const newData = data.filter((item: T | any) =>
        item[Object.keys(item)[1]].toLowerCase().includes(search.toLowerCase())
      );
      setTableData(newData);
    } else {
      setTableData(data);
    }
  };

  // Delete Table Item/Items
  const onDelete = () => {
    if (selectedRowKeys.length === 1) {
      fetchData(`${endpoint}/${name}/${selectedRowKeys[0]}`, {
        method: "delete",
      })
        .then(() => {
          setLoader(true);
          return fetchData(`${endpoint}/${name}`);
        })
        .then((res) => {
          setLoader(false);
          setData(res);
        });
    }
  };

  // Table Page Change With Pagination, Set Current Page
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem("pageNumber", `${page}`);
  };

  // Table Items Selection
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // ==================== Table Components Config ====================

  // Table Items Selector
  const rowSelectionConfig = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Table Columns
  const columnsConfig: ColumnsType<T> =
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

  // Table Pagination
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

  // ==================== Table Component ====================
  return (
    <div className="data-table">
      <div className="table-header d-flex justify-content-between align-items-center">
        <div className="delete d-flex align-items-center">
          <Button className="button" onClick={onDelete} disabled={!hasSelected}>
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
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <div className="add-new-item">
            <Button
              className="button"
              onClick={() => {
                setOpenModal(true);
                setModalType("add");
              }}
            >
              Add {name}
            </Button>
          </div>
        </div>
      </div>
      <Table<T>
        className={`${name}-table`}
        pagination={paginationConfig}
        rowSelection={rowSelectionConfig}
        columns={columnsConfig}
        dataSource={tableData.map((item: any) => ({
          ...item,
          key: item[Object.keys(item)[0]],
        }))}
      />
    </div>
  );
}

export default DataTable;

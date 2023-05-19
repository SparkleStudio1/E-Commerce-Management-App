import "./table.css";
import { useState } from "react";
import { fetchData } from "../../functions/FetchData";
import { Table, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { PaginationProps } from "antd/es/pagination";

const { Search } = Input;

type DataTableProps<T extends Object> = {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  name: "category" | "product" | "supplier" | "shipper" | "order-list";
};

function DataTable<T extends Object>({
  data,
  setData,
  name,
}: DataTableProps<T>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
      fetchData(`https://localhost:7168/api/Category/${selectedRowKeys[0]}`, {
        method: "delete",
      })
        .then(() => fetchData("https://localhost:7168/api/Category"))
        .then((res) => setData(res));
      console.log(...selectedRowKeys);
    }
  };

  const columns: ColumnsType<T> = [
    ...Object?.keys(data[0])?.map((key) => ({
      title: key,
      dataIndex: key,
      key: key,
      sorter: {
        compare: (a: any, b: any) => {
          const valueA = a[key];
          const valueB = b[key];

          if (typeof valueA === "number" && typeof valueB === "number") {
            return valueA - valueB;
          } else if (typeof valueA === "string" && typeof valueB === "string") {
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
        <Button className="d-flex justify-content-center align-items-center">
          <img src="/assets/icons/edit.svg" alt="edit-icon" />
        </Button>
      ),
    },
  ];

  const tableData = data.map((item: any) => ({
    ...item,
    key: item[Object.keys(item)[0]],
  }));

  const paginationConfig: PaginationProps = {
    pageSize: 8,
    showTotal: (total: any, range: any) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
    itemRender: (_, type, originalElement) => {
      if (type === "prev") {
        return <Button type="primary">Previous</Button>;
      }
      if (type === "next") {
        return <Button type="primary">Next</Button>;
      }
      return originalElement;
    },
  };

  return (
    <div>
      <div className="table-header d-flex justify-content-between align-items-center">
        <div className="delete d-flex align-items-center">
          <Button type="primary" onClick={deleteItems} disabled={!hasSelected}>
            Delete
          </Button>
          <p className="m-0">{hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}</p>
        </div>
        <div className="d-flex align-items-center">
          <div className="search-bar">
            <Search
              placeholder={`Search ${name}...`}
              // onSearch={onSearch}
              style={{ width: 200 }}
            />
          </div>
          <div className="add-new-item">
            <Button type="primary">Add new {name}</Button>
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

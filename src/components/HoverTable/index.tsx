/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Tooltip } from "antd";
import { ExpandAltOutlined, RightOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

import "./index.less";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 2 Lake Park, London No. 2 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
  },
];

const HoverTable: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number>(null as any);
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <div className="hover_operate">
          <RightOutlined />
        </div>
      ),
      width: 0,
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div
            className={`custom-button ${hoveredRow === index ? "show" : ""}`}
            style={{ visibility: hoveredRow === index ? "visible" : "hidden" }}
          >
            <ExpandAltOutlined />
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 80,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address 1",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Long Column Long Column Long Column",
      dataIndex: "address",
      key: "address 2",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Long Column Long Column",
      dataIndex: "address",
      key: "address 3",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Long Column",
      dataIndex: "address",
      key: "address 4",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      onRow={(_, index) => {
        return {
          onMouseEnter: () => setHoveredRow(index as number),
          onMouseLeave: () => setHoveredRow(null as any),
        };
      }}
    />
  );
};

export default HoverTable;

import { SearchOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Space,
  Table,
  TimePicker,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import React, { useMemo, useState } from "react";
import { customRequest } from "../../common/utils";
import "./index.less";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}
// 定义 文本、时间、数字、多选checkbox、日期返回 类型
type ColumnType = "text" | "time" | "number" | "checkbox" | "date";

// 添加自定义筛选组件的接口
interface CustomFilterDropdownProps extends FilterDropdownProps {
  type: ColumnType;
}

// 自定义筛选下拉框组件
const CustomFilterDropdown: React.FC<CustomFilterDropdownProps> = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  type,
}) => {
  const renderFilterInput = () => {
    switch (type) {
      case "text":
        return (
          <Input
            placeholder="请输入搜索内容"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
          />
        );
      case "number":
        return (
          <Space>
            <InputNumber
              placeholder="最小值"
              value={selectedKeys[0]}
              onChange={(val) =>
                setSelectedKeys(
                  val ? [val, selectedKeys[1]] : [null, selectedKeys[1]]
                )
              }
            />
            <span>-</span>
            <InputNumber
              placeholder="最大值"
              value={selectedKeys[1]}
              onChange={(val) =>
                setSelectedKeys(
                  val ? [selectedKeys[0], val] : [selectedKeys[0], null]
                )
              }
            />
          </Space>
        );
      case "date":
        return (
          <DatePicker.RangePicker
            value={selectedKeys as any}
            onChange={(dates) => setSelectedKeys(dates ? dates : ([] as any))}
          />
        );
      case "time":
        return (
          <TimePicker.RangePicker
            value={selectedKeys as any}
            onChange={(times: any) => setSelectedKeys(times ? times : [])}
          />
        );
      case "checkbox":
        const options = ["篮球", "足球", "乒乓球", "羽毛球", "游泳"];
        return (
          <Checkbox.Group
            options={options}
            value={selectedKeys}
            onChange={(values) => setSelectedKeys(values as string[])}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: 8 }} className="custom-filter">
      {renderFilterInput()}
      <br />
      <Space style={{ marginTop: 8 }}>
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
        >
          确定
        </Button>
        <Button
          onClick={() => {
            clearFilters?.();
            confirm();
          }}
          size="small"
        >
          重置
        </Button>
      </Space>
    </div>
  );
};

// 获取筛选配置
const getFilterConfig = (type: ColumnType, dataIndex: string) => {
  const baseConfig = {
    sorter: true,
    filterDropdown: (props: FilterDropdownProps) => (
      <CustomFilterDropdown {...props} type={type} />
    ),
  };

  return {
    ...baseConfig,
  };
};

// 定义列的类型和配置
interface ColumnConfig {
  title: string;
  dataIndex: string;
  key: string;
  type: ColumnType;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
}

// 模拟获取表格列配置
const getTableColumns = (): Promise<ColumnConfig[]> => {
  return customRequest<ColumnConfig[]>({
    data: [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        type: "text",
        sortable: true,
        ...getFilterConfig("text", "name"),
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        type: "number",
        sortable: true,
        ...getFilterConfig("number", "age"),
      },
      {
        title: "地址",
        dataIndex: "address",
        key: "address",
        type: "text",
        ...getFilterConfig("text", "address"),
      },
      {
        title: "日期",
        dataIndex: "date",
        key: "date",
        type: "date",
        ...getFilterConfig("date", "date"),
      },
      {
        title: "时间",
        dataIndex: "time",
        key: "time",
        type: "time",
        ...getFilterConfig("time", "time"),
      },
      {
        title: "多选",
        dataIndex: "checkbox",
        key: "checkbox",
        type: "checkbox",
        ...getFilterConfig("checkbox", "checkbox"),
      },
    ],
  });
};

// 模拟获取表格数据
const getTableData = (): Promise<DataType[]> => {
  const mockData: DataType[] = Array.from({ length: 21 }, (_, index) => ({
    key: String(index + 1),
    name: `用户${index + 1}`,

    age: Math.floor(Math.random() * 40) + 20, // 生成20-60岁之间的随机年龄
    address: `${["北京", "上海市", "广州市", "深圳市", "杭州市"][index % 5]}${
      ["朝阳区", "浦东新区", "天河区", "南山区", "西湖区"][index % 5]
    }`,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    checkbox: ["篮球", "足球", "乒乓球", "羽毛球", "游泳"][index % 5],
  }));

  return customRequest<DataType[]>({
    data: mockData,
  });
};

const MultiSelectTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filteredInfo, setFilteredInfo] = useState<Record<string, string[]>>(
    {}
  );
  const [pagenations, setPagenations] = useState<{
    current: number;
    pageSize: number;
  }>({
    current: 1,
    pageSize: 10,
  });
  const [sortedInfo, setSortedInfo] = useState<
    {
      columnKey: string;
      order?: "ascend" | "descend";
    }[]
  >([]);

  // 获取表格列配置
  const { data: columnConfigs = [], loading: columnsLoading } = useRequest(
    getTableColumns,
    {
      ready: true,
    }
  );

  // 获取表格数据
  const { data: tableData = [], loading: tableDataLoading } = useRequest(
    getTableData,
    {
      ready: true,
    }
  );

  // 处理列配置，添加排序和筛选功能
  const columns = useMemo(() => {
    return columnConfigs.map((config) => {
      const sortItem = sortedInfo.find((item) => item.columnKey === config.key);
      const column: any = {
        ...config,
        sortOrder: sortItem?.order,
        sorter: config.sortable
          ? {
              // 添加多重排序比较函数
              multiple: sortedInfo.findIndex(
                (item) => item.columnKey === config.key
              ),
            }
          : false,
        sortDirections: ["ascend", "descend", null],
        showSorterTooltip: false,
        className: sortItem?.order ? "sorted-column" : "",
      };
      return column;
    });
  }, [columnConfigs, sortedInfo]);
  console.log("columnConfigs", columnConfigs);

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setPagenations({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    setFilteredInfo(filters);

    // 处理排序
    if (Array.isArray(sorter)) {
      // 多列排序情况
      setSortedInfo(
        sorter
          .filter((item) => item.order) // 只保留有排序状态的列
          .map((item) => ({
            columnKey: item.columnKey,
            order: item.order,
          }))
      );
    } else if (sorter.columnKey) {
      // 单列排序情况
      if (sorter.order) {
        // 如果是新的排序，添加到数组末尾
        const newSortedInfo = sortedInfo.filter(
          (item) => item.columnKey !== sorter.columnKey
        );
        newSortedInfo.push({
          columnKey: sorter.columnKey,
          order: sorter.order,
        });
        setSortedInfo(newSortedInfo);
      } else {
        // 如果取消排序，从数组中移除
        setSortedInfo(
          sortedInfo.filter((item) => item.columnKey !== sorter.columnKey)
        );
      }
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="multi-select-table">
      <Row>
        <Col>pagenations {JSON.stringify(pagenations)}</Col>
      </Row>
      <Row>
        <Col>filteredInfo {JSON.stringify(filteredInfo)}</Col>
      </Row>
      <Row>
        <Col>sortedInfo {JSON.stringify(sortedInfo)}</Col>
      </Row>
      <Table
        loading={columnsLoading || tableDataLoading}
        rowSelection={rowSelection}
        columns={columns}
        pagination={{
          pageSize: pagenations.pageSize,
          current: pagenations.current,
          total: tableData.length,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `共 ${total} 条`,
        }}
        dataSource={tableData}
        onChange={handleChange}
      />
    </div>
  );
};

export default React.memo(MultiSelectTable);

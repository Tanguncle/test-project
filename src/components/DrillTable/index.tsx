import { Table } from "antd";
import { TableRowSelection } from "antd/lib/table/interface";
import React from "react";
import "./index.less";
import { mockData } from "./mock";

interface IProps {
  [x: string]: any;
}

interface DataType {
  orgId: string;
  parentorgId: string;
  orgName: string;
  notSendNum: number;
  projectAndMilestone: string;
  shopIncorrectNum: number;
  targetNotEnoughNum: number;
  totalRemindeNum: number;
  remindNum: number;
  regimentMonitorDetailList?: DataType[];
}

const DrillTable: React.FC<IProps> = (props) => {
  console.log(props);
  const data: DataType[] = mockData;

  const getCurrentChildrenList = (parentorgId: string, list) => {
    let childrenList = {} as DataType;
    list.forEach((item) => {
      if (item.orgId === parentorgId) {
        childrenList = item;
      } else if (item?.regimentMonitorDetailList?.length) {
        childrenList = getCurrentChildrenList(
          parentorgId,
          item?.regimentMonitorDetailList
        );
      }
    });
    return childrenList;
  };

  const getCurRowSpan = (record: DataType, index: number) => {
    const subChildren = getCurrentChildrenList(
      record?.parentorgId,
      data
    )?.regimentMonitorDetailList;
    const curItemOrgId = subChildren?.[index]?.orgId;
    const matchItemsNum = subChildren?.filter(
      (item) => (item.orgId = curItemOrgId)
    )?.length;
    const currentIndex = subChildren?.findIndex(
      (item) => (item.orgId = curItemOrgId)
    );
    if (!record?.parentorgId || matchItemsNum === 1 || !record.orgId) return 1;
    if (matchItemsNum > 1 && currentIndex < index && currentIndex !== -1) {
      return matchItemsNum;
    } else {
      return 0;
    }
  };

  const columns: any = [
    {
      title: "架构名称",
      dataIndex: "orgName",
      key: "orgName",
      onCell: (record, a, b) => {
        console.log(
          "%c Line:69 🥝 record",
          "color:#465975",
          data[a],
          getCurRowSpan(record, a)
        );
        return {
          colSpan: 1,
          rowSpan: getCurRowSpan(data[a], a),
          className: record.regimentMonitorDetailList?.length
            ? "cell-expand-borderLess"
            : null,
        };
      },
    },
    {
      title: "项目/里程碑",
      dataIndex: "projectAndMilestone",
      key: "projectAndMilestone",
      render: (text, record, index) => {
        if (record.regimentMonitorDetailList?.length) {
          return <span>应发未发数：{record.notSendNum}</span>;
        } else {
          return text;
        }
      },
      onCell: (record, index) => {
        return {
          colSpan: record.regimentMonitorDetailList?.length ? 5 : 1,
        };
      },
    },
    {
      title: "里程碑进度",
      dataIndex: "milestoneProgress",
      key: "milestoneProgress",
      onCell: (record, index) => {
        return {
          colSpan: record.regimentMonitorDetailList?.length ? 0 : 1,
        };
      },
    },
    {
      title: "进度异常原因",
      dataIndex: "progressAbnormal",
      key: "progressAbnormal",
      onCell: (record, index) => {
        return {
          colSpan: record.regimentMonitorDetailList?.length ? 0 : 1,
        };
      },
    },
    {
      title: "项目拜访覆盖率",
      dataIndex: "project",
      key: "milestoneProgress",
      onCell: (record, index) => {
        return {
          colSpan: record.regimentMonitorDetailList?.length ? 0 : 1,
        };
      },
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
      onCell: (record, index) => {
        return {
          colSpan: record.regimentMonitorDetailList?.length ? 0 : 1,
        };
      },
    },
  ];

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  return (
    <div>
      <Table
        bordered
        columns={columns}
        expandable={{
          childrenColumnName: "regimentMonitorDetailList",
        }}
        // rowKey="orgId"
        rowKey="chaheorgId"
        rowSelection={{
          ...rowSelection,
          hideSelectAll: true,
          checkStrictly: false,
        }}
        dataSource={data}
      />
    </div>
  );
};

export default React.memo(DrillTable);

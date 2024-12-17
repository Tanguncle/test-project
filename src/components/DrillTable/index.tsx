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
  mileStoneId: string;
  orgName: string;
  notSendNum: number;
  projectAndMilestone: string;
  shopIncorrectNum: number;
  targetNotEnoughNum: number;
  totalRemindeNum: number;
  remindNum: number;
  regimentMonitorDetailList?: DataType[];
  [x: string]: any;
}

const DrillTable: React.FC<IProps> = (props) => {
  console.log(props);

  const getRowSpan = (list: DataType[], curOrgId, index) => {
    const matchItemLength = list.filter(
      (item) => item.orgId === curOrgId
    )?.length;
    const hasSameOrgIdBefore =
      list.findIndex((item) => item.orgId === curOrgId) !== index;
    return hasSameOrgIdBefore ? 0 : matchItemLength;
  };

  const formateTableData = (data: DataType[]) => {
    if (!data?.length) return null;
    return data.map((item, index) => ({
      ...item,
      rowSpan: getRowSpan(data, item.orgId, index),
      regimentMonitorDetailList: formateTableData(
        item.regimentMonitorDetailList
      ),
    }));
  };
  const data: DataType[] = formateTableData(mockData);

  const columns: any = [
    {
      title: "架构名称",
      dataIndex: "orgName",
      key: "orgName",
      onCell: (record, a, b) => {
        // console.log("%c Line:53 🍐 record", "color:#93c0a4", record);
        return {
          colSpan: 1,
          rowSpan: record.rowSpan,
          className: record.regimentMonitorDetailList?.length
            ? "cell-expand-borderLess"
            : null,
        };
      },
      // render: (text, record, index) => {
      //   console.log(
      //     "%c Line:64 🍣 text,record, index",
      //     "color:#f5ce50",
      //     text,
      //     record,
      //     index
      //   );
      //   return (
      //     <span>
      //       <Checkbox />
      //       {text}
      //     </span>
      //   );
      // },
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
    columnWidth: 8,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    renderCell: (checked, record, index, originNode) => {
      return {
        children: originNode,
        props: {
          className: "rowSelection-cell",
          rowSpan: record?.rowSpan,
        },
      };
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
        rowKey="mileStoneId"
        // rowKey="orgId"
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

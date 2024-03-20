import { Button, Card, Col, Row } from "antd";
import React from "react";
import { DashBoard } from "./compoents/DashBoard";
import "./index.less";
export const InfoCard: React.FC<any> = (props) => {
  console.log(props);
  return (
    <div className="info-card-wrap">
      <Row gutter={[24, 24]}>
        <Col span={18}>
          <Card
            title="销售预算"
            className="sell-buget-card"
            headStyle={{ border: "none" }}
            bodyStyle={{ paddingTop: 0 }}
            extra={
              <div className="sell-buget-header">
                <span>数据更新：实时</span>
                <Button type="link">预算分配</Button>
              </div>
            }
          >
            <div className="sell-buget-content">
              <div className="left">
                <h2>销售总预算</h2>
                <p>1,500,000.00</p>
                <div className="dashboard">
                  <DashBoard />
                </div>
              </div>
              <div className="right">2</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="机策超补贴强度"
            className="sell-strategy-card"
            headStyle={{ border: "none" }}
            extra={
              <div className="sell-strategy-header">
                <Button type="link">管理商户池</Button>
                <Button type="link">策略分析</Button>
              </div>
            }
          >
            2
          </Card>
        </Col>
        <Col span={9}>
          <Card
            title="项目预算"
            className="sell-project-card"
            headStyle={{ border: "none" }}
            extra={
              <div className="sell-project-header">
                <span>数据更新：实时</span>
              </div>
            }
          >
            2
          </Card>
        </Col>
        <Col span={9}>
          <Card
            title="投资互转"
            className="sell-invest-card"
            headStyle={{ border: "none" }}
            extra={
              <div className="sell-invest-header">
                <span>数据更新：实时</span>
                <Button type="link">投资互转</Button>
              </div>
            }
          >
            2
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="更多资源"
            className="sell-more-card"
            headStyle={{ border: "none" }}
            extra={
              <div className="sell-more-header">
                <span>数据更新：实时</span>
              </div>
            }
          >
            2
          </Card>
        </Col>
      </Row>
    </div>
  );
};

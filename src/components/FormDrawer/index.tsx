import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Form,
  Input,
  Radio,
  Select,
} from "antd";
import React from "react";

import CustomUpload from "./CustomUpload";
import "./index.less";

const { RangePicker } = DatePicker;

const formItemLayout = {
  wrapperCol: { style: { maxWidth: "400px" } },
};

const FormDrawer: React.FC = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="form-drawer">
      <Button type="primary" onClick={() => setOpen(true)}>
        创建商圈补贴
      </Button>
      <Button type="primary" onClick={() => setOpen(true)}>
        查看商圈补贴
      </Button>
      <Drawer
        title="创建商圈补贴"
        open={open}
        onClose={() => setOpen(false)}
        width={1120}
        footer={
          <div className="form-drawer-footer">
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button type="primary" onClick={() => form.submit()}>
              提交圈投策略
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          labelAlign="right"
          labelCol={{ style: { width: 100 } }}
        >
          <div className="form-card-title">基础信息</div>
          <Form.Item
            label="补贴生效场域"
            name="area"
            required={false}
            rules={[{ required: true, message: "请选择补贴生效场域" }]}
            {...formItemLayout}
          >
            <Select
              placeholder="展示A1/A2/A3下的城代专用调用策略"
              options={[
                { label: "A1 策略", value: "A1" },
                { label: "A2 策略", value: "A2" },
                { label: "A3 策略", value: "A3" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="补贴资产类型"
            name="type"
            required={false}
            rules={[{ required: true, message: "请输入补贴资产类型" }]}
            {...formItemLayout}
          >
            <Input value="A2 (店外促销价)" />
          </Form.Item>

          <Form.Item
            label="调用方式"
            name="useType"
            required={false}
            rules={[{ required: true, message: "请输入调用方式" }]}
            {...formItemLayout}
          >
            <Input value="商品" />
          </Form.Item>

          <Form.Item
            label="补贴策略名称"
            name="name"
            required={false}
            rules={[{ required: true, message: "请输入补贴策略名称" }]}
            {...formItemLayout}
          >
            <Input placeholder="请填写名称" />
          </Form.Item>

          <Form.Item
            label="补贴有效期"
            name="validPeriod"
            required={false}
            rules={[{ required: true, message: "请选择补贴有效期" }]}
            {...formItemLayout}
          >
            <RangePicker
              placeholder={["开始日期", "结束日期"]}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <div className="form-card-title">圈品范围</div>
          <Form.Item
            label="圈品方式"
            name="area"
            required={false}
            rules={[{ required: true, message: "请选择圈品范围" }]}
            {...formItemLayout}
          >
            {/* TODO 实现上传组建，onchange和value来自formItem */}
            <CustomUpload />
          </Form.Item>

          <div className="form-card-title">补贴加码(C补)</div>
          <Form.Item
            label="补贴周期"
            name="weekDays"
            required={false}
            rules={[{ required: true, message: "请选择补贴周期" }]}
            wrapperCol={{ style: { maxWidth: "500px" } }}
          >
            <Checkbox.Group>
              {[
                { key: "monday", name: "周一" },
                { key: "tuesday", name: "周二" },
                { key: "wednesday", name: "周三" },
                { key: "thursday", name: "周四" },
                { key: "friday", name: "周五" },
                { key: "saturday", name: "周六" },
                { key: "sunday", name: "周日" },
              ].map((day) => (
                <Checkbox key={day.key} value={day.key}>
                  {day.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            label="补贴时段"
            name="timeSlots"
            required={false}
            rules={[{ required: true, message: "请选择补贴时段" }]}
            wrapperCol={{ style: { maxWidth: "700px" } }}
          >
            <Checkbox.Group>
              {[
                { label: "早餐 (06-10)", value: "breakfast" },
                { label: "午餐 (11-13)", value: "lunch" },
                { label: "下午茶 (14-17)", value: "tea" },
                { label: "晚餐 (18-21)", value: "dinner" },
                { label: "夜宵 (22-05)", value: "midnight" },
              ].map((slot) => (
                <Checkbox key={slot.value} value={slot.value}>
                  {slot.label}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            label="补贴人群"
            name="userType"
            required={false}
            rules={[{ required: true, message: "请选择补贴人群" }]}
            {...formItemLayout}
          >
            <Radio.Group>
              <Radio value="all">全量用户</Radio>
              <Radio value="platform">平台新客</Radio>
              <Radio value="new">频道新客</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="补贴方式"
            name="subsidyType"
            required={false}
            rules={[{ required: true, message: "请选择补贴方式" }]}
            {...formItemLayout}
          >
            <Radio.Group>
              <Radio value="unified">统一补贴</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="代补加码金额"
            name="amount"
            required={false}
            rules={[
              { required: true, message: "请输入代补加码金额" },
              { type: "number", min: 0, message: "金额不能小于0" },
            ]}
            {...formItemLayout}
          >
            <Input suffix="元" type="number" min={0} step={0.01} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default React.memo(FormDrawer);

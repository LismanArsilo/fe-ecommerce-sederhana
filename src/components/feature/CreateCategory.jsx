import React from "react";
import { Button, Form, Input, Space } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCategory } from "../../storeReduxToolkit/thunksRedux/categoryThunk";
import {
  showErrorAlert,
  showFailAlert,
  showSuccessAlert,
} from "../../utils/notificationUtils";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 10,
    },
    sm: {
      span: 14,
    },
  },
};

const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    const response = await dispatch(createCategory(values));
    if (response.payload.status) {
      showSuccessAlert(response.message);
      // navigate("/dashboard/category");
    } else {
      showFailAlert(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-lg text-blue-700">Create Category</span>
      <Form
        {...formItemLayout}
        variant="filled"
        className="p-3 rounded-lg border border-gray-500"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          className="py-2 font-bold"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 20 }}
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input
            inputMode="left"
            className="border border-gray-400 focus:ring-1 "
            autoComplete="off"
          />
        </Form.Item>
        <Space className="flex justify-end items-center mr-10">
          <NavLink to={"/dashboard/category"} className="w-min px-2">
            Back
          </NavLink>
          <Button type="primary" htmlType="submit" className="bg-blue-700">
            Submit
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default CreateCategory;

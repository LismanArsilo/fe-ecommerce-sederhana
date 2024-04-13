import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../storeReduxToolkit/thunksRedux/categoryThunk";
import {
  showErrorAlert,
  showFailAlert,
  showSuccessAlert,
} from "../../utils/notificationUtils";
import {
  getAllColor,
  getListColor,
} from "../../storeReduxToolkit/thunksRedux/colorThunk";
import { getListSize } from "../../storeReduxToolkit/thunksRedux/sizeThunk";
import { createProduct } from "../../storeReduxToolkit/thunksRedux/productThunk";

// Antd
const { TextArea } = Input;

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

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listColors, isLoading, isError } = useSelector(
    (state) => state.color
  );
  const { listCategories } = useSelector((state) => state.category);
  const { listSizes } = useSelector((state) => state.size);

  const handleCreateProduct = async (values) => {
    const response = await dispatch(createProduct(values));
    if (response.payload.status) {
      showSuccessAlert(response.payload.message);
      navigate("/dashboard/product");
    } else {
      showFailAlert(response.payload.message);
    }
  };

  // Bug karena menggunakan paginate jadi hanya mengembalikan jumlah tertentu
  // Jika melakukan search di halaman lain tidak di temukan.
  // Note : Harus search berdasarkan api
  const handleFilterOption = (input, option) => {
    const search = option.label.toLowerCase().includes(input.toLowerCase());
    return search;
  };

  useEffect(() => {
    try {
      dispatch(getListColor());
      dispatch(getAllCategory());
      dispatch(getListSize());
    } catch (error) {
      console.info(error.message);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold text-lg text-blue-700">Create Product</span>
      <Form
        {...formItemLayout}
        variant="filled"
        className="p-3 rounded-lg border border-gray-500 flex flex-col"
        onFinish={handleCreateProduct}
      >
        <div className="flex">
          <div className="flex-1">
            <Form.Item
              label="Name"
              name="name"
              className="py-2 font-bold"
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
                placeholder="Please Input Product Name"
              />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              className="py-2 font-bold"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Select
                className="border border-gray-400 focus:ring-1 rounded-md"
                autoComplete="off"
                placeholder="Please Select Category"
                optionLabelProp="label"
                options={listCategories || []}
              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              className="font-bold"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
                className="border border-gray-400 focus:ring-1  rounded-md"
                autoComplete="off"
                placeholder="Please Input Price"
              />
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item
              label="Colors"
              className="font-bold"
              name="colors"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="Please Select Colors"
                options={listColors || []}
                filterOption={handleFilterOption}
                className="border border-gray-400 focus:ring-1 rounded-md w-full"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              label="Sizes"
              className="py-2 font-bold"
              name="sizes"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="Please Select Sizes"
                options={listSizes || []}
                filterOption={handleFilterOption}
                className="border border-gray-400 focus:ring-1 rounded-md w-full"
                autoComplete="off"
              />
            </Form.Item>
          </div>
        </div>

        <div className="w-full">
          <Form.Item
            label="Description"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 19 }}
            className="py-2 font-bold"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <TextArea
              showCount
              maxLength={100}
              placeholder="Please Input Description"
              style={{
                height: 120,
                resize: "none",
                width: "100%",
              }}
              className="border border-gray-400 focus:ring-1 rounded-md"
            />
          </Form.Item>
        </div>

        <Space className="flex justify-end items-center mr-20">
          <NavLink to={"/dashboard/product"} className="w-min px-2">
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

export default CreateProduct;

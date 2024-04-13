import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProduct,
  getOneProduct,
  uploadProduct,
} from "../../storeReduxToolkit/thunksRedux/productThunk";
import {
  Space,
  Table,
  Skeleton,
  Button,
  Modal,
  Upload,
  Form,
  Image,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import {
  FaRegTrashAlt,
  FaSearchengin,
  FaRegEdit,
  FaUpload,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import {
  showErrorAlert,
  showFailAlert,
  showSuccessAlert,
} from "../../utils/notificationUtils";
import config from "../../config/config";

const Product = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const {
    products,
    product,
    isLoadingAll,
    isLoadingOne,
    paginate,
    isLoadingUpload,
  } = useSelector((state) => state.product);
  const [page, setPage] = useState(paginate);

  // Antd
  const { Column, ColumnGroup } = Table;
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [modalId, setModalId] = useState(null);

  const showModal = (id, modalType) => {
    switch (modalType) {
      case "detail":
        setModalId(id);
        handleGetOneProduct(id);
        setOpenDetail(!openDetail);
        break;
      case "delete":
        setModalId(id);
        setOpenDelete(!openDelete);
        break;
      case "upload":
        setModalId(id);
        setOpenUpload(!openUpload);
        break;
      default:
        console.info("Unknown");
    }
  };

  const handleGetOneProduct = async (id) => {
    try {
      await dispatch(getOneProduct(id));
    } catch (error) {
      console.info(error);
    }
  };

  const handleDeleteProduct = async () => {
    const response = await dispatch(deleteProduct(modalId));
    if (response.payload.status) {
      showSuccessAlert(response.payload.message);
      setOpenDelete(!openDelete);
    } else {
      showFailAlert(response.payload.message);
      setOpenDelete(!openDelete);
    }
  };

  const handleUploadProduct = async (values) => {
    const payload = values?.dragger;
    const response = await dispatch(
      uploadProduct({ payload: payload, id: modalId })
    );
    if (response.payload.status) {
      showSuccessAlert(response.payload.message);
      setOpenUpload(!openUpload);
    } else {
      showErrorAlert(response.payload);
    }
  };

  // Custom
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let useParams = {
      page: page,
      keyword: search,
    };
    dispatch(getAllProduct(useParams));
  }, [page, search]);

  return (
    <div>
      <div className="p-2 flex items-center justify-between mb-3">
        <h1 className="font-bold text-xl text-blue-500">Products Dashboard</h1>
        <div className=" relative">
          <FaSearchengin className="absolute top-2 left-2 text-lg" />
          <input
            type="text"
            className="border border-black pl-7 pr-1 py-1 rounded-lg focus:outline-dotted focus:ring focus:border-blue-900"
            name="keyword"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="my-4 ml-2">
        <NavLink
          to={"/dashboard/product/create"}
          className=" px-3 py-1 rounded-lg bg-blue-700 text-white hover:cursor-pointer"
        >
          Create Product
        </NavLink>
      </div>
      <Skeleton loading={isLoadingAll} active>
        <Table
          dataSource={products.data || []}
          rowKey={(record) => record.id}
          bordered
          pagination={{
            pageSize: products.per_page,
            showQuickJumper: true,
            current: paginate || 1,
            total: products?.total,
            onChange: (page) => {
              setPage(page);
            },
          }}
        >
          <Column
            title="No."
            key="index"
            render={(_, __, index) => (
              <span>{(paginate - 1) * products.per_page + index + 1}</span>
            )}
          />
          <ColumnGroup title="Name" key={products.id}>
            <Column title="First Name" dataIndex="name" key="name" />
            <Column title="Last Name" dataIndex="name" key="name" />
          </ColumnGroup>
          <Column
            title="Category"
            dataIndex="category"
            key="category"
            render={(text, record) => text.name}
          />

          <Column
            title="Price"
            dataIndex="price"
            key="price"
            render={(text) => (
              <span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(Number(text))}
              </span>
            )}
          />

          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  className="cursor-pointer text-blue-700 hover:border-blue-900"
                  type="dashed"
                >
                  <FaRegEdit />
                </Button>
                <Button
                  className="cursor-pointer text-red-700"
                  onClick={() => showModal(record.id, "delete")}
                  type="dashed"
                >
                  <FaRegTrashAlt />
                </Button>
                <Button
                  className="cursor-pointer text-green-700"
                  onClick={() => showModal(record.id, "detail")}
                  type="dashed"
                >
                  <TbListDetails />
                </Button>
                <Button
                  className="cursor-pointer text-black"
                  onClick={() => showModal(record.id, "upload")}
                  type="dashed"
                >
                  <FaUpload />
                </Button>
              </Space>
            )}
          />
        </Table>
      </Skeleton>

      {/* Modal Delete */}
      <Modal
        title={<div className="border-b border-b-red-400">Product Delete</div>}
        open={openDelete}
        onOk={handleDeleteProduct}
        onCancel={(prev) => setOpenDelete(!prev)}
        headerBg="bg-black"
        okButtonProps={{ className: "bg-red-700 hover:bg-red-900" }}
      >
        <span className="text-lg">Are Your Sure Delete ?</span>
      </Modal>
      {/* Modal Detail */}
      <Modal
        title={
          <div className="border-b border-b-green-400">Product Detail</div>
        }
        open={openDetail}
        onCancel={(prev) => setOpenDetail(!prev)}
        headerBg="bg-black"
        okButtonProps={{ className: "hidden" }}
      >
        <Skeleton loading={isLoadingOne} active>
          {product && (
            <div className="flex flex-col mt-3">
              <div className="flex">
                <div className="flex flex-1 flex-col gap-2">
                  <div className="">
                    <span className="text-md mr-2 font-semibold">Name :</span>
                    <span className="text-md font-semibold">
                      {product.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-md mr-2 font-semibold">
                      Category :
                    </span>
                    <span className="text-md font-semibold">
                      {product.category.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-md mr-2 font-semibold">Price :</span>
                    <span className="text-md font-semibold">
                      {product.price}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col mr-2 gap-2">
                  <div className="flex">
                    <span className="text-md mr-2 font-semibold">Colors :</span>
                    <div className="flex gap-2">
                      {product.colors && product.colors.length > 0 ? (
                        product.colors.map((color) => (
                          <span
                            key={color.id}
                            className={`text-md bg-${color.color_name}-300 px-2 rounded-md font-semibold`}
                          >
                            {color.color_name}
                          </span>
                        ))
                      ) : (
                        <span className="text-md bg-red-500 px-2 rounded-md font-semibold">
                          Color Not Found
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-md mr-2 font-semibold">Sizes :</span>
                    <div className="flex gap-2">
                      {product.sizes && product.sizes.length > 0 ? (
                        product.sizes.map((size) => (
                          <span
                            key={size.id}
                            className={`text-md bg-green-300 px-2 rounded-md font-semibold`}
                          >
                            {size.size_name}
                          </span>
                        ))
                      ) : (
                        <span className="text-md bg-red-500 px-2 rounded-md font-semibold">
                          Size Not Found
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <span className="text-md font-semibold block mt-3">
                    Description :
                  </span>
                  <span className="text-md" style={{ whiteSpace: "pre-line" }}>
                    {product.description}
                  </span>
                </div>
              </div>
              <div className="flex mt-2 gap-3 justify-center overflow-x-scroll">
                {product.images.map((img) => {
                  return (
                    <Image
                      width={200}
                      src={config.apiImg + img.image_name}
                      className="max-w-36 object-cover cursor-pointer rounded-lg"
                    />
                  );
                })}
              </div>
            </div>
          )}
        </Skeleton>
      </Modal>
      {/* Modal Upload */}
      <Modal
        title={
          <div className="border-b border-b-black-400">Product Upload</div>
        }
        open={openUpload}
        okButtonProps={{ className: "hidden" }}
        onCancel={() => setOpenUpload(!openUpload)}
        destroyOnClose={true}
      >
        <Form onFinish={handleUploadProduct}>
          <Skeleton loading={isLoadingUpload} active>
            <Form.Item name="dragger" valuePropName="files" noStyle>
              <Upload.Dragger
                multiple
                name="files"
                maxCount={3}
                beforeUpload={(file) => {
                  return false;
                }}
                accept="image/jpeg,image/png,image/gif" // Hanya menerima file gambar (JPEG, PNG, GIF)
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-black border border-blue-900 w-[100%] mt-2"
            >
              Upload
            </Button>
          </Skeleton>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;

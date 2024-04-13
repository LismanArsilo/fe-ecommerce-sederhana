import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  deleteCategory,
  getOneCategory,
} from "../../storeReduxToolkit/thunksRedux/categoryThunk";
import { showFailAlert, showSuccessAlert } from "../../utils/notificationUtils";
import { NavLink } from "react-router-dom";
import { Button, Modal, Skeleton, Space, Table } from "antd";
import { FaRegEdit, FaRegTrashAlt, FaSearchengin } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";

const Category = () => {
  const { category, categories, isLoadingAll, isLoadingOne, paginate } =
    useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(paginate);
  // Antd
  const { Column, ColumnGroup } = Table;
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [modalId, setModalId] = useState(null);

  const showModal = (id, modalType) => {
    switch (modalType) {
      case "detail":
        setModalId(id);
        handleGetOneCategory(id);
        setOpenDetail(!openDetail);
        break;
      case "delete":
        setModalId(id);
        setOpenDelete(!openDelete);
        break;
      default:
        console.info("Unknown");
    }
  };

  const handleGetOneCategory = async (id) => {
    try {
      await dispatch(getOneCategory(id));
    } catch (error) {
      console.info(error);
    }
  };

  const handleDeleteCategory = async (e) => {
    const response = await dispatch(deleteCategory(modalId));
    if (response.payload.status) {
      showSuccessAlert(response.payload.message);
      setOpenDelete(!openDelete);
    } else {
      showFailAlert(response.payload.message);
      setOpenDelete(!openDelete);
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
    dispatch(getAllCategory(useParams));
  }, [page, search]);

  return (
    <div>
      <div className="p-2 flex items-center justify-between mb-3">
        <h1 className="font-bold text-xl text-blue-500">Category Dashboard</h1>

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
          to={"/dashboard/category/create"}
          className=" px-3 py-1 rounded-lg bg-blue-700 text-white hover:cursor-pointer"
        >
          Create Category
        </NavLink>
      </div>
      <Skeleton loading={isLoadingAll} active>
        <Table
          dataSource={categories.data || []}
          rowKey={(record) => record.id}
          bordered
          pagination={{
            pageSize: categories.per_page,
            showQuickJumper: true,
            current: paginate || 1,
            total: categories?.total,
            onChange: (page) => {
              setPage(page);
            },
          }}
        >
          <Column
            title="No."
            key="index"
            render={(_, __, index) => (
              <span>{(paginate - 1) * categories.per_page + index + 1}</span>
            )}
          />
          <ColumnGroup title="Name" key={categories.id}>
            <Column title="First Name" dataIndex="name" key="name" />
            <Column title="Last Name" dataIndex="name" key="name" />
          </ColumnGroup>
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
              </Space>
            )}
          />
        </Table>
      </Skeleton>
      {/* Modal Delete */}
      <Modal
        title={<div className="border-b border-b-red-400">Category Delete</div>}
        open={openDelete}
        onOk={handleDeleteCategory}
        onCancel={(prev) => setOpenDelete(!prev)}
        headerBg="bg-black"
        okButtonProps={{ className: "bg-red-700 hover:bg-red-900" }}
      >
        <span className="text-lg">Are Your Sure Delete ?</span>
      </Modal>
      {/* Modal Detail */}
      <Modal
        title={
          <div className="border-b border-b-green-400">Category Detail</div>
        }
        open={openDetail}
        onCancel={(prev) => setOpenDetail(!prev)}
        headerBg="bg-black"
        okButtonProps={{ className: "hidden" }}
      >
        <Skeleton loading={isLoadingOne} active>
          <div className="mt-3">
            {category && (
              <div>
                <span className="text-md mr-2 font-semibold">
                  Category Name :
                </span>
                <span className="text-md font-semibold">{category.name}</span>
              </div>
            )}
          </div>
        </Skeleton>
      </Modal>
    </div>
  );
};

export default Category;

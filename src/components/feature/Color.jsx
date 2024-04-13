import { Button, Modal, Skeleton, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaSearchengin } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import {
  deleteColor,
  getAllColor,
  getOneColor,
} from "../../storeReduxToolkit/thunksRedux/colorThunk";
import { useDispatch, useSelector } from "react-redux";
import { showFailAlert, showSuccessAlert } from "../../utils/notificationUtils";

const Color = () => {
  const { colors, color, isLoadingAll, isLoadingOne, paginate } = useSelector(
    (state) => state.color
  );
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
        handleGetOneColor(id);
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

  const handleGetOneColor = async (id) => {
    try {
      await dispatch(getOneColor(id));
    } catch (error) {
      console.info(error);
    }
  };

  const handleDeleteColor = async () => {
    const response = await dispatch(deleteColor(modalId));
    if (response.payload.status) {
      showSuccessAlert(response.payload.message);
      setOpenDelete(!openDelete);
    } else {
      showFailAlert(response.payload.message);
      setOpenDelete(!openDelete);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let useParams = {
      page: page,
      keyword: search,
    };
    dispatch(getAllColor(useParams));
  }, [search]);
  return (
    <div>
      <div className="p-2 flex items-center justify-between mb-3">
        <h1 className="font-bold text-xl text-blue-500">Color Dashboard</h1>

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
          to={"/dashboard/color/create"}
          className="px-3 py-1 rounded-lg bg-blue-700 text-white hover:cursor-pointer"
        >
          Create Color
        </NavLink>
      </div>
      <Skeleton loading={isLoadingAll} active>
        <Table
          dataSource={colors.data || []}
          rowKey={(record) => record.id}
          bordered
          pagination={{
            pageSize: colors.per_page,
            showQuickJumper: true,
            current: paginate || 1,
            total: colors?.total,
            onChange: (page) => {
              setPage(page);
            },
          }}
        >
          <Column
            title="No."
            key="index"
            render={(_, __, index) => (
              <span>{(paginate - 1) * colors.per_page + index + 1}</span>
            )}
          />
          <Column title="Color Name" dataIndex="color_name" key="color_name" />
          <Column
            title="Color Show"
            key="color"
            render={(_, record) => (
              <span
                className={`px-10 bg-${record.color_name}-900 border`}
              ></span>
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
              </Space>
            )}
          />
        </Table>
      </Skeleton>
      {/* Modal Delete */}
      <Modal
        title={<div className="border-b border-b-red-400">Color Delete</div>}
        open={openDelete}
        onOk={handleDeleteColor}
        onCancel={(prev) => setOpenDelete(!prev)}
        headerBg="bg-black"
        okButtonProps={{ className: "bg-red-700 hover:bg-red-900" }}
      >
        <span className="text-lg">Are Your Sure Delete ?</span>
      </Modal>
      {/* Modal Detail */}
      <Modal
        title={<div className="border-b border-b-green-400">Color Detail</div>}
        open={openDetail}
        onCancel={(prev) => setOpenDetail(!prev)}
        headerBg="bg-black"
        okButtonProps={{ className: "hidden" }}
      >
        <Skeleton loading={isLoadingOne} active>
          <div className="mt-3">
            {color && (
              <div>
                <span className="text-md mr-2 font-semibold">Color Name :</span>
                <span className="text-md font-semibold">
                  {color.color_name}
                </span>
              </div>
            )}
          </div>
        </Skeleton>
      </Modal>
    </div>
  );
};

export default Color;

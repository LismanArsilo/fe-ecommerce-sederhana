import { Button, Modal, Skeleton, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaSearchengin } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showFailAlert, showSuccessAlert } from "../../utils/notificationUtils";
import {
  deleteSize,
  getAllSize,
  getOneSize,
} from "../../storeReduxToolkit/thunksRedux/sizeThunk";

const Size = () => {
  const { sizes, size, isLoadingAll, isLoadingOne, paginate } = useSelector(
    (state) => state.size
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
        handleGetOneSize(id);
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

  const handleGetOneSize = async (id) => {
    try {
      await dispatch(getOneSize(id));
    } catch (error) {
      console.info(error);
    }
  };

  const handleDeleteSize = async () => {
    const response = await dispatch(deleteSize(modalId));
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
    dispatch(getAllSize(useParams));
  }, [page, search]);

  return (
    <div>
      <div className="p-2 flex items-center justify-between mb-3">
        <h1 className="font-bold text-xl text-blue-500">Size Dashboard</h1>

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
          to={"/dashboard/size/create"}
          className="px-3 py-1 rounded-lg bg-blue-700 text-white hover:cursor-pointer"
        >
          Create Size
        </NavLink>
      </div>
      <Skeleton loading={isLoadingAll} active>
        <Table
          dataSource={sizes.data || []}
          rowKey={(record) => record.id}
          bordered
          pagination={{
            pageSize: sizes.per_page,
            showQuickJumper: true,
            current: paginate || 1,
            total: sizes?.total,
            onChange: (page) => {
              setPage(page);
            },
          }}
        >
          <Column
            title="No."
            key="index"
            render={(_, __, index) => (
              <span>{(paginate - 1) * sizes.per_page + index + 1}</span>
            )}
          />
          <Column title="Size Name" dataIndex="size_name" key="size_name" />
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
        title={<div className="border-b border-b-red-400">Size Delete</div>}
        open={openDelete}
        onOk={handleDeleteSize}
        onCancel={(prev) => setOpenDelete(!prev)}
        headerBg="bg-black"
        okButtonProps={{ className: "bg-red-700 hover:bg-red-900" }}
      >
        <span className="text-lg">Are Your Sure Delete ?</span>
      </Modal>
      {/* Modal Detail */}
      <Modal
        title={<div className="border-b border-b-green-400">Size Detail</div>}
        open={openDetail}
        onCancel={(prev) => setOpenDetail(!prev)}
        headerBg="bg-black"
        okButtonProps={{ className: "hidden" }}
      >
        <Skeleton loading={isLoadingOne} active>
          <div className="mt-3">
            {size && (
              <div>
                <span className="text-md mr-2 font-semibold">Size Name :</span>
                <span className="text-md font-semibold">{size.size_name}</span>
              </div>
            )}
          </div>
        </Skeleton>
      </Modal>
    </div>
  );
};

export default Size;

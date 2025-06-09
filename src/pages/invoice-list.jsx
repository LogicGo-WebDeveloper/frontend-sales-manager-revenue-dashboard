import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Drawer,
  Pagination,
  Select,
  Spin,
} from "antd";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import { IoEyeOutline, IoFilter } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi";
import DeleteDrawer from "../components/delete-drawer";
import DeleteInvoiceImage from "../assets/images/delete-invoice-image.png";
import SecondryButton from "../components/common/secondry.button";
import { IoIosArrowDown } from "react-icons/io";
import FilterDrawer from "../components/filter-drawer";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/route.const";
import { useFetch, useMutate, useQueryState } from "../hooks/useQuery";
import { ROUTE_PATH } from "../config/api-routes.config";
import { QUERY_KEYS } from "../config/query.const";
import Loader from "../components/common/loader";

const Invoice = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [deleteInvoiceDrawer, setDeleteInvoiceDrawer] = useState(false);
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [invoiceId, setFilterInvoiceId] = useState('');
  const [amount, setFilterAmount] = useState('');
  const [status, setFilterStatus] = useState('');
  const navigate = useNavigate();

  const query = useFetch(
    [QUERY_KEYS.INVOICE.LIST, currentPage, pageSize, searchTerm, invoiceId, amount, status],
    `${ROUTE_PATH.INVOICE.LIST}?page=${currentPage}&limit=${pageSize}${searchTerm ? `&search=${searchTerm}` : ''}${invoiceId ? `&invoiceId=${invoiceId}` : ''}${amount ? `&amount=${amount}` : ''}${status ? `&status=${status}` : ''}`,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading, isError, error, data } = useQueryState(query);

  const formatAmount = (amount) => {
    if (amount === undefined || amount === null) return "";
    return `$${amount.toLocaleString()}`;
  };

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoiceId",
      render: (text) => (
        <span className="text-[#122751] font-normal">{text}</span>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (text) => (
        <span className="text-[#122751] font-normal">
          {new Date(text).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (text) => (
        <span className="text-[#122751] font-normal">
          {new Date(text).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text) => (
        <span className="text-[#122751] font-normal">{formatAmount(text)}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span
          className={`inline-flex justify-center items-center min-w-[85px] py-[2px] px-[10px] rounded-lg text-xs font-medium
            ${
              status === "Paid"
                ? "bg-[#D1FAE5] text-[#059669]"
                : "bg-[#FEE2E2] text-[#DC2626]"
            }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <div
                    className="flex items-center gap-2 p-1"
                    onClick={() => handleViewInvoice(record._id)}
                  >
                    <IoEyeOutline size={18} color="#2363E3" /> View Invoice
                  </div>
                ),
              },
              {
                key: "2",
                label: (
                  <div
                    className="flex items-center gap-2 p-1"
                    onClick={() => {
                      setDeleteInvoiceDrawer(true);
                    }}
                  >
                    <HiOutlineTrash size={18} color="#2363E3" /> Delete Invoice
                  </div>
                ),
              },
            ],
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <MoreOutlined
            style={{ fontSize: 20, color: "#122751", cursor: "pointer" }}
          />
        </Dropdown>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const handleViewInvoice = (invoiceId) => {
    console.log("View Invoice:", invoiceId);
    navigate(ROUTES.DASHBOARD.SETTING_INVOICE.replace(":invoiceId", invoiceId));
  };

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterApply = (values) => {
    console.log('Filtered:', values);
    setFilterInvoiceId(values.invoice || '');
    setFilterAmount(values.amount || '');
    setFilterStatus(values.status || '');
    setCurrentPage(1);
    setFilterDrawer(false);
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="p-4 md:p-6 h-full overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="md:w-1/3">
            <h2 className="sm:text-base text-sm font-semibold text-[#122751]">
              All Invoices
            </h2>
          </div>

          <div className="md:w-3/4 flex justify-center">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              style={{ width: "100%", maxWidth: 300, height: 40 }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="md:w-1/3 flex justify-end">
            <SecondryButton
              style={{
                height: 40,
                borderColor: "#D0D5DD",
                color: "#122751",
                fontWeight: 500,
              }}
              onClick={() => setFilterDrawer(true)}
            >
              <IoFilter /> Filter
            </SecondryButton>
          </div>
        </div>

        <div className="text-[#122751] font-medium text-xs sm:text-sm mb-2">
          Billing Cycle : 01 March 2025 - 01 April 2025
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[calc(60vh-100px)]">
            <Loader />
          </div>
        ) : isError ? (
          <div className="text-red-500 text-center h-64 flex items-center justify-center text-sm">
            Error loading invoices: {error.message}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data?.body || []}
              scroll={{ x: 800 }}
              className="custom-ant-table"
              bordered
              pagination={false}
              footer={() => (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#122751] font-medium">Show</span>
                    <Select
                      value={pageSize}
                      onChange={(value) => {
                        setPageSize(value);
                        setCurrentPage(1);
                      }}
                      style={{ width: 80 }}
                      options={[
                        { value: 10, label: "10" },
                        { value: 20, label: "20" },
                        { value: 30, label: "30" },
                      ]}
                      size="small"
                      className="rounded-md"
                    />
                    <span className="text-[#122751] font-medium">entries</span>
                  </div>
                  {selectedRowKeys.length > 0 && (
                    <div className="flex items-center gap-4">
                      <span className="text-[#122751] font-medium">
                        {selectedRowKeys.length} Selected
                      </span>

                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: "delete",
                              label: (
                                <div
                                  className="flex items-center gap-2"
                                  onClick={() => setDeleteInvoiceDrawer(true)}
                                >
                                  <HiOutlineTrash size={18} color="#2363E3" />
                                  <span className="text-[#122751]">
                                    Delete Invoice
                                  </span>
                                </div>
                              ),
                            },
                          ],
                        }}
                        trigger={["click"]}
                        placement="top"
                      >
                        <Button
                          style={{
                            color: "#122751",
                            fontWeight: "500",
                            padding: "18px 10px",
                            borderRadius: "10px",
                          }}
                        >
                          Action <IoIosArrowDown />
                        </Button>
                      </Dropdown>
                    </div>
                  )}

                  <Pagination
                    align="start"
                    current={currentPage}
                    pageSize={pageSize}
                    total={data?.pagination?.totalItems || 0}
                    onChange={handlePaginationChange}
                  />
                </div>
              )}
            />
          </div>
        )}

      <Drawer
        title="Delete Invoice"
        placement="right"
        onClose={() => setDeleteInvoiceDrawer(false)}
        open={deleteInvoiceDrawer}
        width={600}
        closable={false}
      >
        <DeleteDrawer
          onClose={() => setDeleteInvoiceDrawer(false)}
          image={DeleteInvoiceImage}
          title="Are you sure you want to Delete this Invoices?"
          description="Are you certain you want to Delete all invoice? This action cannot be undone."
          primaryButtonText="Delete Invoice"
        />
      </Drawer>

      <Drawer
        title="Apply Filter"
        placement="right"
        onClose={() => setFilterDrawer(false)}
        open={filterDrawer}
        width={600}
        closable={false}
      >
        <FilterDrawer
          onClose={() => setFilterDrawer(false)}
          onApply={handleFilterApply}
          panelsToShow={["invoice", "amount", "status"]}
        />
      </Drawer>
    </div>
  </div>
  );
};

export default Invoice;

import React, { useEffect, useState } from "react";
import profileImage from "../assets/images/profile-icon.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Dropdown,
  Modal,
  Input,
  Form,
  Drawer,
  message as antdMessage,
} from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import SecondryButton from "./common/secondry.button";
import PrimaryButton from "./common/primary.button";
import { getValidationRule } from "../utils/validation";
import DeleteDrawer from "./delete-drawer";
import deleteMessageImage from "../assets/images/delete-message-image.png";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch, useMutate, useQueryState } from "../hooks/useQuery";
import { QUERY_KEYS, QUERY_METHODS } from "../config/query.const";
import { ROUTE_PATH } from "../config/api-routes.config";
import CardSkeleton from "./common/skeleton";
import { ROUTES } from "../config/route.const";
import { delay } from "../utils/delay";
import LoadingButton from "./common/loading-button";

const { TextArea } = Input;

const OpenTicketCard = () => {
  const [deleteMessageDrawer, setDeleteMessageDrawer] = useState(false);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedReplyId, setSelectedReplyId] = useState(null);
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = antdMessage.useMessage();

  // Redirect if no ticketId is provided
  useEffect(() => {
    if (!ticketId) {
      messageApi.error("No ticket selected");
      navigate(ROUTES.DASHBOARD.CONTACT);
    }
  }, [ticketId, navigate]);

  // Fetch ticket data
  const query = useFetch(
    [QUERY_KEYS.SUPPORT_TICKET.GET_SINGLE, ticketId],
    `${ROUTE_PATH.SUPPORT_TICKET.LIST}/${ticketId}`,
    {
      enabled: !!ticketId,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 0,
      cacheTime: 0,
    }
  );
  const { isLoading, isError, error, data } = useQueryState(query);

  // Reply Mutation
  const { mutate: replyMutation, isPending } = useMutate(
    QUERY_KEYS.SUPPORT_TICKET.REPLY,
    QUERY_METHODS.PATCH,
    ROUTE_PATH.SUPPORT_TICKET.REPLY.replace(":ticketId", ticketId),
    {
      onSuccess: async () => {
        await delay(1000);
        messageApi.success("Reply sent successfully");
        setReplyModalVisible(false);
        form.resetFields();
        // Refetch ticket data to show the reply
        query.refetch();
      },
      onError: (error) => {
        messageApi.error(
          error.response?.data?.message || "Failed to send reply"
        );
      },
    }
  );

  // Delete Reply Mutation
  const { mutate: deleteReplyMutation, isPending: isDeletePending } = useMutate(
    QUERY_KEYS.SUPPORT_TICKET.DELETE_REPLY,
    QUERY_METHODS.DELETE,
    ROUTE_PATH.SUPPORT_TICKET.DELETE_REPLY.replace(
      ":ticketId",
      ticketId
    ).replace(":replyId", selectedReplyId),
    {
      onSuccess: async () => {
        await delay(1000);
        messageApi.success("Reply deleted successfully");
        setDeleteMessageDrawer(false);
        // Refetch ticket data to update the view
        query.refetch();
      },
      onError: (error) => {
        setDeleteMessageDrawer(false);
        messageApi.error(
          error.response?.data?.message || "Failed to delete reply"
        );
      },
    }
  );

  // Close Ticket Mutation
  const { mutate: closeTicketMutation, isPending: isClosePending } = useMutate(
    QUERY_KEYS.SUPPORT_TICKET.RESOLVE,
    QUERY_METHODS.PATCH,
    ROUTE_PATH.SUPPORT_TICKET.RESOLVE.replace(":ticketId", ticketId),
    {
      onSuccess: async () => {
        await delay(1000);
        messageApi.success("Ticket closed successfully");
        query.refetch();
      },
      onError: (error) => {
        console.log("error", error);
        messageApi.error(
          error.response?.data?.message || "Failed to close ticket"
        );
      },
    }
  );
  
  const handleCloseTicket = () => {
    closeTicketMutation({ status: "resolved" });
  };

  const [form] = Form.useForm();

  const handleReplyClick = () => {
    setReplyModalVisible(true);
    form.setFieldsValue({
      recipientEmail: data?.body?.email || "",
      description: "",
    });
  };

  const handleReplySubmit = (values) => {
    replyMutation({
      reply: {
        recipientEmail: values.recipientEmail,
        description: values.description,
      },
    });
  };

  console.log("reply id ??????", selectedReplyId);
  const handleDeleteMessage = (ticketId, replyId = null) => {
    setSelectedReplyId(replyId);
    setDeleteMessageDrawer(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedReplyId) {
      deleteReplyMutation();
    }
  };

  if (isLoading) {
    return <CardSkeleton active count={1} />;
  }

  if (isError || !data?.body) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-full flex items-center justify-center">
        <p className="text-red-500">Error loading ticket. Please try again.</p>
      </div>
    );
  }

  const getDropdownItems = (replyId = null) => [
    {
      key: "delete",
      label: (
        <div
          className="flex items-center gap-2 text-[#122751]"
          onClick={() => handleDeleteMessage(ticketId, replyId)}
        >
          <FaRegTrashAlt color="#2363E3" />
          <span>Delete Message</span>
        </div>
      ),
    },
  ];

  const ticket = data.body;

  return (
    <>
      {contextHolder}

      <div
        className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-between gap-10"
        style={{ height: "100%", maxHeight: "calc(100vh - 200px)" }}
      >
        <div className="overflow-auto pr-2">
          <div className="p-4 border-[#8d94a33f] border rounded-lg mb-6">
            <div className="flex justify-between items-start">
              <img src={profileImage} alt="" className="w-8 h-8 mt-1" />

              <div className="flex-1 ml-3 mt-2 pr-6 border-b border-[#8d94a325] pb-2">
                <p className="font-semibold text-[#122751]">{ticket.email}</p>
                <p className="font-medium text-[#122751] text-sm mt-2">
                  {ticket.title}
                </p>
                <p className="text-[#8D94A3] text-xs font-medium mt-1">
                  {ticket.description}
                </p>
              </div>

              <div className="pr-4">
                <p className="text-[#122751] text-sm">
                  {new Date(ticket.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "2-digit",
                  })}
                </p>
                {/* <Dropdown
                                    placement="bottomRight"
                                    menu={{ items: getDropdownItems() }}
                                    trigger={['click']}
                                >
                                    <BsThreeDotsVertical className="text-[#122751] cursor-pointer font-bold" />
                                </Dropdown> */}
              </div>
            </div>

            <div className="mt-3 flex justify-between pl-11">
              <p className="text-[#122751] text-xs">
                Posted at {new Date(ticket.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {ticket.reply?.map((reply, index) => (
            <div
              key={index}
              className="p-4 border-[#8d94a33f] border rounded-lg mb-6 "
            >
              <div className="flex items-start">
                <img src={profileImage} alt="" className="w-8 h-8 mt-1" />
                <div className="flex-1 ml-3 mt-2 pr-6 border-b border-[#8d94a325] pb-2">
                  <p className="font-semibold text-[#122751]">
                    Reply from {reply.replyBy.email}
                  </p>
                  <p className="font-medium text-[#122751] text-sm mt-2">
                    {ticket.title}
                  </p>
                  <p className="text-[#8D94A3] text-xs font-medium mt-1">
                    {reply.description}
                  </p>
                </div>
                <div className="flex gap-3 min-w-fit">
                  <p className="text-[#122751] text-sm">
                    {new Date(reply.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "2-digit",
                    })}
                  </p>
                  <Dropdown
                    placement="bottomRight"
                    menu={{ items: getDropdownItems(reply._id) }}
                    trigger={["click"]}
                  >
                    <BsThreeDotsVertical className="text-[#122751] cursor-pointer font-bold" />
                  </Dropdown>
                </div>
              </div>
              <div className="mt-3 flex justify-between pl-11">
                <p className="text-[#122751] text-xs">
                  Posted at {new Date(reply.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reply & Close Buttons */}
        <div className="flex justify-end gap-4">
          <SecondryButton
            style={{
              height: "40px",
              width: "90px",
              fontWeight: "600",
              color: "#122751",
            }}
            onClick={handleReplyClick}
          >
            Reply
          </SecondryButton>
          <PrimaryButton
            style={{ height: "40px", width: "140px" }}
            onClick={handleCloseTicket}
            disabled={isClosePending}
          >
            {isClosePending ? <LoadingButton size="small" /> : "Close Ticket"}
          </PrimaryButton>
        </div>

        {/* Reply Modal */}
        <Modal
          open={replyModalVisible}
          onCancel={() => {
            setReplyModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width="65%"
          style={{ top: "20%" }}
        >
          <h1 className="text-base font-semibold text-[#122751] mb-4">
            Reply Ticket
          </h1>
          <Form layout="vertical" form={form} onFinish={handleReplySubmit}>
            <Form.Item
              label="Add Recipient"
              name="recipientEmail"
              className="text-[#8D94A3] text-xs font-medium form-item"
              rules={getValidationRule("Email", true)}
            >
              <Input placeholder="Enter recipient email" size="large" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              className="text-[#8D94A3] text-xs font-medium form-item"
              rules={getValidationRule("Description", true)}
            >
              <TextArea
                rows={4}
                placeholder="Description..."
                style={{ resize: "none" }}
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-end mt-4 gap-3">
                <SecondryButton
                  style={{ height: "40px", width: "100px" }}
                  onClick={() => {
                    setReplyModalVisible(false);
                    form.resetFields();
                  }}
                >
                  Cancel
                </SecondryButton>
                <PrimaryButton
                  htmlType="submit"
                  style={{ height: "40px", width: "140px", fontSize: "14px" }}
                >
                  {isPending ? (
                    <LoadingButton size="small" />
                  ) : (
                    "Submit Request"
                  )}
                </PrimaryButton>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        {/* Drawer */}
        <Drawer
          title="Delete Message"
          placement="right"
          onClose={() => setDeleteMessageDrawer(false)}
          open={deleteMessageDrawer}
          width={600}
          closable={false}
        >
          <DeleteDrawer
            onClose={() => setDeleteMessageDrawer(false)}
            image={deleteMessageImage}
            title="Are you sure you want to delete this message?"
            description="Are you certain you want to permanently delete this message? This action cannot be undone."
            primaryButtonText="Delete Message"
            onDelete={handleDeleteConfirm}
            loading={isDeletePending}
          />
        </Drawer>
      </div>
    </>
  );
};

export default OpenTicketCard;

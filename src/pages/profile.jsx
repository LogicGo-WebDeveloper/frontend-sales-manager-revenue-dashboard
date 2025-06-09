import React, { useState } from "react";
import { Form, Input, Avatar, Drawer } from "antd";
import PrimaryButton from "../components/common/primary.button";
import SecondryButton from "../components/common/secondry.button";
import profileImage from "../assets/images/profile-icon.png";
import DeleteDrawer from "../components/delete-drawer";
import DeleteProfileImage from "../assets/images/delete-profile-image.png";
import LogoutImage from "../assets/images/logout-image.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const [form] = Form.useForm();
  const [deletePictureDrawer, setDeletePictureDrawer] = useState(false);
  const [logoutDrawer, setLogoutDrawer] = useState(false);
  const { user } = useSelector((state) => state.user);

  // console.log(user, "user")

  return (
    <div className="w-full p-4 md:p-8 flex flex-col justify-between min-h-[500px]">
      {/* Top Side */}
      <div>
        {/* Profile Image and Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 md:mb-10">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Avatar
              size={50}
              src={user.profileImage || profileImage}
              className="md:size-[60px]"
            />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <PrimaryButton
                style={{ height: "36px", width: "130px", fontSize: "14px" }}
                className="md:h-[40px] md:w-[150px] md:text-[15px]"
              >
                Change Picture
              </PrimaryButton>
              <SecondryButton
                style={{
                  height: "36px",
                  width: "130px",
                  fontSize: "14px",
                  color: "#122751",
                  fontWeight: "500",
                }}
                className="md:h-[42px] md:w-[150px] md:text-[15px]"
                onClick={() => setDeletePictureDrawer(true)}
              >
                Delete Picture
              </SecondryButton>
            </div>
          </div>
        </div>

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          className="w-full md:max-w-lg"
          initialValues={{}}
        >
          {/* User Name Field */}
          <Form.Item
            label="User Name"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              defaultValue={user.username}
              className="text-sm md:text-base"
            />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input defaultValue={user.email} className="text-sm md:text-base" />
          </Form.Item>
        </Form>
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 mt-10 w-full">
        <div className="w-full sm:w-auto">
          <SecondryButton
            style={{
              height: "38px",
              fontSize: "14px",
              color: "#122751",
              fontWeight: "500",
              width: "100%", // allows full width on mobile
            }}
            className="sm:w-[90px]"
          >
            Cancel
          </SecondryButton>
        </div>

        <div className="w-full sm:w-auto">
          <SecondryButton
            style={{
              height: "38px",
              fontSize: "14px",
              color: "#122751",
              fontWeight: "500",
              width: "100%", // allows full width on mobile
            }}
            className="sm:w-[140px]"
            onClick={() => setLogoutDrawer(true)}
          >
            Logout Profile
          </SecondryButton>
        </div>

        <div className="w-full sm:w-auto">
          <PrimaryButton
            style={{
              height: "38px",
              fontSize: "14px",
              width: "100%", // allows full width on mobile
            }}
            className="sm:w-[140px]"
          >
            Update Profile
          </PrimaryButton>
        </div>
      </div>

      {/*  Drawer */}
      <Drawer
        title="Delete Profile Picture"
        placement="right"
        onClose={() => setDeletePictureDrawer(false)}
        open={deletePictureDrawer}
        width={600}
        closable={false}
      >
        <DeleteDrawer
          onClose={() => setDeletePictureDrawer(false)}
          image={DeleteProfileImage}
          title="Are you sure you want to delete this profile picture?"
          description="Are you certain you want to permanently delete this profile picture? This action cannot be undone."
          primaryButtonText="Delete Picture"
        />
      </Drawer>

      <Drawer
        title="Logout Profile"
        placement="right"
        onClose={() => setLogoutDrawer(false)}
        open={logoutDrawer}
        width={600}
        closable={false}
      >
        <DeleteDrawer
          onClose={() => setLogoutDrawer(false)}
          image={LogoutImage}
          title="Are you sure you want to logout this profile?"
          description="Are you certain you want to logout profile? This action cannot be undone."
          primaryButtonText="Logout"
        />
      </Drawer>
    </div>
  );
};

export default Profile;

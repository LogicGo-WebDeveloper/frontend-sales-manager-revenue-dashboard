import React, { useState } from 'react';
import { Form, Input, Avatar, Drawer } from 'antd';
import PrimaryButton from '../components/common/primary.button';
import SecondryButton from '../components/common/secondry.button';
import profileImage from "../assets/images/profile-icon.png";
import DeleteDrawer from '../components/delete-drawer';
import DeleteProfileImage from '../assets/images/delete-profile-image.png';
import LogoutImage from '../assets/images/logout-image.png';
import { useSelector } from 'react-redux';

const Profile = () => {
    const [form] = Form.useForm();
    const [deletePictureDrawer, setDeletePictureDrawer] = useState(false);
    const [logoutDrawer, setLogoutDrawer] = useState(false);
    const { user } = useSelector((state) => state.user);

    console.log(user, "user")

    return (
        <div className="w-full p-8 flex flex-col justify-between min-h-[500px]">
            {/* Top Side */}
            <div>
                {/* Profile Image and Buttons */}
                <div className="flex items-center gap-6 mb-10">
                    <div className="flex gap-4 justify-center items-center">
                        <Avatar
                            size={60}
                            src={user.profileImage || profileImage}
                        />
                        <div className="flex gap-4">
                            <PrimaryButton style={{ height: "40px", width: "150px", fontSize: "15px" }}>
                                Change Picture
                            </PrimaryButton>
                            <SecondryButton style={{ height: "42px", width: "150px", fontSize: "15px", color: "#122751", fontWeight: "500" }} onClick={() => setDeletePictureDrawer(true)}>
                                Delete Picture
                            </SecondryButton>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <Form
                    form={form}
                    layout="vertical"
                    className="max-w-lg"
                    initialValues={{
                        // username: 'Wilson Lubin',
                        // email: 'wilsonlubin8@gmail.com',
                    }}
                >
                    {/* User Name Field */}
                    <Form.Item
                        label="User Name"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input defaultValue={user.username}  />
                    </Form.Item>

                    {/* Email Field */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input defaultValue={user.email} />
                    </Form.Item>
                </Form>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 mt-10">
                <SecondryButton style={{ height: "38px", width: "90px", fontSize: "14px", color: "#122751", fontWeight: "500" }}>
                    Cancel
                </SecondryButton>
                <SecondryButton style={{ height: "38px", width: "140px", fontSize: "14px", color: "#122751", fontWeight: "500" }} onClick={() => setLogoutDrawer(true)}>
                    Logout Profile
                </SecondryButton>
                <PrimaryButton style={{ height: "38px", width: "140px", fontSize: "14px" }}>
                    Update Profile
                </PrimaryButton>
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
                <DeleteDrawer onClose={() => setDeletePictureDrawer(false)} image={DeleteProfileImage} title="Are you sure you want to delete this profile picture?" description="Are you certain you want to permanently delete this profile picture? This action cannot be undone." primaryButtonText="Delete Picture" />
            </Drawer>

            <Drawer
                title="Logout Profile"
                placement="right"
                onClose={() => setLogoutDrawer(false)}
                open={logoutDrawer}
                width={600}
                closable={false}
            >
                <DeleteDrawer onClose={() => setLogoutDrawer(false)} image={LogoutImage} title="Are you sure you want to logout this profile?" description="Are you certain you want to logout profile? This action cannot be undone." primaryButtonText="Logout" />
            </Drawer>
        </div>
    );
};

export default Profile;

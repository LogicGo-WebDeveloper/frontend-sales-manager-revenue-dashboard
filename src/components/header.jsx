import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Drawer } from 'antd';
import authIcon from '../assets/images/auth-icon.png';
import profileImage from '../assets/images/profile-icon.png';
import OverviewIconActive from "../assets/images/overview-icon-active.png";
import OverviewIcon from "../assets/images/overview-icon.png";
import PhoneIcon from "../assets/images/phone-icon.png";
import PhoneIconActive from "../assets/images/phone-icon-active.png";
import SettingIcon from "../assets/images/setting-icon.png";
import SettingIconActive from "../assets/images/setting-icon-active.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { HiMenu } from "react-icons/hi";
import { ROUTES } from '../config/route.const';
import { useSelector } from 'react-redux';
import HeaderIcon from '../assets/images/header-icon.png';

const Header = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const tabs = [
    {
      name: 'Overview',
      key: 'overview',
      icon: OverviewIcon,
      iconActive: OverviewIconActive,
      path: ROUTES.DASHBOARD.OVERVIEW
    },
    {
      name: 'Contact Us',
      key: 'contact',
      icon: PhoneIcon,
      iconActive: PhoneIconActive,
      path: ROUTES.DASHBOARD.CONTACT
    },
    {
      name: 'Setting',
      key: 'setting',
      icon: SettingIcon,
      iconActive: SettingIconActive,
      path: ROUTES.DASHBOARD.SETTING_PROFILE
    },
  ];

  useEffect(() => {
    // Logic to determine active tab based on current route
    const currentPath = location.pathname;

    let foundActiveTab = '';

    if (currentPath.startsWith('/ticket')) {
      foundActiveTab = 'contact';
    } else if (currentPath.startsWith('/setting')) {
      foundActiveTab = 'setting';
    } else {
      // Check for direct matches with tab paths
      const matchedTab = tabs.find(tab => currentPath === tab.path);
      if (matchedTab) {
        foundActiveTab = matchedTab.key;
      }
    }

    // Set active tab, default to 'overview' if no specific match and on root or overview path
    if (foundActiveTab) {
        setActiveTab(foundActiveTab);
    } else if (currentPath === '/' || currentPath === ROUTES.DASHBOARD.OVERVIEW) {
        setActiveTab('overview');
    } else {
        setActiveTab(''); // Or a default if needed when no route matches
    }

  }, [location.pathname, tabs]); // Add tabs to dependency array for completeness

  const handleTabClick = (key, path) => {
    setActiveTab(key);
    navigate(path);
    // For desktop tabs, no need to close drawer
  };

  const handleProfileDropdownClick = ({ key }) => {
    if (key === 'profile') {
      navigate(ROUTES.DASHBOARD.SETTING_PROFILE);
    } else if (key === 'logout') {
      localStorage.removeItem('token');
      navigate(ROUTES.USER.LOGIN);
    }
  };

  const dropdownItems = [
    {
      key: 'profile',
      label: 'My Profile',
      icon: <FaRegUser color="#2363E3" size={13} />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <TbLogout color='#2363E3' size={13} />,
    },
  ];

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleDrawerItemClick = (path, key) => {
    navigate(path);
    setActiveTab(key); // Update active tab state
    setDrawerVisible(false);
  };

  return (
    <div className="bg-white border-b-[1px] border-[#E0E4EC] px-8 py-3 flex justify-between items-center sticky top-0 z-20">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={HeaderIcon}
          alt="icon"
          className="w-[130px] h-[32px] sm:w-[130px] sm:h-[32px] "
        />
        {/* <span className="text-xl sm:text-lg font-bold text-[#122751] relative top-1.5 left-0.5">
          evenueSync
        </span> */}
      </div>

      {/* Tabs (Desktop) */}
      <ul className="hidden lg:flex space-x-8 items-center"> {/* Use original image icons */}
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={`relative flex items-center gap-1 cursor-pointer text-sm font-medium ${activeTab === tab.key ? 'text-[#2363E3]' : 'text-[#8D94A3]'}`}
            onClick={() => handleTabClick(tab.key, tab.path)}
          >
            <img
              src={activeTab === tab.key ? tab.iconActive : tab.icon}
              alt={tab.name}
              className="w-4 h-4"
            />
            {tab.name}
            {activeTab === tab.key && (
              <div className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-[#2363E3] rounded-full" />
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Icon */}
      <div className="lg:hidden"> {/* Show on small, hide on large */}
        <HiMenu size={24} className="cursor-pointer" onClick={showDrawer} />
      </div>

      {/* Right Controls (Desktop) */}
      <div className="hidden lg:flex items-center space-x-4"> {/* Hide on small, show on large */}
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="font-semibold text-sm">{user.username}</div>
            <div className="text-xs text-[#8D94A3]">{user.email}</div>
          </div>

          <Dropdown
            menu={{
              items: dropdownItems, // Use dropdownItems for desktop dropdown
              onClick: handleProfileDropdownClick,
            }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Avatar
              size={40}
              src={user.profileImage || profileImage}
              className="cursor-pointer"
            />
          </Dropdown>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={onCloseDrawer}
        open={drawerVisible}
        // bodyStyle={{ padding: 0 }}
        width={250} // Adjust width as needed
      >
        {/* User Info in Drawer */}
        <div className="p-4 border-b border-[#E0E4EC]">
          <div className="font-semibold text-base text-[#122751]">{user.username}</div>
          <div className="text-sm text-[#8D94A3]">{user.email}</div>
        </div>

        <ul className="flex flex-col p-4">
          {/* Navigation Tabs in Drawer (using image icons) */}
          {tabs.map((tab) => (
            <li
              key={tab.key}
              className={`flex items-center gap-3 py-3 px-2 cursor-pointer text-base font-medium ${activeTab === tab.key ? 'text-[#2363E3] bg-gray-100 rounded-md' : 'text-[#8D94A3]'}`}
              onClick={() => handleDrawerItemClick(tab.path, tab.key)}
            >
              <img
                src={activeTab === tab.key ? tab.iconActive : tab.icon}
                alt={tab.name}
                className="w-5 h-5"
              />
              {tab.name}
            </li>
          ))}
          {/* My Profile in Drawer (using react-icon) */}
          {/* <li
            key="profile"
            className={`flex items-center gap-3 py-3 px-2 cursor-pointer text-base font-medium ${location.pathname === ROUTES.DASHBOARD.SETTING_PROFILE ? 'text-[#2363E3] bg-gray-100 rounded-md' : 'text-[#8D94A3]'}`}
            onClick={() => handleDrawerItemClick(ROUTES.DASHBOARD.SETTING_PROFILE, 'setting')} // Navigate to profile and set setting as active
          >
            <FaRegUser size={20} color={location.pathname === ROUTES.DASHBOARD.SETTING_PROFILE ? '#2363E3' : '#8D94A3'} />
            My Profile
          </li> */}
          {/* Logout in Drawer (using react-icon) */}
          <li
            key="logout"
            className="flex items-center gap-3 py-3 px-2 cursor-pointer text-base font-medium text-[#8D94A3]"
            onClick={() => {
              localStorage.removeItem('token');
              navigate(ROUTES.USER.LOGIN);
              setDrawerVisible(false);
            }}
          >
            <TbLogout size={20} color="#8D94A3" />
            Logout
          </li>
        </ul>
      </Drawer>
    </div>
  );
};

export default Header;

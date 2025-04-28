import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import authIcon from '../assets/images/auth-icon.png';
import ProfilePic from '../assets/images/profile-icon.png';
import OverviewIconActive from "../assets/images/overview-icon-active.png";
import OverviewIcon from "../assets/images/overview-icon.png";
import PhoneIcon from "../assets/images/phone-icon.png";
import PhoneIconActive from "../assets/images/phone-icon-active.png";
import SettingIcon from "../assets/images/setting-icon.png";
import SettingIconActive from "../assets/images/setting-icon-active.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { ROUTES } from '../config/route.const';

const Header = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

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
    const currentTab = tabs.find(tab => location.pathname.startsWith(tab.path));
    if (currentTab) {
      setActiveTab(currentTab.key);
    }
  }, [location.pathname]); 

  const handleTabClick = (key, path) => {
    setActiveTab(key);
    navigate(path);
  };

  const handleProfileDropdownClick = ({ key }) => {
    if (key === 'profile') {
      navigate(ROUTES.DASHBOARD.SETTING_PROFILE); 
    } else if (key === 'logout') {
      console.log('Logged out'); 
    }
  };

  const items = [
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

  return (
    <div className="bg-white border-b-[1px] border-[#E0E4EC] px-8 py-3 flex justify-between items-center sticky top-0 z-20">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={authIcon}
          alt="icon"
          className="w-6 h-6 sm:w-[22px] sm:h-[24px] relative top-0"
        />
        <span className="text-xl sm:text-lg font-bold text-[#122751] relative top-1.5 left-0.5">
          evenueSync
        </span>
      </div>

      {/* Tabs */}
      <ul className="flex space-x-8 items-center">
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

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="font-semibold text-sm">Wilson Lubin</div>
            <div className="text-xs text-[#8D94A3]">wilsondesign@gmail.com</div>
          </div>

          <Dropdown
            menu={{
              items,
              onClick: handleProfileDropdownClick, 
            }}
            trigger={['click']}
            placement="bottomRight"
          >
            <img
              src={ProfilePic}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React, { useState } from 'react';
import { Button, Checkbox, Collapse, Input } from 'antd';
import PrimaryButton from './common/primary.button';
import { IoIosSearch } from "react-icons/io";
import SecondryButton from './common/secondry.button';

const { Panel } = Collapse;

const FilterDrawer = ({ onClose }) => {
    const [selectedDate, setSelectedDate] = useState('Yesterday');
    const [platforms, setPlatforms] = useState(['Android']);
    const [projects, setProjects] = useState(['DreamsSell']);

    const dateOptions = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Last Month', 'This Year', 'Custom Range'];
    const platformOptions = ['Android', 'ios', 'Web'];
    const projectOptions = ['DreamsSell', 'Truelysell', 'servebook', "doccure", "demo", "test"];

    const handleDateSelect = (value) => setSelectedDate(value);
    const handlePlatformChange = (checkedValues) => setPlatforms(checkedValues);
    const handleProjectChange = (checkedValues) => setProjects(checkedValues);

    const resetFilters = () => {
        setSelectedDate('Yesterday');
        setPlatforms([]);
        setProjects([]);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const filteredProjectOptions = projectOptions.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-col justify-between h-full">
                {/* Date Filter */}
                <Collapse defaultActiveKey={['1']} ghost>
                    <Panel header="Date" key="1" style={{ padding: "0px" }}>
                        <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3 flex flex-col gap-2">
                            {dateOptions.map((date) => (
                                <Checkbox
                                    key={date}
                                    checked={selectedDate === date}
                                    onChange={() => handleDateSelect(date)}
                                    style={{ borderBottom: "1px solid #DCDFEA", paddingBottom: "8px" }}
                                >
                                    {date}
                                </Checkbox>
                            ))}
                        </div>
                    </Panel>

                    {/* Platform Filter */}
                    <Panel header="Platform" key="2">
                        <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3">
                            <div className="flex flex-col">
                                {platformOptions.map((option, index) => (
                                    <div
                                        key={option}
                                        className={`py-2 ${index !== platformOptions.length - 1 ? 'border-b border-[#DCDFEA]' : ''}`}
                                    >
                                        <Checkbox
                                            value={option}
                                            checked={platforms.includes(option)}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                if (checked) {
                                                    setPlatforms([...platforms, option]);
                                                } else {
                                                    setPlatforms(platforms.filter((item) => item !== option));
                                                }
                                            }}
                                        >
                                            {option}
                                        </Checkbox>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Panel>


                    {/* Project Filter */}
                    <Panel header="Project" key="3">
                        <div className="bg-[#F5F6FA] border border-[#E4E4E7] rounded-lg p-3 flex flex-col gap-2">

                            <div>
                                {/* <IoIosSearch /> */}
                                <Input
                                    placeholder="Project name"
                                    className="mb-2"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col">
                                {filteredProjectOptions.map((option, index) => (
                                    <div
                                        key={option}
                                        className={`py-2 ${index !== filteredProjectOptions.length - 1 ? 'border-b border-[#DCDFEA]' : ''}`}
                                    >
                                        <Checkbox
                                            value={option}
                                            checked={projects.includes(option)}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                if (checked) {
                                                    setProjects([...projects, option]);
                                                } else {
                                                    setProjects(projects.filter((item) => item !== option));
                                                }
                                            }}
                                        >
                                            {option}
                                        </Checkbox>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Panel>

                </Collapse>

                <div className='flex items-center justify-end p-6 gap-2'>
                    <SecondryButton
                        onClick={resetFilters}
                        type="default"
                        style={{ width: "80px", color: "#122751", height: "40px" }}
                    >
                        Reset
                    </SecondryButton>

                    <SecondryButton
                        onClick={onClose}
                        type="default"
                        style={{ width: "80px", color: "#122751", height: "40px" }}
                    >
                        Cancel
                    </SecondryButton>

                    <PrimaryButton htmlType="submit" style={{ width: "180px", fontSize: "14px", fontWeight: "600", height: "40px" }}>
                        Apply Filter
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
};

export default FilterDrawer;

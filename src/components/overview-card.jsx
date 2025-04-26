import React from 'react'
import { ImArrowUpRight2 } from "react-icons/im";

const OverviewCard = ({ icon, title, value, change, isPositive = true }) => {
    return (
        <div>
            <div className={"bg-white rounded-md p-4 flex flex-col justify-between h-full min-w-[200px] w-full shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"}>
                <div className="flex justify-between items-start">
                    <div>
                        <div className='flex items-center gap-3'>
                            {icon ? <> <img src={icon} alt="" /></> : <></>}
                            <p className="text-sm font- text-[#122751] mb-1">{title}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl mt-3 ml-1 font-semibold text-[#122751]">{value}</h3>
                        </div>
                        <div className={`text-xs mt-1 ${isPositive ? 'text-green-500 bg-[#D1FAE5]' : 'text-red-500 bg-[#FEE2E2]'}`}>
                            {change ? <div className="flex items-center gap"><span className="text-[#8D94A3] bg-[#ffffff] pr-2">Since Last Week</span> {change}</div> : <></>}
                        </div>
                    </div>
                    <div className="text-[#122751]">
                        {value ? <><ImArrowUpRight2 /></> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewCard

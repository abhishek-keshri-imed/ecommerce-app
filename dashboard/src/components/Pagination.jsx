import React from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, showItem }) => {
    
    let totalPage = Math.ceil(totalItem / parPage);
    let startPage = pageNumber;
    let dif = totalPage - pageNumber;

    // If we are near the end of the pages, adjust the window
    if (dif <= showItem) {
        startPage = totalPage - showItem;
    }
    
    let endPage = startPage < 0 ? showItem : startPage + showItem;
    if (startPage <= 0) {
        startPage = 1;
    }

    const createBtn = () => {
        const btns = [];
        for (let i = startPage; i <= totalPage; i++) {
            if (i <= endPage) {
                btns.push(
                    <li 
                        key={i}
                        onClick={() => setPageNumber(i)}
                        className={`
                            ${pageNumber === i ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white' : 'bg-slate-700 hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'} 
                            w-8.25 h-8.25 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300
                        `}
                    >
                        {i}
                    </li>
                );
            }
        }
        return btns;
    };

    return (
        <ul className='flex gap-3'>
            {/* Previous Button */}
            {pageNumber > 1 && (
                <li 
                    onClick={() => setPageNumber(pageNumber - 1)}
                    className='w-8.25 h-8.25 rounded-full flex justify-center items-center bg-slate-700 text-[#d0d2d6] cursor-pointer hover:bg-indigo-500 hover:text-white transition-all'
                >
                    <MdOutlineKeyboardDoubleArrowLeft />
                </li>
            )}

            {/* Dynamic Numbered Buttons */}
            {createBtn()}

            {/* Next Button */}
            {pageNumber < totalPage && (
                <li 
                    onClick={() => setPageNumber(pageNumber + 1)}
                    className='w-8.25 h-8.25 rounded-full flex justify-center items-center bg-slate-700 text-[#d0d2d6] cursor-pointer hover:bg-indigo-500 hover:text-white transition-all'
                >
                    <MdOutlineKeyboardDoubleArrowRight />
                </li>
            )}
        </ul>
    );
};

export default Pagination;
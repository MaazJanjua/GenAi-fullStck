import React, { useState, useRef } from 'react'
import { RiSparkling2Fill, RiAccountCircleFill, RiFolderAddFill } from "@remixicon/react";
import { useInterview } from '../hooks/useInterview';
import { useNavigate } from 'react-router-dom';
import { FiLoader } from "react-icons/fi";

const MyComponent = () => {
    return (
        <RiHeartFill
            size={36} // set custom `width` and `height`
            color="red" // set `fill` color
            className="my-icon" // add custom class name
        />
    );
};

const Home = () => {
    const [fileName, setFileName] = useState('')

    const { loading, generateReport, reports, deleteReport } = useInterview();
    const [jobDescription, setJobDescription] = useState('');
    const [selfDescription, setSelfDescription] = useState('');
    const resumeInputRef = useRef();

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFileName(e.target.files[0].name)
        }
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0];
        if (!resumeFile) {
            alert('Please upload your resume before generating the report.');
            return;
        }
        const data = await generateReport({ jobDescription, selfDescription, resumeFile });
        navigate(`/interview/${data._id}`);
    }

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-linear-to-r from-gray-900 to-gray-800 z-50">
                <div className="text-center">
                    <FiLoader className="animate-spin text-5xl text-white mx-auto" />
                    <p className="mt-4 text-white text-lg font-medium tracking-wide">Loading...</p>
                    <div className="w-32 h-1 bg-white/20 rounded-full mt-4 mx-auto overflow-hidden">
                        <div className="w-1/2 h-full bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        )
    }

    // const { loading, generateReport } = useInterview()

    return (
        <>
            <main className='min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 py-4 sm:py-6 md:py-8 lg:py-10 px-3 sm:px-4 md:px-6 lg:px-8'>
                <div className='max-w-7xl mx-auto pt-10'>
                    {/* Top Bar with Profile */}
                    <div className='flex justify-between items-center mb-6 sm:mb-8 md:mb-10'>
                        {/* Logo/Brand */}
                        {/* <div className='flex items-center gap-2'>
                            <span className='text-2xl sm:text-3xl'>🎯</span>
                            <span className='text-gray-400 text-xs sm:text-sm hidden xs:block'>AI Interview Coach</span>
                        </div>
                         */}
                        {/* Profile Section */}


                        {/* Header Section */}
                        <div className='flex justify-between items-center w-full'>
                            <div className='text-center mb-5 sm:mb-6 md:mb-8 lg:mb-10 pl-40'>
                                <h1 className='text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                                     font-bold bg-linear-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent 
                                     mb-1 sm:mb-2 md:mb-3 uppercase tracking-tight'>
                                    Interview Report Generator
                                </h1>
                                <p className='text-gray-400 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg'>
                                    Transform your interview preparation with AI-powered insights
                                </p>
                            </div>
                            <div className='relative group'>
                                <a href="/profile" className='flex items-center gap-2 sm:gap-3 bg-gray-900/70 hover:bg-gray-800/70 rounded-xl pl-2 pr-3 sm:pl-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-700 transition-all duration-200 hover:border-sky-500'>
                                    <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-r from-sky-500 to-blue-500 flex items-center justify-center overflow-hidden'>
                                        <RiAccountCircleFill />
                                    </div>
                                    <div className='hidden sm:block text-left'>
                                        <p className='text-gray-200 text-xs lg:text-lg font-medium'>ABC XJZ</p>
                                        <p className='text-gray-500 text-[10px] lg:text-[.7vw]'>View Profile</p>
                                    </div>
                                    <svg className='w-3 h-3 sm:w-4 sm:h-4 text-gray-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </a>

                                {/* Dropdown Menu */}
                                <div className='absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                                    <a href="/profile" className='flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 text-sm'>
                                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        My Profile
                                    </a>
                                    <a href="/settings" className='flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 text-sm'>
                                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Settings
                                    </a>
                                    <div className='border-t border-gray-700 my-1'></div>
                                    <a href="/logout" className='flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-gray-800 text-sm'>
                                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8'>
                        {/* Left Section - Job Description */}
                        <div className="left space-y-1.5 sm:space-y-2 md:space-y-3">
                            <label className='text-gray-300 font-semibold text-sm xs:text-base sm:text-lg md:text-xl  flex items-center gap-2'>
                                <svg className='w-5 h-5 text-sky-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Job Description
                            </label>
                            <textarea
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                name="jobDescription"
                                id="jobDescription"
                                placeholder='📝 Enter job description Here....'
                                className='w-full h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 xl:h-125
                                         p-2.5 xs:p-3 sm:p-4 md:p-5 
                                         bg-gray-800/90 border border-gray-700 rounded-xl 
                                         text-gray-200 placeholder-gray-500 focus:outline-none focus:border-sky-500 
                                         focus:ring-2 focus:ring-sky-500/50 transition-all duration-200 resize-none 
                                         text-xs xs:text-sm sm:text-base
                                         hover:border-gray-600'
                            ></textarea>
                        </div>

                        {/* Right Section */}
                        <div className="right space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                            {/* Upload Resume */}
                            <div className="input-group space-y-1 sm:space-y-1.5 md:space-y-2">
                                <label htmlFor="resume" className='text-gray-300 font-semibold text-sm xs:text-base sm:text-lg md:text-xl  flex items-center gap-2'>
                                    <svg className='w-5 h-5 text-sky-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    Upload Resume
                                </label>
                                <div className='relative'>
                                    <input
                                        ref={resumeInputRef}
                                        type="file"
                                        name='resume'
                                        id='resume'
                                        accept='.pdf'
                                        onChange={handleFileChange}
                                        className='w-full p-2 xs:p-2.5 sm:p-3 bg-gray-900/70 border border-gray-700 rounded-xl 
                                                 text-gray-200 text-xs xs:text-sm sm:text-base
                                                 file:mr-2 sm:file:mr-3 file:py-1 sm:file:py-1.5 md:file:py-2 
                                                 file:px-2 sm:file:px-3 md:file:px-4 file:rounded-lg 
                                                 file:border-0 file:text-[10px] xs:file:text-xs sm:file:text-sm 
                                                 file:font-semibold file:bg-sky-600 file:text-white 
                                                 file:cursor-pointer hover:file:bg-sky-700 
                                                 transition-all duration-200 focus:outline-none focus:border-sky-500 
                                                 focus:ring-2 focus:ring-sky-500/50
                                                 cursor-pointer'
                                    />
                                    {!fileName && (
                                        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                                            <RiFolderAddFill />
                                        </div>
                                    )}
                                </div>
                                {fileName && (
                                    <p className='text-[9px] xs:text-[10px] sm:text-xs text-sky-400 truncate flex items-center gap-1'>
                                        <svg className='w-3 h-3' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Selected: {fileName}
                                    </p>
                                )}
                                <p className='text-[9px] xs:text-[10px] sm:text-xs text-gray-500 flex items-center gap-1'>
                                    <svg className='w-3 h-3' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Supported format: PDF only (Max 3MB)
                                </p>
                            </div>

                            {/* Self Description */}
                            <div className="input-group space-y-1 sm:space-y-1.5 md:space-y-2">
                                <label htmlFor="selfDescripption" className='text-gray-300 font-semibold text-sm xs:text-base sm:text-lg md:text-xl  flex items-center gap-2'>
                                    <svg className='w-5 h-5 text-sky-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Self Description
                                </label>
                                <textarea
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    name="selfDescripption"
                                    id="selfDescripption"
                                    placeholder='✍️ Describe yourself in this field...'
                                    className='w-full h-28 xs:h-32 sm:h-36 md:h-44 lg:h-52 
                                             p-2.5 xs:p-3 sm:p-4 md:p-5 
                                             bg-gray-900/70 border border-gray-700 rounded-xl 
                                             text-gray-200 placeholder-gray-500 focus:outline-none focus:border-sky-500 
                                             focus:ring-2 focus:ring-sky-500/50 transition-all duration-200 resize-none 
                                             text-xs xs:text-sm sm:text-base
                                             hover:border-gray-600'
                                ></textarea>
                            </div>

                            {/* Generate Button */}
                            <button
                                onClick={handleGenerateReport}
                                className="genherate-btn w-full py-2.5 xs:py-3 sm:py-3.5 md:py-4 lg:py-5
                                           bg-linear-to-r from-sky-600 to-blue-600 
                                           hover:from-sky-700 hover:to-blue-700 
                                           text-white font-bold rounded-xl 
                                           transform transition-all duration-200 hover:scale-[1.01] sm:hover:scale-[1.02] 
                                           active:scale-[0.99] shadow-lg shadow-sky-900/50 
                                           uppercase text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg
                                           disabled:opacity-50 disabled:cursor-not-allowed
                                           flex items-center justify-center gap-2">
                                <RiSparkling2Fill />
                                <span>Generate Interview Report</span>
                                <svg className='w-4 h-4 sm:w-5 sm:h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Info Note */}
                            <div className='mt-2 sm:mt-3 md:mt-4 p-2.5 xs:p-3 sm:p-4 bg-gray-900/50 border border-gray-800 rounded-xl'>
                                <p className='text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-gray-400 text-center flex items-center justify-center gap-1'>
                                    <span>💡</span> Your data is secure and will only be used to generate your interview report
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* =========================
                          RECENT REPORTS SECTION
                        ========================= */}
                    {reports.length > 0 && (
                        <section className='recent-reports w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12'>
                            {/* Section Header */}
                            <div className="reports-header flex justify-between items-baseline flex-wrap gap-3 mb-4 sm:mb-6 md:mb-8">
                                {/* Main Heading */}

                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                                    My Recent Interview Reports
                                </h2>
                                {/* Total Reports Count */}
                                <span className="reports-count bg-gray-100 dark:bg-gray-800 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {reports.length} report{reports.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            {/* Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
                            <ul className='reports-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6'>

                                {reports.map(report => (
                                    <li
                                        key={report._id}
                                        // {/* Single Report Card */}

                                        className='report-item relative group flex flex-col p-4 sm:p-5 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 dark:hover:border-blue-400'
                                        // {/* Navigate to Report Details */}

                                        onClick={() => navigate(`/interview/${report._id}`)}
                                    >
                                        {/* REPORT DELETE BUTTON */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteReport(report._id);
                                            }}
                                            className="absolute top-3 right-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all duration-200 z-999"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h8"
                                                />
                                            </svg>
                                        </button>
                                        {/* REPORT DESIGN(ICONS) */}
                                        {/* Top Card Icons */}
                                        <div className="flex items-start gap-3 sm:gap-4 mb-3">
                                            {/* //REPORT ICON */}
                                            {/* Report Icon */}
                                            <div className="report-icon shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white">
                                                <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                    <path d="M8 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    <path d="M8 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            {/* //REPORT ARROW */}
                                            {/* Hover Arrow */}
                                            <div className="report-arrow ml-auto text-gray-400 dark:text-gray-600 transition-transform duration-300 group-hover:translate-x-1">
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9 18L15 12L9 6"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Report Content */}

                                        <div className="report-content flex-1">
                                            {/* //REPORT TITLE */}
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                {report.title || 'Untitled Position'}
                                            </h3>
                                            {/* Report Meta Data */}
                                            <div className="report-meta flex flex-col gap-2">
                                                {/* Date + Match Score */}
                                                <span className="report-date flex justify-between items-center text-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 ">
                                                    {/* // GENERATED REPORT DATE */}
                                                    <div className='flex items-center gap-[1.2vw]'>

                                                        <svg className="w-6 h-6 sm:w-4.5 sm:h-4.5 border border-green-900 rounded-full bg-green-800 p-0.2 text-white"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="12" r="10" 
                                                            stroke="currentColor" 
                                                            strokeWidth="2" />
                                                            <polyline points="12 6 12 12 16 14" 
                                                            stroke="currentColor" strokeWidth="2" 
                                                            fill="none" />
                                                        </svg>
                                                        {new Date(report.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}

                                                    </div>
                                                    {/* //MATCH SCORE */}
                                                    <div>
                                                        <p className={`match-score font-bold text-red-500 ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score-mid' : "score-low"}`}>Match Score : {report.matchScore}%</p>
                                                    </div>
                                                </span>
                                                {/* //INTERVIEW SCORE */}
                                                {/* {report.interviewScore && (
                                                    <span className="report-score inline-flex items-center gap-1.5 text-xs sm:text-sm bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full text-blue-700 dark:text-blue-300 w-fit">
                                                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24 border border-green-500" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="currentColor" strokeWidth="2" fill="none" />
                                                        </svg>
                                                        Score: {report.interviewScore}%

                                                    </span>
                                                )} */}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Footer Section - AI Report Info */}
                    <div className='flex flex-col justify-center items-center w-full mt-6 sm:mt-8 md:mt-10 lg:mt-12'>
                        {/* Main Footer Text */}
                        <div className='flex justify-center items-center w-full'>
                            <h1 className='text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center py-3 sm:py-4 md:py-5 capitalize flex items-center gap-2'>
                                <svg className='w-4 h-4 sm:w-5 sm:h-5 text-sky-400 animate-pulse' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Report generated by AI * Approx 30 sec
                            </h1>
                        </div>

                        {/* Additional Footer Elements */}
                        <div className='flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 md:gap-8 w-full'>
                            {/* AI Accuracy Badge */}
                            <div className='flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-800 hover:border-sky-500 transition-all duration-200'>
                                <span className='text-[10px] sm:text-xs text-sky-400'>🤖</span>
                                <span className='text-[9px] sm:text-xs text-gray-400'>AI Accuracy: 95%</span>
                                <svg className='w-3 h-3 text-green-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            {/* Privacy Badge */}
                            <div className='flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-800 hover:border-green-500 transition-all duration-200'>
                                <span className='text-[10px] sm:text-xs text-green-400'>🔒</span>
                                <span className='text-[9px] sm:text-xs text-gray-400'>End-to-End Encrypted</span>
                            </div>

                            {/* Support Badge */}
                            <div className='flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-800 hover:border-blue-500 transition-all duration-200'>
                                <span className='text-[10px] sm:text-xs text-blue-400'>💬</span>
                                <span className='text-[9px] sm:text-xs text-gray-400'>24/7 Support</span>
                            </div>
                        </div>

                        {/* Divider Line */}
                        <div className='w-full max-w-2xl h-px bg-linear-to-r from-transparent via-gray-700 to-transparent my-4 sm:my-5'></div>

                        {/* Copyright Section */}
                        <div className='flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 '>
                            <p className='text-[8px] xs:text-[9px] sm:text-[10px] lg:text-lg capitalize text-gray-600 text-center flex items-center gap-1'>
                                <span>©</span> 2024 Interview Report Generator. All rights reserved.
                            </p>
                            <p className='text-[8px] xs:text-[9px] sm:text-[10px] lg:text-lg capitalize text-gray-600 text-center flex items-center gap-1'>
                                <svg className='w-3 h-3' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Powered by Advanced AI Technology
                            </p>
                        </div>

                        {/* Version Info */}
                        <div className='mt-2'>
                            <p className='text-[7px] xs:text-[8px] sm:text-[9px] lg:text-lg capitalize text-gray-700 text-center flex items-center gap-1'>
                                <svg className='w-3 h-3' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Version 2.0.1 | Last Updated: December 2024
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home
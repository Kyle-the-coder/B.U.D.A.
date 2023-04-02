import check from "../assets/images/checkmark.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const BudaCrewPage = (props) => {
    const {
        session1Date, setSession1Date,
        session1Tuition, setSession1Tuition,
        session1Includes, setSession1Includes,
        session2Date, setSession2Date,
        session2Tuition, setSession2Tuition,
        session2Includes, setSession2Includes,
        classTime1, setClassTime1,
        classTime2, setClassTime2,
        requirementInfo, setRequirementInfo,
        extraPerformanceInfo, setExtraPerformanceInfo,
        mandatoryClassDates, setMandatoryClassDates,
        extraRehearsalClassDates, setExtraReheearsalClassDates,
        compDateInfo, setCompDateInfo,
        auditionDate, setAuditionDate } = props
    const { crewBannerImg,
        crewBannerVid,
        crewBannerVidOrImg,
        setCrewBannerImg,
        setCrewBannerVid,
        setCrewBannerVidOrImg,
        budaCrewImg, setBudaCrewImg } = props
    const navigate = useNavigate();
    const { loggedIn, setLoggedIn } = props
    const { setTracker } = props
    const [budaCrewInfo1Edited, setBudaCrewInfo1Edited] = useState(false)
    const [budaCrewInfo2Edited, setBudaCrewInfo2Edited] = useState(false)
    const [crewBannerImgEdited, setCrewBannerImgEdited] = useState(false)
    const [crewBannerVidEdited, setCrewBannerVidEdited] = useState(false)
    const [budaCrewImgEdited, setBudaCrewImgEdited] = useState(false)


    const backOne = () => {
        navigate(-1)
    }

    return (
        <div>

            {/* Banner Section */}
            <section className="w-screen bg-slate-200 h-32 mb-5 flex justify-center ">
                {crewBannerVidOrImg == "false" ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src={crewBannerVid} alt="people dancing and colors" ></video>
                    :
                    <img className="shrink ratesBanner w-full h-full  bg-slate-200" src={crewBannerImg} alt="people dancing and colors" />}
            </section>

            {/* Back One Page Section */}
            <section className="w-full h-5 flex items-center justify-end">
                <p className=" w-12 text-sm underline text-sky-500 cursor-pointer" onClick={() => backOne()} >
                    Back
                </p>
            </section>


            {/* Rates Info Section */}
            <section >
                <div className="w-full flex flex-col items-center sm:items-start">
                    <h1 className="sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-3xl mb-3 welcome w-full flex justify-center">BUDA Crew Info:</h1>
                    <p className="mb-3 w-full flex justify-center xl:text-2xl">*please read all*</p>
                    <p className="mb-3 w-full flex justify-center xl:text-2xl">*member login below*</p>
                    <div className="h-content w-full flex flex-col items-center sm:items-start sm:ml-8">
                        <div className="w-full flex flex-col md:flex-row md:justify-evenly">

                            <div className="sm:w-[600px] w-full ">

                                <h4 >
                                    <strong>Session Dates and Tuition:</strong>
                                </h4>
                                <div className="w-full h-96 sm:h-96  flex flex-col items-center justify-center border-2 border-black mb-5">
                                    <div className="flex shrink bg-red-100 flex-col w-full h-1/2 p-2 border-b-2 border-black border-double aboutInfo">
                                        <p className="welcome text-xl xl:text-2xl">Session 1:</p>
                                        <p className="xl:text-xl">
                                            <strong>Date: </strong> {session1Date}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Tuition: </strong> ${session1Tuition}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Includes: </strong> {session1Includes}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Class Time: </strong> {classTime1}
                                        </p>
                                    </div>
                                    <div className="flex shrink flex-col w-full p-2 h-1/2 bg-indigo-100 aboutInfo">
                                        <p className="welcome text-xl xl:text-2xl">Session 2:</p>
                                        <p className="xl:text-xl">
                                            <strong>Date: </strong> {session2Date}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Tuition: </strong> ${session2Tuition}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Includes: </strong> {session2Includes}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Class Time: </strong> {classTime2}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-center mb-10 sm:justify-start sm:w-1/2 ">
                                <img src={budaCrewImg} className="w-[500px] md:w-[700px] infoCard"></img>
                            </div>
                        </div>


                        <div className="w-11/12 p-2 lg:text-xl">
                            <p className="mb-5">
                                <strong>BUDA Crew Audition Date: </strong> {auditionDate}
                            </p>
                            <p className="mb-5">
                                <strong>Requirements: </strong> {requirementInfo}
                            </p>
                            <p className="mb-5">
                                <strong>Extra Performance Info: </strong> {extraPerformanceInfo}
                            </p>
                            <p className="mb-5">
                                <strong>Mandatory Class Dates: </strong> {mandatoryClassDates}
                            </p>
                            <p className="mb-5">
                                <strong>Extra Reheasal Date (if needed): </strong> {extraRehearsalClassDates}
                            </p>
                            <p className="mb-5">
                                <strong>Competition Date and Info: </strong> {compDateInfo}
                            </p>
                        </div>
                        <div className="w-11/12 flex justify-center mb-12">

                            <a className="bg-indigo-800 lg:text-4xl  border-2 border-black hover:bg-gradient-to-l from-indigo-200 to-red-100 transition-all hover:text-black duration-700  text-2xl text-white px-6 py-3 rounded" href="/budacrewadmin">BUDA Crew Member Login</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BudaCrewPage;
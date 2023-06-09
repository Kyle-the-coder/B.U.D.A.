import check from "../assets/images/checkmark.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, storage } from "../config/Firebase";
import { getDoc, doc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"

const BudaCrewPage = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const getPhoto = async () => {
            try {
                const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                const docSnap = await getDoc(docRef);
                setData(docSnap.data())
            } catch (error) {
                console.log(error)
            }
        }
        getPhoto()
    }, [])


    const backOne = () => {
        navigate(-1)
    }

    return (
        <div>

            {/* Banner Section */}
            <section className="w-screen bg-slate-200 h-32 mb-5 flex justify-center ">
            {Object.keys(data).length === 0 ? 
                <div className="loader flex items-center">loading...</div>
            :
                <div className="w-screen bg-slate-200 h-32 mb-5 flex justify-center ">

                {data.crewBannerTracker == "true" ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src={data.crewBannerVid} alt="people dancing and colors" ></video>
                    :
                    <img className="shrink ratesBanner w-full h-full  bg-slate-200" src={data.crewBannerImg} alt="people dancing and colors" />}
                </div>
            }
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
                    <h1 className="sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-3xl mb-5 welcome w-full flex justify-center">BUDA Crew 2023-2024 Season:</h1>
                    <p className="mb-3 w-full flex justify-center xl:text-2xl">*please read all*</p>
                    <p className="mb-3 w-full flex justify-center xl:text-2xl">*member login below*</p>
                    <div className="h-content w-full flex flex-col items-center sm:items-start sm:ml-8">
                        <div className="w-full flex flex-col md:flex-row md:justify-evenly">

                            <div className="sm:w-[640px] w-full ">

                                <h4 >
                                    <strong>Session Dates and Tuition:</strong>
                                </h4>
                                <div className="w-full h-96 sm:h-96  flex flex-col items-center justify-center border-2 border-black mb-5">
                                    <div className="flex shrink bg-red-100 flex-col w-full h-1/2 p-2 border-b-2 border-black border-double aboutInfo">
                                        <p className="welcome text-xl xl:text-2xl">Session 1:</p>
                                        <p className="xl:text-xl">
                                            <strong>Date: </strong> {data.bcSession1Date}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Tuition: </strong> ${data.bcSession1Tuition}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Includes: </strong> {data.bcSession1Includes}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Class Time: </strong> {data.bcClassTime1}
                                        </p>
                                    </div>
                                    <div className="flex shrink flex-col w-full p-2 h-1/2 bg-indigo-100 aboutInfo">
                                        <p className="welcome text-xl xl:text-2xl">Session 2:</p>
                                        <p className="xl:text-xl">
                                            <strong>Date: </strong> {data.bcSession2Date}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Tuition: </strong> ${data.bcSession2Tuition}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Includes: </strong> {data.bcSession2Includes}
                                        </p>
                                        <p className="xl:text-xl">
                                            <strong>Class Time: </strong> {data.bcClassTime2}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-center mb-10 sm:justify-start sm:w-1/2 ">
                                <img src={data.crewMainImg} className= " object-cover w-[620px] h-[480px] infoCard mt-6"></img>
                            </div>
                        </div>


                        <div className="w-11/12 p-2 lg:text-xl">
                            <p className="mb-5">
                                <strong>BUDA Crew Audition Date: </strong> {data.bcAuditionDate}
                            </p>
                            <p className="mb-5">
                                <strong>Requirements: </strong> {data.bcRequirementInfo}
                            </p>
                            <p className="mb-5">
                                <strong>Extra Performance Info: </strong> {data.bcExtraPerformanceInfo}
                            </p>
                            <p className="mb-5">
                                <strong>Mandatory Class Dates: </strong> {data.bcMandatoryClassDates}
                            </p>
                            <p className="mb-5">
                                <strong>Extra Reheasal Date (if needed): </strong> {data.bcExtraRehearsalClassDates}
                            </p>
                            <p className="mb-5">
                                <strong>Competition Date and Info: </strong> {data.bcCompDateInfo}
                            </p>
                        </div>
                        <div className="w-11/12 flex justify-center mb-12">

                            <a className="text-2xl bg-gradient-to-r from-indigo-200 to-red-100  border-2 border-slate-600  transition-all hover:text-black hover:border-black duration-700  text-slate-600  rounded px-6 py-3 rounded" href="/budamember">BUDA Crew Member Login</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BudaCrewPage;
import check from "../assets/images/checkmark.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, storage } from "../config/Firebase";
import { getDoc, doc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import AdminBudaCrewSidebar from "../components/AdminBudaCrewSidebar";

const AdminBudaCrewPage = () => {
    const [data, setData] = useState({})

    //BC INFO HANDLERS
    const [bcSession1Date, setBcSession1Date] = useState('')
    const [bcSession1Tuition, setBcSession1Tuition] = useState('')
    const [bcSession1Includes, setBcSession1Includes] = useState('')
    const [bcSession2Date, setBcSession2Date] = useState('')
    const [bcSession2Tuition, setBcSession2Tuition] = useState('')
    const [bcSession2Includes, setBcSession2Includes] = useState('')
    const [bcClassTime1, setBcClassTime1] = useState('')
    const [bcClassTime2, setBcClassTime2] = useState('')
    const [bcSessionIndex, setBcSessionIndex] = useState('')
    const [bcRequirementInfo, setBcRequirementInfo] = useState('')
    const [bcExtraPerformanceInfo, setBcExtraPerformanceInfo] = useState('')
    const [bcMandatoryClassDates, setBcMandatoryClassDates] = useState('')
    const [bcExtraRehearsalClassDates, setBcExtraReheearsalClassDates] = useState('')
    const [bcCompDateInfo, setBcCompDateInfo] = useState('')
    const [bcAuditionDate, setBcAuditionDate] = useState('')
    const [bcContentIndex, setBcContentIndex] = useState('')

    //BC BANNER HANDLERS
    const [crewBannerImg, setCrewBannerImg] = useState('')
    const [crewBannerVid, setCrewBannerVid] = useState('')
    const [crewBannerTracker, setCrewBannerTracker] = useState(null)
    const [crewBannerHandler, setCrewBannerHandler] = useState("")
    const [crewBannerIndex, setCrewBannerIndex] = useState('')

    //BC IMAGE HANDLERS
    const [crewMainImg, setCrewMainImg] = useState('')
    const [crewMainImgIndex, setCrewMainImgIndex] = useState('')

    //PAGE RESPONSIVENESS HANDLERS
    const [siteExpand, setSiteExpand] = useState(false)
    const [sideExpand, setSideExpand] = useState(false)
    const [perc, setPerc] = useState(null);
    const [highlightFocus, setHighlightFocus] = useState(false)
    const [contentHighlightFocus, setContentHighlightFocus] = useState(false)
    const [contentHighlightIndex, setContentHighlightIndex] = useState('')
    const [expandIndex, setExpandIndex] = useState('')
    const [show, setShow] = useState(false)
    const [timeOut, setTimeOut] = useState(false)

    useEffect(() => {
        const getPhoto = async () => {
            try {
                const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                const docSnap = await getDoc(docRef);
                setData(docSnap.data())

                setBcSession1Date(docSnap.data().bcSession1Date)
                setBcSession1Tuition(docSnap.data().bcSession1Tuition)
                setBcSession1Includes(docSnap.data().bcSession1Includes)
                setBcSession2Date(docSnap.data().bcSession2Date)
                setBcSession2Tuition(docSnap.data().bcSession2Tuition)
                setBcSession2Includes(docSnap.data().bcSession2Includes)
                setBcClassTime1(docSnap.data().bcClassTime1)
                setBcClassTime2(docSnap.data().bcClassTime2)
                setBcRequirementInfo(docSnap.data().bcRequirementInfo)
                setBcExtraPerformanceInfo(docSnap.data().bcExtraPerformanceInfo)
                setBcMandatoryClassDates(docSnap.data().bcMandatoryClassDates)
                setBcExtraReheearsalClassDates(docSnap.data().bcExtraRehearsalClassDates)
                setBcCompDateInfo(docSnap.data().bcCompDateInfo)
                setBcAuditionDate(docSnap.data().bcAuditionDate)

                if (crewBannerTracker == null) {
                    setCrewBannerTracker(docSnap.data().crewBannerTracker)
                } else if (crewBannerHandler == "false") {
                    setCrewBannerTracker("false")
                } else if (crewBannerHandler === "true") {
                    setCrewBannerTracker(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPhoto()

        //CREW MAIN IMG UPLOAD
        const uploadCrewMainImgFile = () => {
            const name = new Date().getTime() + crewMainImg.name
            const storageRef = ref(storage, crewMainImg.name);
            const uploadTask = uploadBytesResumable(storageRef, crewMainImg);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, crewMainImg: downloadURL }))
                    });
                }
            );

        }
        crewMainImg && uploadCrewMainImgFile()

        //CREW BANNER IMG UPLOAD
        const uploadCrewBannerImgFile = () => {
            const name = new Date().getTime() + crewBannerImg.name
            const storageRef = ref(storage, crewBannerImg.name);
            const uploadTask = uploadBytesResumable(storageRef, crewBannerImg);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress)
                    setTimeOut(true)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            setTimeOut(true)
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, crewBannerImg: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        crewBannerImg && uploadCrewBannerImgFile()

        //CREW BANNER Vid UPLOAD
        const uploadCrewBannerVidFile = () => {
            const name = new Date().getTime() + crewBannerVid.name
            const storageRef = ref(storage, crewBannerVid.name);
            const uploadTask = uploadBytesResumable(storageRef, crewBannerVid);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress)
                    setTimeOut(true)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            setTimeOut(true)
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, crewBannerVid: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        crewBannerVid && uploadCrewBannerVidFile()


        setCrewBannerIndex("1")
        setBcSessionIndex("2")
        setBcContentIndex("3")
        setCrewMainImgIndex("4")



    }, [crewMainImg, crewBannerImg, crewBannerVid])

    const navigate = useNavigate();




    const backOne = () => {
        navigate(-1)
    }

    console.log(data)
    return (
        <div className="w-full">
            <div className="flex">
                <section>
                    <AdminBudaCrewSidebar
                        data={data} setData={setData}
                        siteExpand={siteExpand} setSiteExpand={setSiteExpand}
                        sideExpand={sideExpand} setSideExpand={setSideExpand}
                        perc={perc} setPerc={setPerc}
                        highlightFocus={highlightFocus} setHighlightFocus={setHighlightFocus}
                        expandIndex={expandIndex} setExpandIndex={setExpandIndex}
                        show={show} setShow={setShow}
                        bcSession1Date={bcSession1Date} setBcSession1Date={setBcSession1Date}
                        bcSession1Tuition={bcSession1Tuition} setBcSession1Tuition={setBcSession1Tuition}
                        bcSession1Includes={bcSession1Includes} setBcSession1Includes={setBcSession1Includes}
                        bcSession2Date={bcSession2Date} setBcSession2Date={setBcSession2Date}
                        bcSession2Tuition={bcSession2Tuition} setBcSession2Tuition={setBcSession2Tuition}
                        bcSession2Includes={bcSession2Includes} setBcSession2Includes={setBcSession2Includes}
                        bcClassTime1={bcClassTime1} setBcClassTime1={setBcClassTime1}
                        bcClassTime2={bcClassTime2} setBcClassTime2={setBcClassTime2}
                        bcRequirementInfo={bcRequirementInfo} setBcRequirementInfo={setBcRequirementInfo}
                        bcExtraPerformanceInfo={bcExtraPerformanceInfo} setBcExtraPerformanceInfo={setBcExtraPerformanceInfo}
                        bcMandatoryClassDates={bcMandatoryClassDates} setBcMandatoryClassDates={setBcMandatoryClassDates}
                        bcExtraRehearsalClassDates={bcExtraRehearsalClassDates} setBcExtraReheearsalClassDates={setBcExtraReheearsalClassDates}
                        bcCompDateInfo={bcCompDateInfo} setBcCompDateInfo={setBcCompDateInfo}
                        bcAuditionDate={bcAuditionDate} setBcAuditionDate={setBcAuditionDate}
                        crewMainImg={crewMainImg} setCrewMainImg={setCrewMainImg}
                        crewBannerImg={crewBannerImg} setCrewBannerImg={setCrewBannerImg}
                        crewBannerVid={crewBannerVid} setCrewBannerVid={setCrewBannerVid}
                        crewBannerTracker={crewBannerTracker} setCrewBannerTracker={setCrewBannerTracker}
                        crewBannerHandler={crewBannerHandler} setCrewBannerHandler={setCrewBannerHandler}
                        contentHighlightFocus={contentHighlightFocus} setContentHighlightFocus={setContentHighlightFocus}
                        contentHighlightIndex={contentHighlightIndex} setContentHighlightIndex={setContentHighlightIndex}
                        bcSessionIndex={bcSessionIndex}
                        bcContentIndex={bcContentIndex}
                        crewBannerIndex={crewBannerIndex}
                        crewMainImgIndex={crewMainImgIndex}
                    />
                </section>

                <div className={` ${siteExpand ? "w-8/12" : "w-full "} relative flex justify-end items-start transition-all duration-700`}>
                    <div className={` ${siteExpand ? "w-[500px] h-[500px]" : "w-full"}  transition-all duration-700`}>

                        {/* BANNER SECTION */}
                        <section className={`w-full h-content  flex justify-center ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "" : ""} ${sideExpand == false && siteExpand == true ? "" : ""} `}>
                            {timeOut ?
                                <div className="loader flex flex-col items-center justify-center">
                                    <h1>loading...</h1>
                                    <h1>Bigger files might take a few seconds</h1>
                                    <h1>Don't forget to click submit once it's done!</h1>
                                </div>
                                :
                                <div className={`w-full bg-slate-200 mb-5 flex justify-center ${sideExpand == true && siteExpand == false ? "h-[150px]" : ""} ${sideExpand == false && siteExpand == false ? "h-[175px]" : ""} ${sideExpand == true && siteExpand == true ? "h-[95px]" : ""} ${sideExpand == false && siteExpand == true ? "h-[95px]" : ""} transition-all duration-500`}>

                                    {crewBannerTracker === "true" ? <video className={`transition-all duration-500 ${highlightFocus && expandIndex == crewBannerIndex ? "border-4 border-red-700 " : ""}  ratesBanner  w-full h-full  bg-slate-200`} loop muted autoPlay controls='' src={data.crewBannerVid} alt="people dancing and colors" ></video>
                                        :
                                        <img className={`transition-all duration-500 ratesBanner w-full h-full  bg-slate-200 ${highlightFocus && expandIndex == crewBannerIndex ? "border-4 border-red-700 " : ""} `} src={data.crewBannerImg} alt="people dancing and colors" />}
                                </div>
                            }
                        </section>

                        {/* Back One Page Section */}
                        <section className={`w-full  flex items-center justify-end ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "" : ""} ${sideExpand == false && siteExpand == true ? "" : ""}`}>
                            <p className={` w-12  underline text-sky-500 cursor-pointer ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "text-[.7rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.7rem]" : ""} transition-all duration-500`} onClick={() => backOne()} >
                                Back
                            </p>
                        </section>

                        {/* Rates Info Section */}
                        <section >
                            <div className="w-full flex flex-col items-center ">
                                <h1 className={` transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-5xl" : ""} ${sideExpand == false && siteExpand == false ? "text-6xl" : ""} ${sideExpand == true && siteExpand == true ? "text-3xl" : ""} ${sideExpand == false && siteExpand == true ? "text-3xl" : ""}  mb-3 welcome w-full flex justify-center`}>BUDA Crew Info:</h1>
                                <p className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-xl mb-2" : ""} ${sideExpand == false && siteExpand == false ? "text-2xl mb-2" : ""} ${sideExpand == true && siteExpand == true ? "text-md" : ""} ${sideExpand == false && siteExpand == true ? "text-md" : ""}   w-full flex justify-center `}>*please read all*</p>
                                <p className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-xl mb-2" : ""} ${sideExpand == false && siteExpand == false ? "text-2xl mb-3" : ""} ${sideExpand == true && siteExpand == true ? "text-md mb-2" : ""} ${sideExpand == false && siteExpand == true ? "text-md mb-2" : ""} w-full flex justify-center `}>*member login below*</p>
                                <div className="h-content w-full flex flex-col items-center sm:items-start sm:ml-8">
                                    <div className="w-full flex justify-evenly">

                                        <div className={`transition-all duration-500  ${sideExpand == true && siteExpand == false ? "w-[500px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[600px]" : ""} ${sideExpand == true && siteExpand == true ? "w-[200px]" : ""} ${sideExpand == false && siteExpand == true ? "w-[200px]" : ""}  `}>

                                            <h4 className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-xl" : ""} ${sideExpand == false && siteExpand == false ? "text-2xl" : ""} ${sideExpand == true && siteExpand == true ? "text-[.7rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.7rem]" : ""}`} >
                                                <strong>Session Dates and Tuition:</strong>
                                            </h4>
                                            <div className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "h-[380px]" : ""} ${sideExpand == false && siteExpand == false ? "h-[480px] " : ""} ${sideExpand == true && siteExpand == true ? "h-[200px]" : ""} ${sideExpand == false && siteExpand == true ? "h-[200px]" : ""} ${highlightFocus && expandIndex == bcSessionIndex ? "border-4 border-red-700 " : "border-2 border-black"} w-full  flex flex-col items-center justify-center  mb-5`}>
                                                <div className={` transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-md" : ""} ${sideExpand == false && siteExpand == false ? "text-xl" : ""} ${sideExpand == true && siteExpand == true ? "text-[.4rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.4rem]" : ""} flex shrink bg-red-100 flex-col w-full h-1/2 p-2 border-b-2 border-black border-double aboutInfo`}>
                                                    <p className={`welcome transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-md" : ""} ${sideExpand == false && siteExpand == false ? "text-xl" : ""} ${sideExpand == true && siteExpand == true ? "text-[.4rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.4rem]" : ""}`}>Session 1:</p>
                                                    <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "1" ? "border-2 border-red-700 " : ""}`}>
                                                        <strong>Date: </strong> {bcSession1Date}
                                                    </p>
                                                    <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "2" ? "border-2 border-red-700 " : ""}`}>
                                                        <strong>Tuition: </strong> ${bcSession1Tuition}
                                                    </p>
                                                    <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "3" ? "border-2 border-red-700 " : ""}`}>
                                                        <strong>Includes: </strong> {bcSession1Includes}
                                                    </p>
                                                    <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "4" ? "border-2 border-red-700 " : ""}`}>
                                                        <strong>Class Time: </strong> {bcClassTime1}
                                                    </p>
                                                </div>
                                                <div className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-md" : ""} ${sideExpand == false && siteExpand == false ? "text-xl" : ""} ${sideExpand == true && siteExpand == true ? "text-[.4rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.4rem]" : ""} flex shrink flex-col w-full p-2 h-1/2 bg-indigo-100 aboutInfo`}>
                                                    <p className={`welcome transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-md" : ""} ${sideExpand == false && siteExpand == false ? "text-xl" : ""} ${sideExpand == true && siteExpand == true ? "text-[.4rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.4rem]" : ""}`}>Session 2:</p>
                                                    <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "5" ? "border-2 border-red-700 " : ""}`}>
                                                        <strong>Date: </strong> {bcSession2Date}
                                                    </p>
                                                    <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "6" ? "border-2 border-red-700 " : ""}`}>
                                                        <strong>Tuition: </strong> ${bcSession2Tuition}
                                                    </p>
                                                    <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "7" ? "border-2 border-red-700 " : ""}`} >
                                                        <strong>Includes: </strong> {bcSession2Includes}
                                                    </p>
                                                    <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "8" ? "border-2 border-red-700 " : ""}`} >
                                                        <strong>Class Time: </strong> {bcClassTime2}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-center  sm:justify-start sm:w-1/2 ">
                                            <img src={data.crewMainImg} className={`${highlightFocus && expandIndex == crewMainImgIndex ? "border-4 border-red-700 " : ""} object-cover transition-all duration-500 infoCard  ${sideExpand == true && siteExpand == false ? "w-[700px] h-[380px] mt-7" : ""} ${sideExpand == false && siteExpand == false ? "w-[900px] h-[480px] mt-8" : ""} ${sideExpand == true && siteExpand == true ? "w-[300px] h-[200px] mt-4" : ""} ${sideExpand == false && siteExpand == true ? "w-[300px] h-[200px] mt-4" : ""}  `}></img>
                                        </div>
                                    </div>


                                    <div className={`transition-all duration-500 ${highlightFocus && expandIndex == bcContentIndex ? "border-4 border-red-700 " : ""} flex flex-col justify-evenly w-11/12 p-2 ${sideExpand == true && siteExpand == false ? "text-md h-[340px]" : ""} ${sideExpand == false && siteExpand == false ? "text-xl h-[380px]" : ""} ${sideExpand == true && siteExpand == true ? "text-[.4rem] h-[140px]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.4rem] h-[140px]" : ""}`}>
                                        <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "9" ? "border-2 border-red-700 " : ""}`} >
                                            <strong>BUDA Crew Audition Date: </strong> {bcAuditionDate}
                                        </p>
                                        <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "10" ? "border-2 border-red-700 " : ""}`}>
                                            <strong>Requirements: </strong> {bcRequirementInfo}
                                        </p>
                                        <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "11" ? "border-2 border-red-700 " : ""}`}>
                                            <strong>Extra Performance Info: </strong> {bcExtraPerformanceInfo}
                                        </p>
                                        <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "12" ? "border-2 border-red-700 " : ""}`}>
                                            <strong>Mandatory Class Dates: </strong> {bcMandatoryClassDates}
                                        </p>
                                        <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "13" ? "border-2 border-red-700 " : ""}`} >
                                            <strong>Extra Reheasal Date (if needed): </strong> {bcExtraRehearsalClassDates}
                                        </p>
                                        <p className={`transition-all duration-200 ${contentHighlightFocus && contentHighlightIndex == "14" ? "border-2 border-red-700 " : ""}`} >
                                            <strong>Competition Date and Info: </strong> {bcCompDateInfo}
                                        </p>
                                    </div>
                                    <div className="w-11/12 flex justify-center mb-12">

                                        <a className={`${sideExpand == true && siteExpand == false ? "text-md px-6 py-3 ml-3" : ""} ${sideExpand == false && siteExpand == false ? "text-xl ml-3 px-6 py-3" : ""} ${sideExpand == true && siteExpand == true ? "text-[.4rem] px-3 py-1 ml-1" : ""} ${sideExpand == false && siteExpand == true ? "text-[.4rem] px-3 py-1 ml-1" : ""} bg-gradient-to-r from-indigo-200 to-red-100  border-2 border-slate-700  transition-all hover:text-black hover:border-black duration-700  text-slate-700  rounded`} href="/budacrewadmin">BUDA Crew Member Login</a>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminBudaCrewPage;
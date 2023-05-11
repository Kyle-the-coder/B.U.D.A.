import arrow from "../assets/images/right-arrow2.png"
import chevron from "../assets/images/down-chevron.png"
import more from "../assets/images/more.png"
import { useState } from "react";
import { db } from "../config/Firebase";
import { serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore"
import "../styles/scrollbar.css"



const AdminBudaCrewSidebar = (props) => {
    //ALL INFO
    const { data, setData } = props

    //CREW INFO 
    const { bcSession1Date, setBcSession1Date } = props
    const { bcSession1Tuition, setBcSession1Tuition } = props
    const { bcSession1Includes, setBcSession1Includes } = props
    const { bcSession2Date, setBcSession2Date } = props
    const { bcSession2Tuition, setBcSession2Tuition } = props
    const { bcSession2Includes, setBcSession2Includes } = props
    const { bcClassTime1, setBcClassTime1 } = props
    const { bcClassTime2, setBcClassTime2 } = props

    //EXTRA INFO
    const { bcRequirementInfo, setBcRequirementInfo } = props
    const { bcExtraPerformanceInfo, setBcExtraPerformanceInfo } = props
    const { bcMandatoryClassDates, setBcMandatoryClassDates } = props
    const { bcExtraRehearsalClassDates, setBcExtraReheearsalClassDates } = props
    const { bcCompDateInfo, setBcCompDateInfo } = props
    const { bcAuditionDate, setBcAuditionDate } = props

    //INDEXES FOR HIGHLIGHT
    const { bcSessionIndex } = props
    const { bcContentIndex } = props
    const { crewBannerIndex } = props
    const { crewMainImgIndex } = props

    //CREW IMGS
    const { crewMainImg, setCrewMainImg } = props

    //BANNER HANDLERS
    const { crewBannerImg, setCrewBannerImg } = props
    const { crewBannerVid, setCrewBannerVid } = props
    const { crewBannerTracker, setCrewBannerTracker } = props
    const { crewBannerHandler, setCrewBannerHandler } = props

    //PAGE HANDLERS
    const { perc, setPerc } = props
    const { highlightFocus, setHighlightFocus } = props
    const { contentHighlightFocus, setContentHighlightFocus } = props
    const { contentHighlightIndex, setContentHighlightIndex } = props
    const { expandIndex, setExpandIndex } = props
    const { mainImgIndex } = props
    const { siteExpand, setSiteExpand } = props
    const { sideExpand, setSideExpand } = props
    const [expand, setExpand] = useState(false)


    const handleExpandOption = (index) => {
        if (index != expandIndex) {
            setExpand(true)
        } else {
            setExpand(!expand)
        }
    }

    const handleExpandIndex = (index) => {
        setExpandIndex(index)
        if (index != "2" || index != "3") {
            setContentHighlightIndex(false)
        }
    }

    const handleContentHighlightFocus = () => {
        setContentHighlightFocus(true)

    }


    const editPhoto = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                timeStamp: serverTimestamp()
            });
            setExpand(false)
            alert("image went through")
        } catch (error) {
            console.log(error)
        }
    }


    const handleFocus = (index) => {
        if (index == bcSessionIndex || index == bcContentIndex || index == crewMainImgIndex || index == crewBannerIndex) {
            setHighlightFocus(true)
        } else {
            setHighlightFocus(false)
        }
    }


    const editBcContent = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                bcRequirementInfo: bcRequirementInfo,
                bcExtraPerformanceInfo: bcExtraPerformanceInfo,
                bcMandatoryClassDates: bcMandatoryClassDates,
                bcExtraRehearsalClassDates: bcExtraRehearsalClassDates,
                bcCompDateInfo: bcCompDateInfo,
                bcAuditionDate: bcAuditionDate,
                timeStamp: serverTimestamp()
            });
            setExpand(false)
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

        } catch (error) {
            console.log(error)
        }
    }


    const editBcSessionInfo = async (e) => {
        e.preventDefault()
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                bcSession1Date: bcSession1Date,
                bcSession1Tuition: bcSession1Tuition,
                bcSession1Includes: bcSession1Includes,
                bcSession2Date: bcSession2Date,
                bcSession2Tuition: bcSession2Tuition,
                bcSession2Includes: bcSession2Includes,
                bcClassTime1: bcClassTime1,
                bcClassTime2: bcClassTime2,
                timeStamp: serverTimestamp()
            });
            setExpand(false)
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

        } catch (error) {
            console.log(error)
        }
    }

    const editCrewBannerTracker = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                crewBannerTracker: crewBannerTracker,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }

    const sessionOptions = [
        {
            name: "Edit Banner",
            index: "1",
            content:
                <div className="w-[400px] transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute left-[350px]  z-[999]">
                    <div className="w-full flex flex-col items-center p-2">
                        <div className=" transition-all duration-700">
                            <h1>Edit Banner Image:</h1>
                        </div>
                        <input type="file" className="m-8  transition-all duration-700 w-full" onChange={(e) => { setCrewBannerTracker("false"); setCrewBannerHandler(false); setCrewBannerImg(e.target.files[0]) }} />
                        <input type="hidden" value="false" onClick={(e) => { setCrewBannerTracker(e.target.value); editCrewBannerTracker() }} />
                        <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={() => { editPhoto(); editCrewBannerTracker() }}>Submit</button>
                    </div>

                    <div className="w-full p-2 text-black border-t-2 mt-3 bg-indigo-200 flex flex-col items-center">
                        <div className=" transition-all duration-700  w-full flex justify-center ">
                            <h1 className="mt-5">OR make the banner a video:</h1>
                        </div>
                        <input type="file" className="m-8  transition-all duration-700 w-full" onChange={(e) => { setCrewBannerTracker("true"); setCrewBannerHandler(true); setCrewBannerVid(e.target.files[0]) }} />
                        <input type="hidden" value="true" onClick={(e) => { setCrewBannerTracker(e.target.value); editCrewBannerTracker() }} />
                        <button disabled={perc !== null && perc < 100} className="bg-slate-800 text-indigo-200 transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-200 py-2" onClick={() => { editCrewBannerTracker() }}>Submit</button>
                    </div>
                </div>
        },
        {
            name: "Edit Crew Session Info",
            index: "2",
            content:
                <div className="w-[350px] h-[350px] aboutInfo  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Crew Session Info:</h1>
                    </div>

                    <div className="my-2">
                        <label className="text-white">Session 1 Date:</label>
                        <input type="text" className=" text-black w-full transition-all duration-700 p-2" value={bcSession1Date} onChange={(e) => setBcSession1Date(e.target.value)} onClick={() => { setContentHighlightIndex("1"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>
                    <div className="my-2">
                        <label className="text-white">Session 1 Tuition:</label>
                        <input type="text" className=" text-black w-full transition-all duration-700 p-2" value={bcSession1Tuition} onChange={(e) => setBcSession1Tuition(e.target.value)} onClick={() => { setContentHighlightIndex("2"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>
                    <div className="my-2">
                        <label className="text-white">Session 1 Includes:</label>
                        <input type="text" className=" text-black w-full transition-all duration-700 p-2" value={bcSession1Includes} onChange={(e) => setBcSession1Includes(e.target.value)} onClick={() => { setContentHighlightIndex("3"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>
                    <div className="my-2">
                        <label className="text-white">Session 1 Class Time:</label>
                        <input type="text" className=" text-black w-full transition-all duration-700 p-2" value={bcClassTime1} onChange={(e) => setBcClassTime1(e.target.value)} onClick={() => { setContentHighlightIndex("4"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>

                    <div className="my-2">
                        <label className="text-white">Session 2 Date:</label>
                        <input type="text" className="text-black w-full transition-all duration-700 p-2" value={bcSession2Date} onChange={(e) => setBcSession2Date(e.target.value)} onClick={() => { setContentHighlightIndex("5"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>
                    <div className="my-2">
                        <label className="text-white">Session 2 Tuition:</label>
                        <input type="text" className="text-black w-full transition-all duration-700 p-2" value={bcSession2Tuition} onChange={(e) => setBcSession2Tuition(e.target.value)} onClick={() => { setContentHighlightIndex("6"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>
                    <div className="my-2">
                        <label className="text-white">Session 2 Includes:</label>
                        <input type="text" className=" text-black w-full transition-all duration-700 p-2" value={bcSession2Includes} onChange={(e) => setBcSession2Includes(e.target.value)} onClick={() => { setContentHighlightIndex("7"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>
                    <div className="my-2">
                        <label className="text-white">Session 2 Class Time:</label>
                        <input type="text" className="text-black w-full transition-all duration-700 p-2" value={bcClassTime2} onChange={(e) => setBcClassTime2(e.target.value)} onClick={() => { setContentHighlightIndex("8"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>

                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editBcSessionInfo}>Submit</button>
                </div>
        },
        {
            name: "Edit Buda Crew Content",
            index: "3",
            content:
                <div className="w-[350px] h-[400px] aboutInfo  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Buda Crew Content:</h1>
                    </div>
                    <div className="my-4">
                        <label>Audition Date Info:</label>
                        <input type="text" value={bcAuditionDate} className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => { setBcAuditionDate(e.target.value) }} onClick={() => { setContentHighlightIndex("9"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>

                    <div className="my-4">
                        <label>Requirement Info:</label>
                        <textarea  rows="10" type="text" value={bcRequirementInfo} className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => { setBcRequirementInfo(e.target.value) }} onClick={() => { setContentHighlightIndex("10"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>

                    <div className="my-4">
                        <label>Extra Performance Info:</label>
                        <textarea  rows="10" type="text" value={bcExtraPerformanceInfo} className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => { setBcExtraPerformanceInfo(e.target.value) }} onClick={() => { setContentHighlightIndex("11"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>

                    <div className="my-4">
                        <label>Mandatory Class Dates:</label>
                        <textarea  rows="10"  type="text" value={bcMandatoryClassDates} className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => { setBcMandatoryClassDates(e.target.value) }} onClick={() => { setContentHighlightIndex("12"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>

                    <div className="my-4">
                        <label>Extra Reheasal Dates:</label>
                        <input type="text" value={bcExtraRehearsalClassDates} className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => { setBcExtraReheearsalClassDates(e.target.value) }} onClick={() => { setContentHighlightIndex("13"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>

                    <div className="my-4">
                        <label>Comp Date Info:</label>
                        <textarea  rows="10"  type="text" value={bcCompDateInfo} className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => { setBcCompDateInfo(e.target.value) }} onClick={() => { setContentHighlightIndex("14"); handleContentHighlightFocus(); setHighlightFocus(true) }} />
                    </div>

                    



                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editBcContent}>Submit</button>
                </div>
        },
        {
            name: "Edit Main Image",
            index: "4",
            content:
                <div className="w-[400px] transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute left-[350px]  z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Buda Crew Main Image:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => setCrewMainImg(e.target.files[0])} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editPhoto}>Submit</button>
                </div>
        },
    ]

    return (
        <div className={` ${sideExpand ? "w-[350px]" : "w-[70px] "} ${siteExpand ? "h-[1175px]" : "h-full"} px-2  flex justify-center bg-slate-900  transition-all duration-700`}>

            <div className="cursor-pointer w-full h-full" onClick={() => { setSideExpand(!sideExpand); setExpand(false); setHighlightFocus(false); setContentHighlightFocus(false) }}>
                <img className="w-[50px] h-[50px] cursor-pointer mt-1" src={more} />
            </div>

            {sideExpand &&
                <div className="w-[300px]   bg-slate-900  z-[999] transition-all duration-700">

                    <section className="w-full ">
                        <div className="w-full">
                            <h1 className="p-3 text-white text-lg">Edit Session Options:</h1>
                            <div onClick={() => setSiteExpand(!siteExpand)} className="w-[280px] cursor-pointer flex justify-between items-center">
                                <h1 className="p-3 text-white text-lg">Site Size: <span>{siteExpand ? "Small" : "Big"}</span></h1>
                                <img className={` ${siteExpand ? "" : "rotate-180"} w-[20px] h-[20px] origin-center  transition-all duration-700`} src={chevron} />
                            </div>
                        </div>
                    </section>

                    <section className="w-full flex flex-col items-center">
                        <div className="w-[285px] bg-slate-800  rounded-lg transition-all duration-700 ">
                            {sessionOptions.map((option) => {
                                return (
                                    <div key={option.index} className="flex w-[280px] my-5  items-start p-1 transition-all duration-700">
                                        <div onClick={() => { handleExpandOption(option.index); handleExpandIndex(option.index); handleFocus(option.index) }} className={` ${highlightFocus && expandIndex == option.index ? "text-slate-900 bg-slate-100" : "text-indigo-300 "} relative w-full transition-all duration-700 hover:text-slate-900 cursor-pointer flex justify-between items-center hover:bg-slate-100 mb-10 rounded-lg px-2 hover:bg-indigo-300 transition-all duration-700`}>
                                            <p className="my-2  " >{option.name}</p>
                                            <img className="w-[30px] h-[30px]" src={arrow} />
                                        </div>


                                        {expand && expandIndex === option.index && <div>{option.content}</div>}

                                    </div>
                                )
                            })}
                        </div>

                    </section>

                </div>
            }

        </div>
    )
}

export default AdminBudaCrewSidebar;
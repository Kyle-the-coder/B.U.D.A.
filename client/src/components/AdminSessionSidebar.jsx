import arrow from "../assets/images/right-arrow2.png"
import chevron from "../assets/images/down-chevron.png"
import more from "../assets/images/more.png"
import { useState } from "react";
import { db } from "../config/Firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore"
import "../styles/scrollbar.css"



const AdminSessionSidebar = (props) => {
    //ALL INFO
    const { data, setData } = props

    //SESSION INFO
    const { sessionTitle, setSessionTitle } = props
    const { startDate, setStartDate } = props
    const { showDate, setShowDate } = props
    const { showLocation, setShowLocation } = props
    const { showTech, setShowTech } = props
    const { showTitle, setShowTitle } = props
    const { showTime, setShowTime } = props
    const { sessionLink, setSessionLink } = props
    const { sessionIntro, setSessionIntro } = props

    //NO CLASS INFO
    const { noClass1, setNoClass1 } = props
    const { noClass2, setNoClass2 } = props
    const { noClass3, setNoClass3 } = props
    const { noClass4, setNoClass4 } = props
    const { noClass5, setNoClass5 } = props
    const { noClass6, setNoClass6 } = props
    const { noClass7, setNoClass7 } = props

    //SESSION IMGS
    const { sessionMainImg, setSessionMainImg } = props
    const { sessionImg2, setSessionImg2 } = props
    const { sessionImg3, setSessionImg3 } = props

    //BANNER HANDLERS
    const { sessionBannerImg, setSessionBannerImg } = props
    const { sessionBannerVid, setSessionBannerVid } = props
    const { sessionBannerTracker, setSessionBannerTracker } = props
    const { sessionBannerHandler, setSessionBannerHandler } = props
    const { show, setShow } = props

    //PAGE HANDLERS
    const { perc, setPerc } = props
    const { highlightFocus, setHighlightFocus } = props
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
        if (index == null) {
            setHighlightFocus(true)
        } else {
            setHighlightFocus(false)
        }
    }


    const editSessionContent = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                startDate: startDate,
                showDate: showDate,
                showLocation: showLocation,
                showTech: showTech,
                showTitle: showTitle,
                showTime: showTime,
                sessionLink: sessionLink,
                sessionIntro: sessionIntro,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }
    const editSessionNoClassContent = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                noClass1 : noClass1,
                noClass2 : noClass2,
                noClass3 : noClass3,
                noClass4 : noClass4,
                noClass5 : noClass5,
                noClass6 : noClass6,
                noClass7 : noClass7,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }

    const editSessionTitle = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                sessionTitle: sessionTitle,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }

    const editSessionBannerTracker = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                sessionBannerTracker: sessionBannerTracker,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }

    const sessionOptions = [
        {
            name: "Edit Session Banner",
            index: "1",
            content:
                <div className="w-[400px] transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute left-[350px]  z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Session Banner Image:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => { setSessionBannerTracker("false"); setSessionBannerHandler(false); setSessionBannerImg(e.target.files[0]) }} />
                    <input type="hidden" value="false" onClick={(e) => { setSessionBannerTracker(e.target.value); editSessionBannerTracker() }} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={() => { editPhoto(); editSessionBannerTracker() }}>Submit</button>

                    <div className=" transition-all duration-700 mt-6 border-t-2 w-full flex justify-center ">
                        <h1 className="mt-5">OR make the banner a video:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => { setSessionBannerTracker("true"); setSessionBannerHandler(true); setSessionBannerVid(e.target.files[0]) }} />
                    <input type="hidden" value="true" onClick={(e) => { setSessionBannerTracker(e.target.value); editSessionBannerTracker() }} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={() => { editSessionBannerTracker() }}>Submit</button>
                </div>
        },
        {
            name: "Edit Session Title",
            index: "2",
            content:
                <div className="w-[300px]  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Session Title:</h1>
                    </div>
                    <input type="text" className="m-8 text-black w-full transition-all duration-700 p-2" onChange={(e) => setSessionTitle(e.target.value)} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editSessionTitle}>Submit</button>
                </div>
        },
        {
            name: "Edit Session Content",
            index: "3",
            content:
                <div className="w-[350px] h-[300px] aboutInfo  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Summer Content:</h1>
                    </div>

                    <div className="my-4">
                        <label>Session Intro:</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setSessionIntro(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label className="">Session Start Date:</label>
                        <input type="text" className=" text-black w-full transition-all duration-700 p-2" onChange={(e) => setStartDate(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>Show Date:</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setShowDate(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>Show Location:</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setShowLocation(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>Show Tech Time:</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setShowTech(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>Show Title:</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setShowTitle(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>Show Time:</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setShowTime(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>Session Link:</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setSessionLink(e.target.value)} />
                    </div>

                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editSessionContent}>Submit</button>
                </div>
        },
        {
            name: "Edit 'No Class' Dates",
            index: "4",
            content:
                <div className="w-[350px] h-[300px] aboutInfo transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit "No Class" Dates:</h1>
                    </div>

                    <div className="my-4">
                        <label>No Class 1 (optional):</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setNoClass1(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>No Class 2 (optional):</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setNoClass2(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>No Class 3 (optional):</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setNoClass3(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>No Class 4 (optional):</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setNoClass4(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>No Class 5 (optional):</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setNoClass5(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>No Class 6 (optional):</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setNoClass6(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <label>No Class 7 (optional):</label>
                        <input type="text" className="w-full text-black  transition-all duration-700 p-2" onChange={(e) => setNoClass7(e.target.value)} />
                    </div>

                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editSessionNoClassContent}>Submit</button>
                </div>
        },

        {
            name: "Edit Session Main Image",
            index: "5",
            content:
                <div className="w-[400px] transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute left-[350px]  z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Summer Main Image:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => setSessionMainImg(e.target.files[0])} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editPhoto}>Submit</button>
                </div>
        },
        {
            name: "Edit Left Image",
            index: "6",
            content:
                <div className="w-[400px] transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Left Image:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => setSessionImg2(e.target.files[0])} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editPhoto}>Submit</button>
                </div>
        },
        {
            name: "Edit Right Image",
            index: "7",
            content:
                <div className="w-[400px] transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Right Image:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => setSessionImg3(e.target.files[0])} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editPhoto}>Submit</button>
                </div>
        },
    ]



console.log(data)
console.log(noClass7)
    return (
        <div className={` ${sideExpand ? "w-[350px]" : "w-[70px] "} ${siteExpand ? "h-[975px]" : "h-full"} px-2  flex justify-center bg-slate-900  transition-all duration-700`}>
            <img className="w-[50px] h-[50px] cursor-pointer mt-1" onClick={() => { setSideExpand(!sideExpand); setExpand(false); setHighlightFocus(false) }} src={more} />
            {sideExpand &&
                <div className="w-[300px]   bg-slate-900  z-[999] transition-all duration-700">

                    <section className="w-full ">
                        <div className="w-full">
                            <h1 className="p-3 text-white text-lg">Edit Homepage Options:</h1>
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

export default AdminSessionSidebar;
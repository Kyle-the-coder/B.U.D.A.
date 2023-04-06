import arrow from "../assets/images/right-arrow2.png"
import chevron from "../assets/images/down-chevron.png"
import more from "../assets/images/more.png"
import { useState } from "react";
import { db } from "../config/Firebase";
import { serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore"
import "../styles/scrollbar.css"



const AdminMemberSidebar = (props) => {
    //ALL INFO
    const { data, setData } = props

    //MEMBER PAGE INFO HANDLERS
    const { memberTitle, setMemberTitle } = props
    const { memberUpcomingEventsInfo, setMemberUpcomingEventsInfo } = props
    const { memberHomeworkInfo, setMemberHomeworkInfo } = props
    const { memberBudaCrewInfo, setMemberBudaCrewInfo } = props
    const { memberContactPhone, setMemberContactPhone } = props

    //MEMBER BANNER AND MAIN IMG HANDLERS
    const { memberMainImg, setMemberMainImg } = props
    const { memberBannerImg, setMemberBannerImg } = props
    const { memberBannerVid, setMemberBannerVid } = props
    const { memberBannerTracker, setMemberBannerTracker } = props
    const { memberBannerHandler, setMemberBannerHandler } = props

    //MUSIC LIST HANDLERS
    const { memberMusicList, setMemberMusicList } = props
    const { memberMusicTitle, setMemberMusicTitle } = props
    const { memberMusicLink, setMemberMusicLink } = props

    //VIDEO LIST HANDLERS
    const { memberVideoList, setMemberVideoList } = props
    const { memberVideoLink, setMemberVideoLink } = props
    const { memberVideoTitle, setMemberVideoTitle } = props

    //INDEXES FOR HIGHLIGHT
    const { memberAddIndex } = props
    const { memberInfoIndex } = props
    const { memberMainImgIndex } = props
    const { memberBannerIndex } = props

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
        if (index != "3") {
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
        if (index == memberAddIndex || index == memberBannerIndex || index == memberInfoIndex || index == memberMainImgIndex) {
            setHighlightFocus(true)
        } else {
            setHighlightFocus(false)
        }
    }


    const editMemberSessionInfo = async (e) => {
        e.preventDefault()
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                memberTitle: memberTitle,
                memberUpcomingEventsInfo: memberUpcomingEventsInfo,
                memberHomeworkInfo: memberHomeworkInfo,
                memberBudaCrewInfo: memberBudaCrewInfo,
                memberContactPhone: memberContactPhone,
                timeStamp: serverTimestamp()
            });
            setExpand(false)
            const getPhoto = async () => {
                try {
                    const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                    const docSnap = await getDoc(docRef);
                    setData(docSnap.data())
                    setMemberTitle(docSnap.data().memberTitle)
                    setMemberUpcomingEventsInfo(docSnap.data().memberUpcomingEventsInfo)
                    setMemberHomeworkInfo(docSnap.data().memberHomeworkInfo)
                    setMemberBudaCrewInfo(docSnap.data().memberBudaCrewInfo)
                    setMemberContactPhone(docSnap.data().memberContactPhone)
                    if (memberBannerTracker == null) {
                        setMemberBannerTracker(docSnap.data().memberBannerTracker)
                    } else if (memberBannerHandler == "false") {
                        setMemberBannerTracker("false")
                    } else if (memberBannerHandler === "true") {
                        setMemberBannerTracker(true)
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

    const editMemberBannerTracker = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                MemberBannerTracker: memberBannerTracker,
                timeStamp: serverTimestamp()
            });
            setExpand(false)
            const getPhoto = async () => {
                try {
                    const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                    const docSnap = await getDoc(docRef);
                    setData(docSnap.data())
                    setMemberTitle(docSnap.data().memberTitle)
                    setMemberUpcomingEventsInfo(docSnap.data().memberUpcomingEventsInfo)
                    setMemberHomeworkInfo(docSnap.data().memberHomeworkInfo)
                    setMemberBudaCrewInfo(docSnap.data().memberBudaCrewInfo)
                    setMemberContactPhone(docSnap.data().memberContactPhone)
                    if (memberBannerTracker == null) {
                        setMemberBannerTracker(docSnap.data().memberBannerTracker)
                    } else if (memberBannerHandler == "false") {
                        setMemberBannerTracker("false")
                    } else if (memberBannerHandler === "true") {
                        setMemberBannerTracker(true)
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

    const addMemberMusicLink = async () => {
        try {
            await setDoc(doc(db, "memberMusicLinks", process.env.REACT_APP_MUSIC_ID), {
                musicList: [...memberMusicList, { musicLink: memberMusicLink, musicTitle: memberMusicTitle }],
                timeStamp: serverTimestamp()
            });
            setExpand(false)
            const getMusicLinks = async () => {
                try {
                    const docRef = doc(db, "memberMusicLinks", process.env.REACT_APP_MUSIC_ID);
                    const docSnap = await getDoc(docRef);
                    setMemberMusicList(docSnap.data().musicList)
                } catch (error) {
                    console.log(error)
                }
            }
            getMusicLinks()
        } catch (error) {
            console.log(error)
        }
    }
    const addMemberVideoLink = async () => {
        try {
            await setDoc(doc(db, "memberVidLinks", process.env.REACT_APP_VIDEO_ID), {
                videoList: [...memberVideoList, { videoLink: memberVideoLink, videoTitle: memberVideoTitle }],
                timeStamp: serverTimestamp()
            });
            setExpand(false)
            const getVideoLinks = async () => {
                try {
                    const docRef = doc(db, "memberVidLinks", process.env.REACT_APP_VIDEO_ID);
                    const docSnap = await getDoc(docRef);
                    setMemberVideoList(docSnap.data().videoList)
                } catch (error) {
                    console.log(error)
                }
            }
            getVideoLinks()
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
                        <input type="file" className="m-8  transition-all duration-700 w-full" onChange={(e) => { setMemberBannerTracker("false"); setMemberBannerHandler(false); setMemberBannerImg(e.target.files[0]) }} />
                        <input type="hidden" value="false" onClick={(e) => { setMemberBannerTracker(e.target.value); editMemberBannerTracker() }} />
                        <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={() => { editPhoto(); editMemberBannerTracker() }}>Submit</button>
                    </div>

                    <div className="w-full p-2 text-black border-t-2 mt-3 bg-indigo-200 flex flex-col items-center">
                        <div className=" transition-all duration-700  w-full flex justify-center ">
                            <h1 className="mt-5">OR make the banner a video:</h1>
                        </div>
                        <input type="file" className="m-8  transition-all duration-700 w-full" onChange={(e) => { setMemberBannerTracker("true"); setMemberBannerHandler(true); setMemberBannerVid(e.target.files[0]) }} />
                        <input type="hidden" value="true" onClick={(e) => { setMemberBannerTracker(e.target.value); editMemberBannerTracker() }} />
                        <button disabled={perc !== null && perc < 100} className="bg-slate-800 text-indigo-200 transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-200 py-2" onClick={() => { editMemberBannerTracker() }}>Submit</button>
                    </div>
                </div>
        },
        {
            name: "Edit Member Info",
            index: "2",
            content:
                <div className="w-[350px] h-[300px] aboutInfo  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Member Info:</h1>
                    </div>

                    <div className="my-2 w-full">
                        <label className="text-white">Title:</label>
                        <input type="text" className=" text-black w-full transition-all duration-700 p-2" value={memberTitle} onChange={(e) => setMemberTitle(e.target.value)} />
                    </div>
                    <div className="my-2">
                        <label className="text-white">Upcoming Events Info:</label>
                        <input type="text" className=" text-black w-full transition-all duration-700 p-2" value={memberUpcomingEventsInfo} onChange={(e) => setMemberUpcomingEventsInfo(e.target.value)} />
                    </div>
                    <div className="my-2">
                        <label className="text-white">Homework Info:</label>
                        <input type="text" className=" text-black w-full transition-all duration-700 p-2" value={memberHomeworkInfo} onChange={(e) => setMemberHomeworkInfo(e.target.value)} />
                    </div>
                    <div className="my-2">
                        <label className="text-white">Crew Info:</label>
                        <input type="text" className=" text-black w-full transition-all duration-700 p-2" value={memberBudaCrewInfo} onChange={(e) => setMemberBudaCrewInfo(e.target.value)} />
                    </div>
                    <div className="my-2">
                        <label className="text-white">Phone Contact(if changed):</label>
                        <input type="text" className="text-black w-full transition-all duration-700 p-2" value={memberContactPhone} onChange={(e) => setMemberContactPhone(e.target.value)} />
                    </div>
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 my-2 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editMemberSessionInfo}>Submit</button>
                </div>
        },
        {
            name: "Add Video or Music",
            index: "3",
            content:
                <div className="w-[350px] h-[300px] aboutInfo  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">

                    <div className="w-full">
                        <div className="w-full flex justify-center">
                            <h1>Add a Mix:</h1>
                        </div>
                        <div className=" transition-all duration-700 my-1">
                            <h1>Music Title:</h1>
                            <input type="text" className=" text-black w-full transition-all duration-700 p-2" onChange={(e) => setMemberMusicTitle(e.target.value)} />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className=" transition-all duration-700 my-1">
                            <h1>Music Url:</h1>
                            <input type="text" className=" text-black w-full transition-all duration-700 p-2" onChange={(e) => setMemberMusicLink(e.target.value)} />
                        </div>
                    </div>
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 my-1 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={addMemberMusicLink}>Submit</button>

                    <div className="w-full border-t-2 mt-3">
                        <div className="w-full flex justify-center my-2">
                            <h1>Add a Video:</h1>
                        </div>
                        <div className=" transition-all duration-700 my-1">
                            <h1>Video Title:</h1>
                            <input type="text" className=" text-black w-full transition-all duration-700 p-2" onChange={(e) => setMemberVideoTitle(e.target.value)} />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className=" transition-all duration-700 my-1">
                            <h1>Video Url:</h1>
                            <input type="text" className=" text-black w-full transition-all duration-700 p-2" onChange={(e) => setMemberVideoLink(e.target.value)} />
                        </div>
                    </div>
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 my-1 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={addMemberVideoLink}>Submit</button>
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
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => setMemberMainImg(e.target.files[0])} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editPhoto}>Submit</button>
                </div>
        },
    ]
    return (
        <div className={` ${sideExpand ? "w-[350px]" : "w-[70px] "} ${siteExpand ? "h-[1175px]" : "h-full"} px-2  flex justify-center bg-slate-900  transition-all duration-700`}>

            <div className="cursor-pointer w-full h-full" onClick={() => { setSideExpand(!sideExpand); setExpand(false); setHighlightFocus(false) }}>
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

export default AdminMemberSidebar;

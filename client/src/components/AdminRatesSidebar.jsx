import arrow from "../assets/images/right-arrow2.png"
import chevron from "../assets/images/down-chevron.png"
import more from "../assets/images/more.png"
import check from "../assets/images/check.png"
import { useState } from "react";
import { db } from "../config/Firebase";
import { serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore"
import "../styles/scrollbar.css"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { storage } from "../config/Firebase"



const AdminRatesSidebar = (props) => {
    //ALL INFO
    const { data, setData } = props
    const { imgFileUpload, setImgFileUpload } = props
    const { vidFileUpload, setVidFileUpload } = props

    //BANNER HANDLERS
    const { ratesBannerImg, setRatesBannerImg } = props
    const { ratesBannerVid, setRatesBannerVid } = props
    const { ratesBannerTracker, setRatesBannerTracker } = props
    const { ratesBannerHandler, setRatesBannerHandler } = props
    const {ratesBannerIndex} = props
    const { show, setShow } = props


    //PAGE HANDLERS
    const { perc, setPerc } = props
    const { highlightFocus, setHighlightFocus } = props
    const { expandIndex, setExpandIndex } = props
    const { siteExpand, setSiteExpand } = props
    const { sideExpand, setSideExpand } = props
    const [expand, setExpand] = useState(false)

    //RATES INFO HANDLERS
    const { rate1, setRate1 } = props
    const { rate2, setRate2 } = props
    const { includes, setIncludes } = props
    const { dropIn, setDropIn } = props
    const {ratesIndex}=props
    const {includesIndex}=props
    const {dropInIndex}=props



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



    const handleFocus = (index) => {
        if (index == ratesBannerIndex || index == ratesIndex || index == dropInIndex || index == includesIndex) {
            setHighlightFocus(true)
        } else {
            setHighlightFocus(false)
        }
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

    const editClassRates = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                rate1: rate1,
                rate2: rate2,
                timeStamp: serverTimestamp()
            });
            setExpand(false)
            const getPhoto = async () => {
                try {
                    const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                    const docSnap = await getDoc(docRef);
                    setData(docSnap.data())
                    setRate1(docSnap.data().rate1)
                    setRate2(docSnap.data().rate2)
                    setDropIn(docSnap.data().ratesDropIn)
                    if (ratesBannerTracker == null) {
                        setRatesBannerTracker(docSnap.data().ratesBannerTracker)
                    } else if (ratesBannerHandler == "false") {
                        setRatesBannerTracker("false")
                    } else if (ratesBannerHandler === "true") {
                        setRatesBannerTracker(true)
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

    const editIncludes = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                ratesIncludes: includes,
                timeStamp: serverTimestamp()
            });
            setExpand(false)
            const getPhoto = async () => {
                try {
                    const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                    const docSnap = await getDoc(docRef);
                    setData(docSnap.data())
                    setRate1(docSnap.data().rate1)
                    setRate2(docSnap.data().rate2)
                    setDropIn(docSnap.data().ratesDropIn)
                    if (ratesBannerTracker == null) {
                        setRatesBannerTracker(docSnap.data().ratesBannerTracker)
                    } else if (ratesBannerHandler == "false") {
                        setRatesBannerTracker("false")
                    } else if (ratesBannerHandler === "true") {
                        setRatesBannerTracker(true)
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
    const editDropInRate = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                ratesDropIn: dropIn,
                timeStamp: serverTimestamp()
            });
            setExpand(false)
            const getPhoto = async () => {
                try {
                    const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                    const docSnap = await getDoc(docRef);
                    setData(docSnap.data())
                    setRate1(docSnap.data().rate1)
                    setRate2(docSnap.data().rate2)
                    setDropIn(docSnap.data().ratesDropIn)
                    if (ratesBannerTracker == null) {
                        setRatesBannerTracker(docSnap.data().ratesBannerTracker)
                    } else if (ratesBannerHandler == "false") {
                        setRatesBannerTracker("false")
                    } else if (ratesBannerHandler === "true") {
                        setRatesBannerTracker(true)
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





    const editRatesBannerTracker = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                ratesBannerTracker: ratesBannerTracker,
                timeStamp: serverTimestamp()
            });
            setExpand(false)
            const getPhoto = async () => {
                try {
                    const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                    const docSnap = await getDoc(docRef);
                    setData(docSnap.data())
                    setRate1(docSnap.data().rate1)
                    setRate2(docSnap.data().rate2)
                    setDropIn(docSnap.data().ratesDropIn)
                    if (ratesBannerTracker == null) {
                        setRatesBannerTracker(docSnap.data().ratesBannerTracker)
                    } else if (ratesBannerHandler == "false") {
                        setRatesBannerTracker("false")
                    } else if (ratesBannerHandler === "true") {
                        setRatesBannerTracker(true)
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

                        <input type="file" className="m-8  transition-all duration-700 w-full" onChange={(e) => { setRatesBannerTracker("false"); setRatesBannerHandler(false); setRatesBannerImg(e.target.files[0]) }} />
                        <input type="hidden" value="false" onClick={(e) => { setRatesBannerTracker(e.target.value); editRatesBannerTracker() }} />
                        <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={() => { editPhoto(); editRatesBannerTracker() }}>Submit</button>
                    </div>

                    <div className="w-full p-2 text-black border-t-2 mt-3 bg-indigo-200 flex flex-col items-center">
                        <div className=" transition-all duration-700  w-full flex justify-center ">
                            <h1 className="mt-5">OR make the banner a video:</h1>
                        </div>
                        <input type="file" className="m-8  transition-all duration-700 w-full" onChange={(e) => { setRatesBannerTracker("true"); setRatesBannerHandler(true); setRatesBannerVid(e.target.files[0]) }} />
                        <input type="hidden" value="true" onClick={(e) => { setRatesBannerTracker(e.target.value); editRatesBannerTracker() }} />
                        <button disabled={perc !== null && perc < 100} className="bg-slate-800 text-indigo-200 transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-200 py-2" onClick={() => { editRatesBannerTracker() }}>Submit</button>
                    </div>
                </div>
        },
        {
            name: "Edit Class Rates",
            index: "2",
            content:
                <div className="w-[310px]  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Class Rates:</h1>
                    </div>

                    <div className="flex w-full mt-4 flex-col items-center">

                        <label className="text-white">1 Hour Class Rate:</label>
                        <input type="text" value={rate1} className=" text-black w-full transition-all duration-700 p-2" onChange={(e) => setRate1(e.target.value)} />
                        <label className="text-white mt-4">45 Minute Class Rate:</label>
                        <input type="text" value={rate2} className="text-black w-full transition-all duration-700 p-2" onChange={(e) => setRate2(e.target.value)} />
                    </div>
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 mt-4 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editClassRates}>Submit</button>
                </div>
        },
        {
            name: "Edit Includes Info",
            index: "3",
            content:
                <div className="w-[500px]  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Includes:</h1>
                    </div>
                    <textarea rows="10" cols="40" value={includes} type="text" className="m-8 text-black  transition-all duration-700 p-2" onChange={(e) => setIncludes(e.target.value)} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editIncludes}>Submit</button>
                </div>
        },
        {
            name: "Edit Drop-in Rate",
            index: "4",
            content:
                <div className="w-[400px]  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Drop-in Rate:</h1>
                    </div>
                    <input type="text" className="m-8 w-full text-black  transition-all duration-700 p-2" value={dropIn} onChange={(e) => setDropIn(e.target.value)} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editDropInRate}>Submit</button>
                </div>
        },
    ]


    return (
        <div className={` ${sideExpand ? "w-[350px]" : "w-[70px] "} ${siteExpand ? "h-[2175px]" : "h-full"} px-2  flex justify-center bg-slate-900  transition-all duration-700`}>

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

export default AdminRatesSidebar;
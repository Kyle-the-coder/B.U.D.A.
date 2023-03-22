import arrow from "../assets/images/right-arrow2.png"
import chevron from "../assets/images/down-chevron.png"
import more from "../assets/images/more.png"
import { useState } from "react";
import { db } from "../config/Firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore"



const AdminSummerSidebar = (props) => {
    //ALL INFO
    const { data, setData } = props

    //SUMMER INFO
    const { summerTitle, setSummerTitle } = props
    const { summerContent, setSummerContent } = props
    const { summerRegLink, setSummerRegLink } = props
    const { summerBannerImg, setSummerBannerImg } = props
    const { summerBannerVid, setSummerBannerVid } = props
    const { summerBannerTracker, setSummerBannerTracker } = props
    const { summerBannerHandler, setSummerBannerHandler } = props
    const { summerMainImg, setSummerMainImg } = props
    const { summerImg2, setSummerImg2 } = props
    const { summerImg3, setSummerImg3 } = props
    const { summerTitleIndex } = props
    const { summerContentIndex } = props
    const { regLinkIndex } = props
    const { summerBannerFileIndex } = props
    const { summerMainImgIndex } = props
    const { summerImg2Index } = props
    const { summerImg3Index } = props

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
        if (index == summerTitleIndex || index == summerContentIndex || index == regLinkIndex || index == summerBannerFileIndex || index == summerMainImgIndex || index == summerImg2Index || index == summerImg3Index) {
            setHighlightFocus(true)
        } else {
            setHighlightFocus(false)
        }
    }


    const editSummerContent = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                summerContent: summerContent,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }

    const editSummerTitle = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                summerTitle: summerTitle,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }
    const editSummerRegLink = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                summerRegLink: summerRegLink,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }

    const editSummerBannerTracker = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                summerBannerTracker: summerBannerTracker,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }

    const options = [
        {
            name: "Edit Banner",
            index: "1",
            content:
                <div className="w-[400px] transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute left-[350px]  z-[999]">
                    <div className="w-full flex flex-col items-center p-2">

                        <div className=" transition-all duration-700">
                            <h1>Edit Summer Banner Image:</h1>
                        </div>
                        <input type="file" className="m-8 w-full  transition-all duration-700" onChange={(e) => { setSummerBannerTracker("false"); setSummerBannerHandler(false); setSummerBannerImg(e.target.files[0]) }} />
                        <input type="hidden" value="false" onClick={(e) => { setSummerBannerTracker(e.target.value); editSummerBannerTracker() }} />
                        <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={() => { editPhoto(); editSummerBannerTracker() }}>Submit</button>
                    </div>
                    <div className="w-full p-2 text-black border-t-2 mt-3 bg-indigo-200 flex flex-col items-center">

                        <div className=" transition-all duration-700 w-full flex justify-center ">
                            <h1 className="mt-5 ">OR make the banner a video:</h1>
                        </div>
                        <input type="file" className="m-8  transition-all duration-700 w-full" onChange={(e) => { setSummerBannerTracker("true"); setSummerBannerHandler(true); setSummerBannerVid(e.target.files[0]) }} />
                        <input type="hidden" value="true" onClick={(e) => { setSummerBannerTracker(e.target.value); editSummerBannerTracker() }} />
                        <button disabled={perc !== null && perc < 100} className="bg-slate-800 text-indigo-200 transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-200 py-2" onClick={() => { editSummerBannerTracker() }}>Submit</button>
                    </div>
                </div>
        },
        {
            name: "Edit Title",
            index: "2",
            content:
                <div className="w-[500px]  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Summer Title:</h1>
                    </div>
                    <textarea rows="10" cols="40" type="text" className="m-8 text-black  transition-all duration-700 p-2" onChange={(e) => setSummerTitle(e.target.value)} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editSummerTitle}>Submit</button>
                </div>
        },
        {
            name: "Edit Content",
            index: "3",
            content:
                <div className="w-[500px]  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Summer Content:</h1>
                    </div>
                    <textarea rows="10" cols="40" type="text" className="m-8 text-black  transition-all duration-700 p-2" onChange={(e) => setSummerContent(e.target.value)} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editSummerContent}>Submit</button>
                </div>
        },
        {
            name: "Edit Register Link",
            index: "4",
            content:
                <div className="w-[500px]  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Register Link:</h1>
                    </div>
                    <textarea rows="10" cols="40" type="text" className="m-8 text-black  transition-all duration-700 p-2" onChange={(e) => setSummerRegLink(e.target.value)} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editSummerRegLink}>Submit</button>
                </div>
        },

        {
            name: "Edit Main Image",
            index: "5",
            content:
                <div className="w-[400px] transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute left-[350px]  z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit Summer Main Image:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => setSummerMainImg(e.target.files[0])} />
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
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => setSummerImg2(e.target.files[0])} />
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
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => setSummerImg3(e.target.files[0])} />
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
                            <h1 className="p-3 text-white text-lg">Edit Summer Options:</h1>
                            <div onClick={() => setSiteExpand(!siteExpand)} className="w-[280px] cursor-pointer flex justify-between items-center">
                                <h1 className="p-3 text-white text-lg">Site Size: <span>{siteExpand ? "Small" : "Big"}</span></h1>
                                <img className={` ${siteExpand ? "" : "rotate-180"} w-[20px] h-[20px] origin-center  transition-all duration-700`} src={chevron} />
                            </div>
                        </div>
                    </section>

                    <section className="w-full flex flex-col items-center">
                        <div className="w-[285px] bg-slate-800  rounded-lg transition-all duration-700 ">
                            {options.map((option) => {
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

export default AdminSummerSidebar;
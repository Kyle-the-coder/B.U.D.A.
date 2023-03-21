import arrow from "../assets/images/right-arrow2.png"
import chevron from "../assets/images/down-chevron.png"
import more from "../assets/images/more.png"
import { useState } from "react";
import { db } from "../config/Firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore"



const AdminAboutSidebar = (props) => {
    const { data, setData } = props
    const { aboutMeContent, setAboutMeContent } = props
    const { aboutMeContentIndex, setAboutMeContentIndex } = props
    const { aboutBudaContent, setAboutBudaContent } = props
    const { aboutBudaContentIndex, setAboutBudaContentIndex } = props
    const { aboutMeImgFile, setAboutMeImgFile } = props
    const { aboutMeImgFileIndex, setAboutMeImgFileIndex } = props
    const { aboutBudaImgFile, setAboutBudaImgFile } = props
    const { aboutBudaImgFileIndex, setAboutBudaImgFileIndex } = props
    const { aboutBannerImgFile, setAboutBannerImgFile } = props
    const { aboutBannerVidFile, setAboutBannerVidFile } = props
    const { aboutBannerFileIndex, setAboutBannerFileIndex } = props
    const { aboutBannerTracker, setAboutBannerTracker } = props
    const { aboutBannerHandler, setAboutBannerHandler } = props
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

        } catch (error) {
            console.log(error)
        }
    }
    const editBannerTracker = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                aboutBannerTracker: aboutBannerTracker,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }

    const editAboutMeContent = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                aboutMeContent: aboutMeContent,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }
    const editAboutBudaContent = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                aboutBudaContent: aboutBudaContent,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }

    const handleFocus = (index) => {
        if (index == aboutBannerFileIndex || index == aboutMeImgFileIndex || index == aboutMeContentIndex || index == aboutBudaImgFileIndex || index == aboutBudaContentIndex) {
            setHighlightFocus(true)
        } else {
            setHighlightFocus(false)
        }
    }



    const options = [
        {
            name: "Edit About Me Banner",
            index: "1",
            content:
                <div className="w-[400px] transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute left-[350px]  z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit About Me Banner Image:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => { setAboutBannerTracker("false"); setAboutBannerHandler(false); setAboutBannerImgFile(e.target.files[0]) }} />
                    <input type="hidden" value="false" onClick={(e) => { setAboutBannerTracker(e.target.value); editBannerTracker() }} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={() => { editPhoto(); editBannerTracker() }}>Submit</button>

                    <div className=" transition-all duration-700 mt-6 border-t-2 w-full flex justify-center ">
                        <h1 className="mt-5">OR make the banner a video:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => { setAboutBannerTracker("true"); setAboutBannerHandler(true); setAboutBannerVidFile(e.target.files[0]) }} />
                    <input type="hidden" value="true" onClick={(e) => { setAboutBannerTracker(e.target.value); editBannerTracker() }} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={() => { editBannerTracker() }}>Submit</button>
                </div>
        },
        {
            name: "Edit About Me Image",
            index: "2",
            content:
                <div className="w-[400px] transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute left-[350px]  z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit About Me Image:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => setAboutMeImgFile(e.target.files[0])} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editPhoto}>Submit</button>
                </div>
        },
        {
            name: "Edit About Me Content",
            index: "3",
            content:
                <div className="w-[500px]  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit About Me Content:</h1>
                    </div>
                    <textarea rows="10" cols="40" type="text" className="m-8 text-black  transition-all duration-700 p-2" onChange={(e) => setAboutMeContent(e.target.value)} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editAboutMeContent}>Submit</button>
                </div>
        },
        {
            name: "Edit About BUDA Image",
            index: "4",
            content:
                <div className="w-[400px] transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit BUDA Card Image:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700" onChange={(e) => setAboutBudaImgFile(e.target.files[0])} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editPhoto}>Submit</button>
                </div>
        },
        {
            name: "Edit About Buda Content",
            index: "5",
            content:
                <div className="w-[500px]  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Edit About BUDA Content:</h1>
                    </div>
                    <textarea rows="10" cols="40" className="m-8 p-2 text-black transition-all duration-700" onChange={(e) => setAboutBudaContent(e.target.value)} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={editAboutBudaContent}>Submit</button>
                </div>
        }
    ]

    return (
        <div className={` ${sideExpand ? "w-[350px]" : "w-[70px] "} ${siteExpand ? "h-[975px]" : "h-full"} px-2  flex justify-center bg-slate-900  transition-all duration-700`}>
            <img className="w-[50px] h-[50px] cursor-pointer mt-1" onClick={() => { setSideExpand(!sideExpand); setExpand(false); setHighlightFocus(false) }} src={more} />
            {sideExpand &&
                <div className="w-[300px]   bg-slate-900  z-[999] transition-all duration-700">

                    <section className="w-full ">
                        <div className="w-full">
                            <h1 className="p-3 text-white text-lg">Edit About Page Options:</h1>
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

export default AdminAboutSidebar;
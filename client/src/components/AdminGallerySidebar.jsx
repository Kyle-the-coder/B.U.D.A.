import arrow from "../assets/images/right-arrow2.png"
import chevron from "../assets/images/down-chevron.png"
import more from "../assets/images/more.png"
import { useState } from "react";
import { db } from "../config/Firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore"
import "../styles/scrollbar.css"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { storage } from "../config/Firebase"



const AdminGallerySidebar = (props) => {
    //ALL INFO
    const { data, setData } = props
    const {imgFileUpload, setImgFileUpload} = props
    const {vidFileUpload, setVidFileUpload} = props

    //BANNER HANDLERS
    const { galleryBannerImg, setGalleryBannerImg } = props
    const { galleryBannerVid, setGalleryBannerVid } = props
    const { galleryBannerTracker, setGalleryBannerTracker } = props
    const { galleryBannerHandler, setGalleryBannerHandler } = props
    const { show, setShow } = props

    //VID AND IMG HANDLERS
    const {galleryImgsList, setGalleryImgsList} = props
    const {galleryVidsList, setGalleryVidsList} = props

    //PAGE HANDLERS
    const { perc, setPerc } = props
    const { highlightFocus, setHighlightFocus } = props
    const { expandIndex, setExpandIndex } = props
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



    const handleFocus = (index) => {
        if (index == null) {
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





    const editGalleryBannerTracker = async () => {
        try {
            await setDoc(doc(db, "admin", process.env.REACT_APP_ADMIN_ID), {
                ...data,
                galleryBannerTracker: galleryBannerTracker,
                timeStamp: serverTimestamp()
            });
            setExpand(false)

        } catch (error) {
            console.log(error)
        }
    }

    //ADD IMG TO GALLERY IMG LIST
    const uploadGalleryImgFile = async () => {
        if (!imgFileUpload) return;
        const filesFolderRef = ref(storage, `galleryimgs/${imgFileUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, imgFileUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log("img", url)
                    setGalleryImgsList((prev) => [...prev, { link: url, name: snapshot.ref._location.path_ }])
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    //ADD VID TO GALLERY VID LIST
    const uploadGalleryVidFile = async () => {
        if (!vidFileUpload) return;
        const filesFolderRef = ref(storage, `galleryvids/${vidFileUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, vidFileUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log("vid", url)
                    setGalleryVidsList((prev) => [...prev, { link: url, name: snapshot.ref._location.path_ }])
                })
            })
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
                        <input type="file" className="m-8  transition-all duration-700 w-full" onChange={(e) => { setGalleryBannerTracker("false"); setGalleryBannerHandler(false); setGalleryBannerImg(e.target.files[0]) }} />
                        <input type="hidden" value="false" onClick={(e) => { setGalleryBannerTracker(e.target.value); editGalleryBannerTracker() }} />
                        <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={() => { editPhoto(); editGalleryBannerTracker() }}>Submit</button>
                    </div>

                    <div className="w-full p-2 text-black border-t-2 mt-3 bg-indigo-200 flex flex-col items-center">
                        <div className=" transition-all duration-700  w-full flex justify-center ">
                            <h1 className="mt-5">OR make the banner a video:</h1>
                        </div>
                        <input type="file" className="m-8  transition-all duration-700 w-full" onChange={(e) => { setGalleryBannerTracker("true"); setGalleryBannerHandler(true); setGalleryBannerVid(e.target.files[0]) }} />
                        <input type="hidden" value="true" onClick={(e) => { setGalleryBannerTracker(e.target.value); editGalleryBannerTracker() }} />
                        <button disabled={perc !== null && perc < 100} className="bg-slate-800 text-indigo-200 transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-200 py-2" onClick={() => { editGalleryBannerTracker() }}>Submit</button>
                    </div>
                </div>
        },
        {
            name: "Add Video",
            index: "2",
            content:
                <div className="w-[300px]  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Add Video:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700 w-full" onChange={(e) => { setVidFileUpload(e.target.files[0]) }} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={uploadGalleryVidFile}>Submit</button>
                </div>
        },
        {
            name: "Add Image",
            index: "3",
            content:
                <div className="w-[300px]  transition-all duration-700  p-2 flex flex-col items-center bg-slate-900 text-slate-100 absolute  left-[350px] z-[999]">
                    <div className=" transition-all duration-700">
                        <h1>Add Image:</h1>
                    </div>
                    <input type="file" className="m-8  transition-all duration-700 w-full" onChange={(e) => { setImgFileUpload(e.target.files[0]) }} />
                    <button disabled={perc !== null && perc < 100} className="bg-indigo-200 text-black transition-all duration-700 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-blue-700 py-2" onClick={uploadGalleryImgFile}>Submit</button>
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

export default AdminGallerySidebar;
import check from "../assets/images/checkmark.png"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getDoc, doc } from "firebase/firestore"
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage, db } from "../config/Firebase"
import "../styles/bannerSize.css"
import "../styles/cardHover.css"
import AdminGallerySidebar from "../components/AdminGallerySidebar"


const AdminGalleryPage = (props) => {
    const navigate = useNavigate();
    //ALL DATA
    const [data, setData] = useState({})

    //GALLERY BANNER HANDLERS
    const [galleryBannerImg, setGalleryBannerImg] = useState('')
    const [galleryBannerVid, setGalleryBannerVid] = useState('')
    const [galleryBannerTracker, setGalleryBannerTracker] = useState(null)
    const [galleryBannerHandler, setGalleryBannerHandler] = useState('')
    const [galleryBannerIndex, setGalleryBannerIndex] = useState('')

    //GALLERY CONTENT HANDLERS
    const [galleryVidsList, setGalleryVidsList] = useState([])
    const [galleryImgsList, setGalleryImgsList] = useState([])
    const [galleryVidAdded, setGalleryVidAdded] = useState(false)
    const [galleryImgAdded, setGalleryImgAdded] = useState(false)
    const [imgFileUpload, setImgFileUpload] = useState(null)
    const [vidFileUpload, setVidFileUpload] = useState(null)

    //GALLERY RESPONSIVE HANDLERS
    const [siteExpand, setSiteExpand] = useState(false)
    const [sideExpand, setSideExpand] = useState(false)
    const [perc, setPerc] = useState(null);
    const [expandIndex, setExpandIndex] = useState('')
    const [show, setShow] = useState(false)
    const [timeOut, setTimeOut] = useState(false)
    const [highlightFocus, setHighlightFocus] = useState(false)

    //REFS FOR FB STORAGE
    const imageListRef = ref(storage, "galleryimgs/")
    const videoListRef = ref(storage, "galleryvids/")


    useEffect(() => {
        const getPhoto = async () => {
            try {
                const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                const docSnap = await getDoc(docRef);
                setData(docSnap.data())
                if (galleryBannerTracker == null) {
                    setGalleryBannerTracker(docSnap.data().galleryBannerTracker)
                } else if (galleryBannerHandler == "false") {
                    setGalleryBannerTracker("false")
                } else if (galleryBannerHandler === "true") {
                    setGalleryBannerTracker(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPhoto()

        //GET ALL GALLERY IMGS
        const getImgs = () => {
            listAll(imageListRef)
                .then((res) => {
                    res.items.forEach((item) => {
                        getDownloadURL(item).then((url) => {
                            setGalleryImgsList((prev) => [...prev, url])

                        })
                    })
                })
        }
        getImgs()

        //GET ALL GALLERY VIDS
        const getVids = () => {
            listAll(videoListRef)
                .then((res) => {
                    res.items.forEach((item) => {
                        getDownloadURL(item).then((url) => {
                            setGalleryVidsList((prev) => [...prev, url])
                            console.log(url)
                        })
                    })
                })
        }
        getVids()


        //GALLERY BANNER IMG UPLOAD
        const uploadGalleryBannerImgFile = () => {
            const name = new Date().getTime() + galleryBannerImg.name
            const storageRef = ref(storage, galleryBannerImg.name);
            const uploadTask = uploadBytesResumable(storageRef, galleryBannerImg);
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
                        setData((prev) => ({ ...prev, galleryBannerImg: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        galleryBannerImg && uploadGalleryBannerImgFile()

        //GALLERY BANNER VID UPLOAD
        const uploadGalleryBannerVidFile = () => {
            const name = new Date().getTime() + galleryBannerVid.name
            const storageRef = ref(storage, galleryBannerVid.name);
            const uploadTask = uploadBytesResumable(storageRef, galleryBannerVid);
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
                        setData((prev) => ({ ...prev, galleryBannerVid: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        galleryBannerVid && uploadGalleryBannerVidFile()


    }, [galleryBannerImg, galleryBannerVid])



    const backOne = () => {
        navigate(-1)
    }
    console.log("vids list", galleryVidsList)

    return (
        <div className="w-full">
            <div className="flex">

                <section>
                    <AdminGallerySidebar
                        data={data} setData={setData}
                        siteExpand={siteExpand} setSiteExpand={setSiteExpand}
                        sideExpand={sideExpand} setSideExpand={setSideExpand}
                        perc={perc} setPerc={setPerc}
                        galleryBannerImg={galleryBannerImg} setGalleryBannerImg={setGalleryBannerImg}
                        galleryBannerVid={galleryBannerVid} setGalleryBannerVid={setGalleryBannerVid}
                        galleryBannerTracker={galleryBannerTracker} setGalleryBannerTracker={setGalleryBannerTracker}
                        galleryBannerHandler={galleryBannerHandler} setGalleryBannerHandler={setGalleryBannerHandler}
                        galleryVidsList={galleryVidsList} setGalleryVidsList={setGalleryVidsList}
                        galleryImgsList={galleryImgsList} setGalleryImgsList={setGalleryImgsList}
                        expandIndex={expandIndex} setExpandIndex={setExpandIndex}
                        show={show} setShow={setShow}
                        timeOut={timeOut} setTimeOut={setTimeOut}
                        highlightFocus={highlightFocus} setHighlightFocus={setHighlightFocus}
                        imgFileUpload={imgFileUpload} setImgFileUpload={setImgFileUpload}
                        vidFileUpload={vidFileUpload} setVidFileUpload={setVidFileUpload}
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

                                    {galleryBannerTracker === "true" ? <video className={`${highlightFocus && expandIndex == galleryBannerIndex ? "border-4 border-red-700 " : ""}  ratesBanner  w-full h-full  bg-slate-200`} loop muted autoPlay controls='' src={data.galleryBannerVid} alt="people dancing and colors" ></video>
                                        :
                                        <img className={`shrink ratesBanner w-full h-full  bg-slate-200 ${highlightFocus && expandIndex == galleryBannerIndex ? "border-4 border-red-700 " : ""} `} src={data.galleryBannerImg} alt="people dancing and colors" />}
                                </div>
                            }
                        </section>

                        {/* Back One Page Section */}
                        <section className="w-full h-12 flex items-center justify-end">
                            <p className=" w-12 text-sm underline text-sky-500 cursor-pointer" onClick={() => backOne()} >
                                Back
                            </p>
                        </section>

                        {/* BUDA Name Section */}
                        <section className="w-full h-12 flex justify-center mb-12">
                            <h1 className="sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-2xl welcome">Bianca's Urban <span className="text-indigo-500">Dance</span> Academy</h1>
                        </section>

                        {/* Video Section */}
                        <section className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center m-8">
                            {galleryVidsList != null && galleryVidsList.map((vid, i) => (
                                <div key={i} className="flex flex-col justify-center items-center">
                                    <video className="rounded md:m-2 border-2 border-indigo-200 m-8 w-[700px]" loop muted autoPlay controls='' src={vid} >video loading...</video>
                                    <button className="bg-red-400 px-2 rounded w-[120px] mb-10" >Delete</button>
                                </div>
                            )
                            )}
                        </section>

                        {/* Img Section */}
                        <section className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center m-8">
                            {galleryImgsList.map((img, i) => (
                                <div key={i} className="flex flex-col justify-center items-center justify-start">
                                    <img className="rounded md:m-2 border-2 border-indigo-200 m-8 w-[480px]" src={img} />
                                    <button className="bg-red-400 px-2 rounded w-[120px] mb-10" >Delete</button>
                                </div>
                            )
                            )}

                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminGalleryPage;
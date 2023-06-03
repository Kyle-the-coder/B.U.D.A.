import check from "../assets/images/checkmark.png"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getDoc, doc } from "firebase/firestore"
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage, db } from "../config/Firebase"

import "../styles/bannerSize.css"
import "../styles/cardHover.css"


const GalleryPage = (props) => {
    const [data, setData] = useState({})
    const [galleryBannerTracker, setGalleryBannerTracker] = useState(null)
    const imageListRef = ref(storage, "galleryimgs/")
    const videoListRef = ref(storage, "galleryvids/")
    const [galleryVidsList, setGalleryVidsList] = useState([])
    const [galleryImgsList, setGalleryImgsList] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
        const getPhoto = async () => {
            try {
                const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                const docSnap = await getDoc(docRef);
                setData(docSnap.data())
                if (galleryBannerTracker == null) {
                    setGalleryBannerTracker(docSnap.data().galleryBannerTracker)
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

                {data.galleryBannerTracker == "true" ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src={data.galleryBannerVid} alt="people dancing and colors" ></video>
                    :
                    <img className="shrink ratesBanner w-full h-full  bg-slate-200" src={data.galleryBannerImg} alt="people dancing and colors" />}
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
            <section className="w-full  h-content flex justify-center mb-12">
                <h1 className="sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-2xl welcome"><span className="text-indigo-600">BUDA</span> Gallery</h1>
            </section>

            {/* Video Section */}
            <section className=" w-full">
            <div className="ml-16 text-2xl welcome">
                <h1>Videos:</h1>
            </div>
                <div  className=" flex flex-col sm:flex-row sm:justify-evenly sm:flex-wrap w-full">
                    {galleryVidsList.map((vid, i) => (
                        <video key={i} className="rounded my-3 border-2 border-indigo-200 w-[650px] h-[380px] object-cover" controls >
                            <source src={vid} type="video/mp4"/>
                        </video>
                    )
                    )}
                </div>
            </section>

            {/* Img Section */}
            <section className=" w-full">
            <div className="ml-16 text-2xl welcome">
                <h1>Photos:</h1>
            </div>
                    <div  className=" flex flex-col sm:flex-row sm:justify-evenly sm:flex-wrap w-full">
                {galleryImgsList.map((img, i) => (
                        <img key={i} className="rounded sm:m-2 border-2 border-red-200 my-2 object-cover w-[630px] h-[350px]" src={img} />
                )
                )}
                    </div>
            </section>
        </div>
    )
}

export default GalleryPage;
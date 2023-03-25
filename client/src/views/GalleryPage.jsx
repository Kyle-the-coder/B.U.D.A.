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
    const [galleryBannerImg, setGalleryBannerImg] = useState('')
    const [galleryBannerVid, setGalleryBannerVid] = useState('')

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
            <section className="w-full bg-slate-200 h-32 mb-5 flex justify-center ">
                {galleryBannerTracker == "true" ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src={data.galleryBannerVid} alt="people dancing and colors" ></video>
                    :
                    <img className="shrink ratesBanner w-full h-full  bg-slate-200" src={data.galleryBannerImg} alt="people dancing and colors" />}
            </section>

            {/* Back One Page Section */}
            <section className="w-full h-12 flex items-center justify-end">
                <p className=" w-12 text-sm underline text-sky-500 cursor-pointer" onClick={() => backOne()} >
                    Back
                </p>
            </section>

            {/* BUDA Name Section */}
            <section className="w-full  h-content flex justify-center mb-12">
                <h1 className="sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-2xl welcome">BUDA Gallery</h1>
            </section>

            {/* Video Section */}
            <section className=" w-full">
                <div  className=" flex flex-col sm:flex-row sm:justify-evenly sm:flex-wrap w-full">
                    {galleryVidsList.map((vid, i) => (
                        <video key={i} className="rounded my-3 border-2 border-indigo-200 sm:w-[200px] md:w-[500px] lg:w-[700px]" loop muted autoPlay controls='' src={vid} >video loading...</video>
                    )
                    )}
                </div>
            </section>

            {/* Img Section */}
            <section className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center m-8">
                {galleryImgsList.map((img, i) => (
                    <div key={i} className="flex flex-col justify-center items-center justify-start">
                        <img className="rounded md:m-2 border-2 border-indigo-200 m-8 w-[480px]" src={img} />
                    </div>
                )
                )}

            </section>
        </div>
    )
}

export default GalleryPage;
import check from "../assets/images/checkmark.png"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import "../styles/bannerSize.css"
import "../styles/cardHover.css"


const GalleryPage = (props) => {
    const { galleryBannerImg,
        galleryBannerVid,
        galleryBannerVidOrImg,
        setGalleryBannerImg,
        setGalleryBannerVid,
        setGalleryBannerVidOrImg,
        galleryVids, setGalleryVids,
        galleryVidsList, setGalleryVidsList,
        galleryImgs, setGalleryImgs,
        galleryImgsList, setGalleryImgsList } = props
    const { loggedIn, setLoggedIn } = props
    const { setTracker } = props
    const [galleryBannerImgEdited, setGalleryBannerImgEdited] = useState('')
    const [galleryBannerVidEdited, setGalleryBannerVidEdited] = useState('')
    const [galleryVidAdded, setGalleryVidAdded] = useState(false)
    const [galleryImgAdded, setGalleryImgAdded] = useState(false)
    const navigate = useNavigate();

    const backOne = () => {
        navigate(-1)
    }

    return (
        <div>
            {/* Banner Section */}
            <section className="w-screen bg-slate-200 h-32 mb-5 flex justify-center ">
                {galleryBannerVidOrImg == "false" ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src={galleryBannerVid} alt="people dancing and colors" ></video>
                    :
                    <img className="shrink ratesBanner w-full h-full  bg-slate-200" src={galleryBannerImg} alt="people dancing and colors" />}
            </section>

            {/* Back One Page Section */}
            <section className="w-full h-12 flex items-center justify-end">
                <p className=" w-12 text-sm underline text-sky-500 cursor-pointer" onClick={() => backOne()} >
                    Back
                </p>
            </section>

            {/* BUDA Name Section */}
            <section className="w-full h-12 flex justify-center mb-12">
                <h1 className="sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-2xl welcome">Bianca's Urban Dance Academy</h1>
            </section>

            {/* Video Section */}
            <section className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center m-8">
                {galleryVidsList.map((vid, i) => (
                    <div key={i} className="flex flex-col justify-center items-center">
                        <video className="rounded md:m-2 border-2 border-indigo-200 m-8 w-[700px]" loop muted autoPlay controls='' src={vid.galleryVids} >video loading...</video>
                        <button className="bg-red-400 px-2 rounded w-[120px] mb-10">Delete</button>
                    </div>
                )
                )}
            </section>

            {/* Img Section */}
            <section className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center m-8">
                {galleryImgsList.map((img, i) => (
                    <div key={i} className="flex flex-col justify-center items-center justify-start">
                        <img className="rounded md:m-2 border-2 border-indigo-200 m-8 w-[480px]" src={img.galleryImgs} />
                        <button className="bg-red-400 px-2 rounded w-[120px] mb-10">Delete</button>
                    </div>
                )
                )}

            </section>
        </div>
    )
}

export default GalleryPage;
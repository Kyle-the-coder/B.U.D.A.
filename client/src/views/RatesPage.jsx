import "../styles/bannerSize.css"
import "../styles/cardHover.css"
import check from "../assets/images/checkmark.png"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getDoc, doc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage, db } from "../config/Firebase"


const RatesPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({})
    const baseUrl = process.env.REACT_APP_BASE_URL


    const backOne = () => {
        navigate(-1)
    }

    useEffect(() => {
        const getPhoto = async () => {
            try {
                const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                const docSnap = await getDoc(docRef);
                setData(docSnap.data())
            } catch (error) {
                console.log(error)
            }
        }
        getPhoto()

    }, [])



    return (
        <div>
            {/* Rates Banner Section */}
            <section className="w-screen bg-slate-200 h-32 mb-5 flex justify-center ">
                {data.ratesBannerTracker == "true" ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src={data.ratesBannerVid} alt="people dancing and colors" ></video>
                    :
                    <img className="shrink ratesBanner w-full h-full  bg-slate-200" src={data.ratesBannerImg} alt="people dancing and colors" />}
            </section>

            {/* Back One Page Section */}
            <section className="w-full h-5 flex items-center justify-end">
                <p className=" w-12 text-sm underline text-sky-500 cursor-pointer" onClick={() => backOne()} >
                    Back
                </p>
            </section>

            {/* Rates Info Section */}
            <section >
                <div className="w-full flex flex-col items-center">
                    <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-2xl mb-3 welcome">Session Rates:</h1>
                    <div className="w-2/3 h-content xl:text-2xl">

                        <h4 className="xl:text-3xl">
                            <strong>Tuition:</strong>
                        </h4>
                        <p className="xl:text-3xl">
                            ${data.rate1} for 1hr classes
                        </p>
                        <p className="mb-5  xl:text-3xl">
                            ${data.rate2} for 45min classes
                        </p>

                        <p className="mb-5">
                            <strong>Includes</strong> {data.ratesIncludes}
                        </p>

                        <p className="mb-5">
                            <strong>Please</strong> be aware that there is a $25 late fee if tuition isn't paid in full during the first week of classes.
                        </p>
                        <p className="mb-5">
                            <strong>Message</strong> me personally if you need to do monthly payments.
                        </p>
                        <p className="mb-5">
                            <strong>Drop</strong> in Price: ${data.ratesDropIn}
                        </p>

                        <p className="mb-5">
                            <strong>Please</strong> note that drop ins are only good for a 1 time basis and then you will have to pay remaining tuition.
                        </p>
                        <p className="mb-5">
                            <strong>No</strong> refunds are available at this time.
                        </p>
                        <p className="mb-5">
                            <strong>Need</strong> a zoom class, private lesson, or a teacher for a birthday party? Please <a className="underline text-sky-500" href="#contactSection">contact</a> me for prices
                        </p>
                        <p onClick={() => backOne()} className="mb-5 underline text-sky-500 cursor-pointer">
                            Back
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RatesPage;
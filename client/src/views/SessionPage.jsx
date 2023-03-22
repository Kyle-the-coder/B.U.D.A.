import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { db, } from "../config/Firebase";
import { getDoc, doc, } from "firebase/firestore"


const SessionPage = (props) => {
    const [data, setData] = useState({});

    const navigate = useNavigate()


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




    const backOne = () => {
        navigate(-1)
    }


    return (
        <div>
            <section className="w-screen bg-slate-200 h-32 mb-5 flex justify-center ">
                {Object.keys(data).length === 0 ?
                    <div className="loader flex items-center">loading...</div>
                    :
                    <div className="w-screen bg-slate-200 h-32 mb-5 flex justify-center ">

                        {data.sessionBannerTracker == "true" ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src={data.sessionBannerVid} alt="people dancing and colors" ></video>
                            :
                            <img className="shrink ratesBanner w-full h-full  bg-slate-200" src={data.sessionBannerImg} alt="people dancing and colors" />}
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
            <section className="w-full h-12 flex justify-center mb-5">
                <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-2xl welcome">{data.sessionTitle}:</h1>
            </section>

            {/* Bianca About Info Section */}
            <section className="mb-10">
                <div className="flex flex-col md:flex-row items-center w-full h-content justify-center">
                    <img className="rounded infoCard2" width="500" src={data.sessionMainImg} />
                    <div className="w-11/12 sm:w-1/2  h-[700px] flex flex-col items-center">
                        <div className=" aboutInfo w-full px-2 py-1 mb-2 lg:text-2xl">
                            <h2 className="mb-6 lg:text-4xl">
                                {data.sessionIntro}
                            </h2>
                            <p className="mb-1 text-lg">
                                <strong>Important Dates:</strong>
                            </p>
                            <p className="indent-5">
                                <strong>Start: </strong>{data.startDate}
                            </p>
                            <p className="indent-5">
                                <strong>Show date:</strong>  {data.showDate}
                            </p>
                            <p className="indent-5">
                                <strong>Show Location:</strong> {data.showLocation}
                            </p>
                            <p className=" indent-5">
                                <strong>MANDATORY TECH: </strong> {data.showTech}
                            </p>
                            <p className="indent-5">
                                <strong>{data.showTitle}: </strong> {data.showTime}
                            </p>
                            <p className="indent-5">
                                <strong>{data.noClass1} </strong>
                            </p>
                            <p className="indent-5">
                                <strong>{data.noClass2} </strong>
                            </p>
                            <p className="indent-5">
                                <strong>{data.noClass3}</strong>
                            </p>
                            <p className="indent-5 ">
                                <strong>{data.noClass4}</strong>
                            </p>
                            <p className="indent-5">
                                <strong>{data.noClass5}</strong>
                            </p>
                            <p className="indent-5 ">
                                <strong>{data.noClass6}</strong>
                            </p>
                            <p className="indent-5 mb-5">
                                <strong>{data.noClass7}</strong>
                            </p>
                            <p className=" text-lg">
                                <strong>Tuition:</strong>
                            </p>
                            <div className="flex justify-end">

                            <div className=" w-[655px]">

                            <p className="">
                                Tuition includes all classes plus costume, photos and recital.
                            </p>
                            <p className="">
                                All tuition is due first week of classes or else subject to $25 late fee.
                            </p>
                            </div>
                            </div>
                            <p className="indent-5 mb-5">
                                <a className="text-sky-500 underline" href="/rp">Click Here</a> for rate pricing.
                            </p>
                            <p className=" text-lg">
                                <strong>Contact:</strong>
                            </p>
                            <p className="indent-5 ">
                                Please <a className="text-sky-500 underline" href="#contactSection">contact</a> Bianca if you have any questions.
                            </p>


                        </div>
                        <div className=" w-full h-32 flex justify-center items-end mt-1">
                            <a target="_blank" href={data.sessionLink} className="bg-indigo-700 text-white cursor-pointer justify-center hover:bg-slate-900 hover:text-pink-300 transition-all duration-500 flex items-center md:text-2xl px-6 h-1/2 rounded">Register Here!</a>
                        </div>
                    </div>
                </div>
            </section>


            {/* BUDA Summer Image Section */}
            <section className="mb-5">
                <div className="w-full flex flex-col sm:flex-row items-center justify-evenly">
                    <img className="rounded infoCard hover:drop-shadow-lg mb-5 w-[600px]" src={data.sessionImg2} />
                    <img className="rounded infoCard hover:drop-shadow-lg mb-5 w-[650px]" src={data.sessionImg3} />
                </div>
            </section>

        </div>
    )
}

export default SessionPage;
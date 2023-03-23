
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { db, } from "../config/Firebase";
import { getDoc, doc, } from "firebase/firestore"




const SummerPage = (props) => {
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
            {/* ABOUT BANNER SECTION */}
            <section className="w-screen bg-slate-200 h-32 mb-5 flex justify-center ">
                {Object.keys(data).length === 0 ?
                    <div className="loader flex items-center">loading...</div>
                    :
                    <div className="w-screen bg-slate-200 h-32 mb-5 flex justify-center ">

                        {data.summerBannerTracker == "true" ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src={data.summerBannerVid} alt="people dancing and colors" ></video>
                            :
                            <img className="shrink ratesBanner w-full h-full  bg-slate-200" src={data.summerBannerImg} alt="people dancing and colors" />}
                    </div>
                }
            </section>

            {/* Back One Page Section */}
            <section className="w-full h-5 flex items-center justify-end">
                <p className=" w-12 text-sm underline text-sky-500 cursor-pointer" onClick={() => backOne()} >
                    Back
                </p>
            </section>

            {/* BUDA Name Section */}
            <section className="w-full h-12 flex justify-center mb-5">
                <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-2xl welcome">Summer Info</h1>
            </section>

            {/* Summer Info Section */}
            <section className="mb-10">
                <div className="flex flex-col md:flex-row items-center sm:items-start w-full h-content justify-center">
                    <img className="rounded infoCard2 m-2 object-cover w-[600px] h-[400px]"  src={data.summerMainImg} />
                    <div className="w-11/12 sm:w-1/2  h-96 flex flex-col items-center">
                        <div className=" aboutInfo w-full px-2 py-1 mb-2 ">
                            <h2 className="mb-6 xl:text-3xl">
                                <strong>{data.summerTitle}</strong>
                            </h2>
                            <p className="mb-1 xl:text-xl">
                                {data.summerContent}
                            </p>
                        </div>
                        <div className=" w-full h-content flex justify-center">
                            <a target="_blank" href={data.regLink} className="bg-indigo-700 py-2 px-5 text-white cursor-pointer transition-all duration-500 hover:bg-slate-900 hover:text-pink-300 justify-center flex items-center  rounded xl:text-2xl">Register Here!</a>
                        </div>
                    </div>
                </div>
            </section>



            {/* BUDA Summer Image Section */}
            <section className="mb-5">
                <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-evenly">
                    <img className="rounded infoCard hover:drop-shadow-lg mb-5 object-cover w-[650px] h-[400px]" src={data.summerImg2} />
                    <img className="rounded infoCard hover:drop-shadow-lg mb-5 object-cover w-[650px] h-[400px]" src={data.summerImg3} />
                </div>
            </section>


        </div>
    )
}

export default SummerPage;
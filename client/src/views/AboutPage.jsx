
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { db, } from "../config/Firebase";
import { getDoc, doc, } from "firebase/firestore"








const AboutPage = (props) => {
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

                {data.aboutBannerTracker == "true" ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src={data.aboutBannerVid} alt="people dancing and colors" ></video>
                    :
                    <img className="shrink ratesBanner w-full h-full  bg-slate-200" src={data.aboutMeBannerImg} alt="people dancing and colors" />}
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
            <section className="w-full h-12 flex justify-center mb-8">
                <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-2xl welcome">About Bianca:</h1>
            </section>

            {/* Bianca About Info Section */}
            <section className="mb-10">
                <div className="flex flex-col md:flex-row items-center sm:items-start w-full h-content justify-center">
                    <img className="rounded object-cover w-[500px] h-[600px] infoCard2 "  src={data.aboutMeImg} />
                    <div className="sm:w-1/2 w-11/12 h-[600px] flex flex-col items-center">
                        <div className=" aboutInfo p-2">
                            <p className="mb-8 indent-5 lg:text-lg">
                                {data.aboutMeContent}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BUDA Name Section */}
            <section className="w-full h-12 flex justify-center mb-8">
                <h1 className="sm:text-3xl md:text-4xl lg:text-5xl  text-2xl welcome">About BUDA:</h1>
            </section>

            {/* BUDA About Info Section */}
            <section className="mb-10">
                <div className="flex flex-col-reverse md:flex-row sm:items-start items-center w-full h-content justify-center ">
                    <div className="sm:w-1/2 h-[590px] px-2 flex flex-col items-center">
                        <div className=" aboutInfo px-5 py-2">
                            <p className="mb-8 indent-5 lg:text-lg">
                                {data.aboutBudaContent}
                            </p>
                        </div>
                    </div>
                    <img className="mb-1 object-cover w-[700px] h-[400px] rounded infoCard hover:drop-shadow-lg" src={data.aboutBudaImg} />
                </div>
            </section>

        </div>
    )
}

export default AboutPage;
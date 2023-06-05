import { useEffect, useState } from "react";
import { db, } from "../config/Firebase";
import { getDoc, doc, } from "firebase/firestore"
import ImpInfoModal from "../components/ImpInfoModal";
import "../styles/spinner.css"


const LandingPage = () => {
    const [data, setData] = useState({});
    const [show, setShow] = useState(false)
    const [attempt, setAttempt] = useState(false)


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
            {Object.keys(data).length === 0 ?
                <div>
                    <section className="items-center justify-center flex flex-col relative w-full h-screen bg-gradient-to-r from-indigo-400 to-red-300 flex bg-auto bg-contain " >
                        <div className="loader ">loading...</div>
                        <h1 className="welcome sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-3xl font-bold mb-2 relative">Bianca's Urban Dance Academy</h1>
                        <a href="/wsp" className="bg-indigo-800 relative   lg:text-2xl text-white px-4 py-3 rounded z-[2] hover:bg-slate-900 hover:text-pink-300 transition-all duration-500">Class Schedule</a>
                    </section>
                </div> :
                <section className="items-center justify-center flex flex-col relative w-full h-screen bg-gradient-to-r from-indigo-400 to-red-300 flex bg-auto bg-contain " >
                    <img src={data.img} alt=" Bianca" className="rounded object-cover w-full z-[1] h-full absolute  mix-blend-overlay" />
                    <div className="w-full flex flex-col items-center justify-evenly md:flex-row md:justify-center h-[280px]">
                        <div className="flex md:flex-none ">
                            <h1 className="welcome lg:text-5xl xl:text-6xl text-5xl font-bold  relative mx-2">Bianca's</h1>
                            <h1 className="welcome lg:text-5xl xl:text-6xl text-5xl font-bold  relative mx-2">Urban</h1>
                        </div>
                        <h1 className="welcome lg:text-5xl xl:text-6xl text-5xl font-bold  relative text-indigo-700 mx-2">Dance</h1>
                        <h1 className="welcome lg:text-5xl xl:text-6xl text-5xl font-bold  relative mx-2">Academy</h1>
                    </div>
                    <a target="_blank" href="https://app.thestudiodirector.com/buda7/portal.sd?page=Enroll&meth=search&SEASON=Spring+2023" className="bg-indigo-800 relative lg:text-xl text-white px-4 py-2 rounded z-[2] hover:bg-slate-900 hover:text-pink-300 transition-all duration-500">Class Schedule</a>
                </section>

            }
            {/* Welcome Students Section */}
            <section className="w-full flex h-14 my-6  items-center">
                <div className="flex w-full justify-center  mx-auto">
                    <h2 className="welcome  sm:text-xl md:text-3xl lg:text-4xl text-xl font-medium">Welcome <span className="text-indigo-500">Returning</span> and <span className="text-pink-500">Future</span> Students!</h2>
                </div>
            </section>

            {/* Class Img Link Section */}
            <section className="mb-5">
                <div className="flex w-full h-content  p-2 justify-evenly">

                    {/* Important Info Card */}
                    <div className="w-fit  h-fit rounded">
                        <img className="infoCard rounded hover:drop-shadow-lg  cursor-pointer border-2 border-black sm:w-48 lg:w-64   w-32 h-auto" src={data.card1} onClick={() => setShow(true)} alt="important info card" />
                        {show && <ImpInfoModal show={show} setShow={setShow} />}
                    </div>

                    {/* Buda Crew Info Card */}
                    <div className="rounded w-fit h-fit hover:drop-shadow-lg">
                        <a href="/bcpage"><img className="infoCard rounded border-2 border-black cursor-pointer sm:w-48 lg:w-64 w-32" src={data.card2} alt="buda crew info card" /></a>
                    </div>

                    {/* Summer Camp Info Card */}
                    <div className=" w-fit rounded   h-fit hover:drop-shadow-lg ">
                        <a href="/summer"><img className="infoCard rounded lg:w-64  border-2 border-black cursor-pointer sm:w-48 w-32" src={data.card3} alt="summer camp info card" /></a>
                    </div>
                </div>
            </section>


            {/* Video Content Section */}
            {Object.keys(data).length === 0 ?
                <section className="flex relative flex-col md:flex-row  justify-evenly m-0 items-center md:items-start mb-7">
                    <video className="rounded relative mb-2 md:m-0  border-2 border-red-200 md:w-[650px] w-[700px]" loop muted autoPlay controls='' src=""></video>
                    <div className="absolute loader top-[130px] left-[300px]">
                        <h1>loading...</h1>
                    </div>
                    <video className="rounded h-full m-0 border-2 border-indigo-300 md:w-[650px] w-[700px]" loop muted autoPlay controls='' src=""></video>
                    <div className="absolute loader top-[130px] right-[300px]">
                        <h1>loading...</h1>
                    </div>

                </section>
                :
                <section className="flex flex-col md:flex-row  justify-evenly m-0 items-center md:items-start mb-7">

                    <video className="rounded mb-2 md:m-0  border-2 border-red-200 md:w-[600px] w-[700px]"  controls src={data.vid1}>
                        <source src={data.vid1} type="video/webm" />
                        <source src={data.vid1} type="video/mp4" />
                        Sorry, your browser doesn't support videos.
                    </video>
                    <video className="rounded h-full m-0 border-2 border-indigo-300 md:w-[600px] w-[700px]"  controls src={data.vid2} ></video>
                </section>
            }



        </div>
    )
}

export default LandingPage;
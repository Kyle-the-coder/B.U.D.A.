import check from "../assets/images/checkmark.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import AdminSessionSidebar from "../components/AdminSessionSidebar"
import { db, storage } from "../config/Firebase";
import { getDoc, doc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"




const AdminSessionPage = (props) => {
    //ALL DATA
    const [data, setData] = useState({})

    //SESSION TITLE INFO
    const [sessionTitle, setSessionTitle] = useState('')
    const [sessionTitleIndex, setSessionTitleIndex] = useState('')

    //SESSION PAGE INFO
    const [sessionContentIndex, setSessionContentIndex] = useState('')
    const [startDate, setStartDate] = useState('')
    const [showDate, setShowDate] = useState('')
    const [showLocation, setShowLocation] = useState('')
    const [showTech, setShowTech] = useState('')
    const [showTitle, setShowTitle] = useState('')
    const [showTime, setShowTime] = useState('')

    //NO CLASS INFO
    const [noClassIndex, setNoClassIndex] = useState('')
    const [noClass1, setNoClass1] = useState('')
    const [noClass2, setNoClass2] = useState('')
    const [noClass3, setNoClass3] = useState('')
    const [noClass4, setNoClass4] = useState('')
    const [noClass5, setNoClass5] = useState('')
    const [noClass6, setNoClass6] = useState('')
    const [noClass7, setNoClass7] = useState('')
    const [sessionLink, setSessionLink] = useState('')
    const [sessionIntro, setSessionIntro] = useState('')

    //SESSION PAGE IMGS & VIDS
    const [sessionMainImgIndex, setSessionMainImgIndex] = useState('')
    const [sessionImg2Index, setSessionImg2Index] = useState('')
    const [sessionImg3Index, setSessionImg3Index] = useState('')
    const [sessionMainImg, setSessionMainImg] = useState('')
    const [sessionImg2, setSessionImg2] = useState('')
    const [sessionImg3, setSessionImg3] = useState('')

    //SESSION BANNER HANDLERS
    const [sessionBannerIndex, setSessionBannerIndex] = useState("")
    const [sessionBannerImg, setSessionBannerImg] = useState('')
    const [sessionBannerVid, setSessionBannerVid] = useState("")
    const [sessionBannerTracker, setSessionBannerTracker] = useState(null)
    const [sessionBannerHandler, setSessionBannerHandler] = useState(false)

    //PAGE RESPONSIVENESS HANDLERS
    const [siteExpand, setSiteExpand] = useState(false)
    const [sideExpand, setSideExpand] = useState(false)
    const [perc, setPerc] = useState(null);
    const [highlightFocus, setHighlightFocus] = useState(false)
    const [expandIndex, setExpandIndex] = useState('')
    const [show, setShow] = useState(false)
    const [timeOut, setTimeOut] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const getPhoto = async () => {
            try {
                const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                const docSnap = await getDoc(docRef);
                setData(docSnap.data())
                setSessionTitle(docSnap.data().sessionTitle)

                if (sessionBannerTracker == null) {
                    setSessionBannerTracker(docSnap.data().sessionBannerTracker)
                } else if (sessionBannerHandler == "false") {
                    setSessionBannerTracker("false")
                } else if (sessionBannerHandler === "true") {
                    setSessionBannerTracker(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPhoto()

        //SESSION MAIN IMG UPLOAD
        const uploadSessionMainImgFile = () => {
            const name = new Date().getTime() + sessionMainImg.name
            const storageRef = ref(storage, sessionMainImg.name);
            const uploadTask = uploadBytesResumable(storageRef, sessionMainImg);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, sessionMainImg: downloadURL }))
                    });
                }
            );

        }
        sessionMainImg && uploadSessionMainImgFile()

        //Session IMG 2 UPLOAD
        const uploadSessionImg2File = () => {
            const name = new Date().getTime() + sessionImg2.name
            const storageRef = ref(storage, sessionImg2.name);
            const uploadTask = uploadBytesResumable(storageRef, sessionImg2);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, sessionImg2: downloadURL }))
                    });
                }
            );

        }
        sessionImg2 && uploadSessionImg2File()

        //Session IMG 3 UPLOAD
        const uploadSessionImg3File = () => {
            const name = new Date().getTime() + sessionImg3.name
            const storageRef = ref(storage, sessionImg3.name);
            const uploadTask = uploadBytesResumable(storageRef, sessionImg3);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, sessionImg3: downloadURL }))
                    });
                }
            );

        }
        sessionImg3 && uploadSessionImg3File()

        //Session BANNER IMG UPLOAD
        const uploadSessionBannerImgFile = () => {
            const name = new Date().getTime() + sessionBannerImg.name
            const storageRef = ref(storage, sessionBannerImg.name);
            const uploadTask = uploadBytesResumable(storageRef, sessionBannerImg);
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
                        setData((prev) => ({ ...prev, sessionBannerImg: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        sessionBannerImg && uploadSessionBannerImgFile()

        //Session BANNER Vid UPLOAD
        const uploadSessionBannerVidFile = () => {
            const name = new Date().getTime() + sessionBannerVid.name
            const storageRef = ref(storage, sessionBannerVid.name);
            const uploadTask = uploadBytesResumable(storageRef, sessionBannerVid);
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
                        setData((prev) => ({ ...prev, sessionBannerVid: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        sessionBannerVid && uploadSessionBannerVidFile()


        setSessionBannerIndex("1")
        setSessionTitleIndex("2")
        setSessionContentIndex("3")
        setNoClassIndex("4")
        setSessionMainImgIndex("5")
        setSessionImg2Index("6")
        setSessionImg3Index("7")




    }, [sessionMainImg, sessionImg2, sessionImg3, sessionBannerImg, sessionBannerVid])

    const backOne = () => {
        navigate(-1)
    }


    return (
        <div className="w-full">
            <div className="flex">






                <section>
                    <AdminSessionSidebar
                        data={data} setData={setData}
                        sessionTitle={sessionTitle} setSessionTitle={setSessionTitle}
                        startDate={startDate} setStartDate={setStartDate}
                        showDate={showDate} setShowDate={setShowDate}
                        showLocation={showLocation} setShowLocation={setShowLocation}
                        showTech={showTech} setShowTech={setShowTech}
                        showTitle={showTitle} setShowTitle={setShowTitle}
                        showTime={showTime} setShowTime={setShowTime}
                        noClass1={noClass1} setNoClass1={setNoClass1}
                        noClass2={noClass2} setNoClass2={setNoClass2}
                        noClass3={noClass3} setNoClass3={setNoClass3}
                        noClass4={noClass4} setNoClass4={setNoClass4}
                        noClass5={noClass5} setNoClass5={setNoClass5}
                        noClass6={noClass6} setNoClass6={setNoClass6}
                        noClass7={noClass7} setNoClass7={setNoClass7}
                        sessionLink={sessionLink} setSessionLink={setSessionLink}
                        sessionIntro={sessionIntro} setSessionIntro={setSessionIntro}
                        sessionMainImg={sessionMainImg} setSessionMainImg={setSessionMainImg}
                        sessionImg2={sessionImg2} setSessionImg2={setSessionImg2}
                        sessionImg3={sessionImg3} setSessionImg3={setSessionImg3}
                        sessionBannerImg={sessionBannerImg} setSessionBannerImg={setSessionBannerImg}
                        sessionBannerVid={sessionBannerVid} setSessionBannerVid={setSessionBannerVid}
                        sessionBannerTracker={sessionBannerTracker} setSessionBannerTracker={setSessionBannerTracker}
                        sessionBannerHandler={sessionBannerHandler} setSessionBannerHandler={setSessionBannerHandler}
                        siteExpand={siteExpand} setSiteExpand={setSiteExpand}
                        sideExpand={sideExpand} setSideExpand={setSideExpand}
                        perc={perc} setPerc={setPerc}
                        highlightFocus={highlightFocus} setHighlightFocus={setHighlightFocus}
                        expandIndex={expandIndex} setExpandIndex={setExpandIndex}
                        show={show} setShow={setShow}
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

                                    {sessionBannerTracker === "true" ? <video className={`${highlightFocus && expandIndex == sessionBannerIndex ? "border-4 border-red-700 " : ""}  ratesBanner  w-full h-full  bg-slate-200`} loop muted autoPlay controls='' src={data.sessionBannerVid} alt="people dancing and colors" ></video>
                                        :
                                        <img className={`shrink ratesBanner w-full h-full  bg-slate-200 ${highlightFocus && expandIndex == sessionBannerIndex ? "border-4 border-red-700 " : ""} `} src={data.sessionBannerImg} alt="people dancing and colors" />}
                                </div>
                            }
                        </section>

                        {/* Back One Page Section */}
                        <section className={`w-full  flex items-center justify-end ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "" : ""} ${sideExpand == false && siteExpand == true ? "" : ""}`}>
                            <p className={` w-12  underline text-sky-500 cursor-pointer ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "text-[.7rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.7rem]" : ""} transition-all duration-500`} onClick={() => backOne()} >
                                Back
                            </p>
                        </section>

                        {/* BUDA Name Section */}
                        <section className={`w-full  flex justify-center mb-8 ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "h-[5px]" : ""} ${sideExpand == false && siteExpand == true ? "h-[5px]" : ""} transition-all duration-500`}>
                            <h1 className={` welcome ${siteExpand ? "text-lg" : " sm:text-xl md:text-3xl lg:text-5xl text-xl "} transition-all duration-500`}>{data.sessionTitle}</h1>
                        </section>

                        {/* Bianca About Info Section */}
                        <section className="mb-10">
                            <div className="flex flex-col md:flex-row items-start w-full  justify-center">
                                <img className={`object-cover rounded transition-all duration-500 infoCard2 hover:drop-shadow-lg ${highlightFocus && expandIndex == sessionMainImgIndex ? "border-4 border-red-700 " : ""} ${sideExpand == true && siteExpand == false ? "w-[450px] h-[600px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[510px] h-[700px]" : ""} ${sideExpand == true && siteExpand == true ? "w-[230px] h-[340px]" : ""} ${sideExpand == false && siteExpand == true ? "w-[230px]" : ""} `}  src={data.sessionMainImg} />
                                <div className="w-11/12 sm:w-1/2 ml-4 text-xl   flex flex-col items-center">
                                    <div className={`aboutInfo mb-3 p-2  transition-all duration-500 ${sideExpand == true && siteExpand == false ? "h-[540px]" : ""} ${sideExpand == false && siteExpand == false ? "h-[640px]" : ""} ${sideExpand == true && siteExpand == true ? "h-[160px] h-[290px]" : ""} ${sideExpand == false && siteExpand == true ? "h-[160px] h-[290px]" : ""}`}>
                                        <h2 className={`mb-5 flex justify-center transition-all duration-500   ${sideExpand == true && siteExpand == false ? "text-md" : ""} ${sideExpand == false && siteExpand == false ? "text-4xl" : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}`}>
                                            {data.sessionIntro}
                                        </h2>
                                        <p className="mb-1 ">
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
                                        <p className="indent-5">
                                            Tuition includes all classes plus costume, photos and recital.
                                        </p>
                                        <p className="indent-5">
                                            All tuition is due first week of classes or else subject to $25 late fee.
                                        </p>
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

                                    <div className={` w-full  flex justify-center  items-end ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "text-sm" : ""} ${sideExpand == false && siteExpand == true ? "text-sm" : ""} `}>
                                        <a target="_blank" href={data.sessionLink} className="bg-indigo-700 text-white cursor-pointer justify-center hover:bg-slate-900 hover:text-pink-300 transition-all duration-500 px-3 py-1 flex items-center rounded">Register Here!</a>
                                    </div>
                                </div>
                            </div>
                        </section>


                        {/* BUDA Summer Image Section */}
                        <section className="mb-5">
                            <div className="w-full flex flex-col sm:flex-row items-center justify-evenly">
                                <img className={`rounded transition-all duration-500 infoCard2 hover:drop-shadow-lg ${highlightFocus && expandIndex == sessionImg2Index ? "border-4 border-red-700 " : ""} ${sideExpand == true && siteExpand == false ? "w-[500px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[600px]" : ""} ${sideExpand == true && siteExpand == true ? "w-[230px]" : ""} ${sideExpand == false && siteExpand == true ? "w-[230px]" : ""} `} src={data.sessionImg2} />
                                <img className={`rounded transition-all duration-500 infoCard2 hover:drop-shadow-lg ${highlightFocus && expandIndex == sessionImg3Index ? "border-4 border-red-700 " : ""} ${sideExpand == true && siteExpand == false ? "w-[500px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[600px]" : ""} ${sideExpand == true && siteExpand == true ? "w-[230px]" : ""} ${sideExpand == false && siteExpand == true ? "w-[230px]" : ""} `} src={data.sessionImg3} />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminSessionPage;
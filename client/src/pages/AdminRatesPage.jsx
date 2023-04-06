import "../styles/bannerSize.css"
import "../styles/cardHover.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import AdminRatesSidebar from "../components/AdminRatesSidebar"
import { getDoc, doc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage, db } from "../config/Firebase"


const AdminRatesPage = (props) => {
    const navigate = useNavigate();
    //ALL DATA
    const [data, setData] = useState({})

    //RATES RESPONSIVE PAGE HANDLERS
    const [siteExpand, setSiteExpand] = useState(false)
    const [sideExpand, setSideExpand] = useState(false)
    const [perc, setPerc] = useState(null);
    const [expandIndex, setExpandIndex] = useState('')
    const [show, setShow] = useState(false)
    const [timeOut, setTimeOut] = useState(false)
    const [highlightFocus, setHighlightFocus] = useState(false)


    //RATES INFO HANDLERS
    const [rate1, setRate1] = useState('')
    const [rate2, setRate2] = useState('')
    const [ratesIndex, setRatesIndex] = useState('')
    const [includes, setIncludes] = useState('')
    const [includesIndex, setIncludesIndex] = useState('')
    const [dropIn, setDropIn] = useState('')
    const [dropInIndex, setDropInIndex] = useState('')

    //RATES BANNER HANDLERS
    const [ratesBannerImg, setRatesBannerImg] = useState('')
    const [ratesBannerVid, setRatesBannerVid] = useState('')
    const [ratesBannerTracker, setRatesBannerTracker] = useState(null)
    const [ratesBannerHandler, setRatesBannerHandler] = useState("")
    const [ratesBannerIndex, setRatesBannerIndex] = useState("")

    useEffect(() => {
        const getPhoto = async () => {
            try {
                const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                const docSnap = await getDoc(docRef);
                setData(docSnap.data())
                setRate1(docSnap.data().rate1)
                setRate2(docSnap.data().rate2)
                setIncludes(docSnap.data().ratesIncludes)
                setDropIn(docSnap.data().ratesDropIn)
                if (ratesBannerTracker == null) {
                    setRatesBannerTracker(docSnap.data().ratesBannerTracker)
                } else if (ratesBannerHandler == "false") {
                    setRatesBannerTracker("false")
                } else if (ratesBannerHandler === "true") {
                    setRatesBannerTracker(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPhoto()

        //GALLERY BANNER IMG UPLOAD
        const uploadRatesBannerImgFile = () => {
            const name = new Date().getTime() + ratesBannerImg.name
            const storageRef = ref(storage, ratesBannerImg.name);
            const uploadTask = uploadBytesResumable(storageRef, ratesBannerImg);
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
                        setData((prev) => ({ ...prev, ratesBannerImg: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        ratesBannerImg && uploadRatesBannerImgFile()

        //GALLERY BANNER VID UPLOAD
        const uploadRatesBannerVidFile = () => {
            const name = new Date().getTime() + ratesBannerVid.name
            const storageRef = ref(storage, ratesBannerVid.name);
            const uploadTask = uploadBytesResumable(storageRef, ratesBannerVid);
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
                        setData((prev) => ({ ...prev, ratesBannerVid: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );
        }
        ratesBannerVid && uploadRatesBannerVidFile()

        setRatesBannerIndex("1")
        setRatesIndex("2")
        setIncludesIndex("3")
        setDropInIndex("4")

    }, [ratesBannerImg, ratesBannerVid])


    const backOne = () => {
        navigate(-1)
    }
    console.log(siteExpand)

    return (
        <div className="w-full">
            <div className="flex">



                <section>
                    <AdminRatesSidebar
                        data={data} setData={setData}
                        siteExpand={siteExpand} setSiteExpand={setSiteExpand}
                        sideExpand={sideExpand} setSideExpand={setSideExpand}
                        highlightFocus={highlightFocus} setHighlightFocus={setHighlightFocus}
                        show={show} setShow={setShow}
                        timeOut={timeOut} setTimeOut={setTimeOut}
                        perc={perc} setPerc={setPerc}
                        expandIndex={expandIndex} setExpandIndex={setExpandIndex}
                        ratesBannerImg={ratesBannerImg} setRatesBannerImg={setRatesBannerImg}
                        ratesBannerVid={ratesBannerVid} setRatesBannerVid={setRatesBannerVid}
                        ratesBannerTracker={ratesBannerTracker} setRatesBannerTracker={setRatesBannerTracker}
                        ratesBannerHandler={ratesBannerHandler} setRatesBannerHandler={setRatesBannerHandler}
                        ratesBannerIndex={ratesBannerIndex} setRatesBannerIndex={setRatesBannerIndex}
                        rate1={rate1} setRate1={setRate1}
                        rate2={rate2} setRate2={setRate2}
                        includes={includes} setIncludes={setIncludes}
                        dropIn={dropIn} setDropIn={setDropIn}
                        ratesIndex={ratesIndex}
                        includesIndex={includesIndex}
                        dropInIndex={dropInIndex}
                        
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

                                    {ratesBannerTracker === "true" ? <video className={`transition-all duration-500 ${highlightFocus && expandIndex == ratesBannerIndex ? "border-4 border-red-700 " : ""}  ratesBanner  w-full h-full  bg-slate-200`} loop muted autoPlay controls='' src={data.ratesBannerVid} alt="people dancing and colors" ></video>
                                        :
                                        <img className={`transition-all duration-500 ratesBanner w-full h-full  bg-slate-200 ${highlightFocus && expandIndex == ratesBannerIndex ? "border-4 border-red-700 " : ""} `} src={data.ratesBannerImg} alt="people dancing and colors" />}
                                </div>
                            }
                        </section>

                        {/* Back One Page Section */}
                        <section className={`w-full  flex items-center justify-end ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "" : ""} ${sideExpand == false && siteExpand == true ? "" : ""}`}>
                            <p className={` w-12  underline text-sky-500 cursor-pointer ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "text-[.7rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.7rem]" : ""} transition-all duration-500`} onClick={() => backOne()} >
                                Back
                            </p>
                        </section>

                        {/* Rates Info Section */}
                        <section >
                            <div className="w-full flex flex-col items-center transition-all duration-500">
                                <h1 className={` welcome ${siteExpand ? "text-lg" : " sm:text-xl md:text-3xl lg:text-5xl text-xl "} transition-all duration-500 mb-8`}>Session Rates:</h1>
                                <div className={` h-content transition-all duration-500  ${sideExpand == true && siteExpand == false ? "w-5/6 px-4" : ""} ${sideExpand == false && siteExpand == false ? "w-5/6 px-3" : ""} ${sideExpand == true && siteExpand == true ? "text-[.7rem] w-5/6 px-2" : ""} ${sideExpand == false && siteExpand == true ? "text-[.7rem] w-5/6 px-2" : ""}`}>
                                    <div className={`${highlightFocus && expandIndex == ratesIndex ? "border-4 border-red-700 p-1" : ""}  ${siteExpand ? "text-md" : " sm:text-xl md:text-3xl lg:text-3xl text-xl "} transition-all duration-500 `}>

                                        <h4 >
                                            <strong>Tuition:</strong>
                                        </h4>
                                        <p >
                                            ${rate1} for 1hr classes
                                        </p>
                                        <p className="mb-5  ">
                                            ${rate2} for 45min classes
                                        </p>
                                    </div>

                                    <p className={`transition-all duration-500 ${highlightFocus && expandIndex == includesIndex ? "border-4 border-red-700 p-1" : ""} mb-5`}>
                                        <strong>Includes</strong> {includes}
                                    </p>

                                    <p className="mb-5">
                                        <strong>Please</strong> be aware that there is a $25 late fee if tuition isn't paid in full during the first week of classes.
                                    </p>
                                    <p className="mb-5">
                                        <strong>Message</strong> me personally if you need to do monthly payments.
                                    </p>
                                    <p className={`transition-all duration-500 ${highlightFocus && expandIndex == dropInIndex ? "border-4 border-red-700 p-1" : ""} mb-5`}>
                                        <strong>Drop</strong> in Price: ${dropIn}
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
                </div>
            </div>
        </div>
    )
}

export default AdminRatesPage;
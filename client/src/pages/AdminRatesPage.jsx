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
    const [includes, setIncludes] = useState('')
    const [dropIn, setDropIn] = useState('')

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
    }, [ratesBannerImg, ratesBannerVid])


    const backOne = () => {
        navigate(-1)
    }

console.log(data)
    return (
        <div className="w-full">
            <div className="flex">



                <section>
                    <AdminRatesSidebar
                        data={data} setData={setData}
                        siteExpand={siteExpand} setSiteExpand={setSideExpand}
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
                    />
                </section>

                <div className={` ${siteExpand ? "w-8/12" : "w-full "} relative flex justify-end items-start transition-all duration-700`}>
                    <div className={` ${siteExpand ? "w-[500px] h-[500px]" : "w-full"}  transition-all duration-700`}>


                        {/* Rates Banner Section */}
                        <section className="w-screen bg-slate-200 h-32 mb-5 flex justify-center ">
                            {ratesBannerTracker == "true" ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src={data.ratesBannerVid} alt="people dancing and colors" ></video>
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
                                        ${rate1} for 1hr classes
                                    </p>
                                    <p className="mb-5  xl:text-3xl">
                                        ${rate2} for 45min classes
                                    </p>

                                    <p className="mb-5">
                                        <strong>Includes</strong> {includes}
                                    </p>

                                    <p className="mb-5">
                                        <strong>Please</strong> be aware that there is a $25 late fee if tuition isn't paid in full during the first week of classes.
                                    </p>
                                    <p className="mb-5">
                                        <strong>Message</strong> me personally if you need to do monthly payments.
                                    </p>
                                    <p className="mb-5">
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
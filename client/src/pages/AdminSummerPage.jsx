
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import AdminSummerSidebar from "../components/AdminSummerSidebar"
import { db, storage } from "../config/Firebase";
import { getDoc, doc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"




const AdminSummerPage = (props) => {
    const [summerTitle, setSummerTitle] = useState("")
    const [summerTitleIndex, setSummerTitleIndex] = useState("")

    const [summerContent, setSummerContent] = useState("")
    const [summerContentIndex, setSummerContentIndex] = useState("")

    const [summerRegLink, setSummerRegLink] = useState("")
    const [regLinkIndex, setregLinkIndex] = useState("")

    const [summerBannerImg, setSummerBannerImg] = useState("")
    const [summerBannerVid, setSummerBannerVid] = useState("")
    const [summerBannerTracker, setSummerBannerTracker] = useState(null)
    const [summerBannerHandler, setSummerBannerHandler] = useState("")
    const [summerBannerFileIndex, setSummerBannerFileIndex] = useState("")

    const [summerMainImg, setSummerMainImg] = useState("")
    const [summerMainImgIndex, setSummerMainImgIndex] = useState("")

    const [summerImg2, setSummerImg2] = useState("")
    const [summerImg2Index, setSummerImg2Index] = useState("")

    const [summerImg3, setSummerImg3] = useState("")
    const [summerImg3Index, setSummerImg3Index] = useState("")

    const [data, setData] = useState({});
    const [siteExpand, setSiteExpand] = useState(false)
    const [sideExpand, setSideExpand] = useState(false)
    const [perc, setPerc] = useState(null);
    const [highlightFocus, setHighlightFocus] = useState(false)
    const [expandIndex, setExpandIndex] = useState('')
    const [show, setShow] = useState(false)
    const [timeOut, setTimeOut] = useState(false)

    useEffect(() => {
        const getPhoto = async () => {
            try {
                const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                const docSnap = await getDoc(docRef);
                setData(docSnap.data())
                setSummerTitle(docSnap.data().summerTitle)
                setSummerContent(docSnap.data().summerContent)
                if (summerBannerTracker == null) {
                    setSummerBannerTracker(docSnap.data().summerBannerTracker)
                } else if (summerBannerHandler == "false") {
                    setSummerBannerTracker("false")
                } else if (summerBannerHandler === "true") {
                    setSummerBannerTracker(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPhoto()

        //SUMMER MAIN IMG UPLOAD
        const uploadSummerMainImgFile = () => {
            const name = new Date().getTime() + summerMainImg.name
            const storageRef = ref(storage, summerMainImg.name);
            const uploadTask = uploadBytesResumable(storageRef, summerMainImg);
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
                        setData((prev) => ({ ...prev, summerMainImg: downloadURL }))
                    });
                }
            );

        }
        summerMainImg && uploadSummerMainImgFile()

        //SUMMER IMG 2 UPLOAD
        const uploadSummerImg2File = () => {
            const name = new Date().getTime() + summerImg2.name
            const storageRef = ref(storage, summerImg2.name);
            const uploadTask = uploadBytesResumable(storageRef, summerImg2);
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
                        setData((prev) => ({ ...prev, summerImg2: downloadURL }))
                    });
                }
            );

        }
        summerImg2 && uploadSummerImg2File()

        //SUMMER IMG 3 UPLOAD
        const uploadSummerImg3File = () => {
            const name = new Date().getTime() + summerImg3.name
            const storageRef = ref(storage, summerImg3.name);
            const uploadTask = uploadBytesResumable(storageRef, summerImg3);
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
                        setData((prev) => ({ ...prev, summerImg3: downloadURL }))
                    });
                }
            );

        }
        summerImg3 && uploadSummerImg3File()

        //SUMMER BANNER IMG UPLOAD
        const uploadSummerBannerImgFile = () => {
            const name = new Date().getTime() + summerBannerImg.name
            const storageRef = ref(storage, summerBannerImg.name);
            const uploadTask = uploadBytesResumable(storageRef, summerBannerImg);
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
                            setTimeOut(true)
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
                        setData((prev) => ({ ...prev, summerBannerImg: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        summerBannerImg && uploadSummerBannerImgFile()

        //SUMMER BANNER Vid UPLOAD
        const uploadSummerBannerVidFile = () => {
            const name = new Date().getTime() + summerBannerVid.name
            const storageRef = ref(storage, summerBannerVid.name);
            const uploadTask = uploadBytesResumable(storageRef, summerBannerVid);
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
                        setData((prev) => ({ ...prev, summerBannerVid: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        summerBannerVid && uploadSummerBannerVidFile()


        setSummerBannerFileIndex("1")
        setSummerTitleIndex("2")
        setSummerContentIndex("3")
        setregLinkIndex("4")
        setSummerMainImgIndex("5")
        setSummerImg2Index("6")
        setSummerImg3Index("7")




    }, [summerMainImg, summerImg2, summerImg3, summerBannerImg, summerBannerVid])


    const navigate = useNavigate();


    const backOne = () => {
        navigate(-1)
    }


    return (
        <div className="w-full">
            <div className="flex w-full">
                <section>
                    <AdminSummerSidebar
                        siteExpand={siteExpand} setSiteExpand={setSiteExpand}
                        sideExpand={sideExpand} setSideExpand={setSideExpand}
                        perc={perc} setPerc={setPerc}
                        highlightFocus={highlightFocus} setHighlightFocus={setHighlightFocus}
                        expandIndex={expandIndex} setExpandIndex={setExpandIndex}
                        show={show} setShow={setShow} summerTitle={summerTitle}
                        setSummerTitle={setSummerTitle}
                        summerContent={summerContent} setSummerContent={setSummerContent}
                        summerRegLink={summerRegLink} setSummerRegLink={setSummerRegLink}
                        summerBannerImg={summerBannerImg} setSummerBannerImg={setSummerBannerImg}
                        summerBannerVid={summerBannerVid} setSummerBannerVid={setSummerBannerVid}
                        summerBannerTracker={summerBannerTracker} setSummerBannerTracker={setSummerBannerTracker}
                        summerBannerHandler={summerBannerHandler} setSummerBannerHandler={setSummerBannerHandler}
                        summerMainImg={summerMainImg} setSummerMainImg={setSummerMainImg}
                        summerImg2={summerImg2} setSummerImg2={setSummerImg2}
                        summerImg3={summerImg3} setSummerImg3={setSummerImg3}
                        data={data} setData={setData}
                        summerTitleIndex={summerTitleIndex}
                        summerContentIndex={summerContentIndex}
                        regLinkIndex={regLinkIndex}
                        summerBannerFileIndex={summerBannerFileIndex}
                        summerMainImgIndex={summerMainImgIndex}
                        summerImg2Index={summerImg2Index}
                        summerImg3Index={summerImg3Index}
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

                                    {summerBannerTracker === "true" ? <video className={`${highlightFocus && expandIndex == summerBannerFileIndex ? "border-4 border-red-700 " : ""}  ratesBanner  w-full h-full  bg-slate-200`} loop muted autoPlay controls='' src={data.summerBannerVid} alt="people dancing and colors" ></video>
                                        :
                                        <img className={`shrink ratesBanner w-full h-full  bg-slate-200 ${highlightFocus && expandIndex == summerBannerFileIndex ? "border-4 border-red-700 " : ""} `} src={data.summerBannerImg} alt="people dancing and colors" />}
                                </div>
                            }
                        </section>

                        {/* Back One Page Section */}
                        <section className={`w-full  flex items-center justify-end ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "" : ""} ${sideExpand == false && siteExpand == true ? "" : ""}`}>
                            <p className={` w-12  underline text-sky-500 cursor-pointer ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "text-[.7rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.7rem]" : ""} transition-all duration-500`} onClick={() => backOne()} >
                                Back
                            </p>
                        </section>


                        {/* SUMMER NAME Section */}
                        <section className={`w-full  flex justify-center mb-8 ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "h-[5px]" : ""} ${sideExpand == false && siteExpand == true ? "h-[5px]" : ""} transition-all duration-500`}>
                            <h1 className={` welcome ${siteExpand ? "text-lg" : " sm:text-xl md:text-3xl lg:text-5xl text-xl "} transition-all duration-500`}>Summer Info:</h1>
                        </section>

                        {/* Summer Info Section */}
                        <section className=" w-full">
                            <div className="flex flex-col md:flex-row items-center sm:items-start w-full h-content justify-center">
                                <img className={`object-cover rounded transition-all duration-500 infoCard2 hover:drop-shadow-lg ${highlightFocus && expandIndex == summerMainImgIndex ? "border-4 border-red-700 " : ""} ${sideExpand == true && siteExpand == false ? "w-[500px] h-[320px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[600px] h-[400px]" : ""} ${sideExpand == true && siteExpand == true ? "w-[230px] h-[166px]" : ""} ${sideExpand == false && siteExpand == true ? "w-[230px]  h-[166px]" : ""} `} src={data.summerMainImg} />
                                <div className="w-11/12 sm:w-1/2   flex flex-col items-center">
                                    <div className={`aboutInfo mb-3 p-2 transition-all duration-500 ${sideExpand == true && siteExpand == false ? "h-[330px]" : ""} ${sideExpand == false && siteExpand == false ? "h-[400px]" : ""} ${sideExpand == true && siteExpand == true ? "h-[160px]" : ""} ${sideExpand == false && siteExpand == true ? "h-[160px]" : ""}`}>
                                        <h2 className={`mb-2 transition-all duration-500 ${highlightFocus && expandIndex == summerTitleIndex ? "border-4 border-red-700 " : ""}   ${sideExpand == true && siteExpand == false ? "text-md" : ""} ${sideExpand == false && siteExpand == false ? "text-lg" : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}`}>
                                            <strong>{summerTitle}</strong>
                                        </h2>
                                        <p className={`mb-8  indent-5 transition-all duration-500 ${highlightFocus && expandIndex == summerContentIndex ? "border-4 border-red-700 " : ""}   ${sideExpand == true && siteExpand == false ? "text-md" : ""} ${sideExpand == false && siteExpand == false ? "text-lg" : ""} ${sideExpand == true && siteExpand == true ? "text-[.5rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.5rem]" : ""}`}>
                                            {summerContent}
                                        </p>
                                    </div>
                                    <div className={`mb-5 transition-all duration-500 ${highlightFocus && expandIndex == regLinkIndex ? "border-4 border-red-700 " : ""}    ${sideExpand == true && siteExpand == false ? "text-md" : ""} ${sideExpand == false && siteExpand == false ? "text-lg" : ""} ${sideExpand == true && siteExpand == true ? "text-[.5rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.5rem]" : ""}`}>
                                        <a target="_blank" href={data.summerRegLink} className="bg-indigo-700 py-2 px-5 text-white cursor-pointer transition-all duration-500 hover:bg-slate-900 hover:text-pink-300 justify-center flex items-center  rounded">Register Here!</a>
                                    </div>
                                </div>
                            </div>
                        </section>



                        {/* BUDA Summer Image Section */}
                        <section className="mb-5 w-full">
                            <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-evenly">
                                <img className={`object-cover rounded transition-all duration-500 infoCard2 hover:drop-shadow-lg ${highlightFocus && expandIndex == summerImg2Index ? "border-4 border-red-700 " : ""} ${sideExpand == true && siteExpand == false ? "w-[500px] h-[350px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[600px] h-[400px]" : ""} ${sideExpand == true && siteExpand == true ? "w-[230px] h-[150px]" : ""} ${sideExpand == false && siteExpand == true ? "w-[230px] h-[150px]" : ""} `} src={data.summerImg2} />
                                <img className={`object-cover rounded transition-all duration-500 infoCard2 hover:drop-shadow-lg ${highlightFocus && expandIndex == summerImg3Index ? "border-4 border-red-700 " : ""} ${sideExpand == true && siteExpand == false ? "w-[500px] h-[350px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[600px] h-[400px]" : ""} ${sideExpand == true && siteExpand == true ? "w-[230px] h-[150px]" : ""} ${sideExpand == false && siteExpand == true ? "w-[230px] h-[150px]" : ""} `} src={data.summerImg3} />
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminSummerPage;
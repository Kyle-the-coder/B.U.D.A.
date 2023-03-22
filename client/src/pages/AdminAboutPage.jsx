import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { db, storage } from "../config/Firebase";
import { getDoc, doc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import AdminAboutSidebar from "../components/AdminAboutSidebar"
import "../styles/scrollbar.css"
import "../styles/bannerSize.css"




const AdminAboutPage = (props) => {
    const [data, setData] = useState({});
    const [aboutMeContent, setAboutMeContent] = useState("")
    const [aboutMeContentIndex, setAboutMeContentIndex] = useState("")

    const [aboutBudaContent, setAboutBudaContent] = useState("")
    const [aboutBudaContentIndex, setAboutBudaContentIndex] = useState("")

    const [aboutMeImgFile, setAboutMeImgFile] = useState("")
    const [aboutMeImgFileIndex, setAboutMeImgFileIndex] = useState("")

    const [aboutBudaImgFile, setAboutBudaImgFile] = useState("")
    const [aboutBudaImgFileIndex, setAboutBudaImgFileIndex] = useState("")

    const [aboutBannerImgFile, setAboutBannerImgFile] = useState("")
    const [aboutBannerVidFile, setAboutBannerVidFile] = useState("")
    const [aboutBannerFileIndex, setAboutBannerFileIndex] = useState('')
    const [aboutBannerTracker, setAboutBannerTracker] = useState(null)
    const [aboutBannerHandler, setAboutBannerHandler] = useState(null)



    const [expandIndex, setExpandIndex] = useState('')
    const [siteExpand, setSiteExpand] = useState(false)
    const [sideExpand, setSideExpand] = useState(false)
    const [highlightFocus, setHighlightFocus] = useState(false)
    const [perc, setPerc] = useState(null);
    const [timeOut, setTimeOut] = useState(false)
    const navigate = useNavigate();

    const backOne = () => {
        navigate(-1)
    }

    useEffect(() => {
        const getPhoto = async () => {
            try {
                const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                const docSnap = await getDoc(docRef);
                setData(docSnap.data())
                setAboutBudaContent(docSnap.data().aboutBudaContent)
                setAboutMeContent(docSnap.data().aboutMeContent)
                if (aboutBannerTracker == null) {
                    setAboutBannerTracker(docSnap.data().aboutBannerTracker)
                } else if (aboutBannerHandler == "false") {
                    setAboutBannerTracker("false")
                } else if (aboutBannerHandler === "true") {
                    setAboutBannerTracker(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPhoto()


        //ABOUT BANNER IMG UPLOAD
        const uploadAboutBannerImgFile = () => {
            const name = new Date().getTime() + aboutBannerImgFile.name
            const storageRef = ref(storage, aboutBannerImgFile.name);
            const uploadTask = uploadBytesResumable(storageRef, aboutBannerImgFile);
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
                        setData((prev) => ({ ...prev, aboutMeBannerImg: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        aboutBannerImgFile && uploadAboutBannerImgFile()

        //ABOUT BANNER VID UPLOAD
        const uploadAboutBannerVidFile = () => {
            const name = new Date().getTime() + aboutBannerVidFile.name
            const storageRef = ref(storage, aboutBannerVidFile.name);
            const uploadTask = uploadBytesResumable(storageRef, aboutBannerVidFile);
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
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, aboutBannerVid: downloadURL }))
                        setTimeOut(false)
                    });
                }
            );
        }
        aboutBannerVidFile && uploadAboutBannerVidFile()

        //ABOUT ME IMG UPLOAD
        const uploadAboutMeImgFile = () => {
            const name = new Date().getTime() + aboutMeImgFile.name
            const storageRef = ref(storage, aboutMeImgFile.name);
            const uploadTask = uploadBytesResumable(storageRef, aboutMeImgFile);
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
                        setData((prev) => ({ ...prev, aboutMeImg: downloadURL }))
                    });
                }
            );
        }
        aboutMeImgFile && uploadAboutMeImgFile()




        //ABOUT BUDA CONTENT UPLOAD
        const uploadAboutBudaImgFile = () => {
            const name = new Date().getTime() + aboutBudaImgFile.name
            const storageRef = ref(storage, aboutBudaImgFile.name);
            const uploadTask = uploadBytesResumable(storageRef, aboutBudaImgFile);
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
                        setData((prev) => ({ ...prev, aboutBudaImg: downloadURL }))
                    });
                }
            );
        }
        aboutBudaImgFile && uploadAboutBudaImgFile()







        setAboutBannerFileIndex("1")
        setAboutMeImgFileIndex("2")
        setAboutMeContentIndex("3")
        setAboutBudaImgFileIndex("4")
        setAboutBudaContentIndex("5")



    }, [aboutBannerImgFile, aboutBannerVidFile, aboutMeImgFile, aboutBudaImgFile])



    return (
        <div className="w-full">
            <div className="flex">


                <section>
                    <AdminAboutSidebar
                        expandIndex={expandIndex} setExpandIndex={setExpandIndex}
                        highlightFocus={highlightFocus} setHighlightFocus={setHighlightFocus}
                        data={data} setData={setData}
                        perc={perc} setPerc={setPerc}
                        siteExpand={siteExpand} setSiteExpand={setSiteExpand}
                        sideExpand={sideExpand} setSideExpand={setSideExpand}
                        aboutMeContent={aboutMeContent} setAboutMeContent={setAboutMeContent}
                        aboutMeContentIndex={aboutMeContentIndex} setAboutMeContentIndex={setAboutMeContentIndex}
                        aboutBudaContent={aboutBudaContent} setAboutBudaContent={setAboutBudaContent}
                        aboutBudaContentIndex={aboutBudaContentIndex} setAboutBudaContentIndex={setAboutBudaContentIndex}
                        aboutMeImgFile={aboutMeImgFile} setAboutMeImgFile={setAboutMeImgFile}
                        aboutMeImgFileIndex={aboutMeImgFileIndex} setAboutMeImgFileIndex={setAboutMeImgFileIndex}
                        aboutBudaImgFile={aboutBudaImgFile} setAboutBudaImgFile={setAboutBudaImgFile}
                        aboutBudaImgFileIndex={aboutBudaImgFileIndex} setAboutBudaImgFileIndex={setAboutBudaImgFileIndex}
                        aboutBannerImgFile={aboutBannerImgFile} setAboutBannerImgFile={setAboutBannerImgFile}
                        aboutBannerVidFile={aboutBannerVidFile} setAboutBannerVidFile={setAboutBannerVidFile}
                        aboutBannerFileIndex={aboutBannerFileIndex} setAboutBannerFileIndex={setAboutBannerFileIndex}
                        aboutBannerTracker={aboutBannerTracker} setAboutBannerTracker={setAboutBannerTracker}
                        aboutBannerHandler={aboutBannerHandler} setAboutBannerHandler={setAboutBannerHandler}
                    />
                </section>


                <div className={` ${siteExpand ? "w-8/12" : "w-full "} relative flex justify-end items-start transition-all duration-700`}>


                    <div className={` ${siteExpand ? "w-[500px] h-[500px]" : "w-full"} transition-all duration-700`}>


                        {/* ABOUT BANNER SECTION */}
                        <section className={`w-full h-content  flex justify-center ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "":""} ${sideExpand == true && siteExpand == true ? "":""} ${sideExpand == false && siteExpand == true ? "":""} `}>
                            {timeOut ?
                                <div className="loader flex flex-col items-center justify-center">
                                <h1>loading...</h1>
                                <h1>Bigger files might take a few seconds</h1>
                                <h1>Don't forget to click submit once it's done!</h1>
                                </div>
                                :
                                <div className={`w-full bg-slate-200 mb-5 flex justify-center ${sideExpand == true && siteExpand == false ? "h-[150px]" : ""} ${sideExpand == false && siteExpand == false ? "h-[175px]":""} ${sideExpand == true && siteExpand == true ? "h-[95px]":""} ${sideExpand == false && siteExpand == true ? "h-[95px]":""} transition-all duration-500`}>

                                    {aboutBannerTracker === "true" ? <video className={`${highlightFocus && expandIndex == aboutBannerFileIndex ? "border-4 border-red-700 " : ""}  ratesBanner  w-full h-full  bg-slate-200`} loop muted autoPlay controls='' src={data.aboutBannerVid} alt="people dancing and colors" ></video>
                                        :
                                        <img className="shrink ratesBanner w-full h-full  bg-slate-200" src={data.aboutMeBannerImg} alt="people dancing and colors" />}
                                </div>
                            }
                        </section>

                        {/* Back One Page Section */}
                        <section className={`w-full  flex items-center justify-end ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "":""} ${sideExpand == true && siteExpand == true ? "":""} ${sideExpand == false && siteExpand == true ? "":""}`}>
                            <p className={` w-12  underline text-sky-500 cursor-pointer ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "":""} ${sideExpand == true && siteExpand == true ? "text-[.7rem]":""} ${sideExpand == false && siteExpand == true ? "text-[.7rem]":""} transition-all duration-500`} onClick={() => backOne()} >
                                Back
                            </p>
                        </section>



                        {/* BUDA Name Section */}
                        <section className={`w-full  flex justify-center mb-8 ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "":""} ${sideExpand == true && siteExpand == true ? "h-[5px]":""} ${sideExpand == false && siteExpand == true ? "h-[5px]":""} transition-all duration-500`}>
                            <h1 className={` welcome ${siteExpand ? "text-lg": " sm:text-xl md:text-3xl lg:text-4xl text-xl "} transition-all duration-500`}>About Bianca:</h1>
                        </section>

                        {/* Bianca About Info Section */}
                        <section className="mb-10">
                            <div className="flex flex-col md:flex-row items-center sm:items-start w-full h-content justify-center">
                                <img className={`object-cover rounded transition-all duration-500 infoCard2 hover:drop-shadow-lg ${highlightFocus && expandIndex == aboutMeImgFileIndex ? "border-4 border-red-700 " : ""} ${sideExpand == true && siteExpand == false ? "w-[400px] h-[500px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[500px] h-[600px]":""} ${sideExpand == true && siteExpand == true ? "w-[230px] h-[295px]":""} ${sideExpand == false && siteExpand == true ? "w-[230px] h-[295px]":""} `}  src={data.aboutMeImg} />
                                <div className="sm:w-1/2 w-11/12 h-content flex flex-col items-center">
                                    <div className={`aboutInfo p-2 transition-all duration-500 ${highlightFocus && expandIndex == aboutMeContentIndex ? "border-4 border-red-700 " : ""} ${sideExpand == true && siteExpand == false ? "h-[500px]" : ""} ${sideExpand == false && siteExpand == false ? "h-[600px]":""} ${sideExpand == true && siteExpand == true ? "h-[300px]":""} ${sideExpand == false && siteExpand == true ? "h-[300px]":""}`}>
                                        <p className={`mb-8  indent-5 transition-all duration-500  ${sideExpand == true && siteExpand == false ? "text-md" : ""} ${sideExpand == false && siteExpand == false ? "text-lg":""} ${sideExpand == true && siteExpand == true ? "text-[.5rem]":""} ${sideExpand == false && siteExpand == true ? "text-[.5rem]":""}`}>
                                            {aboutMeContent}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>



                        {/* BUDA Name Section */}
                        <section className={`w-full  flex justify-center ${sideExpand == true && siteExpand == false ? "h-[50px] mb-8" : ""} ${sideExpand == false && siteExpand == false ? "mb-8":""} ${sideExpand == true && siteExpand == true ? "mb-5":""} ${sideExpand == false && siteExpand == true ? "mb-5":""}`}>
                            <h1 className={` welcome ${siteExpand ? "text-lg": " sm:text-xl md:text-3xl lg:text-4xl text-xl "} transition-all duration-500`}>About BUDA:</h1>
                        </section>

                        {/* BUDA About Info Section */}
                        <section className="mb-10">
                            <div className="flex flex-col-reverse md:flex-row items-center sm:items-start w-full h-content justify-center ">
                                <div className="sm:w-1/2  px-2 flex flex-col items-center">
                                    <div className={` aboutInfo px-5 transition-all duration-500 py-2 ${highlightFocus && expandIndex == aboutBudaContentIndex ? "border-4 border-red-700 " : ""} ${sideExpand == true && siteExpand == false ? "h-[280px]" : ""} ${sideExpand == false && siteExpand == false ? "h-[400px]":""} ${sideExpand == true && siteExpand == true ? "h-[120px]":""} ${sideExpand == false && siteExpand == true ? "h-[120px]":""}`}>
                                        <p className={`mb-8 indent-5 transition-all duration-500  ${sideExpand == true && siteExpand == false ? "text-md" : ""} ${sideExpand == false && siteExpand == false ? "text-lg":""} ${sideExpand == true && siteExpand == true ? "text-[.5rem]":""} ${sideExpand == false && siteExpand == true ? "text-[.5rem]":""}`}>
                                            {aboutBudaContent}
                                        </p>
                                    </div>
                                </div>
                                <img className={`object-cover rounded transition-all duration-500 infoCard2 hover:drop-shadow-lg ${highlightFocus && expandIndex == aboutBudaImgFileIndex ? "border-4 border-red-700 " : ""} ${sideExpand == true && siteExpand == false ? "w-[500px] h-[300px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[600px] h-[380px]":""} ${sideExpand == true && siteExpand == true ? "w-[230px] h-[130px]":""} ${sideExpand == false && siteExpand == true ? "w-[230px] h-[130px]":""} `}   src={data.aboutBudaImg} />
                            </div>
                        </section>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminAboutPage;
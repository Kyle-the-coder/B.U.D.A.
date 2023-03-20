import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { db, storage } from "../config/Firebase";
import { getDoc, doc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import AdminAboutSidebar from "../components/AdminAboutSidebar"
import "../styles/scrollbar.css"




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
    const [aboutBannerTracker, setAboutBannerTracker] = useState('')



    const [expandIndex, setExpandIndex] = useState('')
    const [siteExpand, setSiteExpand] = useState(false)
    const [sideExpand, setSideExpand] = useState(false)
    const [highlightFocus, setHighlightFocus] = useState(false)
    const [perc, setPerc] = useState(null);
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
                        setData((prev) => ({ ...prev, aboutMeBannerImg: downloadURL }))
                    });
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
                    />
                </section>


                <div className={` ${siteExpand ? "w-8/12" : "w-full "} relative flex justify-end items-start transition-all duration-700`}>


                    <div className={` ${siteExpand ? "w-[500px] h-[500px]" : "w-full"} transition-all duration-700`}>


                        {/* ABOUT BANNER SECTION */}
                        <section className="w-full bg-slate-200 h-32 mb-5 flex justify-center ">
                            {Object.keys(data).length === 0 ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src="" alt="people dancing and colors" ></video>
                                :
                                <img className="shrink ratesBanner w-full h-full  bg-slate-200" src="" alt="people dancing and colors" />}
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
                                <img className="rounded infoCard2 hover:drop-shadow-lg" width="500" src={data.aboutMeImg} />
                                <div className="sm:w-1/2 w-11/12 h-[640px] flex flex-col items-center">
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
                            <div className="flex flex-col-reverse md:flex-row items-center w-full h-content justify-center ">
                                <div className="sm:w-1/2 h-[590px] px-2 flex flex-col items-center">
                                    <div className=" aboutInfo px-5 py-2">
                                        <p className="mb-8 indent-5 lg:text-lg">
                                            about buda
                                        </p>
                                    </div>
                                </div>
                                <img className="mb-1 rounded infoCard hover:drop-shadow-lg" width="800" src={data.aboutBudaImg} />
                            </div>
                        </section>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminAboutPage;
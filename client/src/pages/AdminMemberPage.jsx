import check from "../assets/images/checkmark.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminMemberSidebar from "../components/AdminMemberSidebar";
import { db, storage } from "../config/Firebase";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"


const AdminMemberPage = (props) => {
    const [data, setData] = useState({})
    const navigate = useNavigate();
    //MUSIC AND VIDEO LIST HANDLERS
    const [memberMusicList, setMemberMusicList] = useState([])
    const [memberVideoList, setMemberVideoList] = useState([])

    //MUSIC AND VIDEO INFO HANDLERS
    const [memberVideoTitle, setMemberVideoTitle] = useState('')
    const [memberVideoLink, setMemberVideoLink] = useState('')
    const [memberMusicTitle, setMemberMusicTitle] = useState('')
    const [memberMusicLink, setMemberMusicLink] = useState('')

    //MEMBER PAGE INFO HANDLERS
    const [memberTitle, setMemberTitle] = useState('')
    const [memberUpcomingEventsInfo, setMemberUpcomingEventsInfo] = useState('')
    const [memberHomeworkInfo, setMemberHomeworkInfo] = useState('')
    const [memberBudaCrewInfo, setMemberBudaCrewInfo] = useState('')
    const [memberContactPhone, setMemberContactPhone] = useState('')

    //MEMBER BANNER AND MAIN IMG HANDLERS
    const [memberMainImg, setMemberMainImg] = useState('')
    const [memberBannerImg, setMemberBannerImg] = useState('')
    const [memberBannerVid, setMemberBannerVid] = useState('')
    const [memberBannerTracker, setMemberBannerTracker] = useState(null)
    const [memberBannerHandler, setMemberBannerHandler] = useState('')

    //PAGE RESPONSIVENESS HANDLERS
    const [siteExpand, setSiteExpand] = useState(false)
    const [sideExpand, setSideExpand] = useState(false)
    const [perc, setPerc] = useState(null);
    const [highlightFocus, setHighlightFocus] = useState(false)
    const [contentHighlightFocus, setContentHighlightFocus] = useState(false)
    const [contentHighlightIndex, setContentHighlightIndex] = useState('')
    const [expandIndex, setExpandIndex] = useState('')
    const [show, setShow] = useState(false)
    const [timeOut, setTimeOut] = useState(false)

    useEffect(() => {
        const getPhoto = async () => {
            try {
                const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                const docSnap = await getDoc(docRef);
                setData(docSnap.data())
                setMemberTitle(docSnap.data().memberTitle)
                setMemberUpcomingEventsInfo(docSnap.data().memberUpcomingEventsInfo)
                setMemberHomeworkInfo(docSnap.data().memberHomeworkInfo)
                setMemberBudaCrewInfo(docSnap.data().memberBudaCrewInfo)
                setMemberContactPhone(docSnap.data().memberContactPhone)
                if (memberBannerTracker == null) {
                    setMemberBannerTracker(docSnap.data().memberBannerTracker)
                } else if (memberBannerHandler == "false") {
                    setMemberBannerTracker("false")
                } else if (memberBannerHandler === "true") {
                    setMemberBannerTracker(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPhoto()

        const getMusicLinks = async () => {
            try {
                const docRef = doc(db, "memberMusicLinks", process.env.REACT_APP_MUSIC_ID);
                const docSnap = await getDoc(docRef);
                setMemberMusicList(docSnap.data().musicList)
            } catch (error) {
                console.log(error)
            }
        }
        getMusicLinks()

        const getVideoLinks = async () => {
            try {
                const docRef = doc(db, "memberVidLinks", process.env.REACT_APP_VIDEO_ID);
                const docSnap = await getDoc(docRef);
                setMemberVideoList(docSnap.data().videoList)
            } catch (error) {
                console.log(error)
            }
        }
        getVideoLinks()

        //MEMBER MAIN IMG UPLOAD
        const uploadMemberMainImgFile = () => {
            const name = new Date().getTime() + memberMainImg.name
            const storageRef = ref(storage, memberMainImg.name);
            const uploadTask = uploadBytesResumable(storageRef, memberMainImg);
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
                        setData((prev) => ({ ...prev, memberMainImg: downloadURL }))
                    });
                }
            );

        }
        memberMainImg && uploadMemberMainImgFile()

        //MEMBER BANNER IMG UPLOAD
        const uploadMemberBannerImgFile = () => {
            const name = new Date().getTime() + memberBannerImg.name
            const storageRef = ref(storage, memberBannerImg.name);
            const uploadTask = uploadBytesResumable(storageRef, memberBannerImg);
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
                        setData((prev) => ({ ...prev, memberBannerImg: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        memberBannerImg && uploadMemberBannerImgFile()

        //MEMBER BANNER Vid UPLOAD
        const uploadMemberBannerVidFile = () => {
            const name = new Date().getTime() + memberBannerVid.name
            const storageRef = ref(storage, memberBannerVid.name);
            const uploadTask = uploadBytesResumable(storageRef, memberBannerVid);
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
                        setData((prev) => ({ ...prev, memberBannerVid: downloadURL }))
                    });
                    setTimeOut(false)
                }
            );

        }
        memberBannerVid && uploadMemberBannerVidFile()






    }, [memberMainImg, memberBannerImg, memberBannerVid])

    const backOne = () => {
        navigate(-1)
    }
    const updateVideoList = async ()=>{
        try {
            await setDoc(doc(db, "memberVidLinks", process.env.REACT_APP_VIDEO_ID), {
                videoList: [...memberVideoList],
                timeStamp: serverTimestamp()
            });
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteOneVideo = (e, link, title) => {
        const newArray = memberVideoList.filter((index) => link && title != index.videoLink && index.videoTitle)
        console.log(newArray)
        setMemberVideoList(newArray)
        updateVideoList()
    }

    
    console.log(memberVideoList)
    return (
        <div className="w-full">
            <div className="flex">



                <section>
                    <AdminMemberSidebar
                        data={data} setData={setData}
                        siteExpand={siteExpand} setSiteExpand={setSiteExpand}
                        sideExpand={sideExpand} setSideExpand={setSideExpand}
                        perc={perc} setPerc={setPerc}
                        highlightFocus={highlightFocus} setHighlightFocus={setHighlightFocus}
                        expandIndex={expandIndex} setExpandIndex={setExpandIndex}
                        show={show} setShow={setShow}
                        contentHighlightFocus={contentHighlightFocus} setContentHighlightFocus={setContentHighlightFocus}
                        contentHighlightIndex={contentHighlightIndex} setContentHighlightIndex={setContentHighlightIndex}
                        memberTitle={memberTitle} setMemberTitle={setMemberTitle}
                        memberUpcomingEventsInfo={memberUpcomingEventsInfo} setMemberUpcomingEventsInfo={setMemberUpcomingEventsInfo}
                        memberHomeworkInfo={memberHomeworkInfo} setMemberHomeworkInfo={setMemberHomeworkInfo}
                        memberBudaCrewInfo={memberBudaCrewInfo} setMemberBudaCrewInfo={setMemberBudaCrewInfo}
                        memberContactPhone={memberContactPhone} setMemberContactPhone={setMemberContactPhone}
                        memberMainImg={memberMainImg} setMemberMainImg={setMemberMainImg}
                        memberBannerImg={memberBannerImg} setMemberBannerImg={setMemberBannerImg}
                        memberBannerVid={memberBannerVid} setMemberBannerVid={setMemberBannerVid}
                        memberBannerTracker={memberBannerTracker} setMemberBannerTracker={setMemberBannerTracker}
                        memberBannerHandler={memberBannerHandler} setMemberBannerHandler={setMemberBannerHandler}
                        memberMusicList={memberMusicList} setMemberMusicList={setMemberMusicList}
                        memberMusicTitle={memberMusicTitle} setMemberMusicTitle={setMemberMusicTitle}
                        memberMusicLink={memberMusicLink} setMemberMusicLink={setMemberMusicLink}
                        memberVideoList={memberVideoList} setMemberVideoList={setMemberVideoList}
                        memberVideoLink={memberVideoLink} setMemberVideoLink={setMemberVideoLink}
                        memberVideoTitle={memberVideoTitle} setMemberVideoTitle={setMemberVideoTitle}

                    />
                </section>

                <div className={` ${siteExpand ? "w-8/12" : "w-full "} relative flex justify-end items-start transition-all duration-700`}>
                    <div className={` ${siteExpand ? "w-[500px] h-[500px]" : "w-full"}  transition-all duration-700`}>

                        {/* Banner Section */}
                        <section className="w-full bg-slate-200 h-32 mb-5 flex justify-center ">
                            {memberBannerTracker == "true" ? <video className="shrink ratesBanner w-full h-full  bg-slate-200" loop muted autoPlay controls='' src={data.memberBannerVid} alt="people dancing and colors" ></video>
                                :
                                <img className="shrink ratesBanner w-full h-full  bg-slate-200" src={data.memberBannerImg} alt="people dancing and colors" />}
                        </section>

                        {/* Back One Page Section */}
                        <section className="w-full h-12 flex items-center justify-end">
                            <p className=" w-12 text-sm underline text-sky-500 cursor-pointer" onClick={() => backOne()} >
                                Back
                            </p>
                        </section>

                        {/* BUDA Member Section */}
                        <section >
                            <div className="w-full flex flex-col items-center sm:items-start">
                                <h1 className='welcome  mt-5 sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-xl mb-3 welcome w-full flex justify-center'>Welcome  <span className='text-indigo-500 mx-2'> BUDA </span>  Crew Members!</h1>
                                <h1 className="sm:text-3xl md:text-4xl lg:text-5xl  text-xl mb-3 welcome w-full flex justify-center">Congratulations!!</h1>
                                <p className="mb-3 sm:text-3xl md:text-4xl lg:text-4xl text-sm w-full flex justify-center"> {memberTitle}</p>
                                <p className="mb-3 lg:text-2xl w-full flex justify-center">*please read all*</p>
                                <div className="h-content w-full flex flex-col items-center sm:items-start sm:ml-8">
                                    <div className="flex w-11/12 justify-center mb-10">
                                        <img className="border-2 border-black flex rounded w-[800px] md:w-[900px] lg:w-[1200px]" src={data.memberMainImg} />
                                    </div>


                                    <div className="w-full p-2 md:text-xl lg:text-2xl">
                                        <p className="mb-5">
                                            <strong>Upcoming Events: </strong> {memberUpcomingEventsInfo}
                                        </p>
                                        <p className="mb-5">
                                            <strong>Below </strong> you will find important info reagarding all BUDA Crew activites, homework, and videos
                                        </p>
                                        <p className="mb-5">
                                            If you have any issues please call me {memberContactPhone}
                                        </p>
                                    </div>


                                    <div className="flex flex-col sm:flex-row w-11/12 justify-evenly">
                                        <div className="rounded-lg h-[900px] sm:w-2/5 w-11/12 flex flex-col items-center border-2  border-black mb-5">
                                            <div className="flex shrink items-center justify-center bg-indigo-200 flex-col w-full h-1/6 p-2 border-b-2 border-black border-double">
                                                <p className="text-2xl welcome md:text-xl lg:text-4xl">Music/Videos:</p>
                                            </div>
                                            <div className=" w-full h-[355px]  p-2 mb-2 border-b-2 border-black border-double aboutInfo">
                                                <p className="text-xl mb-2 md:text-2xl lg:text-4xl"><strong>Music:</strong></p>
                                                {memberMusicList.map((t, i) => {
                                                    return (
                                                        <div key={i} className="flex justify-between mb-3 aboutInfo md:text-2xl">
                                                            <p><a className="text-sky-500 underline" target="_blank" href={t.musicLink}>{t.musicTitle}</a></p>
                                                            <button className="bg-red-400 px-2 rounded">Delete</button>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="w-full h-[390px] p-2 aboutInfo">
                                                <p className="text-xl mb-2 md:text-2xl lg:text-4xl"><strong>Videos:</strong></p>
                                                {memberVideoList.map((t, i) => {
                                                    return (
                                                        <div key={i} className="flex justify-between mb-3 aboutInfo md:text-2xl">
                                                            <p><a className="text-sky-500 underline" href={t.videoLink}>{t.videoTitle}</a></p>
                                                            <button className="bg-red-400 px-2 rounded" onClick={(e) => { handleDeleteOneVideo(e, t.videoLink, t.videoTitle) }}>Delete</button>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className="rounded-lg h-[900px] sm:w-2/5 w-11/12 flex flex-col items-center border-2  border-black mb-5">
                                            <div className="flex shrink items-center justify-center bg-red-200 flex-col w-full h-1/6 p-2 border-b-2 border-black border-double">
                                                <p className="text-2xl welcome md:text-xl lg:text-4xl">Homework/Info:</p>
                                            </div>
                                            <div className="flex h-[355px]  flex-col w-full p-2 mb-2 border-b-2 border-black border-double aboutInfo">
                                                <p className="text-xl mb-2 md:text-2xl lg:text-4xl"><strong>Info:</strong></p>
                                                <p className="md:text-xl">{memberBudaCrewInfo}</p>
                                            </div>
                                            <div className="flex  h-[390px] flex-col w-full p-2 aboutInfo">
                                                <p className="text-xl mb-2 md:text-2xl lg:text-4xl"> <strong>Homework:</strong> </p>
                                                <p className="md:text-xl">{memberHomeworkInfo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMemberPage;
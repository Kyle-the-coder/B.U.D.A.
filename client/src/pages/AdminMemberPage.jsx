import check from "../assets/images/checkmark.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
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
    const [memberAddIndex, setMemberAddIndex] = useState('')

    //MEMBER PAGE INFO HANDLERS
    const [memberTitle, setMemberTitle] = useState('')
    const [memberUpcomingEventsInfo, setMemberUpcomingEventsInfo] = useState('')
    const [memberHomeworkInfo, setMemberHomeworkInfo] = useState('')
    const [memberBudaCrewInfo, setMemberBudaCrewInfo] = useState('')
    const [memberContactPhone, setMemberContactPhone] = useState('')
    const [memberInfoIndex, setMemberInfoIndex] = useState('')

    //MEMBER BANNER AND MAIN IMG HANDLERS
    const [memberMainImg, setMemberMainImg] = useState('')
    const [memberMainImgIndex, setMemberMainImgIndex] = useState('')
    const [memberBannerImg, setMemberBannerImg] = useState('')
    const [memberBannerVid, setMemberBannerVid] = useState('')
    const [memberBannerTracker, setMemberBannerTracker] = useState(null)
    const [memberBannerHandler, setMemberBannerHandler] = useState('')
    const [memberBannerIndex, setMemberBannerIndex] = useState('')

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
                    setMemberBannerTracker(docSnap.data().MemberBannerTracker)
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


        setMemberBannerIndex("1")
        setMemberInfoIndex('2')
        setMemberAddIndex("3")
        setMemberMainImgIndex("4")



    }, [memberMainImg, memberBannerImg, memberBannerVid])

    const backOne = () => {
        navigate(-1)
    }
    const updateVideoList = async (newArr) => {
        try {
            await setDoc(doc(db, "memberVidLinks", process.env.REACT_APP_VIDEO_ID), {
                videoList: [...newArr],
                timeStamp: serverTimestamp()
            });
        } catch (error) {
            console.log(error)
        }
    }

    const updateMusicList = async (newArr) => {
        try {
            await setDoc(doc(db, "memberMusicLinks", process.env.REACT_APP_MUSIC_ID), {
                musicList: [...newArr],
                timeStamp: serverTimestamp()
            });
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteOneVideo = (e, link, title) => {
        const newArray = memberVideoList.filter((index) => link != index.videoLink)
        console.log(newArray)
        setMemberVideoList(newArray)
        updateVideoList(newArray)
    }

    const handleDeleteOneMusic = (e, link, title) => {
        console.log(title)
        const newArr = memberMusicList.filter((index) => link != index.musicLink)
        setMemberMusicList(newArr)
        console.log("new arr is", newArr)
        updateMusicList(newArr)

    }


    console.log(contentHighlightFocus)
    console.log(contentHighlightIndex)

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
                        memberAddIndex={memberAddIndex}
                        memberInfoIndex={memberInfoIndex}
                        memberMainImgIndex={memberMainImgIndex}
                        memberBannerIndex={memberBannerIndex}

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
                                    <h1>Please click submit once it's done!</h1>
                                </div>
                                :
                                <div className={`w-full bg-slate-200 mb-5 flex justify-center ${sideExpand == true && siteExpand == false ? "h-[150px]" : ""} ${sideExpand == false && siteExpand == false ? "h-[175px]" : ""} ${sideExpand == true && siteExpand == true ? "h-[95px]" : ""} ${sideExpand == false && siteExpand == true ? "h-[95px]" : ""} transition-all duration-500`}>

                                    {memberBannerTracker === "true" ? <video className={`transition-all duration-500 ${highlightFocus && expandIndex == memberBannerIndex ? "border-4 border-red-700 " : ""}  ratesBanner  w-full h-full  bg-slate-200`} loop muted autoPlay controls='' src={data.memberBannerVid} alt="people dancing and colors" ></video>
                                        :
                                        <img className={`shrink ratesBanner w-full h-full  bg-slate-200 transition-all duration-500 ${highlightFocus && expandIndex == memberBannerIndex ? "border-4 border-red-700 " : ""} `} src={data.memberBannerImg} alt="people dancing and colors" />}
                                </div>
                            }
                        </section>

                        {/* Back One Page Section */}
                        <section className={`w-full  flex items-center justify-end ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "" : ""} ${sideExpand == false && siteExpand == true ? "" : ""}`}>
                            <p className={`transition-all duration-500 w-12  underline text-sky-500 cursor-pointer ${sideExpand == true && siteExpand == false ? "" : ""} ${sideExpand == false && siteExpand == false ? "" : ""} ${sideExpand == true && siteExpand == true ? "text-[.7rem]" : ""} ${sideExpand == false && siteExpand == true ? "text-[.7rem]" : ""} transition-all duration-500`} onClick={() => backOne()} >
                                Back
                            </p>
                        </section>

                        {/* BUDA Member Section */}
                        <section >
                            <div className="w-full flex flex-col items-center ">
                                <h1 className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-5xl my-4" : ""} ${sideExpand == false && siteExpand == false ? "text-7xl my-5" : ""} ${sideExpand == true && siteExpand == true ? "text-xl my-1" : ""} ${sideExpand == false && siteExpand == true ? "text-xl my-1" : ""}  welcome w-full flex justify-center`}>Welcome  <span className='text-indigo-500 mx-2'> BUDA </span>  Crew Members!</h1>
                                <h1 className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-5xl my-4" : ""} ${sideExpand == false && siteExpand == false ? "text-7xl my-5" : ""} ${sideExpand == true && siteExpand == true ? "text-xl " : ""} ${sideExpand == false && siteExpand == true ? "text-xl " : ""}  welcome`}>Congratulations!!</h1>
                                <p className={`${contentHighlightFocus && contentHighlightIndex == "1" ? "border-2 border-red-700 p-1" : ""} ${highlightFocus && expandIndex == memberInfoIndex ? "border-4 border-red-700 " : ""} transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-4xl my-3" : ""} ${sideExpand == false && siteExpand == false ? "text-5xl my-3" : ""} ${sideExpand == true && siteExpand == true ? "text-lg " : ""} ${sideExpand == false && siteExpand == true ? "text-lg " : ""}   flex `}> {memberTitle}</p>
                                <p className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-xl my-2" : ""} ${sideExpand == false && siteExpand == false ? "text-2xl my-3" : ""} ${sideExpand == true && siteExpand == true ? "text-sm mb-1" : ""} ${sideExpand == false && siteExpand == true ? "text-sm mb-1" : ""}  w-full flex justify-center`}>*please read all*</p>
                                <div className="h-content w-full flex flex-col items-center sm:items-start sm:ml-8">
                                    <div className="flex w-11/12 justify-center mb-10">
                                        <img className={` ${highlightFocus && expandIndex == memberMainImgIndex ? "border-4 border-red-700 " : ""}  transition-all duration-500 object-cover ${sideExpand == true && siteExpand == false ? "w-[1100px] h-[600px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[1200px] h-[700px]" : ""} ${sideExpand == true && siteExpand == true ? "w-[600px] h-[250px]" : ""} ${sideExpand == false && siteExpand == true ? "w-[600px] h-[250px]" : ""}  border-2 border-black flex rounded `} src={data.memberMainImg} />
                                    </div>


                                    <div className={`${highlightFocus && expandIndex == memberInfoIndex ? "border-4 border-red-700 " : ""} transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-xl " : ""} ${sideExpand == false && siteExpand == false ? "text-2xl " : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem] " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}  `}>
                                        <p className={`transition-all duration-500 ${contentHighlightFocus && contentHighlightIndex == "2" ? "border-2 border-red-700 p-1" : ""} mb-5`}>
                                            <strong>Upcoming Events: </strong> {memberUpcomingEventsInfo}
                                        </p>
                                        <p className="mb-5">
                                            <strong>Below </strong> you will find important info reagarding all BUDA Crew activites, homework, and videos
                                        </p>
                                        <p className={`${contentHighlightFocus && contentHighlightIndex == "3" ? "border-2 border-red-700 p-1" : ""} mb-5`}>
                                            If you have any issues please call me {memberContactPhone}
                                        </p>
                                    </div>


                                    <div className={` flex flex-col sm:flex-row w-11/12 justify-evenly`}>
                                        <div className={`${highlightFocus && expandIndex == memberAddIndex ? "border-4 border-red-700 " : ""} transition-all mt-2 duration-500 ${sideExpand == true && siteExpand == false ? "w-[450px] h-[700px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[600px] h-[900px]" : ""} ${sideExpand == true && siteExpand == true ? "w-[200px] h-[250px]" : ""} ${sideExpand == false && siteExpand == true ? "w-[200px] h-[250px]" : ""}  rounded-lg flex flex-col items-center border-2  border-black mb-5`}>
                                            <div className="flex shrink items-center justify-center bg-indigo-200 flex-col w-full h-1/6 p-2 border-b-2 border-black border-double">
                                                <p className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-3xl " : ""} ${sideExpand == false && siteExpand == false ? "text-4xl " : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem] " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}   welcome `}>Music/Videos:</p>
                                            </div>
                                            <div className=" w-full h-[355px]  p-2 mb-2 border-b-2 border-black border-double aboutInfo">
                                                <p className={`${contentHighlightFocus && contentHighlightIndex == "6" ? "border-2 border-red-700" : ""}  transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-2xl " : ""} ${sideExpand == false && siteExpand == false ? "text-3xl " : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem] " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}   mb-2 `}><strong>Music:</strong></p>
                                                {memberMusicList.map((t, i) => {
                                                    return (
                                                        <div key={i} className="flex justify-between mb-3 aboutInfo ">
                                                            <p><a className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-2xl " : ""} ${sideExpand == false && siteExpand == false ? "text-3xl " : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem] " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}  text-sky-500 underline`} target="_blank" href={t.musicLink}>{t.musicTitle}</a></p>
                                                            <button className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-xl px-3 " : ""} ${sideExpand == false && siteExpand == false ? "text-2xl px-4" : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem] px-2  " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem] px-2" : ""}  bg-red-400 rounded`} onClick={(e) => { handleDeleteOneMusic(e, t.musicLink, t.musicTitle) }}>Delete</button>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="w-full h-[390px] p-2 aboutInfo">
                                                <p className={`${contentHighlightFocus && contentHighlightIndex == "7" ? "border-2 border-red-700 " : ""}  transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-2xl " : ""} ${sideExpand == false && siteExpand == false ? "text-3xl " : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem] " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}   mb-2 `}><strong>Videos:</strong></p>
                                                {memberVideoList.map((t, i) => {
                                                    return (
                                                        <div key={i} className="flex justify-between mb-3 aboutInfo ">
                                                            <p><a className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-2xl " : ""} ${sideExpand == false && siteExpand == false ? "text-3xl " : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem] " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}  text-sky-500 underline`} target="_blank" href={t.videoLink}>{t.videoTitle}</a></p>
                                                            <button className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-xl px-3 " : ""} ${sideExpand == false && siteExpand == false ? "text-2xl px-4" : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem] px-2  " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem] px-2" : ""}  bg-red-400 rounded`} onClick={(e) => { handleDeleteOneVideo(e, t.videoLink, t.videoTitle) }}>Delete</button>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className={`${highlightFocus && expandIndex == memberInfoIndex ? "border-4 border-red-700 " : ""} transition-all mt-2 duration-500 ${sideExpand == true && siteExpand == false ? "w-[450px] h-[700px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[600px] h-[900px]" : ""} ${sideExpand == true && siteExpand == true ? "w-[200px] h-[250px]" : ""} ${sideExpand == false && siteExpand == true ? "w-[200px] h-[250px]" : ""}  rounded-lg flex flex-col items-center border-2  border-black mb-5`}>
                                            <div className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-3xl " : ""} ${sideExpand == false && siteExpand == false ? "text-4xl " : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem] " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}   flex shrink items-center justify-center bg-red-200 flex-col w-full h-1/6 p-2 border-b-2 border-black border-double`}>
                                                <p className=" welcome ">Homework/Info:</p>
                                            </div>
                                            <div className="flex h-[355px]  flex-col w-full p-2 mb-2 border-b-2 border-black border-double aboutInfo">
                                                <p className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-2xl " : ""} ${sideExpand == false && siteExpand == false ? "text-3xl " : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem] " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}   mb-2 `}><strong>Info:</strong></p>
                                                <p className={`${contentHighlightFocus && contentHighlightIndex == "4" ? "border-2 border-red-700 p-1" : ""} transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-xl " : ""} ${sideExpand == false && siteExpand == false ? "text-2xl " : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem]  " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}`}>{memberBudaCrewInfo}</p>
                                            </div>
                                            <div className="flex  h-[390px] flex-col w-full p-2 aboutInfo">
                                                <p className={`transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-2xl " : ""} ${sideExpand == false && siteExpand == false ? "text-3xl " : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem] " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}   mb-2 `}> <strong>Homework:</strong> </p>
                                                <p className={`${contentHighlightFocus && contentHighlightIndex == "5" ? "border-2 border-red-700 p-1" : ""}  transition-all duration-500 ${sideExpand == true && siteExpand == false ? "text-xl " : ""} ${sideExpand == false && siteExpand == false ? "text-2xl " : ""} ${sideExpand == true && siteExpand == true ? "text-[.8rem]  " : ""} ${sideExpand == false && siteExpand == true ? "text-[.8rem]" : ""}`}>{memberHomeworkInfo}</p>
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
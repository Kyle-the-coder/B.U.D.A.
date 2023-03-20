
import { useEffect, useState } from "react";
import { db, storage } from "../config/Firebase";
import { getDoc, doc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import AdminSidebar from "../components/AdminLandingSidebar";
import ImpInfoModal from "../components/ImpInfoModal";


const AdminLandingPage = () => {
    const [data, setData] = useState({});
    const [file, setFile] = useState("");
    const [card1File, setCard1File] = useState('')
    const [card1Index, setCard1Index] = useState('')
    const [card2File, setCard2File] = useState('')
    const [card2Index, setCard2Index] = useState('')
    const [card3File, setCard3File] = useState('')
    const [card3Index, setCard3Index] = useState('')
    const [vid1File, setVid1File] = useState('')
    const [vid1Index, setVid1Index] = useState('')
    const [vid2File, setVid2File] = useState('')
    const [vid2Index, setVid2Index] = useState('')
    const [perc, setPerc] = useState(null);
    const [highlightFocus, setHighlightFocus] = useState(false)
    const [expandIndex, setExpandIndex] = useState('')
    const [mainImgIndex, setMainImgIndex] = useState('')
    const [show, setShow] = useState(false)
    const [siteExpand, setSiteExpand] = useState(false)
    const [sideExpand, setSideExpand]=useState(false)

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

        //MAIN IMG UPLOAD
        const uploadFile = () => {
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
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
                        setData((prev) => ({ ...prev, img: downloadURL }))
                    });
                }
            );

        }
        file && uploadFile()

        //CARD 1 UPLOAD
        const uploadFileCard1 = () => {
            const name = new Date().getTime() + card1File.name
            const storageRef = ref(storage, card1File.name);
            const uploadTask = uploadBytesResumable(storageRef, card1File);
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
                        setData((prev) => ({ ...prev, card1: downloadURL }))
                    });
                }
            );
        }
        card1File && uploadFileCard1()

        //CARD 2 UPLOAD
        const uploadFileCard2 = () => {
            const name = new Date().getTime() + card2File.name
            const storageRef = ref(storage, card2File.name);
            const uploadTask = uploadBytesResumable(storageRef, card2File);
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
                        setData((prev) => ({ ...prev, card2: downloadURL }))
                    });
                }
            );
        }
        card2File && uploadFileCard2()

        //CARD 3 UPLOAD
        const uploadFileCard3 = () => {
            const name = new Date().getTime() + card3File.name
            const storageRef = ref(storage, card3File.name);
            const uploadTask = uploadBytesResumable(storageRef, card3File);
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
                        setData((prev) => ({ ...prev, card3: downloadURL }))
                    });
                }
            );
        }
        card3File && uploadFileCard3()

        //VID 1 UPLOAD
        const uploadFileVid1 = () => {
            const name = new Date().getTime() + vid1File.name
            const storageRef = ref(storage, vid1File.name);
            const uploadTask = uploadBytesResumable(storageRef, vid1File);
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
                        setData((prev) => ({ ...prev, vid1: downloadURL }))
                    });
                }
            );
        }
        vid1File && uploadFileVid1()

        //VID 2 UPLOAD
        const uploadFileVid2 = () => {
            const name = new Date().getTime() + vid2File.name
            const storageRef = ref(storage, vid2File.name);
            const uploadTask = uploadBytesResumable(storageRef, vid2File);
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
                        setData((prev) => ({ ...prev, vid2: downloadURL }))
                    });
                }
            );
        }
        vid2File && uploadFileVid2()

        setMainImgIndex("1")
        setCard1Index("2")
        setCard2Index("3")
        setCard3Index("4")
        setVid1Index("5")
        setVid2Index("6")
    }, [file, card1File, card2File, card3File, vid1File, vid2File])

    return (



        <div className="w-full">
            <div className="flex">
                <section className="">
                    <AdminSidebar
                        expandIndex={expandIndex} setExpandIndex={setExpandIndex}
                        highlightFocus={highlightFocus} setHighlightFocus={setHighlightFocus}
                        data={data} setData={setData}
                        file={file} setFile={setFile}
                        card1File={card1File} setCard1File={setCard1File}
                        card1Index={card1Index}
                        card2File={card2File} setCard2File={setCard2File}
                        card2Index={card2Index}
                        card3File={card3File} setCard3File={setCard3File}
                        card3Index={card3Index}
                        vid1File={vid1File} setVid1File={setVid1File}
                        vid1Index={vid1Index}
                        vid2File={vid2File} setVid2File={setVid2File}
                        vid2Index={vid2Index}
                        perc={perc} setPerc={setPerc}
                        mainImgIndex={mainImgIndex}
                        siteExpand={siteExpand} setSiteExpand={setSiteExpand}
                        sideExpand={sideExpand} setSideExpand={setSideExpand}
                    />
                </section>


                <div className={` ${siteExpand ? "w-8/12":"w-full "} relative flex justify-end items-start transition-all duration-700`}>


                    <div className={` ${siteExpand ? "w-[500px] h-[500px]" : "w-full"} transition-all duration-700`}>

                        <div className="w-full flex flex-col">
                            {/* LP Img Section */}
                            <section className={`items-center ${highlightFocus && expandIndex == mainImgIndex ? "border-4 border-red-700 " : ""} ${siteExpand ? "h-[300px]":"h-screen"}  justify-center flex flex-col relative w-full  bg-gradient-to-r from-indigo-400 to-red-300 flex bg-auto bg-cover `} >
                                <img src={file ? URL.createObjectURL(file) : data.img} alt=" Bianca" className={`rounded  w-full z-[1] h-full absolute  mix-blend-overlay object-cover `} />
                                <h1 className={` ${sideExpand == true && siteExpand == false ? "text-5xl" : ""} ${sideExpand == false && siteExpand == false ? "text-6xl":""} ${sideExpand == true && siteExpand == true ? "text-xl":""} ${sideExpand == false && siteExpand == true ? "text-xl":""}  welcome  font-bold mb-2 relative`}>Bianca's Urban Dance Academy</h1>
                                <a href="/wsp" className={` ${siteExpand ? "text-md px-2 py-1": " lg:text-2xl px-4 py-3"} bg-indigo-800 relative text-white   rounded z-[2] hover:bg-slate-900 hover:text-pink-300 transition-all duration-500`}>Class Schedule</a>
                            </section>

                            {/* Welcome Students Section */}
                            <section className={`${siteExpand ? "h-3":"h-14"} w-full flex  relative my-10  items-center`}>
                                <div className="flex w-full justify-center  mx-auto">
                                    <h2 className={` ${siteExpand ? "text-md": " sm:text-xl md:text-3xl lg:text-4xl text-xl "} welcome font-medium`}>Welcome Returning and Future Students!</h2>
                                </div>
                            </section>



                            {/* Class Img Link Section */}
                            <section className="mb-5">
                                <div className="flex w-full h-content  p-2 justify-evenly">

                                    {/* Important Info Card */}
                                    <div className={` w-fit  h-fit rounded`}>
                                        <img className={`${highlightFocus && expandIndex == card1Index ? "border-4 border-red-700" : ""} ${sideExpand == true && siteExpand == false ? "w-[300px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[325px]":""} ${sideExpand == true && siteExpand == true ? "w-[130px]":""} ${sideExpand == false && siteExpand == true ? "w-[130px]":""}  infoCard rounded hover:drop-shadow-lg  cursor-pointer border-2 border-black h-auto`} src={data.card1} onClick={() => setShow(true)} alt="important info card" />
                                        {show && <ImpInfoModal show={show} setShow={setShow} />}
                                    </div>

                                    {/* Buda Crew Info Card */}
                                    <div className="rounded w-fit h-fit hover:drop-shadow-lg">
                                        <a href="/bcp"><img className={`${highlightFocus && expandIndex == card2Index ? "border-4 border-red-700" : ""}  infoCard rounded hover:drop-shadow-lg  cursor-pointer border-2 border-black ${sideExpand == true && siteExpand == false ? "w-[300px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[325px]":""} ${sideExpand == true && siteExpand == true ? "w-[130px]":""} ${sideExpand == false && siteExpand == true ? "w-[130px]":""}  h-auto`} src={data.card2} alt="buda crew info card" /></a>
                                    </div>

                                    {/* Summer Camp Info Card */}
                                    <div className=" w-fit rounded   h-fit hover:drop-shadow-lg ">
                                        <a href="/sp"><img className={`${highlightFocus && expandIndex == card3Index ? "border-4 border-red-700" : ""}  infoCard rounded hover:drop-shadow-lg  cursor-pointer border-2 border-black ${sideExpand == true && siteExpand == false ? "w-[300px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[325px]":""} ${sideExpand == true && siteExpand == true ? "w-[130px]":""} ${sideExpand == false && siteExpand == true ? "w-[130px]":""}  h-auto`} src={data.card3} alt="summer camp info card" /></a>
                                    </div>
                                </div>
                            </section>


                            {/* Video Content Section */}
                            <section className="flex flex-col md:flex-row  justify-evenly m-0 items-center md:items-start mb-7">

                                <video className={` ${highlightFocus && expandIndex == vid1Index ? "border-4 border-red-700" : "border-2 border-red-200"} ${sideExpand == true && siteExpand == false ? "w-[500px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[650px]":""} ${sideExpand == true && siteExpand == true ? "w-[230px]":""} ${sideExpand == false && siteExpand == true ? "w-[230px]":""}   rounded mb-2 md:m-0   `} loop muted autoPlay controls='' src={data.vid1} ></video>
                                <video className={` ${highlightFocus && expandIndex == vid2Index ? "border-4 border-red-700" : "border-2 border-indigo-200"}  ${sideExpand == true && siteExpand == false ? "w-[500px]" : ""} ${sideExpand == false && siteExpand == false ? "w-[650px]":""} ${sideExpand == true && siteExpand == true ? "w-[230px]":""} ${sideExpand == false && siteExpand == true ? "w-[230px]":""}   rounded mb-2 md:m-0  `} loop muted autoPlay controls='' src={data.vid2} ></video>

                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLandingPage;
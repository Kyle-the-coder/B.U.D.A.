import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, auth, storage } from "../config/Firebase";
import { collection, serverTimestamp, getDoc, deleteDoc, doc, setDoc, onSnapshot } from "firebase/firestore"
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import AdminSidebar from "../components/AdminSidebar";
import ImpInfoModal from "../components/ImpInfoModal";
import card3 from "../assets/images/card3.jpeg"

const AdminLandingPage = () => {
    const [data, setData] = useState({});
    const [file, setFile] = useState("");
    const [card1File, setCard1File]=useState('')
    const [card1Index, setCard1Index]=useState('')
    const [card2File, setCard2File]=useState('')
    const [card2Index, setCard2Index]=useState('')
    const [card3File, setCard3File]=useState('')
    const [card3Index, setCard3Index]=useState('')
    const [perc, setPerc] = useState(null);
    const [highlightFocus, setHighlightFocus] = useState(false)
    const [expandIndex, setExpandIndex] = useState('')
    const [mainImgIndex, setMainImgIndex] = useState('')
    const [show, setShow] = useState(false)

    useEffect(() => {
        const getPhoto = async () => {
            try {
                const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_ID);
                const docSnap = await getDoc(docRef);
                setData(docSnap.data())
            } catch (error) {
                console.log(error)
            }}
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
                    }},
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
                    }},
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
                    }},
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
                    }},
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

        setMainImgIndex("1")
        setCard1Index("2")
        setCard2Index("3")
        setCard3Index("4")
    }, [file, card1File, card2File, card3File])

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
                        perc={perc} setPerc={setPerc}
                        mainImgIndex={mainImgIndex}

                        />
                </section>

                <div className="w-full flex flex-col">
                    {/* LP Img Section */}
                    <section className={`items-center ${highlightFocus && expandIndex == mainImgIndex ? "border-4 border-red-700 " : ""}  justify-center flex flex-col relative w-full h-screen bg-gradient-to-r from-indigo-400 to-red-300 flex bg-auto bg-contain`} >
                        <img src={file ? URL.createObjectURL(file) : data.img} alt=" Bianca" className={`rounded object-cover w-full z-[1] h-full absolute  mix-blend-overlay`} />
                        <h1 className="welcome sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-3xl font-bold mb-2 relative">Bianca's Urban Dance Academy</h1>
                        <a href="/wsp" className="bg-indigo-800 relative   lg:text-2xl text-white px-4 py-3 rounded z-[2] hover:bg-slate-900 hover:text-pink-300 transition-all duration-500">Class Schedule</a>
                    </section>

                    {/* Welcome Students Section */}
                    <section className="w-full flex h-14 relative my-10  items-center">
                        <div className="flex w-full justify-center  mx-auto">
                            <h2 className="welcome  sm:text-xl md:text-3xl lg:text-4xl text-xl font-medium">Welcome Returning and Future Students!</h2>
                        </div>
                    </section>



                {/* Class Img Link Section */}
                <section className="mb-5">
                    <div className="flex w-full h-content  p-2 justify-evenly">

                        {/* Important Info Card */}
                        <div className={` w-fit  h-fit rounded`}>
                            <img className={`${highlightFocus && expandIndex == card1Index ? "border-4 border-red-700" : ""}  infoCard rounded hover:drop-shadow-lg  cursor-pointer border-2 border-black sm:w-48 lg:w-64   w-32 h-auto`} src={data.card1} onClick={() => setShow(true)} alt="important info card" />
                            {show && <ImpInfoModal show={show} setShow={setShow} />}
                        </div>

                        {/* Buda Crew Info Card */}
                        <div className="rounded w-fit h-fit hover:drop-shadow-lg">
                            <a href="/bcp"><img className={`${highlightFocus && expandIndex == card2Index ? "border-4 border-red-700" : ""}  infoCard rounded hover:drop-shadow-lg  cursor-pointer border-2 border-black sm:w-48 lg:w-64   w-32 h-auto`} src={data.card2} alt="buda crew info card" /></a>
                        </div>

                        {/* Summer Camp Info Card */}
                        <div className=" w-fit rounded   h-fit hover:drop-shadow-lg ">
                            <a href="/sp"><img className={`${highlightFocus && expandIndex == card3Index ? "border-4 border-red-700" : ""}  infoCard rounded hover:drop-shadow-lg  cursor-pointer border-2 border-black sm:w-48 lg:w-64   w-32 h-auto`} src={data.card3} alt="summer camp info card" /></a>
                        </div>
                    </div>
                </section> 
                </div>
            </div>
            {/* EDIT LANDING PAGE CARDS 1, 2, AND 3 */}
            {/* <section className=" w-full mb-14 flex justify-center items-center">
                <div className="w-full justify-center mt-12 flex h-fit">
                    <form className="w-[420px] p-3 flex flex-col items-center  bg-slate-200  border-2 border-black" onSubmit={handleLandingPageCard1}>
                        <h1 className="text-2xl mb-8 welcome">Edit Important Info Card:</h1>
                        <FileBase64 multiple={false} onDone={({ base64 }) => setLandingPageCard1(base64)} />
                        <div className="flex justify-center mt-8">
                            <button type="submit" className="w-24 py-1 bg-indigo-200 rounded border-2 border-black">Upload</button>
                            {lpCard1Edited && <img width="50" src={check} />}
                        </div>
                    </form>
                </div> */}
            {/* <div className="w-full justify-center mt-12 flex h-fit">
                    <form className="w-[420px] p-3 flex flex-col items-center  bg-slate-200  border-2 border-black" onSubmit={handleLandingPageCard2}>
                        <h1 className="text-2xl mb-8 welcome">Edit Buda Crew Card:</h1>
                        <FileBase64 multiple={false} onDone={({ base64 }) => setLandingPageCard2(base64)} />
                        <div className="flex justify-center mt-8">
                            <button type="submit" className="w-24 py-1 bg-indigo-200 rounded border-2 border-black">Upload</button>
                            {lpCard2Edited && <img width="50" src={check} />}
                        </div>
                    </form>
                </div> */}
            {/* <div className="w-full justify-center mt-12 flex h-fit">
                    <form className="w-[420px] p-3 flex flex-col items-center  bg-slate-200  border-2 border-black" onSubmit={handleLandingPageCard3}>
                        <h1 className="text-2xl mb-8 welcome">Edit Summer Camp Card:</h1>
                        <FileBase64 multiple={false} onDone={({ base64 }) => setLandingPageCard3(base64)} />
                        <div className="flex justify-center mt-8">
                            <button type="submit" className="w-24 py-1 bg-indigo-200 rounded border-2 border-black">Upload</button>
                            {lpCard3Edited && <img width="50" src={check} />}
                        </div>
                    </form>
                </div>
            </section> */}

            {/* Video Content Section */}
            {/* <section className="flex flex-col md:flex-row  justify-evenly m-0 items-center md:items-start mb-7">

                <video className="rounded mb-2 md:m-0  border-2 border-red-200 md:w-[600px] w-[700px]" loop muted autoPlay controls='' src={landingPageVid1}></video>
                <video className="rounded h-full m-0 border-2 border-indigo-300 md:w-[650px] w-[700px]" loop muted autoPlay controls='' src={landingPageVid2}></video>

            </section> */}
            {/* EDIT LANDING PAGE CARDS 1, 2, AND 3 */}
            {/* <section className=" w-full mb-14 flex justify-center items-center">
                <div className="w-full justify-center mt-12 flex h-fit">
                    <form className="w-[420px] p-3 flex flex-col items-center  bg-slate-200  border-2 border-black" onSubmit={handleLandingPageVid1}>
                        <h1 className="text-2xl mb-8 welcome">Edit Video 1:</h1>
                        <FileBase64 multiple={false} onDone={({ base64 }) => setLandingPageVid1(base64)} />
                        <div className="flex justify-center mt-8">
                            <button type="submit" className="w-24 py-1 bg-indigo-200 rounded border-2 border-black">Upload</button>
                            {lpVid1Edited && <img width="50" src={check} />}
                        </div>
                    </form>
                </div>
                <div className="w-full justify-center mt-12 flex h-fit">
                    <form className="w-[420px] p-3 flex flex-col items-center  bg-slate-200  border-2 border-black" onSubmit={handleLandingPageVid2}>
                        <h1 className="text-2xl mb-8 welcome">Edit Video 2:</h1>
                        <FileBase64 multiple={false} onDone={({ base64 }) => setLandingPageVid2(base64)} />
                        <div className="flex justify-center mt-8">
                            <button type="submit" className="w-24 py-1 bg-indigo-200 rounded border-2 border-black">Upload</button>
                            {lpVid2Edited && <img width="50" src={check} />}
                        </div>
                    </form>
                </div>
            </section> */}

        </div>
    )
}

export default AdminLandingPage;
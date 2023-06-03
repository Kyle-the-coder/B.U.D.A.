import "../styles/modal.css"
import { useEffect, useState } from "react"
import { db, } from "../config/Firebase";
import { getDoc, doc, } from "firebase/firestore"
import { useNavigate } from "react-router-dom"


function ImpInfoModal(props) {
    const { show, setShow } = props

    const [data, setData] = useState({});
    const navigate = useNavigate();


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
    }, [])

    return (
        <>
            <div className='modalBg bg-local  top-0 flex items-center z-[99] left-0 bottom-full bg-slate-200 w-screen absolute border-y-2 border-black'>
                <div className='w-5/6 flex-col shadow-lg h-80 overflow-scroll bg-white mx-auto p-2 rounded border-2 border-black mb-96'>
                    <div className='flex flex-col w-full mb-2 items-center'>

                        <h1 className='text-2xl mb-2 items-center'><strong>Important Info</strong></h1>
                        <h6 className="text-sm">*Please Read Thoroughly*</h6>
                    </div>
                    <div className='content'>
                        <p className='mb-2'><strong>Important Dates:</strong></p>
                        <p className='mb-1'><strong>Start:</strong> {data.startDate}</p>
                        <p className='mb-1'><strong> Show date: </strong>{data.showDate}</p>
                        <p className='mb-1'>
                            <strong>Show Location:</strong> {data.showLocation}
                        </p>
                        <p className='mb-1'><strong>MANDATORY TECH: </strong> {data.showTech}</p>
                        <p className='mb-1'><strong> {data.showTitle}:</strong> {data.showTime}</p>
                        <p className="text-lg">
                            <strong>{data.noClass1} </strong>
                        </p>
                        <p className="text-lg">
                            <strong>{data.noClass2} </strong>
                        </p>
                        <p className="text-lg">
                            <strong>{data.noClass3}</strong>
                        </p>
                        <p className="text-lg">
                            <strong>{data.noClass4}</strong>
                        </p>
                        <p className="text-lg">
                            <strong>{data.noClass5}</strong>
                        </p>
                        <p className="text-lg">
                            <strong>{data.noClass6}</strong>
                        </p>
                        <p className=" mb-5 text-lg">
                            <strong>{data.noClass7}</strong>
                        </p>
                    </div>


                    <div className='flex flex-col w-full mb-2 items-center'>
                        <h1 className='text-2xl my-2 items-center'><strong>Tuition:</strong></h1>
                    </div>
                    <div className='content flex flex-col items-center'>
                        <p className='mb-2'><strong>Tuition includes all classes plus costume, photos and recital.</strong></p>

                        <p className='mb-1'><strong> All tuition is due first week of classes or else subject to $25 late fee.  </strong></p>

                    </div>


                    <div className='flex flex-col w-full mb-2 items-center'>
                        <h1 className='text-2xl my-2 items-center'><strong>BUDA Crew Competition Info:</strong></h1>
                    </div>
                    <div className='content'>
                        <p className='mb-1 indent-5'><strong>BUDA Competition Crew Important Dates: </strong> TBA </p>


                    </div>

                    <div className='flex flex-col w-full mb-2 items-center'>
                        <h1 className='text-2xl my-2 items-center '><strong>Contact:</strong></h1>
                    </div>
                    <div className='content flex'>
                        <p className='mb-2 flex mx-auto'>Please contact BUDA at budamarindance@gmail.com if you have any questions. </p>
                    </div>


                    <div className='flex flex-col w-full mb-2 items-center'>
                        <h1 className='text-2xl mb-2 items-center'><strong>Location</strong></h1>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='mb-2 '><strong>Studio located at 167 Tunstead Ave, San Anselmo, CA </strong></p>
                        <p>Thank you for choosing to dance at BUDA! Can't wait to dance with you!</p>
                    </div>


                    <div className='w-full flex justify-center mt-3'>
                        <button className='bg-indigo-600 px-4  text-white rounded  hover:bg-slate-900 hover:text-pink-300 transition-all duration-500' onClick={() => setShow(false)}>close</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImpInfoModal;
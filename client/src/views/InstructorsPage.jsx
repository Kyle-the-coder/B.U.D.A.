import bPhoto from "../assets/images/budaLogo.png"
import { useEffect, useState } from "react"
import { db, } from "../config/Firebase";
import { getDoc, doc, } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const InstructorsPage = () => {
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

    const backOne = () => {
        navigate(-1)
    }

    return (
        <div className="mb-8">


            <div className="w-full flex justify-center py-5 items-center">
                <h1 className="welcome text-4xl">B.U.D.A. Instructors</h1>
            </div>

            <section className="w-full flex items-center justify-end mb-5">
                <p className=" w-12 text-sm underline text-sky-500 cursor-pointer" onClick={() => backOne()} >
                    Back
                </p>
            </section>

            <div className="w-full flex h-content  py-3 px-1 justify-center justify-evenly bg-slate-100 mb-10">
                <div>
                    <img className="rounded object-cover object-top w-[300px] h-[300px] infoCard2 " src={data.aboutMeImg} />
                </div>

                <div className="w-1/2 flex flex-col ">
                    <h1 className="mx-auto welcome my-2 text-xl">Bianca Zogbi</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        In hac habitasse platea dictumst quisque sagittis. Tellus rutrum tellus pellentesque eu tincidunt tortor.
                        Nunc sed blandit libero volutpat sed cras ornare arcu.
                    </p>
                </div>
            </div>


            <div className="w-full flex h-content py-3 px-1 items-center justify-center justify-evenly bg-slate-200 mb-10">

                <div className="w-1/2 flex flex-col">
                    <h1 className="mx-auto welcome my-2 text-xl">Ben Donner</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        In hac habitasse platea dictumst quisque sagittis. Tellus rutrum tellus pellentesque eu tincidunt tortor.
                        Nunc sed blandit libero volutpat sed cras ornare arcu.
                    </p>
                </div>
                <div>
                    <img src={bPhoto} />
                </div>
            </div>
            <div className="w-full flex py-3 px-1 h-content items-center justify-center justify-evenly bg-slate-100">
                <div>
                    <img src={bPhoto} />
                </div>

                <div className="w-1/2 flex flex-col ">
                    <h1 className="mx-auto welcome my-2 text-xl">Jazzy</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        In hac habitasse platea dictumst quisque sagittis. Tellus rutrum tellus pellentesque eu tincidunt tortor.
                        Nunc sed blandit libero volutpat sed cras ornare arcu.
                    </p>
                </div>
            </div>


        </div>
    )
}

export default InstructorsPage;
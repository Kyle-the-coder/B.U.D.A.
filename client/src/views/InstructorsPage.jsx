import bPhoto from "../assets/images/budaLogo.png"
import { useEffect, useState } from "react"
import { db, } from "../config/Firebase";
import { getDoc, doc, } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import ben1 from "../assets/images/ben1.jpg"
import ben2 from "../assets/images/ben2.jpg"

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


            <div className="w-full flex justify-center pt-8 pb-5 items-center">
                <h1 className="welcome text-4xl">B.U.D.A. Instructors</h1>
            </div>

            <section className="w-full flex items-center justify-end mb-5">
                <p className=" w-12 text-sm underline text-sky-500 cursor-pointer" onClick={() => backOne()} >
                    Back
                </p>
            </section>

            <div className="w-full flex h-content  py-3 px-1 justify-center justify-evenly bg-slate-100 mb-10">
                <div>
                    <img className="rounded object-cover object-top w-[500px] h-[550px] infoCard2 " src={data.aboutMeImg} />
                </div>

                <div className="w-1/2 flex flex-col ">
                    <h1 className="mx-auto welcome my-2 text-xl">Bianca Zogbi</h1>
                    <p>
                        {data.aboutMeContent}
                    </p>
                </div>
            </div>


            <div className="w-full flex flex-col md:flex-row h-content py-3 px-1 items-center justify-center justify-evenly bg-slate-200 mb-10">

                <div className="w-1/2 flex flex-col">
                    <h1 className="mx-auto welcome my-2 text-3xl">Ben Donner</h1>
                </div>
                <div>
                    <p className="indent-6 text-lg">
                    Ben Donner is a Santa Rosa native who has been focusing on street style dancing for 8 years. 
                    His main focus revolve around Popping, Waving, Tutting, and Animation as well as learning basics from Locking, Tutting, and Krump. 
                    At 18, Ben became a choreographer and assistant director of a local dance team “Auxiliary Dance Team”, eventually landing gigs as a Hip Hop instructor around Sonoma County and Marin. 
                    Ben is a member of “1up Crew” from Oakland, CA and the worldwide international popping crew, “Funny Bones Crew”. 
                    He also is actively participating in freestyle and street style based competitions around the US, winning recent battles such as “TikTakTix: 20th Anniversary Popping Tournament” and “Monsters: Freestyle Battle” this year. 
                    Ben has been eager to learn many different methods of these styles in order to bring insight knowledge on how these styles have impacted Hip Hop and the world. Within his dedication to foundation, as well as innovation, 
                    Ben prides himself in sharing dance with others and support those in the journey to pursue the arts and foundations that make Hip Hop what it is.
                    </p>
                </div>
                <div >
                    <img src={ben1} className="object-cover object-top w-[420px] h-[320px] infoCard mb-3" />
                    <img src={ben2} className="w-[420px] h-[360px] object-cover object-top infoCard2" />
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
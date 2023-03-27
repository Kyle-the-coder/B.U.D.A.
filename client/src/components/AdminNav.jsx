import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import navImg from "../assets/images/budaLogo.png"
import menuButton from '../assets/images/menu.png'
import closeButton from '../assets/images/close.png'
import { useState, useContext } from 'react'
import { auth } from '../config/Firebase'
import {  signOut } from 'firebase/auth'




const AdminNavbar = () => {
    const [open, setOpen] = useState(false)
    const [openMore, setOpenMore] = useState(false)
    const [highlightUrl, setHighlightUrl] = useState("")
    const [highlightClick, setHighLightClick]=useState(false)
    const navigate = useNavigate()
    const {dispatch} = useContext(AuthContext)

    
    const logout = async () => {
        try {
            await signOut(auth)
            dispatch({type: 'LOGOUT'})
            navigate('/admin')
        } catch (error) {
            console.log(error)
        }
    }


    let navLinks = [
        { name: "Edit Homepage", link: "/adminlandingpage" },
        { name: "Edit About", link: "/adminaboutpage" },
        { name: "Edit Summer", link: "/adminsummerpage" },
        { name: "Edit Session", link: "/adminsessionpage" },
        { name: "Edit B.C.", link: "/budacreweditadminpage" }
    ]

    let moreLinks = [
        { name: "Edit Gallery", link: "/admingallerypage" },
        { name: "Edit Rates", link: "/adminratespage" },
        { name: "Edit B.C. Member", link: "/budacrewmemberadminpage" },
        { name: "Edit Login Info", link: "/editlogin" },
        { name: "Edit B.C. Password", link: "/editbclogin" },
        { name: "Logout"}
    ]
    const handleHighlightUrl = (url) =>{
        setHighlightUrl(url)
        if(url == "/budacrewmemberadminpage" || url == "/editlogin" || url == "/editbclogin" || url == "/adminrates" || url=="/admingallery"){
            setHighLightClick(true)
        } else {
            setHighLightClick(false)
        }
        
    }

    return (
        <section className=' flex flex-col w-full md:p-1  bg-slate-900 border-b-2 border-slate-100 '>
            <div className='mb-8 flex sm:flex-col items-center w-full h-full ml-2 mb-1 z-[5] '>

                <img className='w-20 h-15 rounded mr-3' src={navImg} />
                <h1 className='welcome text-sm sm:text-2xl  mt-5 text-white'>Welcome to your <span className='text-indigo-500'>Admin</span> Dashboard!</h1>
            </div>
            <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden z-[11]'>
                <img className='w-5 z-[20]' onClick={()=>setOpenMore(false)} src={open ? closeButton  : menuButton}></img>
            </div>
            <div>
                <ul className={`md:flex mb-2 md:items-center md:pb-0 h-[370px] sm:h-[50px]  justify-evenly absolute md:static md:z-auto z-[3] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20' : 'top-[-480px]'}`}>
                    {navLinks.map((link, i) => (
                        <li key={i} onClick={()=> handleHighlightUrl(link.link)} className=" text-x1  md:my-0 my-5 relative md:text-lg xl:text-2xl">
                            <Link to={link.link} className={`welcome  ${highlightUrl == link.link ? "bg-slate-100 text-slate-900": "" } relative mb-2 rounded-lg p-1 text-indigo-400 hover:bg-slate-100 hover:text-slate-900 transition-all duration-700`} onClick={() => {setOpen(!open); setOpenMore(false)}}>{link.name}</Link>
                        </li>
                    ))}
                    <li >
                        <a onClick={() => { setOpenMore(!openMore) }} className={`welcome ${highlightClick ? "bg-slate-100 text-slate-900": ""  } cursor-pointer md:text-lg xl:text-2xl  relative scroll-smooth mb-2 font-medium rounded p-1 text-indigo-400 hover:bg-slate-100 hover:text-slate-900 transition-all duration-700`}>More</a>
                    </li>
                </ul>
                <div className="w-full flex justify-end transition-all duration-700 relative">
                    <ul className={`w-44 ${openMore ? "bg-slate-900 " : " " } flex flex-col items-center p-2 absolute transition-all duration-300 top-3 z-[999]`}>
                        {openMore && moreLinks.map((link, i) => (
                            <li key={i} onClick={()=> handleHighlightUrl(link.link)} className='relative mb  w-48 ml-2  p-3 top-0 transition-all duration-700 z-[999]'>
                                {link.name === "Logout" ? <Link className={`welcome text-indigo-400 ${highlightUrl == link.link ? "bg-slate-100 text-slate-900": "" } relative mb-2 rounded p-1 text-black hover:bg-slate-100 hover:text-slate-900 transition-all duration-700`} onClick={()=>{ setOpen(!open);setOpenMore(!openMore); setHighLightClick(true); logout()}}  to={link.link}>{link.name}</Link> : <Link className={`welcome  ${highlightUrl == link.link ? "bg-slate-900 text-pink-300": "" } relative mb-2 rounded p-1 text-indigo-400 hover:bg-slate-100 hover:text-slate-900 transition-all duration-700`} onClick={()=>{ setOpen(!open);setOpenMore(!openMore); setHighLightClick(true)}}  to={link.link}>{link.name}</Link>}
                                
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </section>


    )
}

export default AdminNavbar;
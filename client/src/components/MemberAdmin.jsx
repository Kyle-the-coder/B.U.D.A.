import { useContext, useEffect, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/Firebase"
import { useNavigate } from "react-router-dom"
import { MemberContext } from "../context/MemberContext"

const MemberAdmin = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const { dispatch } = useContext(MemberContext)

    useEffect(()=>{
        setEmail("budamember@gmail.com")
    },[])


    const handleLogin = (e) => {
        
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const member = userCredential;
                dispatch({ type: "LOGIN", payload: member })
                navigate("/memberpage")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                setError(true)
            });
    }
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="w-[400px] h-[400px] justify-start  flex flex-col items-center bg-green-800 border-2 rounded border-green-200">
                <h1 className="m-5 text-2xl text-white">Welcome Buda Member!</h1>
                <form onSubmit={handleLogin} className="flex flex-col w-5/6 m-5 items-center">
                    <input className="p-1 mb-5 w-5/6"  type="password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="bg-green-200 px-10 rounded border-2 border-green-700 py-2"  type="submit">Login</button>
                    {error && <span className="text-red-400 m-5">wrong email or password</span>}

                </form>
            </div>
        </div>
    )
}

export default MemberAdmin;
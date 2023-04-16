import { useContext, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/Firebase"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Admin = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user })
                navigate("/adminlandingpage")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                setError(true)
            });
    }

    return (
        <div className="w-full my-[100px] flex flex-col items-center justify-center">
            <div className="w-[350px] p-4 h-content justify-start  flex flex-col items-center bg-slate-800 rounded">
                <h1 className="text-2xl text-white">Admin</h1>
                <form onSubmit={handleLogin} className="flex flex-col w-5/6 m-5 items-center">
                    <input className="p-1 mb-5 w-full"  type="text" placeholder="email..." onChange={(e) => setEmail(e.target.value)} />
                    <input className="p-1 mb-5 w-full"  type="password" placeholder="password..." onChange={(e) => setPassword(e.target.value)} />
                    <button className="bg-indigo-200 px-10 rounded border-2 border-indigo-700 py-2"  type="submit">Login</button>
                    {error && <span className="text-red-400 mt-4">wrong email or password</span>}

                </form>
            </div>
        </div>
    )
}

export default Admin;
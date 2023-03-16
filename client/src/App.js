import { Route, Routes, Navigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react";
import BudaNavbar from "./components/BudaNav";
import LandingPage from "./views/LandingPage";
import Admin from "./components/Admin"
import { userInputs } from "./dataTable";
import CreateUser from "./components/CreateUser";
import { AuthContext } from "./context/AuthContext"
import AdminNavbar from "./components/AdminNav";
import AdminLandingPage from "./pages/AdminLandingPage";
import AdminSidebar from "./components/AdminSidebar";



function App() {
  const [navTracker, setNavTracker] = useState(false)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {

    if (currentUser != null) {
      setNavTracker(true)
    } else if (currentUser === null) {
      setNavTracker(false)
    }


  }, [currentUser])

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/" />
  }


  return (
    <div className="App">

        {navTracker ? <AdminNavbar /> : <BudaNavbar />}
        

        

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<CreateUser userInputs={userInputs} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/adminlandingpage" element={<RequireAuth><AdminLandingPage /></RequireAuth>} />
          </Routes>
    


    </div>
  );
}

export default App;

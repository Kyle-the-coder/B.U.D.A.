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
import AdminSidebar from "./components/AdminLandingSidebar";
import AdminAboutPage from "./pages/AdminAboutPage";
import AboutPage from "./views/AboutPage";
import AdminSummerPage from "./pages/AdminSummerPage";
import SummerPage from "./views/SummerPage";
import AdminSessionPage from "./pages/AdminSessionPage";
import SessionPage from "./views/SessionPage";
import GalleryPage from "./views/GalleryPage";
import AdminGalleryPage from "./pages/AdminGalleryPage";
import AdminRatesPage from "./pages/AdminRatesPage";
import RatesPage from "./views/RatesPage";




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
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/create" element={<CreateUser userInputs={userInputs} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/summer" element={<SummerPage/>}/>
            <Route path="/session" element={<SessionPage/>}/>
            <Route path="/gallery" element={<GalleryPage/>}/>
            <Route path="/rates" element={<RatesPage/>}/>

            {/* Auth Routes */}
            <Route path="/adminlandingpage" element={<RequireAuth><AdminLandingPage /></RequireAuth>} />
            <Route path="/adminaboutpage" element={<RequireAuth><AdminAboutPage/></RequireAuth>}/>
            <Route path="/adminsummerpage" element={<RequireAuth><AdminSummerPage/></RequireAuth>}/>
            <Route path="/adminsessionpage" element={<RequireAuth><AdminSessionPage/></RequireAuth>}/>
            <Route path="/admingallerypage" element={<RequireAuth><AdminGalleryPage/></RequireAuth>}/>
            <Route path="/adminratespage" element={<RequireAuth><AdminRatesPage/></RequireAuth>}/>

          </Routes>
    


    </div>
  );
}

export default App;

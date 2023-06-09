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
import AdminBudaCrewPage from "./pages/AdminBudaCrewPage";
import BudaCrewPage from "./views/BudaCrewPage";
import AdminMemberPage from "./pages/AdminMemberPage";
import MemberPage from "./views/MemberPage";
import ContactBar from "./components/BudaContactBar";
import MemberAdmin from "./components/MemberAdmin";
import InstructorsPage from "./views/InstructorsPage";
import { MemberContext } from "./context/MemberContext";



function App() {
  const [navTracker, setNavTracker] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const { memberUser } = useContext(MemberContext)

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

  const RequireMember = ({ children }) => {
    return memberUser ? (children) : <Navigate to="/budamember" />
  }


  return (
    <div className="App">

      {navTracker ? <AdminNavbar /> : <BudaNavbar />}




      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<CreateUser userInputs={userInputs} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/summer" element={<SummerPage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/rates" element={<RatesPage />} />
        <Route path="/bcpage" element={<BudaCrewPage />} />
        <Route path="/budamember" element={<MemberAdmin />} />
        <Route path="/instructors" element={<InstructorsPage/>}/>

        {/* Auth Routes */}
        <Route path="/adminlandingpage" element={<RequireAuth><AdminLandingPage /></RequireAuth>} />
        <Route path="/adminaboutpage" element={<RequireAuth><AdminAboutPage /></RequireAuth>} />
        <Route path="/adminsummerpage" element={<RequireAuth><AdminSummerPage /></RequireAuth>} />
        <Route path="/adminsessionpage" element={<RequireAuth><AdminSessionPage /></RequireAuth>} />
        <Route path="/admingallerypage" element={<RequireAuth><AdminGalleryPage /></RequireAuth>} />
        <Route path="/adminratespage" element={<RequireAuth><AdminRatesPage /></RequireAuth>} />
        <Route path="/adminbcpage" element={<RequireAuth><AdminBudaCrewPage /></RequireAuth>} />
        <Route path="/adminmemberpage" element={<RequireAuth><AdminMemberPage /></RequireAuth>} />
        <Route path="/memberpage" element={<RequireMember><MemberPage /></RequireMember>} />

      </Routes>
      {navTracker ? <></> : <ContactBar />}




    </div>
  );
}

export default App;

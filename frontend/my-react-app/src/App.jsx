import LandingPage from './LandingPage/LandingPage.jsx';
import Header_SPSS from './SPSS/Header_SPSS.jsx';
import Intailieu from './SPSS/Intailieu/Intailieu.jsx';
import Lichsuin from './SPSS/Lichsuin/Lichsuin.jsx';
import Trangchu from './SPSS/Trangchu/trangchu.jsx';
import SPSO from './SPSO/SPSO.jsx';
import Login from './Login/Login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PrintHis from './UI-SPSO/PrintingHistory/PrintHis';
// import HomePage from './UI-SPSO/HomePage/HomePage';
// import Manage from './UI-SPSO/Manage/Manage.jsx';
// import Report from './UI-SPSO/Report-SPSO/Report.jsx';
function App() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/SPSS" element={<Header_SPSS />}>
                        <Route path="intailieu" element={<Intailieu />} />
                        <Route path="lichsuin" element={<Lichsuin />} />
                        <Route path="thongtin" element={<Lichsuin/> } />
                        <Route path="trangchu" element={<Trangchu />} />
                     </Route>
                    <Route path="/SPSO" element={<SPSO />} />
                    
                </Routes>
            </Router>
        );
    }
export default App

import LandingPage from './LandingPage/LandingPage.jsx';
import Header_SPSS from './SPSS/Header_SPSS.jsx';
import Intailieu from './SPSS/Intailieu/Intailieu.jsx';
import Lichsuin from './SPSS/Lichsuin/Lichsuin.jsx';
import Trangchu from './SPSS/Trangchu/trangchu.jsx';
import Login from './Login/Login.jsx';
import Muatrangin from './SPSS/Muatrang/Muatrang.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Info from './SPSS/Info/Info.jsx';
import Header from './UI-SPSO/SPSO.jsx';
import SPSO from './UI-SPSO/HomePage/HomePage.jsx';
import PrintHis from './UI-SPSO/PrintingHistory/PrintHis';
import HomePage from './UI-SPSO/HomePage/HomePage';
import Manage from './UI-SPSO/Manage/Manage.jsx';
import Report from './UI-SPSO/Report-SPSO/Report.jsx';
function App() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/SPSS" element={<Header_SPSS />}>
                        <Route path="intailieu" element={<Intailieu />} />
                        <Route path="lichsuin" element={<Lichsuin />} />
                        <Route path="muatrangin" element={<Muatrangin/> } />
                        <Route path="trangchu" element={<Trangchu />} />
                        <Route path="info" element={<Info />} />
                     </Route>
                     <Route path="/SPSO" element={<Header />}>
                        <Route path="trangchu" element={<SPSO />} />
                        <Route path="quanly" element={<Manage />} />
                        <Route path="lichsuin" element={<PrintHis/> } />
                        <Route path="baocao" element={<Report />} />
                     </Route>
                 
                    
                </Routes>
            </Router>
        );
    }
export default App;

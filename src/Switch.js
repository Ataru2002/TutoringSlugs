import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import SignInSide from './pages/SignInSide';
import SignUpSide from './pages/SignUpSide';
import TutorSignUp from './pages/tutor_forms/TutorSignUp';
import ChangeSetting from './pages/ChangeSetting';
import Search from './pages/Search';

export const Switch = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/signin" />} />
                <Route path="/signin" element={<SignInSide />} />
                <Route path="/signup" element={<SignUpSide />} />
                <Route path="/tutor_signup" element={<TutorSignUp />} />
                <Route path="/change_setting" element={<ChangeSetting />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </Router>
    )
}
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import SignInSide from './pages/SignInSide';
import SignUpSide from './pages/SignUpSide';
import TutorSignUp from './pages/tutor_forms_signup/TutorSignUp';
import ChangeSetting from './pages/ChangeSetting';
import Search from './pages/Search';
import ChangeTutorForm from './pages/tutor_forms_change/ChangeTutorForms';
import Results from "./pages/Results";
import ForgetPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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
          <Route path="/results" element={<Results />} />
          <Route path="/change_tutor_setting" element={<ChangeTutorForm />} />
          <Route path="/forget_password" element={<ForgetPassword />} />
          <Route path="/reset_password" element={<ResetPassword />} />
        </Routes>
      </Router>
    );
}
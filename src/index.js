import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignInSide from './pages/SignInSide';
import SignUpSide from './pages/SignUpSide';
import Tutorforms from './pages/tutor_forms/Tutorforms';
import Stepper from './pages/tutor_forms/Stepper';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <SignUpSide />
    <SignInSide /> */}
    {/* <Tutorforms /> */}
    <Stepper />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

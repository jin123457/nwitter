import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <>
            <BrowserRouter>
                {isLoggedIn && <Navigation userObj={userObj}/>}
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/" element={<Home userObj={userObj} />} />
                            <Route path="/profile" element={<Profile userObj={userObj} />} />
                        </>
                    ) : (
                        <Route path="/" element={<Auth />} />
                    )}
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRouter;

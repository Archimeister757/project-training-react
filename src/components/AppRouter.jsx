import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';
import {privateRoutes, publicRoutes} from '../router/index';

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);
    return (
        isAuth
        ?
        <Routes>
            {privateRoutes.map((route, index) =>
               <Route key={index} path={route.path} element={<route.element />}/>
            )}
            <Route path="/login" element={<Navigate to="/posts" replace />} />
        </Routes>
        :
        <Routes>
            {publicRoutes.map((route, index) =>
               <Route key={index} path={route.path} element={<route.element />}/>
            )}
            <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};
export default AppRouter;
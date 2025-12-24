/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/user/MainPage/MainPage';
import Layout from '../components/Layout/Layout';
import AuthRouter from './AuthRouter';

function MainRouter() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <MainPage />
                        </Layout>
                    }
                />
                <Route path="/auth/*" element={<AuthRouter />} />
            </Routes>
        </>
    );
}

export default MainRouter;

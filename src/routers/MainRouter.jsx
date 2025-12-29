/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/user/MainPage/MainPage';
import Layout from '../components/Layout/Layout';
import AuthRouter from './AuthRouter';
import BoardRouter from './BoardRouter';
import { useQuery } from '@tanstack/react-query';
import { getPrincipal } from '../apis/auth/authApis';
import { useEffect } from 'react';
import { usePrincipalState } from '../store/usePrincipalState';

function MainRouter() {
    const AccessToken = localStorage.getItem('AccessToken');
    const [showSideBar, setShowSideBar] = useState(false);
    const { isLoggedIn, principal, login, logout } = usePrincipalState();
    const { data, isLoading } = useQuery({
        queryKey: ['getPrincipal'],
        queryFn: getPrincipal,
        refetch: 1,
        enabled: !!AccessToken,
    });

    useEffect(() => {
        if (data?.data.status === 'success') {
            login(data?.data.data);
        }
    }, [data, login]);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout
                            showSideBar={showSideBar}
                            setShowSideBar={setShowSideBar}>
                            <MainPage
                                showSideBar={showSideBar}
                                setShowSideBar={setShowSideBar}
                            />
                        </Layout>
                    }
                />
                <Route
                    path="/board/*"
                    element={
                        <Layout
                            showSideBar={showSideBar}
                            setShowSideBar={setShowSideBar}>
                            <BoardRouter />
                        </Layout>
                    }
                />
                <Route path="/auth/*" element={<AuthRouter />} />
            </Routes>
        </>
    );
}

export default MainRouter;

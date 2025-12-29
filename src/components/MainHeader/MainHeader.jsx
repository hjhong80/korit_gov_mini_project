/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { IoMenu } from 'react-icons/io5';

// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { usePrincipalState } from '../../store/usePrincipalState';

function MainHeader({ showSideBar, setShowSideBar }) {
    const navigate = useNavigate();
    const { isLoggedIn, principal, login, logout } = usePrincipalState();

    console.log(principal);

    return (
        <div css={s.container}>
            <div css={s.leftBox}>
                <button onClick={() => setShowSideBar((prev) => !prev)}>
                    <IoMenu />
                </button>
                <div onClick={() => navigate('/')}>Techboard</div>
            </div>
            <div css={s.rightBox}>
                {isLoggedIn ? (
                    <p>{principal.username}</p>
                ) : (
                    <>
                        <button onClick={() => navigate('/auth/signin')}>
                            로그인
                        </button>
                        <button onClick={() => navigate('/auth/signup')}>
                            회원가입
                        </button>
                    </>
                )}
            </div>
            <div css={s.sideBarContainer(showSideBar)}>
                <SideBar setShowSideBar={setShowSideBar} />
            </div>
        </div>
    );
}

export default MainHeader;

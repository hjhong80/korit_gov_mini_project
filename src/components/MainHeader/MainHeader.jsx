/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { IoMenu } from 'react-icons/io5';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';

function MainHeader() {
    const [showSideBar, setShowSideBar] = useState(false);
    const navigate = useNavigate();

    return (
        <div css={s.container}>
            <div css={s.leftBox}>
                <button onClick={() => setShowSideBar((prev) => !prev)}>
                    <IoMenu />
                </button>
                <div>Techboard</div>
            </div>
            <div css={s.rightBox}>
                <button onClick={() => navigate('/auth/signin')}>로그인</button>
                <button onClick={() => navigate('/auth/signup')}>
                    회원가입
                </button>
            </div>
            <div css={s.sideBarContainer(showSideBar)}>
                <SideBar />
            </div>
        </div>
    );
}

export default MainHeader;

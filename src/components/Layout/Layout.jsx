/** @jsxImportSource @emotion/react */
import * as s from './styles';

import React from 'react';
import MainHeader from '../MainHeader/MainHeader';

function Layout({ children, showSideBar, setShowSideBar }) {
    return (
        <div css={s.container}>
            <MainHeader
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
            />
            {children}
        </div>
    );
}

export default Layout;

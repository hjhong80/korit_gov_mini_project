/** @jsxImportSource @emotion/react */
import { IoClose, IoList } from 'react-icons/io5';
import * as s from './styles';

import React from 'react';
import { LuPen } from 'react-icons/lu';

function SideBar({ setShowSideBar }) {
    return (
        <div css={s.container}>
            <div css={s.topBox}>
                <div>메뉴</div>
                <button onClick={() => setShowSideBar((prev) => !prev)}>
                    <IoClose />
                </button>
            </div>
            <div css={s.bottomBox}>
                <ul>
                    <li>
                        <IoList />
                        게시물 보기
                    </li>
                    <li>
                        <LuPen />
                        글쓰기
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;

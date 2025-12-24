/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as s from './styles';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoLink } from 'react-icons/io5';
import { LuUserPlus } from 'react-icons/lu';

function OAuth2Page() {
    const navigate = useNavigate();
    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div css={s.topBox}>
                    <div>
                        <div>
                            <FcGoogle />
                        </div>
                    </div>
                    <h4>구글 계정 연동</h4>
                    <p>구글 계정으로 로그인 하시겠습니까?</p>
                </div>
                <div css={s.bottomBox}>
                    <button>
                        <IoLink />
                        <div>기존 계정과 연동</div>
                        <div>이미 가입한 계정과 구글을 연결 합니다.</div>
                    </button>
                    <button>
                        <LuUserPlus />
                        <div>새 계정으로 가입</div>
                        <div>구글 계정으로 새로 가입합니다.</div>
                    </button>
                    <button onClick={() => navigate('/auth/signin')}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OAuth2Page;

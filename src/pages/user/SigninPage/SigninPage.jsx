/** @jsxImportSource @emotion/react */
import { IoArrowBack } from 'react-icons/io5';
import * as s from './styles';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { signinRequest } from '../../../apis/auth/authApis';

function SigninPage() {
    const navigate = useNavigate();

    const [signinInputValue, setSigninInputValue] = useState({
        email: '',
        password: '',
    });

    const inputOnChangeHandler = (e) => {
        const { name, value } = e.target;

        setSigninInputValue((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            signinOnClickHandler();
        }
    };

    const signinOnClickHandler = () => {
        if (
            signinInputValue.email.trim().length === 0 ||
            signinInputValue.password.trim().length === 0
        ) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        signinRequest({
            email: signinInputValue.email,
            password: signinInputValue.password,
        }).then((response) => {
            if (response.data.status === 'success') {
                localStorage.setItem('AccessToken', response.data.data);
                window.location.href = '/';
            } else if (response.data.status === 'failed') {
                alert(response.data.message);
                return;
            }
        });
    };

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div>
                    <button onClick={() => navigate('/')}>
                        <IoArrowBack />
                        뒤로가기
                    </button>
                </div>
                <div css={s.signinBox}>
                    <div css={s.topBox}>
                        <h4>로그인</h4>
                        <p>Techboard에 오신것을 환영합니다.</p>
                    </div>
                    <div css={s.bottomBox}>
                        <div css={s.inputBox}>
                            <div>
                                <label htmlFor="email">이메일</label>
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    onChange={inputOnChangeHandler}
                                    value={signinInputValue.email}
                                    onKeyDown={onKeyDownHandler}
                                    placeholder="이메일을 입력해주세요."
                                />
                            </div>
                            <div>
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    name="password"
                                    id="password"
                                    type="password"
                                    onChange={inputOnChangeHandler}
                                    value={signinInputValue.password}
                                    onKeyDown={onKeyDownHandler}
                                    placeholder="비밀번호를 입력해주세요."
                                />
                            </div>
                            <button onClick={signinOnClickHandler}>
                                로그인
                            </button>
                        </div>
                        <div css={s.lineBox}>
                            <span>또는</span>
                        </div>
                        <div css={s.buttonBox}>
                            <button
                                onClick={() =>
                                    (window.location.href =
                                        'http://localhost:8080/oauth2/authorization/google')
                                }>
                                <FcGoogle />
                                구글로 로그인
                            </button>
                            <button
                                onClick={() =>
                                    (window.location.href =
                                        'http://localhost:8080/oauth2/authorization/naver')
                                }>
                                <SiNaver />
                                네이버로 로그인
                            </button>
                        </div>
                        <div css={s.signupBox}>
                            계정이 없으신가요?
                            <span>
                                <Link to={'/auth/signup'}>회원가입</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SigninPage;

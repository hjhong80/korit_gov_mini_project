/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as s from './styles';

import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { signupRequest } from '../../../apis/auth/authApis';

function SignupPage() {
    const navigate = useNavigate();
    const [signupInputValue, setSignupInputValue] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    const inputOnChangeHandler = (e) => {
        const { name, value } = e.target;

        setSignupInputValue((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const signupOnClickHandler = () => {
        if (
            signupInputValue.username.trim().length === 0 ||
            signupInputValue.email.trim().length === 0 ||
            signupInputValue.password.trim().length === 0 ||
            signupInputValue.passwordConfirm.trim().length === 0
        ) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (!emailRegex.test(signupInputValue.email)) {
            alert('이메일 형식이 올바르지 않습니다.');
            return;
        }

        if (!passwordRegex.test(signupInputValue.password)) {
            alert(
                '비밀번호는 최소 8자리에서 16자리 까지 이고 영문자, 숫자, 특수문자를 포함하여야 합니다.'
            );
            return;
        }

        if (signupInputValue.password !== signupInputValue.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!confirm('회원 가입을 하시겠습니까?')) {
            return;
        }

        signupRequest({
            username: signupInputValue.username,
            email: signupInputValue.email,
            password: signupInputValue.password,
        })
            .then((response) => {
                if (response.data.status == 'success') {
                    console.log(response.data.message);
                    navigate('/auth/signin');
                } else if (response.data.status == 'failed') {
                    console.log(response.data.message);
                    return;
                }
            })
            .catch((error) => {
                alert('문제가 발생했습니다. 다시 시도해주세요.');
                return;
            });
    };

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div>
                    <button onClick={() => navigate(-1)}>
                        <IoArrowBack />
                        뒤로가기
                    </button>
                </div>
                <div css={s.signupBox}>
                    <div css={s.topBox}>
                        <h4>회원가입</h4>
                        <p>Techboard와 함께 시작하세요</p>
                    </div>
                    <div css={s.bottomBox}>
                        <div css={s.inputBox}>
                            <div>
                                <label htmlFor="username">이름</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="사용자 이름을 입력해주세요."
                                    onChange={inputOnChangeHandler}
                                    value={signupInputValue.username}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">이메일</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="이메일을 입력해주세요."
                                    onChange={inputOnChangeHandler}
                                    value={signupInputValue.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요."
                                    onChange={inputOnChangeHandler}
                                    value={signupInputValue.password}
                                />
                            </div>
                            <div>
                                <label htmlFor="passwordConfirm">
                                    비밀번호 확인
                                </label>
                                <input
                                    name="passwordConfirm"
                                    type="password"
                                    placeholder="비밀번호를 확인해주세요."
                                    onChange={inputOnChangeHandler}
                                    value={signupInputValue.passwordConfirm}
                                />
                            </div>
                            <button onClick={signupOnClickHandler}>
                                회원가입
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;

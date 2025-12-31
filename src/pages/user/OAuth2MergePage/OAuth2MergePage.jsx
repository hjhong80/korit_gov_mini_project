/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate } from 'react-router-dom';
import * as s from './styles';

import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { oAuth2MergeRequest } from '../../../apis/auth/oAuth2Apis';

function OAuth2MergePage() {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location.state);
    const [mergeInputValue, setMergeInputValue] = useState({
        email: '',
        password: '',
    });

    const inputOnChangeHandler = (e) => {
        const { name, value } = e.target;

        setMergeInputValue((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const mergeOnClickHandler = () => {
        if (
            mergeInputValue.email.trim().length === 0 ||
            mergeInputValue.password.trim().length === 0
        ) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        oAuth2MergeRequest({
            email: mergeInputValue.email,
            password: mergeInputValue.password,
            provider: location.state.provider,
            providerUserId: location.state.providerUserId,
        }).then((response) => {
            if (response.data.status === 'success') {
                alert(response.data.message);
                navigate('/auth/signin');
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
                    <button onClick={() => navigate(-1)}>
                        <IoArrowBack />
                        뒤로가기
                    </button>
                </div>
                <div css={s.mergeBox}>
                    <div css={s.topBox}>
                        <h4>계정 연동</h4>
                        <p>Techboard와 함께 시작하세요</p>
                    </div>
                    <div css={s.bottomBox}>
                        <div css={s.inputBox}>
                            <div>
                                <label htmlFor="email">이메일</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="이메일을 입력해주세요."
                                    onChange={inputOnChangeHandler}
                                    value={mergeInputValue.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요."
                                    onChange={inputOnChangeHandler}
                                    value={mergeInputValue.password}
                                />
                            </div>
                            <button onClick={mergeOnClickHandler}>
                                연동하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OAuth2MergePage;

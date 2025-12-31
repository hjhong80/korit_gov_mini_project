/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as s from './styles';

import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';
import { usePrincipalState } from '../../../store/usePrincipalState';
import { changePasswordRequest } from '../../../apis/account/accountApis';

function ChangePasswordPage() {
    const navigate = useNavigate();
    const [passwordInputValue, setPasswordInputValue] = useState({
        password: '',
        newPassword: '',
        newPasswordConfirm: '',
    });

    const { logout } = usePrincipalState();
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData(['getPrincipal'])?.data
        ?.data;

    const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

    const inputOnChangeHandler = (e) => {
        const { name, value } = e.target;

        setPasswordInputValue((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const changePasswordOnClickHandler = () => {
        if (
            passwordInputValue.password.trim().length === 0 ||
            passwordInputValue.newPassword.trim().length === 0 ||
            passwordInputValue.newPasswordConfirm.trim().length === 0
        ) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (!passwordRegex.test(passwordInputValue.newPassword)) {
            alert(
                '비밀번호는 최소 8자리에서 16자리 까지 이고 영문자, 숫자, 특수문자를 포함하여야 합니다.'
            );
            return;
        }

        if (
            passwordInputValue.newPassword !==
            passwordInputValue.newPasswordConfirm
        ) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!confirm('비밀번호를 변경 하시겠습니까?')) {
            return;
        }

        changePasswordRequest({
            userId: principalData.userId,
            password: passwordInputValue.password,
            newPassword: passwordInputValue.newPassword,
        })
            .then((response) => {
                if (response.data.status == 'success') {
                    alert(response.data.message);
                    logout();
                } else if (response.data.status == 'failed') {
                    alert(response.data.message);
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
                <div css={s.changePasswordBox}>
                    <div css={s.topBox}>
                        <h4>비밀번호 변경</h4>
                    </div>
                    <div css={s.bottomBox}>
                        <div css={s.inputBox}>
                            <div>
                                <label htmlFor="password">기존 비밀번호</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="기존 비밀번호를 입력해주세요."
                                    onChange={inputOnChangeHandler}
                                    value={passwordInputValue.password}
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword">새 비밀번호</label>
                                <input
                                    name="newPassword"
                                    type="password"
                                    placeholder="새로운 비밀번호를 입력해주세요."
                                    onChange={inputOnChangeHandler}
                                    value={passwordInputValue.newPassword}
                                />
                            </div>
                            <div>
                                <label htmlFor="newPasswordConfirm">
                                    새 비밀번호 확인
                                </label>
                                <input
                                    name="newPasswordConfirm"
                                    type="password"
                                    placeholder="새로운 비밀번호를 확인해주세요."
                                    onChange={inputOnChangeHandler}
                                    value={
                                        passwordInputValue.newPasswordConfirm
                                    }
                                />
                            </div>
                            <button onClick={changePasswordOnClickHandler}>
                                비밀번호 변경
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordPage;

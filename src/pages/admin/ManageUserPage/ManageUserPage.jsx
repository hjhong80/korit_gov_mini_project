/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate } from 'react-router-dom';
import * as s from './styles';

import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserListRequest } from '../../../apis/admin/adminApis';

function ManageUserPage() {
    const [userData, setUserData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ['getUserList'],
        queryFn: getUserListRequest,
    });

    useEffect(() => {
        setUserData(data?.data?.data);
    }, [isLoading]);

    useEffect(() => {
        if (searchValue.trim().length === 0) {
            setUserData(data?.data?.data);
        } else {
            setUserData(
                data?.data?.data.filter(
                    (user) =>
                        user.username.includes(searchValue) ||
                        user.email.includes(searchValue)
                )
            );
        }
    }, [searchValue]);

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div>
                    <button onClick={() => navigate('/admin/dashboard')}>
                        <IoArrowBack />
                        대시보드로
                    </button>
                </div>

                <div>
                    <h3>회원관리</h3>
                    <p>전체 회원 목록 및 정보 관리</p>
                </div>
                <div css={s.searchContainer}>
                    <LuSearch />
                    <input
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="이름 또는 이메일을 입력하세요."
                        type="text"
                    />
                </div>
                <div css={s.listContainer}>
                    <h4>회원 목록 ({userData?.length}명)</h4>
                    <ul>
                        {userData?.map((user) => (
                            <li
                                key={user.userId}
                                css={s.userContainer}
                                onClick={() =>
                                    navigate(
                                        `/admin/manage/user/${user.username}`
                                    )
                                }>
                                <div>
                                    <img src={user.profileImg} alt="img" />
                                </div>
                                <div>
                                    <div>
                                        <h4>{user.usernames}</h4>
                                        <div>
                                            {user.status === 'ACTIVE'
                                                ? '활성'
                                                : '비활성'}
                                        </div>
                                    </div>
                                    <p>{user.email}</p>
                                    <p>{user.createDt}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ManageUserPage;

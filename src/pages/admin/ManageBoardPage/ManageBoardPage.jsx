/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate } from 'react-router-dom';
import * as s from './styles';

import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBoardListRequest } from '../../../apis/board/boardApis';

function ManageBoardPage() {
    const [boardData, setBoardData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ['getBoardList'],
        queryFn: getBoardListRequest,
    });

    useEffect(() => {
        setBoardData(data?.data?.data);
    }, [isLoading]);

    useEffect(() => {
        if (searchValue.trim().length === 0) {
            setBoardData(data?.data?.data);
        } else {
            setBoardData(
                data?.data?.data.filter(
                    (board) =>
                        board.title.includes(searchValue) ||
                        board.content.includes(searchValue)
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
                    <h3>게시물관리</h3>
                    <p>전체 게시물 목록 및 관리</p>
                </div>
                <div css={s.searchContainer}>
                    <LuSearch />
                    <input
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="제목 또는 내용을 입력하세요."
                        type="text"
                    />
                </div>
                <div css={s.listContainer}>
                    <h4>게시물 목록 ({boardData?.length}개)</h4>
                    <ul>
                        {boardData?.map((board) => (
                            <li
                                key={board.boardId}
                                css={s.boardContainer}
                                onClick={() =>
                                    navigate(
                                        `/admin/manage/board/${board.boardId}`
                                    )
                                }>
                                <div>
                                    <h4>{board.title}</h4>
                                    <p>{board.content}</p>
                                </div>
                                <div css={s.boardBottomBox}>
                                    <div>
                                        <div css={s.profileImgBox}>
                                            <img
                                                src={board.profileImg}
                                                alt="profileImg"
                                            />
                                        </div>
                                        <p>{board.username}</p>
                                    </div>
                                    <div>
                                        <p>{board.createDt}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ManageBoardPage;

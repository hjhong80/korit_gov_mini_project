/** @jsxImportSource @emotion/react */
import { IoArrowBack } from 'react-icons/io5';
import * as s from './styles';

import React, { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getBoardByKeywordRequest,
    getBoardListRequest,
} from '../../../apis/board/boardApis';

function BoardListPage() {
    const navigate = useNavigate();
    const [searchInputValue, setSearchInputValue] = useState('');
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        getBoardListRequest().then((response) => {
            if (response.data.status === 'success') {
                setBoardList(response.data.data);
            } else if (response.data.status === 'failed') {
                alert(response.data.message);
            }
        });
    }, []);

    const searchOnChangeHandler = (e) => {
        setSearchInputValue(e.target.value);
    };

    const searchOnKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            getBoardByKeywordRequest(searchInputValue).then((response) => {
                if (response.data.status === 'success') {
                    setBoardList(response.data.data);
                } else if (response.data.status === 'failed') {
                    alert(response.data.message);
                }
            });
        }
    };

    useEffect(() => {
        getBoardListRequest().then((response) => {
            if (response.data.status === 'success') {
                setSearchInputValue(response.data.data);
            } else if (response.data.status === 'failed') {
                alert(response.data.message);
            }
        });
    }, []);

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div onClick={() => navigate('/')}>
                    <IoArrowBack />홈
                </div>
                <div>
                    <div>게시물</div>
                    <div>
                        <LuSearch />
                        <input
                            placeholder="게시물 제목을 검색하세요."
                            type="text"
                            onChange={searchOnChangeHandler}
                            onKeyDown={searchOnKeyDownHandler}
                        />
                    </div>
                </div>
                <div css={s.listContainer}>
                    <ul>
                        {boardList.map((board) => (
                            <li
                                key={board.boardId}
                                onClick={() =>
                                    navigate(`/board/${board.boardId}`)
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
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default BoardListPage;

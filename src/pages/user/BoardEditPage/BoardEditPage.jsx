/** @jsxImportSource @emotion/react */
import { LuSparkle, LuSparkles } from 'react-icons/lu';
import * as s from './styles';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { usePrincipalState } from '../../../store/usePrincipalState';
import {
    addBoardRequest,
    getBoardByBoardIdRequest,
    modifyBoardByBoardIdRequest,
    removeBoardByBoardIdRequest,
} from '../../../apis/board/boardApis';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';

function BoardAddPage() {
    const { boardId } = useParams();
    const navigate = useNavigate();
    // const [boardData, setBoardData] = useState({});
    const [titleInputValue, setTitleInputValue] = useState('');
    const [contentInputValue, setContentInputValue] = useState('');

    const { principal } = usePrincipalState();

    // const addBoardMutation = useMutation();

    const contentInputOnChangeHandler = (e) => {
        setContentInputValue(e.target.value);
    };

    const titleInputOnChangeHandler = (e) => {
        setTitleInputValue(e.target.value);
    };

    const cancelOnClickHandler = () => {
        setTitleInputValue('');
        setContentInputValue('');
        navigate(`/profile/${principal?.username}`);
    };

    const editOnClickHandler = () => {
        if (
            titleInputValue.trim().length === 0 ||
            contentInputValue.trim().length === 0
        ) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        modifyBoardByBoardIdRequest({
            title: titleInputValue,
            content: contentInputValue,
            userId: principal.userId,
            boardId: boardId,
        }).then((response) => {
            if (response.data.status == 'success') {
                alert('게시물이 수정 되었습니다.');
                navigate(`/board/${boardId}`);
            } else if (response.data.status == 'failed') {
                alert(response.data.messsage);
                return;
            }
        });
    };

    const removeOnClickHandler = () => {
        if (!confirm('정말로 게시물을 삭제하시겠습니까?')) {
            return;
        }
        removeBoardByBoardIdRequest({
            userId: principal.userId,
            boardId: boardId,
        }).then((response) => {
            if (response.data.status == 'success') {
                alert('게시물이 삭제 되었습니다.');
                navigate(`/profile/${principal.username}`);
            } else if (response.data.status == 'failed') {
                alert(response.data.messsage);
                return;
            }
        });
    };

    useEffect(() => {
        getBoardByBoardIdRequest(boardId).then((response) => {
            if (response.data.status === 'success') {
                // setBoardData(response.data.data);
                setTitleInputValue(response.data.data.title);
                setContentInputValue(response.data.data.content);
            } else if (response.data.status === 'failed') {
                alert(response.data.message);
            }
        });
    }, []);

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div>
                    <div>
                        <MdOutlineTipsAndUpdates />
                    </div>
                    <h1>이야기를 어떻게 수정할까요?</h1>
                    <p>당신의 지식과 경험을 커뮤니티에 공유하세요</p>
                </div>
                <div css={s.bottomContainer}>
                    <div css={s.innerBox}>
                        <div>
                            <label htmlFor="title">제목</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="제목을 입력 하세요."
                                value={titleInputValue}
                                onChange={titleInputOnChangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="content">내용</label>
                            <textarea
                                name=""
                                id="content"
                                value={contentInputValue}
                                onChange={contentInputOnChangeHandler}
                                placeholder="내용을 입력 하세요."
                            />
                        </div>
                        <div>
                            <span>{contentInputValue.length}자</span>
                            <span>최소 10자 이상 입력하세요.</span>
                        </div>
                        <div>
                            <button onClick={removeOnClickHandler}>
                                삭제하기
                            </button>
                            <div>
                                <button onClick={cancelOnClickHandler}>
                                    취소
                                </button>
                                <button onClick={editOnClickHandler}>
                                    수정하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardAddPage;

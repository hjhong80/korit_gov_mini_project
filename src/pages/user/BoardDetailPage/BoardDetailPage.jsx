/** @jsxImportSource @emotion/react */
import { IoArrowBack } from 'react-icons/io5';
import * as s from './styles';

import React from 'react';
import { useNavigate } from 'react-router-dom';

function BoardDetailPage() {
    const navigate = useNavigate();
    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div>
                    <button onClick={() => navigate('/board/list')}>
                        <IoArrowBack />
                        목록으로
                    </button>
                </div>
                <div>
                    <div css={s.topBox}>
                        <h4>React 18의 새로운 기능들</h4>
                        <div css={s.boardBottomBox}>
                            <div>
                                <div>김</div>
                                <p>김개발</p>
                            </div>
                            <div>
                                <p>2025.12.29</p>
                            </div>
                        </div>
                    </div>
                    <div css={s.bottomBox}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quisquam porro expedita nisi eveniet quam
                            exercitationem velit dignissimos, aspernatur quis
                            culpa. Laboriosam a natus eum voluptatibus
                            laudantium. Sunt unde esse dolor!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardDetailPage;

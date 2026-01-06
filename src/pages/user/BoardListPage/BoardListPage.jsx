/** @jsxImportSource @emotion/react */
import { IoArrowBack } from 'react-icons/io5';
import * as s from './styles';

import React, { useEffect, useRef, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getBoardByKeywordRequest,
    getBoardInfiniteRequest,
    getBoardListRequest,
} from '../../../apis/board/boardApis';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SyncLoader } from 'react-spinners';

function BoardListPage() {
    // const navigate = useNavigate();
    // const [searchInputValue, setSearchInputValue] = useState('');
    // // const [boardList, setBoardList] = useState([]);
    // const bottomRef = useRef(null);

    // const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    //     useInfiniteQuery({
    //         queryKey: ['boardInfinite'],
    //         queryFn: getBoardInfiniteRequest,
    //         initialPageParam: null,
    //         getNextPageParam: (lastPage) => {
    //             if (
    //                 !lastPage?.data?.data?.hasNext ||
    //                 !lastPage?.data?.data?.boardNextCursor
    //             ) {
    //                 // 다음 페이지가 없을때
    //                 return undefined;
    //             }
    //             return lastPage?.data?.data?.boardNextCursor; // 다음 요청의 params
    //         },
    //     });

    // const boardList =
    //     data?.pages?.flatMap((p) => p?.data?.data?.boardRespDtoList ?? []) ??
    //     [];

    // useEffect(() => {
    //     if (!bottomRef.current) return;

    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             const first = entries[0];
    //             if (!first.isIntersecting) return;
    //             if (!hasNextPage) return;
    //             if (isFetchingNextPage) return;

    //             console.log('바닥입니다.');
    //             fetchNextPage();
    //         },
    //         { threshold: 0.1 }
    //     );

    //     observer.observe(bottomRef.current);
    //     return () => observer.disconnect();
    // }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    // useEffect(() => {
    //     getBoardListRequest().then((response) => {
    //         if (response.data.status === 'success') {
    //             setBoardList(response.data.data);
    //         } else if (response.data.status === 'failed') {
    //             alert(response.data.message);
    //         }
    //     });
    // }, []);

    // const searchOnChangeHandler = (e) => {
    //     setSearchInputValue(e.target.value);
    // };

    // const searchOnKeyDownHandler = (e) => {
    //     if (e.key === 'Enter') {
    //         getBoardByKeywordRequest(searchInputValue).then((response) => {
    //             if (response.data.status === 'success') {
    //                 setBoardList(response.data.data);
    //             } else if (response.data.status === 'failed') {
    //                 alert(response.data.message);
    //             }
    //         });
    //     }
    // };

    // useEffect(() => {
    //     getBoardListRequest().then((response) => {
    //         if (response.data.status === 'success') {
    //             setSearchInputValue(response.data.data);
    //         } else if (response.data.status === 'failed') {
    //             alert(response.data.message);
    //         }
    //     });
    // }, []);

    // return (
    //     <div css={s.container}>
    //         <div css={s.mainContainer}>
    //             <div onClick={() => navigate('/')}>
    //                 <IoArrowBack />홈
    //             </div>
    //             <div>
    //                 <div>게시물</div>
    //                 <div>
    //                     <LuSearch />
    //                     <input
    //                         placeholder="게시물 제목을 검색하세요."
    //                         type="text"
    //                         onKeyDown={handleSearch}
    //                         // onChange={searchOnChangeHandler}
    //                         // onKeyDown={searchOnKeyDownHandler}
    //                     />
    //                 </div>
    //             </div>
    //             <div css={s.listContainer}>
    //                 {/* <ul> */}
    //                 {/* {boardList &&
    //                         boardList.map((board) => (
    //                             <li
    //                                 key={board.boardId}
    //                                 onClick={() =>
    //                                     navigate(`/board/${board.boardId}`)
    //                                 }>
    //                                 <div>
    //                                     <h4>{board.title}</h4>
    //                                     <p>{board.content}</p>
    //                                 </div>
    //                                 <div css={s.boardBottomBox}>
    //                                     <div>
    //                                         <div css={s.profileImgBox}>
    //                                             <img
    //                                                 src={board.profileImg}
    //                                                 alt="profileImg"
    //                                             />
    //                                         </div>
    //                                         <p>{board.username}</p>
    //                                     </div>
    //                                     <div>
    //                                         <p>{board.createDt}</p>
    //                                     </div>
    //                                 </div>
    //                             </li>
    //                         ))}
    //                     <div ref={bottomRef} style={{ height: 1 }} /> */}
    //                 {/* </ul> */}
    //                 {/* {!hasNextPage && <div>마지막 페이지 입니다.</div>} */}
    //                 {isLoading ? (
    //                     <div css={s.loaderBox}>
    //                         <SyncLoader color="#4f39f6" />
    //                     </div>
    //                 ) : (
    //                     <ul>
    //                         {boardList.length > 0 ? (
    //                             boardList.map((board, index) => (
    //                                 // [Key 수정] index를 활용해 유니크 키 생성
    //                                 <li
    //                                     key={`${board.boardId}_loop_${index}`}
    //                                     onClick={() =>
    //                                         navigate(`/board/${board.boardId}`)
    //                                     }>
    //                                     <div>
    //                                         <h4>{board.title}</h4>
    //                                         <p>{board.content}</p>
    //                                     </div>
    //                                     <div css={s.boardBottomBox}>
    //                                         <div css={s.profileImgBox}>
    //                                             <img
    //                                                 src={board.profileImg}
    //                                                 alt="profile"
    //                                             />
    //                                         </div>
    //                                         <p>{board.username}</p>
    //                                         <p>{board.createDt}</p>
    //                                     </div>
    //                                 </li>
    //                             ))
    //                         ) : (
    //                             <div>게시물이 없습니다.</div>
    //                         )}
    //                         <div
    //                             ref={bottomRef}
    //                             style={{
    //                                 height: '20px',
    //                                 backgroundColor: 'transparent',
    //                             }}
    //                         />
    //                     </ul>
    //                 )}
    //                 {isFetchingNextPage && (
    //                     <div css={s.loaderBox}>
    //                         <SyncLoader color="#4f39f6" size={10} />
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     </div>
    // );
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const bottomRef = useRef(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery({
            queryKey: ['boardInfinite', keyword],
            queryFn: ({ pageParam }) =>
                getBoardInfiniteRequest({
                    pageParam: pageParam === 'RESTART' ? null : pageParam,
                    keyword,
                }),
            initialPageParam: null,
            getNextPageParam: (lastPage) => {
                const responseData = lastPage?.data?.data;

                console.log('last page : ', responseData);

                if (!responseData) return undefined;

                // [무한 루프 핵심] 다음 페이지가 없으면 null(첫 페이지)을 반환
                if (!responseData.hasNext) {
                    console.log('처음으로 다시');
                    return 'RESTART';
                }
                return responseData.boardNextCursor;
            },
        });

    const boardList =
        data?.pages?.flatMap(
            (page) => page?.data?.data?.boardRespDtoList ?? []
        ) ?? [];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                console.log('다음 페이지 검사 : ', hasNextPage);
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    console.log('다음 페이지(혹은 첫 페이지) 로딩!');
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => bottomRef.current && observer.unobserve(bottomRef.current);
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') setKeyword(e.target.value);
    };

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <div
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}>
                    <IoArrowBack /> 홈
                </div>

                <div>
                    <div>게시물</div>
                    <div>
                        <LuSearch />
                        <input
                            placeholder="게시물 제목을 검색하세요."
                            type="text"
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>

                <div css={s.listContainer}>
                    {isLoading ? (
                        <div css={s.loaderBox}>
                            <SyncLoader color="#4f39f6" />
                        </div>
                    ) : (
                        <ul>
                            {boardList.length > 0 ? (
                                boardList.map((board, index) => (
                                    // [Key 수정] index를 활용해 유니크 키 생성
                                    <li
                                        key={`${board.boardId}_loop_${index}`}
                                        onClick={() =>
                                            navigate(`/board/${board.boardId}`)
                                        }>
                                        <div>
                                            <h4>{board.title}</h4>
                                            <p>{board.content}</p>
                                        </div>
                                        <div css={s.boardBottomBox}>
                                            <div css={s.profileImgBox}>
                                                <img
                                                    src={board.profileImg}
                                                    alt="profile"
                                                />
                                            </div>
                                            <p>{board.username}</p>
                                            <p>{board.createDt}</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <div>게시물이 없습니다.</div>
                            )}
                            <div
                                ref={bottomRef}
                                style={{
                                    height: '20px',
                                    backgroundColor: 'transparent',
                                }}
                            />
                        </ul>
                    )}
                    {isFetchingNextPage && (
                        <div css={s.loaderBox}>
                            <SyncLoader color="#4f39f6" size={10} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BoardListPage;

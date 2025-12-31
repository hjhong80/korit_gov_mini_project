/** @jsxImportSource @emotion/react */
import { IoArrowBack } from 'react-icons/io5';
import * as s from './styles';

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrincipalState } from '../../../store/usePrincipalState';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../apis/config/firebaseConfig';
import { v4 as uuid } from 'uuid';
import {
    changeProfileImg,
    emailSendRequest,
    withdrawRequest,
} from '../../../apis/account/accountApis';
import { getBoardListByUserIdRequest } from '../../../apis/board/boardApis';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function ProfilePage() {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // const [profileImg, setProfileImg] = useState(null);
    const navigate = useNavigate();
    const { logout } = usePrincipalState();
    const imgInputRef = useRef();
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData(['getPrincipal'])?.data
        ?.data;
    const { data, isLoading } = useQuery({
        queryKey: ['getBoardListByUserId'],
        queryFn: () => getBoardListByUserIdRequest(principalData?.userId),
        enabled: !!principalData,
        refetch: 1,
    });

    useEffect(() => {
        if (principalData?.profileImg) {
            setPreviewUrl(principalData?.profileImg);
        }
    }, [principalData]);

    function onRefresh() {
        queryClient.invalidateQueries({ queryKey: ['getPrincipal'] });
    }

    const changeProfileImgMutation = useMutation({
        mutationKey: 'changeProfileimg',
        mutationFn: changeProfileImg,
        onSuccess: (response) => {
            if (response.data.status === 'success') {
                alert('프로필 이미지가 변경되었습니다.');
                onRefresh();
                setIsUploading(false);
            } else if (response.data.status === 'failed') {
                alert(response.data.message);
                setIsUploading(false);
            }
        },
    });

    const onChangeFileHandler = (e) => {
        const file = e.target.files[0];
        // console.log(file);

        if (!confirm('프로필 이미지를 변경하시겠습니까?')) {
            return;
        }

        setPreviewUrl(URL.createObjectURL(file));
        if (!confirm('이 사진으로 프로필을 변경하시겠습니까?')) {
            setPreviewUrl(principalData?.profileImg);
            return;
        }

        setIsUploading(true);

        const imageRef = ref(
            storage,
            `profile-img/${uuid()}_${file.name.split('.').pop()}`
        );

        const uploadTask = uploadBytesResumable(imageRef, file);

        // 업로드 상태변화를 감지하는 이벤트 리스너를 등록
        uploadTask.on(
            'state_changed',
            // 작업이 진행되는 도중 수행할 일
            (snapshot) => {
                const progressPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(progressPercent);
                setProgress(progressPercent);
            },
            // 에러 발생시 수행할 일
            (error) => {
                console.log(error);
                setIsUploading(false);
                alert('업로드 중 에러가 발생했습니다.');
            },
            // 작업 완료시 수행할 일
            async () => {
                try {
                    const downloadUrl = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    changeProfileImgMutation.mutate({
                        userId: principalData?.userId,
                        profileImg: downloadUrl,
                    });
                } catch (error) {
                    setIsUploading(false);
                    alert('이미지 주소를 가져오는데 문제가 발생 했습니다.');
                    console.error(error);
                }
            }
        );
    };

    const onClickProfileImgHandler = () => {
        if (imgInputRef.current) {
            imgInputRef.current.value = null;
            imgInputRef.current.click();
        } else imgInputRef.current.click();
    };

    const onClickEmailSendHandler = () => {
        if (!confirm('이메일 인증 코드를 전송하시겠습니까?')) {
            return;
        }

        emailSendRequest().then((response) => {
            if (response.data.status === 'success') {
                alert(response.data.message);
                return;
            } else if (response.data.status === 'failed') {
                alert(response.data.message);
                return;
            }
        });
    };

    const onClickWithdrawHandler = () => {
        if (!confirm('정말로 회원 탈퇴 하시겠습니까?')) {
            return;
        }

        withdrawRequest().then((response) => {
            if (response.data.status === 'success') {
                alert(response.data.message);
                logout();
                return;
            } else if (response.data.status === 'failed') {
                alert(response.data.message);
                return;
            }
        });
    };

    return (
        <div css={s.container}>
            <div css={s.mainContainer}>
                <button onClick={() => navigate('/')}>
                    <IoArrowBack />
                    홈으로
                </button>
                <h1>마이페이지</h1>
                <div css={s.profileBox}>
                    <div css={s.profileTopBox}>
                        <div>
                            <div css={s.profileImg}>
                                <img
                                    src={previewUrl}
                                    alt="profileImg"
                                    onClick={onClickProfileImgHandler}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={imgInputRef}
                                    onChange={onChangeFileHandler}
                                />
                            </div>
                            <div>
                                <h3>{principalData?.username}</h3>
                                <p>{principalData?.email}</p>
                                {/* <p>{principal.createDt}</p> */}
                            </div>
                        </div>
                        <div>
                            <button onClick={() => logout()}>로그아웃</button>
                            {principalData?.authorities[0].authority ===
                            'ROLE_ADMIN' ? (
                                <button>관리자 대시보드</button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div css={s.profileBottomBox}>
                        <div>작성한 게시물</div>
                        <p>{data?.data?.data?.length}</p>
                    </div>
                </div>
                <div css={s.profileSettingBox}>
                    <div>
                        <h3>계정설정</h3>
                        <p>계정 보안 및 정보를 관리하세요.</p>
                    </div>
                    <div css={s.settingButtonBox}>
                        <button
                            onClick={() =>
                                navigate('/profile/change/password')
                            }>
                            비밀번호 변경
                        </button>
                        {principalData?.authorities[0]?.authority !==
                        'ROLE_USER' ? (
                            <button onClick={onClickEmailSendHandler}>
                                이메일 인증
                            </button>
                        ) : (
                            <></>
                        )}
                        <button onClick={onClickWithdrawHandler}>
                            회원 탈퇴
                        </button>
                    </div>
                </div>
                <div css={s.profileBoardBox}>
                    <div>
                        <h3>내가 작성한 게시물</h3>
                        <p>
                            총 {data?.data?.data?.length}개의 게시물을
                            작성하였습니다.
                        </p>
                    </div>
                    <div css={s.boardBox}>
                        {/* <p>작성한 게시물이 없습니다.</p> */}
                        <ul>
                            {isLoading ? (
                                <div>로딩중...</div>
                            ) : (
                                data?.data?.data?.map((board) => (
                                    <li
                                        key={board.boardId}
                                        onClick={() =>
                                            navigate(
                                                `/board/edit/${board.boardId}`
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
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            {isUploading && (
                <div css={s.blurBox}>
                    <h4>{progress}%</h4>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;

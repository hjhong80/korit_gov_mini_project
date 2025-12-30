/** @jsxImportSource @emotion/react */
import { IoArrowBack } from 'react-icons/io5';
import * as s from './styles';

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrincipalState } from '../../../store/usePrincipalState';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../apis/config/firebaseConfig';
import { v4 as uuid } from 'uuid';
import { changeProfileImg } from '../../../apis/account/accountApis';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function ProfilePage() {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [profileImg, setProfileImg] = useState(null);
    const navigate = useNavigate();
    const { isLoggedIn, principal, loading, login, logout } =
        usePrincipalState();
    const queryClient = useQueryClient();

    function onRefresh() {
        queryClient.invalidateQueries({ queryKey: ['getPrincipal'] });
    }

    const changeProfileImgMutation = useMutation({
        mutationKey: 'changeProfileimg',
        mutationFn: changeProfileImg,
        onSuccess: (response) => {
            if (response.data.status === 'success') {
                alert('프로필 이미지가 변경되었습니다.');
                setIsUploading(false);
                window.location.reload();
            } else if (response.data.status === 'failed') {
                alert(response.data.message);
                setIsUploading(false);
                return;
            }
        },
    });

    const imgInputRef = useRef();

    const onChangeFileHandler = (e) => {
        const file = e.target.files[0];
        console.log(file);

        if (!confirm('프로필 이미지를 변경하시겠습니까?')) {
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
            (snapshot) => {
                const progressPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(progressPercent);
                setProgress(progressPercent);
            },
            (error) => {
                console.log(error);
                setIsUploading(false);
                alert('업로드 중 에러가 발생했습니다.');
            },
            async () => {
                try {
                    const downloadUrl = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    changeProfileImgMutation.mutate({
                        userId: principal.userId,
                        profileImg: downloadUrl,
                    });
                } catch (error) {
                    alert('이미지 주소를 가져오는데 문제가 발생 했습니다.');
                    setIsUploading(false);
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
                                    src={principal?.profileImg}
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
                                <h3>{principal?.username}</h3>
                                <p>{principal?.email}</p>
                                {/* <p>{principal.createDt}</p> */}
                            </div>
                        </div>
                        <div>
                            <button onClick={() => logout()}>로그아웃</button>
                        </div>
                    </div>
                    <div css={s.profileBottomBox}>
                        <div>작성한 게시물</div>
                        <p>3</p>
                    </div>
                </div>
                <div css={s.profileSettingBox}>
                    <div>
                        <h3>계정설정</h3>
                        <p>계정 보안 및 정보를 관리하세요.</p>
                    </div>
                    <div css={s.settingButtonBox}>
                        <button>비밀번호 변경</button>
                        <button>이메일 인증</button>
                        <button>회원 탈퇴</button>
                    </div>
                </div>
                <div css={s.profileBoardBox}>
                    <div>
                        <h3>내가 작성한 게시물</h3>
                        <p>총 0개의 게시물을 작성하였습니다.</p>
                    </div>
                    <div css={s.boardBox}>
                        <p>작성한 게시물이 없습니다.</p>
                    </div>
                </div>
            </div>
            {isUploading ? (
                <div css={s.blurBox}>
                    <h4>{progress}%</h4>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ProfilePage;

import { css } from '@emotion/react';

export const container = css`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: beige; */
    background: #eef2ff;
    background: linear-gradient(
        90deg,
        rgba(238, 242, 255, 1) 0%,
        rgba(250, 245, 255, 1) 50%,
        rgba(253, 242, 248, 1) 100%
    );
`;

export const mainContainer = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 448px;
    /* height: 70vh; */
    background-color: white;
    border-radius: 14px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

export const topBox = css`
    padding: 40px 24px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    & > div {
        font-size: 48px;

        & > div {
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;

            /* 배경을 좀 더 밝고 은은하게 조정하여 아이콘 색상 방해 금지 */
            background: linear-gradient(
                135deg,
                rgba(79, 57, 246, 0.1) 0%,
                rgba(152, 16, 250, 0.2) 100%
            );

            border-radius: 50%;

            /* 동그라미 자체의 그림자 (은은한 발광 효과) */
            box-shadow: 0 10px 25px -5px rgba(79, 57, 246, 0.3);

            /* 테두리를 살짝 주어 디테일 향상 */
            border: 1px solid rgba(255, 255, 255, 0.5);

            /* 인터랙션: 마우스 올리면 살짝 커짐 */
            transition: all 0.3s ease;

            &:hover {
                transform: scale(1.05);
                box-shadow: 0 15px 35px -5px rgba(79, 57, 246, 0.4);
            }

            /* [핵심 요청 사항] 구글 아이콘(SVG) 자체에 그림자 넣기 */
            & > svg {
                /* box-shadow가 아닌 drop-shadow를 써야 아이콘 모양대로 그림자가 생김 */
                filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
            }
        }
    }

    & > h4 {
        color: oklch(51.1% 0.262 276.966);
        font-size: 40px;
        font-weight: 350;
    }

    & > p {
        font-size: 16px;
        color: #8c8c9e; /* 너무 연하지 않은 회색 */
        line-height: 1.5; /* 줄 간격을 주어 읽기 편하게 */
    }
`;

export const bottomBox = css`
    padding: 0 24px 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;

    & > button:nth-of-type(1),
    button:nth-of-type(2) {
        padding: 16px 12px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }

    & > button:nth-of-type(1) {
        background: #4f39f6;
        background: linear-gradient(
            90deg,
            rgba(79, 57, 246, 0.9) 0%,
            rgba(152, 16, 250, 0.9) 100%
        );
        transition: all 0.3s ease;
        color: white;

        &:hover {
            background: #4f39f6;
            background: linear-gradient(
                90deg,
                rgba(79, 57, 246, 1) 0%,
                rgba(152, 16, 250, 1) 100%
            );
        }
    }

    & > button:nth-of-type(2) {
        background-color: transparent;
        border: 2px solid oklch(0.87 0.065 274.039);
        transition: all 0.3s ease;

        &:hover {
            background-color: #e3eafc;
        }
    }

    & > button:nth-of-type(3) {
        border: none;
        background-color: transparent;
        cursor: pointer;
        border-radius: 8px;
        padding: 8px 12px;
        transition: all 0.3s ease;

        &:hover {
            background-color: #f2f2f2;
        }
    }
`;

import { css } from '@emotion/react';

export const container = css`
    width: 100%;
    height: 100%;
    background: #eef2ff;
    background: linear-gradient(
        90deg,
        rgba(238, 242, 255, 1) 0%,
        rgba(250, 245, 255, 1) 50%,
        rgba(253, 242, 248, 1) 100%
    );
    display: flex;
    justify-content: center;
    align-items: start;
`;

export const mainContainer = css`
    width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px;
    box-sizing: border-box;
    /* background-color: beige; */

    & > div:nth-of-type(1) > button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        border: none;
        border-radius: 8px;
        background-color: transparent;
        padding: 8px 12px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
        color: #4a5565;

        &:hover {
            background-color: #fafafa;
        }
    }
    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border-radius: 14px;
        background-color: #fafafa;
        box-shadow: 3px 10px 15px 3px rgba(0, 0, 0, 0.1);
        gap: 20px;
    }
`;

export const topBox = css`
    padding: 24px;
    box-sizing: border-box;
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    flex-direction: column;
    gap: 15px;

    & > h4 {
        font-size: 30px;
        font-weight: 600;
        color: #0a0a0a;
        text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    }
`;

export const boardBottomBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div {
        display: flex;
        align-items: center;
        gap: 10px;

        /* & > div {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: aquamarine;
            display: flex;
            justify-content: center;
            align-items: center;
        } */

        & > p {
            font-size: 14px;
            color: #0a0a0a;
        }
    }
`;

export const bottomBox = css`
    padding: 24px;
    box-sizing: border-box;

    & > p {
        color: #364153;
    }
`;

export const profileImgBox = css`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    /* background-color: aquamarine; */
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

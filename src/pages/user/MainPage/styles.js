import { css } from '@emotion/react';

export const container = (showSideBar) => css`
    width: 100vw;
    flex-grow: 1;
    background: #eef2ff;
    background: linear-gradient(
        90deg,
        rgba(238, 242, 255, 1) 0%,
        rgba(250, 245, 255, 1) 50%,
        rgba(253, 242, 248, 1) 100%
    );
    padding: 0 200px;
    box-sizing: border-box;
    ${showSideBar ? 'filter: blur(4px);' : ''}
    transition: all 0.2s ease-in-out;
`;

export const mainContainer = css`
    width: 100%;
    height: 100%;
    padding: 70px 0;
    /* background-color: beige; */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 50px;
`;

export const topBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background-color: aquamarine; */
    gap: 40px;

    & > h1 {
        font-size: 60px;
        color: oklch(51.1% 0.262 276.966);
        margin: 0;
        line-height: 60px;
        letter-spacing: 4px;
        cursor: default;
    }

    & > p {
        font-size: 20px;
        color: oklch(0.446 0.03 256.802);
        margin: 0;
        text-align: center;
        font-weight: 350;
        letter-spacing: 0px;
        cursor: default;

        & > span {
            font-weight: 450;
        }
    }

    & > button {
        border: none;
        border-radius: 8px;
        font-size: 18px;
        padding: 12px 36px;
        background: #4f39f6;
        background: linear-gradient(
            90deg,
            rgba(79, 57, 246, 0.9) 0%,
            rgba(152, 16, 250, 0.9) 100%
        );
        color: white;
        transition: all 0.15s ease;
        cursor: pointer;

        &:hover {
            background: #4f39f6;
            background: linear-gradient(
                90deg,
                rgba(79, 57, 246, 1) 0%,
                rgba(152, 16, 250, 1) 100%
            );
            box-shadow: 0px 20px 15px -3px rgba(0, 0, 0, 0.1);
        }
    }
`;

export const bottomBox = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: beige; */
`;

export const card = css`
    padding: 32px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    border-radius: 16px;
    /* border: 1px solid #dbdbdb; */
    background-color: white;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    gap: 20px;

    &:hover {
        box-shadow: 0px 20px 15px -3px rgba(0, 0, 0, 0.1);
    }

    & > div {
        width: 56px;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        color: white;
        background: #4f39f6;
        background: linear-gradient(
            90deg,
            rgba(79, 57, 246, 0.8) 0%,
            rgba(152, 16, 250, 0.8) 100%
        );
        border-radius: 14px;
    }

    & > h3 {
        margin: 0;
    }

    & > p {
        margin: 0;
        font-size: 16px;
        font-weight: 350;
    }
`;

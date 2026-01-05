import { css } from '@emotion/react';

export const container = css`
    width: 100vw;
    height: 100vh;
    background-color: #f9fafb;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80px 0;
    box-sizing: border-box;
    overflow: auto;
`;

export const mainContainer = css`
    width: 1100px;
    /* background-color: bisque; */
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const searchContainer = css`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 12px;
    border: 1px solid #dbdbdb;
    padding: 4px 12px;
    box-sizing: border-box;
    border-radius: 8px;
    color: #0a0a0a;

    & > input {
        width: 100%;
        background-color: transparent;
        height: 24px;
        outline: none;
        border: none;
        font-size: 14px;
    }
`;

export const listContainer = css`
    width: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    border-radius: 14px;
    border: 1px solid #dbdbdb;
    box-sizing: border-box;
    background-color: white;
    gap: 15px;

    & > ul {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

export const userContainer = css`
    list-style: none;
    width: 100%;
    /* height: 50px; */
    border: 1px solid #dbdbdb;
    border-radius: 14px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
    gap: 20px;
    cursor: pointer;

    & > div:nth-of-type(1) {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 1px solid #dbdbdb;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;

        & > div {
            display: flex;
            align-items: center;
            gap: 10px;

            & > div {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 2px 8px;
                box-sizing: border-box;
                border: 1px solid #dbdbdb;
                border-radius: 14px;
            }
        }
    }
`;

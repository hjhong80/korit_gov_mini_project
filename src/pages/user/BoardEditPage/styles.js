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
    width: 850px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 16px;
    box-sizing: border-box;

    & > div:nth-of-type(1) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;

        & > div {
            width: 64px;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 36px;
            border-radius: 16px;
            color: white;
            background: #4f39f6;
            background: linear-gradient(
                90deg,
                rgba(79, 57, 246, 0.8) 0%,
                rgba(152, 16, 250, 0.8) 100%
            );
        }

        & > h1 {
            font-size: 36px;
            color: #4f39f6;
            letter-spacing: 2px;
            text-shadow: 1px 1px 3px rgba(59, 37, 226, 0.5);
        }

        & > p {
            font-size: 16px;
            color: #4a5565;
            letter-spacing: 1px;
        }
    }
`;

export const bottomContainer = css`
    background-color: white;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    width: 1000px;
    padding: 32px;
    box-sizing: border-box;
    border-radius: 14px;
`;

export const innerBox = css`
    display: flex;
    flex-direction: column;
    gap: 20px;

    & > div:nth-of-type(1),
    div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        gap: 15px;

        & > label {
            font-size: 18px;
            font-weight: 600;
            color: #364153;
        }

        & > input {
            outline: none;
            padding: 12px 8px;
            border-radius: 8px;
            border: 1px solid #dbdbdb;
            font-size: 14px;
            background-color: rgb(243, 243, 245);
            transition: all 0.2s ease;

            &:focus {
                outline: 1px solid #aaaaaa;
                box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
        }

        & > textarea {
            font-family: 'Noto Sans KR', sans-serif;
            resize: none;
            height: 150px;
            outline: none;
            padding: 12px 8px;
            border-radius: 8px;
            border: 1px solid #dbdbdb;
            font-size: 14px;
            background-color: rgb(243, 243, 245);
            transition: all 0.2s ease;

            &:focus {
                outline: 1px solid #aaaaaa;
                box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
        }
    }

    & > div:nth-of-type(3) {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > span {
            font-size: 14px;
            color: #6a7282;
        }
    }

    & > div:nth-of-type(4) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #dbdbdb;
        padding-top: 24px;
        box-sizing: border-box;
        gap: 20px;

        & > button {
            width: 100px;
            padding: 8px 24px;
            font-size: 14px;
            background-color: white;
            border: none;
            outline: 1px solid #dbdbdb;
            /* box-shadow: 0 0 0 1px #dbdbdb inset; */
            /* border: 1px solid #dbdbdb; */
            border-radius: 8px;
            box-sizing: border-box;
            cursor: pointer;
            transition: all 0.15s ease;

            &:hover {
                background-color: #f2f2f2;
            }
        }

        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
        }

        & > div > button:nth-of-type(1) {
            width: 100px;
            padding: 8px 24px;
            font-size: 14px;
            background-color: white;
            border: none;
            outline: 1px solid #dbdbdb;
            /* box-shadow: 0 0 0 1px #dbdbdb inset; */
            /* border: 1px solid #dbdbdb; */
            border-radius: 8px;
            box-sizing: border-box;
            cursor: pointer;
            transition: all 0.15s ease;

            &:hover {
                background-color: #f2f2f2;
            }
        }

        & > div > button:nth-of-type(2) {
            width: 100px;
            padding: 8px 24px;
            font-size: 14px;
            border-radius: 8px;
            border: none;
            box-sizing: border-box;
            cursor: pointer;
            transition: all 0.15s ease;
            background: #4f39f6;
            background: linear-gradient(
                90deg,
                rgba(79, 57, 246, 1) 0%,
                rgba(152, 16, 250, 1) 100%
            );
            color: white;

            &:hover {
                background: #4f39f6;
                background: linear-gradient(
                    90deg,
                    rgba(59, 37, 226, 1) 0%,
                    rgba(132, 0, 230, 1) 100%
                );
            }
        }
    }
`;

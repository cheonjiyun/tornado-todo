import styled from "styled-components";
import { variable } from "./variable";

export const PrimaryButton = styled.button`
    margin-top: 20px;
    padding: 14px;
    font-size: 16px;
    color: ${variable.buttonReadyTextColor};
    background-color: ${variable.buttonReadyBackgroundColor};
    border-radius: 6px;
    border: none;
    cursor: pointer;
`;

export const TextInput = styled.input`
    padding: 14px;
    border-radius: 6px;
    border: 1px solid ${variable.borderDefaultColor};
    font-size: 16px;

    &::placeholder {
        color: ${variable.placeholderColor};
    }
`;

export const InputLabel = styled.label`
    margin-top: 20px;
    font-size: 14px;
    color: ${variable.textDefaultColor};
    margin-bottom: 6px;
`;

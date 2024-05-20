import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type PropsType = {
    text: string;
};

export const LoginTop = ({ text }: PropsType) => {
    const navigate = useNavigate();
    return (
        <Top>
            <BackButton>
                <svg
                    onClick={() => navigate(-1)}
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M32 22.8496L14.0006 23.0001" stroke="#8E8E8E" strokeLinecap="round" />
                    <path d="M21 16L14 23" stroke="#8E8E8E" strokeLinecap="round" />
                    <path d="M21 30L14 23" stroke="#8E8E8E" strokeLinecap="round" />
                </svg>
            </BackButton>
            <p>{text}</p>
            <EmptyRight></EmptyRight>
        </Top>
    );
};

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    font-weight: 700;
`;

const EmptyRight = styled.div`
    width: 45px;
    height: 45px;
`;

const BackButton = styled.div`
    cursor: pointer;
`;

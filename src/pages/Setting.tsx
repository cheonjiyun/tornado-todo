import styled from "styled-components";
import { variable } from "../style/variable";
import { useNavigate } from "react-router-dom";

export const Setting = () => {
    const isLogin = false;

    const navigate = useNavigate();

    return (
        <div>
            <LoginArea>
                <LoginLeft>
                    <Profile></Profile>
                    {isLogin ? (
                        <NameText>이름</NameText>
                    ) : (
                        <LoginText onClick={() => navigate("/login")}>
                            로그인하여 정보를 저장하세요.
                        </LoginText>
                    )}
                </LoginLeft>
                {isLogin && <Logout>로그아웃</Logout>}
            </LoginArea>
        </div>
    );
};

const LoginArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px;
`;

const LoginLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`;

const Profile = styled.div`
    width: 40px;
    height: 40px;
    background-color: #d9d9d9;
    border-radius: 100%;
`;

const NameText = styled.div`
    color: ${variable.textDefaultColor};
`;

const LoginText = styled.div`
    color: ${variable.textDefaultColor};
`;

const Logout = styled.div`
    color: ${variable.textSecondColor};
    cursor: pointer;
`;

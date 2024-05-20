import styled from "styled-components";
import { variable } from "../style/variable";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export const Setting = () => {
    const navigate = useNavigate();

    const [isLogin, setLogin] = useState<User | null>(null);
    useEffect(() => {
        setLogin(auth.currentUser);
    }, [auth]);

    const logOut = () => {
        auth.signOut();
    };

    return (
        <div>
            <LoginArea>
                <LoginLeft>
                    <Profile></Profile>
                    {isLogin ? (
                        <NameText>{auth.currentUser?.email}</NameText>
                    ) : (
                        <LoginText onClick={() => navigate("/login")}>
                            로그인하여 정보를 저장하세요.
                        </LoginText>
                    )}
                </LoginLeft>
                {isLogin && <Logout onClick={logOut}>로그아웃</Logout>}
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

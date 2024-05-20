import styled from "styled-components";
import { variable } from "../../style/variable";
import { LoginTop } from "../../component/login/LoginTop";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";

export const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onLogin = async (email: string, password: string) => {
        try {
            setErrorMessage("");
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/setting");
        } catch (e) {
            if (e instanceof FirebaseError) {
                if (e.code == "auth/invalid-credential") {
                    setErrorMessage("유저 정보가 맞지 않습니다.");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const [, setLogin] = useState<User | null>(null);

    useEffect(() => {
        if (auth.currentUser) {
            navigate("/");
            setLogin(auth.currentUser);
        }
    }, []);

    return (
        <div>
            <LoginTop text="로그인" />
            <Middle>
                <EmailForm
                    onSubmit={handleSubmit((data) => {
                        onLogin(data.email, data.password);
                    })}
                >
                    <Label htmlFor="email">이메일</Label>
                    <TextInput
                        {...register("email", { required: "이메일을 입력하세요" })}
                        type="email"
                        name="email"
                        placeholder="이메일을 입력해주세요"
                    />
                    <InputErrorMessage>
                        {" "}
                        {errors.email && "" + errors.email.message}
                    </InputErrorMessage>
                    <Label htmlFor="password">비밀번호</Label>
                    <TextInput
                        {...register("password", {
                            required: "비밀번호를 입력해주세요",
                        })}
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력해주세요"
                    />
                    <InputErrorMessage>
                        {" "}
                        {errorMessage}
                        {errors.password && "" + errors.password.message}
                    </InputErrorMessage>
                    <ContinueButton type="submit">
                        {loading ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeDasharray="15"
                                    strokeDashoffset="15"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    d="M12 3C16.9706 3 21 7.02944 21 12"
                                >
                                    <animate
                                        fill="freeze"
                                        attributeName="stroke-dashoffset"
                                        dur="0.3s"
                                        values="15;0"
                                    />
                                    <animateTransform
                                        attributeName="transform"
                                        dur="1.5s"
                                        repeatCount="indefinite"
                                        type="rotate"
                                        values="0 12 12;360 12 12"
                                    />
                                </path>
                            </svg>
                        ) : (
                            "로그인"
                        )}
                    </ContinueButton>
                    <SignUpText onClick={() => navigate("/signup")}>회원가입하러 가기</SignUpText>
                </EmailForm>
            </Middle>
        </div>
    );
};

export const Middle = styled.div`
    padding: 25px;
`;

const EmailForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin-top: 20px;
    font-size: 14px;
    color: ${variable.textDefaultColor};
    margin-bottom: 6px;
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

export const InputErrorMessage = styled.p`
    padding: 8px;
    height: 14px;
    color: ${variable.redColor};
    font-size: 14px;
`;

const ContinueButton = styled.button`
    margin-top: 20px;
    padding: 14px;
    font-size: 16px;
    color: ${variable.buttonReadyTextColor};
    background-color: ${variable.buttonReadyBackgroundColor};
    border-radius: 6px;
    border: none;
    cursor: pointer;
`;

const SignUpText = styled.p`
    margin-top: 20px;
    padding: 14px;
    color: ${variable.primaryColor};
    text-align: center;
    cursor: pointer;
`;

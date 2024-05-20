import styled from "styled-components";
import { LoginTop } from "../../component/login/LoginTop";
import { InputErrorMessage, Label, Middle, TextInput } from "./Login";
import { variable } from "../../style/variable";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

export const Signup = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    const [existEmailMssage, setExistEmailMssage] = useState("");
    const [loading, setLoading] = useState(false);

    const onSignup = async (email: string, password: string) => {
        try {
            setLoading(true);
            setExistEmailMssage("");
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/setting");
        } catch (e) {
            if (e instanceof FirebaseError) {
                if (e.code == "auth/email-already-in-use") {
                    setExistEmailMssage("이미 있는 계정입니다!");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <LoginTop text="회원가입" />
            <Middle>
                <PassWordForm
                    onSubmit={handleSubmit((data) => {
                        onSignup(data.email, data.password);
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
                        {existEmailMssage}
                        {errors.email && "" + errors.email.message}
                    </InputErrorMessage>
                    <Label htmlFor="password">비밀번호</Label>
                    <TextInput
                        {...register("password", {
                            required: "비밀번호를 입력해주세요",
                            validate: {
                                check: (value: string) => {
                                    if (value.length < 6) {
                                        return "비밀번호를 6자 이상 입력해주세요.";
                                    }
                                },
                            },
                        })}
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력해주세요"
                    />
                    <InputErrorMessage>
                        {" "}
                        {errors.password && "" + errors.password.message}
                    </InputErrorMessage>
                    <Label htmlFor="passwordCheck">비밀번호 확인</Label>
                    <TextInput
                        {...register("passwordCheck", {
                            required: "비밀번호확인을 입력해주세요",
                            validate: {
                                check: (value: string) => {
                                    if (getValues("password") !== value) {
                                        return "비밀번호가 맞지 않습니다.";
                                    }
                                },
                            },
                        })}
                        type="password"
                        name="passwordCheck"
                        placeholder="비밀번호 한 번 더 입력해 주세요"
                    />
                    <InputErrorMessage>
                        {" "}
                        {errors.passwordCheck && "" + errors.passwordCheck.message}
                    </InputErrorMessage>
                    <SignButton type="submit">
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
                            "회원가입 완료"
                        )}
                    </SignButton>
                </PassWordForm>
            </Middle>
        </div>
    );
};

const PassWordForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const SignButton = styled.button`
    display: block;
    margin-top: 20px;
    padding: 14px;
    font-size: 16px;
    color: ${variable.buttonReadyTextColor};
    background-color: ${variable.buttonReadyBackgroundColor};
    border-radius: 6px;
    border: none;
    cursor: pointer;
`;

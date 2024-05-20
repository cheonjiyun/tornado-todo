import styled from "styled-components";
import { LoginTop } from "../../component/login/LoginTop";
import { InputErrorMessage, Label, Middle, TextInput } from "./LoginFirst";
import { variable } from "../../style/variable";
import { useForm } from "react-hook-form";

type PropsType = {
    onBefore: () => void;
    onNext: () => void;
};

export const Signup = ({ onBefore, onNext }: PropsType) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    return (
        <div>
            <LoginTop text="회원가입" onBefore={onBefore} />
            <Middle>
                <PassWordForm
                    onSubmit={handleSubmit((data) => {
                        console.log(data);
                    })}
                >
                    <Label htmlFor="password">비밀번호</Label>
                    <TextInput
                        {...register("password", {
                            required: "비밀번호를 입력해주세요",
                            minLength: 6,
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
                    <SignButton type="submit">회원가입 완료</SignButton>
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
    margin-top: 20px;
    padding: 14px;
    font-size: 16px;
    color: ${variable.buttonReadyTextColor};
    background-color: ${variable.buttonReadyBackgroundColor};
    border-radius: 6px;
    border: none;
    cursor: pointer;
`;

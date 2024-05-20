import styled from "styled-components";
import { LoginTop } from "../../component/login/LoginTop";
import { InputErrorMessage, Label, Middle, TextInput } from "./LoginFirst";
import { variable } from "../../style/variable";
import { useForm } from "react-hook-form";

type PropsType = {
    onBefore: () => void;
    onNext: () => void;
};

export const LoginInputPassword = ({ onBefore, onNext }: PropsType) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onLogin = (data) => {
        //로그인 하기
        return true;
    };

    return (
        <div>
            <LoginTop text="로그인" onBefore={onBefore} />
            <Middle>
                <PassWordForm
                    onSubmit={handleSubmit((data) => {
                        console.log(data);

                        if (onLogin(data)) {
                            onNext();
                        }
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
                    <LoginButton type="submit">계속하기</LoginButton>
                </PassWordForm>
            </Middle>
        </div>
    );
};

const PassWordForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const LoginButton = styled.button`
    margin-top: 20px;
    padding: 14px;
    font-size: 16px;
    color: ${variable.buttonReadyTextColor};
    background-color: ${variable.buttonReadyBackgroundColor};
    border-radius: 6px;
    border: none;
    cursor: pointer;
`;

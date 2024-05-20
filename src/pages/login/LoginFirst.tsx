import styled from "styled-components";
import { variable } from "../../style/variable";
import { LoginTop } from "../../component/login/LoginTop";
import { useForm } from "react-hook-form";

type PropsType = {
    onBefore: () => void;
    setData: (data) => void;
    onNext: (page) => void;
};

export const LoginFirst = ({ onBefore, onNext }: PropsType) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const existEmail = (data) => {
        // 이메일 검증
        return false;
    };

    return (
        <div>
            <LoginTop text="로그인" onBefore={onBefore} />
            <Middle>
                <EmailForm
                    onSubmit={handleSubmit((data) => {
                        console.log(data);

                        // 이메일이 있으면 비밀번호 입력 없으면 회원가입
                        if (existEmail(data)) {
                            onNext("inputPassword");
                        } else {
                            onNext("signUp");
                        }
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
                    <ContinueButton type="submit" value="계속하기"></ContinueButton>
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

const ContinueButton = styled.input`
    margin-top: 20px;
    padding: 14px;
    font-size: 16px;
    color: ${variable.buttonReadyTextColor};
    background-color: ${variable.buttonReadyBackgroundColor};
    border-radius: 6px;
    border: none;
    cursor: pointer;
`;

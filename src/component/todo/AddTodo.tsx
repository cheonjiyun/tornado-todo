import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isOpenAddTodoState } from "../../recoil/addTodo/atom";
import { useEffect, useState } from "react";
import { variable } from "../../style/variable";
import { useForm } from "react-hook-form";

export const AddTodo = () => {
    const { register, handleSubmit, setValue } = useForm();

    const [isOpenRecoilState, setOepnRecoilState] = useRecoilState(isOpenAddTodoState);
    const [isOpen, setOpen] = useState(false);

    // 애니메이션을 위해 지연 close
    useEffect(() => {
        let code = null;
        if (isOpenRecoilState) {
            setOpen(isOpenRecoilState);
        } else {
            code = setTimeout(() => {
                setOpen(isOpenRecoilState);
            }, 380);
        }

        return () => {
            if (code) {
                clearTimeout(code);
            }
        };
    }, [isOpenRecoilState]);

    // 말하기
    const [onRecording, setRecording] = useState(false);

    let recognition = null;
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ko";

    // recognition 지원안되면 막기
    const [canMike, setCanMike] = useState(true);
    useEffect(() => {
        if (!recognition) {
            setCanMike(false);
        }
    }, [recognition]);

    // 음성 인식 시작
    const startSpeech = () => {
        setRecording(true);

        recognition.addEventListener("speechstart", () => {});
        recognition.addEventListener("speechend", () => {});
        recognition.addEventListener("result", (event) => {
            setValue("newtodo", event.results[0][0].transcript);
        });

        recognition.start();

        // 3초뒤 자동으로 끝내기
        setTimeout(() => {
            endSpeech();
        }, 3000);
    };

    // 음성인식 끝
    const endSpeech = () => {
        recognition.stop();
        setRecording(false);
    };

    return (
        <>
            {isOpen && (
                <div>
                    <Dimmed
                        $isOpenRecoilState={isOpenRecoilState}
                        onClick={() => setOepnRecoilState(false)}
                    ></Dimmed>
                    <ContainerForm
                        $isOpenRecoilState={isOpenRecoilState}
                        onSubmit={handleSubmit((data) => {
                            console.log(data);
                        })}
                    >
                        <TopMenu>
                            <div>
                                {canMike && !onRecording && (
                                    <MikeButton onClick={startSpeech}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M4.5 10a.5.5 0 0 0-1 0a5.5 5.5 0 0 0 5 5.478V17.5a.5.5 0 0 0 1 0v-.706A5.5 5.5 0 0 1 9 14.5A4.5 4.5 0 0 1 4.5 10M12 5v4.6a5.5 5.5 0 0 0-2.79 3.393Q9.104 13 9 13a3 3 0 0 1-3-3V5a3 3 0 0 1 6 0m5 9.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m2 0a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-8 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 0 0-7 0"
                                            />
                                        </svg>
                                        <div>음성으로 할 일을 입력해보세요.</div>
                                    </MikeButton>
                                )}
                            </div>
                            <div></div>
                            {!onRecording && <OKbutton type="submit">완료</OKbutton>}
                        </TopMenu>
                        {onRecording ? (
                            <RecordArea onClick={endSpeech}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="18" cy="12" r="0" fill="currentColor">
                                        <animate
                                            attributeName="r"
                                            begin=".67"
                                            calcMode="spline"
                                            dur="1.5s"
                                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                            repeatCount="indefinite"
                                            values="0;2;0;0"
                                        />
                                    </circle>
                                    <circle cx="12" cy="12" r="0" fill="currentColor">
                                        <animate
                                            attributeName="r"
                                            begin=".33"
                                            calcMode="spline"
                                            dur="1.5s"
                                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                            repeatCount="indefinite"
                                            values="0;2;0;0"
                                        />
                                    </circle>
                                    <circle cx="6" cy="12" r="0" fill="currentColor">
                                        <animate
                                            attributeName="r"
                                            begin="0"
                                            calcMode="spline"
                                            dur="1.5s"
                                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                            repeatCount="indefinite"
                                            values="0;2;0;0"
                                        />
                                    </circle>
                                </svg>
                            </RecordArea>
                        ) : (
                            <Input
                                {...register("newtodo", { required: "할 일을 입력하세요" })}
                                name="newtodo"
                                type="text"
                                placeholder="할 일을 입력하세요."
                            />
                        )}
                    </ContainerForm>
                </div>
            )}
        </>
    );
};

//css
type openTypeProps = {
    $isOpenRecoilState: boolean;
};

const Dimmed = styled.div<openTypeProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;

    animation: ${(props) => (props.$isOpenRecoilState ? " showSmooth 0.4s" : "outSmooth 0.4s")};
`;

const ContainerForm = styled.form<openTypeProps>`
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    padding: 8px 18px 50px 18px;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 16px 16px 0 0;
    z-index: 3;

    animation: ${(props) => (props.$isOpenRecoilState ? "upSmooth 0.4s" : "downSmooth 0.4s")};
`;

const TopMenu = styled.div`
    min-height: 68px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
`;

const MikeButton = styled.div`
    display: flex;
    gap: 10px;
    justify-content: start;
    align-items: center;
    height: 48px;
    color: #aaaaaa;
    cursor: pointer;
`;

const OKbutton = styled.button`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 48px;
    height: 48px;
    font-size: 16px;
    color: ${variable.textDefaultColor};
    cursor: pointer;
`;

const Input = styled.input`
    box-sizing: border-box;
    width: calc(100%);
    padding: 14px;
    font-size: 16px;
    border-radius: 6px;
    border: 0px solid ${variable.borderDefaultColor};
    color: ${variable.textDefaultColor};
    background-color: #f4f5f5;

    &::placeholder {
        color: #aaaaaa;
    }

    &:focus {
        background-color: #eeeeee;
        outline: 0;
    }
`;

const RecordArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46.8px;
    color: ${variable.redColor};
    cursor: pointer;
`;

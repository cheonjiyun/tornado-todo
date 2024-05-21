import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isOpenAddTodoState } from "../../recoil/addTodo/atom";
import { useEffect, useState } from "react";
import { variable } from "../../style/variable";

export const AddTodo = () => {
    const [isOpenRecoilState, setOepnRecoilState] = useRecoilState(isOpenAddTodoState);

    useEffect(() => {
        setOpen(isOpenRecoilState);
    }, [isOpenRecoilState]);

    const [isOpen, setOpen] = useState(false);

    return (
        <>
            {isOpen && (
                <div>
                    <Dimmed onClick={() => setOepnRecoilState(false)}></Dimmed>
                    <Container>
                        <TopMenu>
                            <MikeButton>
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
                            </MikeButton>
                            <OKbutton>완료</OKbutton>
                        </TopMenu>
                        <Input placeholder="할 일을 입력하세요." />
                    </Container>
                </div>
            )}
        </>
    );
};

const Dimmed = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
`;

const Container = styled.div`
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
`;

const TopMenu = styled.div`
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
`;

const MikeButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    color: ${variable.buttonYetTextColor};
    cursor: pointer;
`;

const OKbutton = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 48px;
    height: 48px;
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

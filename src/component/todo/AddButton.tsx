import styled from "styled-components";
import { variable } from "../../style/variable";
import { useSetRecoilState } from "recoil";
import { isOpenAddTodoState } from "../../recoil/addTodo/atom";

export const AddButton = () => {
    const setOpen = useSetRecoilState(isOpenAddTodoState);

    const openAddTodoArea = () => {
        setOpen(true);
        console.log("흠");
    };

    return (
        <>
            <PlusButton onClick={openAddTodoArea}></PlusButton>
        </>
    );
};

const PlusButton = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    top: -50%;
    width: 4rem;
    height: 4rem;
    background-color: ${variable.primaryColor};
    border-radius: 100%;
    transition: transform 0.3s;
    cursor: pointer;
    z-index: 1;

    &:hover {
        transform: scale(120%);
    }

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 2px;
        background-color: #f0f5f8;
        transform: translate(-50%, -50%);
        border-radius: 16px;
    }

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 16px;
        background-color: #f0f5f8;
        transform: translate(-50%, -50%);
        border-radius: 16px;
    }
`;

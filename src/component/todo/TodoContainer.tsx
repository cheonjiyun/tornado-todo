import styled from "styled-components";
import { TodoType } from "../../type/todo";

type PropsType = {
    todo: TodoType;
    toggleCheck: (id: number, urrentCompleted: boolean) => void;
    setEditOpen: () => void;
    setEditCurrentTodo: (current: TodoType) => void;
};

export const TodoContainer = ({
    todo,
    toggleCheck,
    setEditOpen,
    setEditCurrentTodo,
}: PropsType) => {
    return (
        <Container>
            <TodoLeft>
                <CheckBox
                    $completed={todo.completed}
                    onClick={() => toggleCheck(todo.id, todo.completed)}
                >
                    {todo.completed && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 7L10 17l-5-5"
                            />
                        </svg>
                    )}
                </CheckBox>
                <TodoText $completed={todo.completed}>{todo.text}</TodoText>
            </TodoLeft>
            <EditButton
                onClick={() => {
                    setEditOpen();
                    setEditCurrentTodo(todo);
                }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.71 7.54C21.1 7.15 21.1 6.5 20.71 6.13L18.37 3.79C18 3.4 17.35 3.4 16.96 3.79L15.12 5.62L18.87 9.37M3 17.75V21.5H6.75L17.81 10.43L14.06 6.68L3 17.75Z"
                        fill="#545454"
                    />
                </svg>
            </EditButton>
        </Container>
    );
};
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 8px;
    padding: 16px;
    background-color: #f7f7f7;
    border-radius: 6px;
`;

const TodoLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

type completedType = {
    $completed: boolean;
};

const CheckBox = styled.div<completedType>`
    width: 20px;
    height: 20px;
    border: 1px solid #8e8e8e;

    cursor: pointer;

    &:active {
        transform: scale(90%);
    }

    ${(props) => props.$completed && "color: #b3b3b3; border: 1px solid #b3b3b3; "};
`;

const TodoText = styled.div<completedType>`
    font-size: 16px;

    ${(props) => props.$completed && "text-decoration: line-through; color: #b3b3b3"};
`;

const EditButton = styled.div`
    cursor: pointer;
`;

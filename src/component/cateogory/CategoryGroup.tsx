import { useEffect, useState } from "react";
import styled from "styled-components";
import { todosRecoil } from "../../recoil/todos/atom";
import { useRecoilState } from "recoil";

type PropsType = {
    category: string;
};

export const CategoryGroup = ({ category }: PropsType) => {
    const [isOpen, setOpen] = useState(false);
    const [todos] = useRecoilState(todosRecoil);

    const [categoryTodos, setCategoryTodos] = useState<string[] | undefined>([]);
    useEffect(() => {
        const todoFilters = todos.filter((todo) => todo.category === category);

        setCategoryTodos(todoFilters.map((todo) => todo.text));
    }, [todos]);

    return (
        <Group>
            <CategoryTitle>
                {category}
                <Arrow $isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22.6667 18.6667L16 12L9.33333 18.6667"
                            stroke="#210909"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </Arrow>
            </CategoryTitle>
            {isOpen && (
                <TodoListGroup>
                    {categoryTodos ? categoryTodos.map((todo) => <TodoList>{todo}</TodoList>) : ""}
                </TodoListGroup>
            )}
        </Group>
    );
};

const Group = styled.div`
    margin: 8px;
    padding: 16px;
    background-color: #ffffff;
`;
const CategoryTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 600;
`;

type ArrowType = {
    $isOpen: boolean;
};

const Arrow = styled.div<ArrowType>`
    display: flex;
    justify-content: center;
    align-items: center;

    transform: ${(props) => props.$isOpen || "rotate(180deg)"};

    cursor: pointer;
`;

const TodoListGroup = styled.div`
    margin-top: 22px;
`;

const TodoList = styled.div`
    margin: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
`;

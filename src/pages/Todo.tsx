import styled from "styled-components";
import { variable } from "../style/variable";
import { TodoContainer } from "../component/todo/TodoContainer";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { todosRecoil } from "../recoil/todos/atom";

export const Todo = () => {
    const [todos, setTodos] = useRecoilState(todosRecoil);

    useEffect(() => {
        setTodos([
            { id: 1, text: "할일", completed: false },
            { id: 2, text: "할일일일", completed: true },
        ]);
    }, []);

    const toggleCheckTodo = (id: number) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            }
            return todo;
        });

        setTodos(newTodos);
    };

    return (
        <div>
            <Title>폭풍 할일</Title>
            {todos.map((todo) => {
                return <TodoContainer todo={todo} key={todo.text} toggleCheck={toggleCheckTodo} />;
            })}
        </div>
    );
};

const Title = styled.div`
    padding: 16px;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    color: ${variable.primaryColor};
`;

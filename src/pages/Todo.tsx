import styled from "styled-components";
import { variable } from "../style/variable";
import { TodoContainer } from "../component/todo/TodoContainer";
import { useEffect, useState } from "react";
import { TodoType } from "../type/todo";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { todosRecoil } from "../recoil/todos/atom";
import { useRecoilState } from "recoil";

export const Todo = () => {
    const [todos, setTodos] = useRecoilState(todosRecoil);

    // useEffect(() => {
    //     setTodos([
    //         { id: 1, text: "할일", completed: false },
    //         { id: 2, text: "할일일일", completed: true },
    //     ]);
    // }, []);

    // const [todos, setTodos] = useState<TodoType[]>([])

    const fetchTodos = async () => {
        const todoQuerys = query(collection(db, "todos"), orderBy("calendar"));
        const snapshot = await getDocs(todoQuerys);
        const getTodos: TodoType[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                userEmail: data.userEmail,
                id: data.id,
                text: data.text,
                completed: data.completed,
                calendar: data.calendar ? new Date(data.calendar) : null,
                category: data.category ?? null, // null 병합 연산자 사용
            };
        });

        setTodos(getTodos);
    };

    useEffect(() => {
        fetchTodos();
    }, [todos]);

    const toggleCheckTodo = (id: number) => {
        // const newTodos = todos.map((todo) => {
        //     if (todo.id === id) {
        //         return {
        //             ...todo,
        //             completed: !todo.completed,
        //         };
        //     }
        //     return todo;
        // });
        // setTodos(newTodos);
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

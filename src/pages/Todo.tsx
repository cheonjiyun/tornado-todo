import styled from "styled-components";
import { variable } from "../style/variable";
import { TodoContainer } from "../component/todo/TodoContainer";
import { useEffect, useRef, useState } from "react";
import { TodoType } from "../type/todo";
import {
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    startAt,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { todosRecoil } from "../recoil/todos/atom";
import { useRecoilState } from "recoil";
import { EditTodo } from "../component/todo/EditTodo";

export const Todo = () => {
    const [todos, setTodos] = useRecoilState(todosRecoil);

    const lastPage = useRef<number>(0);
    const isLoading = useRef(false);

    const fetchTodos = async () => {
        if (isLoading.current) return;

        try {
            isLoading.current = true;
            const todoQuerys = query(
                collection(db, "todos"),
                orderBy("id"),
                startAt(lastPage.current),
                limit(20)
            );
            const snapshot = await getDocs(todoQuerys);

            lastPage.current = lastPage.current + snapshot.docs.length;
            const getTodos: TodoType[] = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    userEmail: data.userEmail,
                    id: data.id,
                    text: data.text,
                    completed: data.completed,
                    calendar: data.calendar ? data.calendar.toDate() : null,
                    category: data.category ?? null,
                };
            });
            setTodos((todos) => [...todos, ...getTodos]);
        } catch (e) {
            console.log(e);
        } finally {
            isLoading.current = false;
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // 무한스크롤 페이지네이션
    useEffect(() => {
        const observerTodo = new IntersectionObserver(fetchTodos, {
            threshold: 0,
        });
        const $observerTodo = document.getElementById("observerTodo");

        if ($observerTodo) {
            observerTodo.observe($observerTodo);
        }
    }, []);

    // check
    const toggleCheckTodo = async (id: number, currentCompleted: boolean) => {
        try {
            await updateDoc(doc(db, "todos", `${id}`), {
                completed: !currentCompleted,
            });
        } catch (e) {
            console.log(e);
        }
    };

    // edit
    const [editOpen, setEditOpen] = useState(false);
    const [editCurrentTodo, setEditCurrentTodo] = useState<TodoType>({
        userEmail: "",
        id: 0,
        text: "",
        completed: false,
        calendar: null,
        category: null,
    });

    return (
        <Container>
            <Title>폭풍 할일</Title>
            {todos.map((todo) => {
                return (
                    <TodoContainer
                        todo={todo}
                        key={todo.text}
                        toggleCheck={toggleCheckTodo}
                        setEditOpen={() => setEditOpen(true)}
                        setEditCurrentTodo={(current: TodoType) => setEditCurrentTodo(current)}
                    />
                );
            })}
            <EditTodo
                editCurrentTodo={editCurrentTodo}
                editOpen={editOpen}
                setEditClose={() => {
                    setEditOpen(false);
                    location.reload();
                }}
            />
            <div id="observerTodo" style={{ height: "40px" }}></div>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: scroll;
`;
const Title = styled.div`
    padding: 16px;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    color: ${variable.primaryColor};
`;

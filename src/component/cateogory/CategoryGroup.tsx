import { useEffect, useState } from "react";
import styled from "styled-components";
import { todosRecoil } from "../../recoil/todos/atom";
import { useRecoilState } from "recoil";
import { TodoType } from "../../type/todo";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

type PropsType = {
    category: string;
};

export const CategoryGroup = ({ category }: PropsType) => {
    const [isOpen, setOpen] = useState(false);
    const [todos] = useRecoilState(todosRecoil);

    const [categoryTodos, setCategoryTodos] = useState<TodoType[]>([]);
    useEffect(() => {
        const todoFilters = todos.filter((todo) => todo.category === category);

        setCategoryTodos(todoFilters);
    }, [todos]);

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
                    {categoryTodos
                        ? categoryTodos.map((todo) => (
                              <TodoList>
                                  <CheckBox
                                      $completed={todo.completed}
                                      onClick={() => toggleCheckTodo(todo.id, todo.completed)}
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
                                  </CheckBox>{" "}
                                  <TodoText $completed={todo.completed}>{todo.text}</TodoText>
                              </TodoList>
                          ))
                        : ""}
                </TodoListGroup>
            )}
        </Group>
    );
};

type completedType = {
    $completed: boolean;
};

const Group = styled.div`
    margin: 8px;
    padding: 16px;
    background-color: #ffffff;
`;

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

    transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};

    cursor: pointer;
`;

const TodoListGroup = styled.div`
    margin-top: 22px;
`;

const TodoList = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
`;

const TodoText = styled.div<completedType>`
    font-size: 16px;

    ${(props) => props.$completed && "text-decoration: line-through; color: #b3b3b3"};
`;

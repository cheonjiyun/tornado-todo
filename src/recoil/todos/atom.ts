import { atom } from "recoil";
import { TodoType } from "../../type/todo";

export const todosRecoil = atom<TodoType[]>({
    key: "todosRecoil",
    default: [],
});

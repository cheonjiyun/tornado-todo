import styled from "styled-components";
import { variable } from "../../style/variable";
import { InputLabel } from "../../style/styleComponents";
import { useEffect, useState } from "react";
import { CategoryType, TodoType } from "../../type/todo";
import { SubmitHandler, useForm } from "react-hook-form";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

type PropsType = {
    editOpen: boolean;
    setEditClose: () => void;
    editCurrentTodo: TodoType;
};

export const EditTodo = ({ editCurrentTodo, editOpen, setEditClose }: PropsType) => {
    // open
    const [isOpenForView, setOepnForView] = useState(false);

    useEffect(() => {
        let code = null;
        if (editOpen) {
            setOepnForView(editOpen);
        } else {
            code = setTimeout(() => {
                setOepnForView(editOpen);
            }, 260);
        }

        return () => {
            if (code) {
                clearTimeout(code);
            }
        };
    }, [editOpen]);

    // form
    const { register, handleSubmit, setValue } = useForm();

    // 처음 입력
    useEffect(() => {
        setValue("text", editCurrentTodo.text);
    }, [editCurrentTodo]);

    const user = auth.currentUser;
    // 카테고리 추가
    const onAddCategory = async (data) => {
        if (!user || !user.email) {
            return;
        }

        const newCategory: CategoryType = {
            userEmail: user.email,
            category: data.category,
        };

        try {
            await addDoc(collection(db, "category"), newCategory);
            setValue("category", "");
        } catch (e) {
            console.log(e);
        }
    };

    // edit-삭제
    const deleteTodo = async (id: number) => {
        try {
            await deleteDoc(doc(db, "todos", `${id}`));
            setEditClose();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {isOpenForView && (
                <div>
                    <Dimmed $editOpen={editOpen}></Dimmed>
                    <Container $editOpen={editOpen}>
                        <Top>
                            <Xbutton onClick={() => setEditClose()}>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1 15.1422L15.1421 1.00002"
                                        stroke="#8E8E8E"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M1 1L15.1421 15.1421"
                                        stroke="#8E8E8E"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </Xbutton>
                            <OKbutton onClick={setEditClose}>완료</OKbutton>
                        </Top>
                        <InputLabel htmlFor="text">할일</InputLabel>
                        <Input
                            {...register("text", { required: "할 일을 입력하세요" })}
                            type="text"
                            id="text"
                            name="text"
                        />
                        <InputLabel htmlFor="calendar">할날짜</InputLabel>
                        <Input name="calendar" />
                        <CategoryForm
                            onSubmit={handleSubmit((data) => {
                                onAddCategory(data);
                            })}
                        >
                            <InputLabel htmlFor="category">카테고리</InputLabel>
                            <Input
                                {...register("category", {
                                    required: "카테고리를 추가하게 하세요",
                                })}
                                name="category"
                                placeholder="새로운 카테고리를 입력하여 추가할 수 있어요"
                            />
                        </CategoryForm>
                        <CategoryContainer>
                            <CategoryRadio id="1" type="radio" name="category" value={"집"} />
                            <CategoryLabel htmlFor="1">집</CategoryLabel>
                            <CategoryRadio id="2" type="radio" name="category" value={"학"} />
                            <CategoryLabel htmlFor="2">학</CategoryLabel>
                        </CategoryContainer>
                        <DeleteButton onClick={() => deleteTodo(editCurrentTodo.id)}>
                            삭제
                        </DeleteButton>
                    </Container>
                </div>
            )}
        </>
    );
};

type openTypeProps = {
    $editOpen: boolean;
};

const Dimmed = styled.div<openTypeProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;

    animation: ${(props) => (props.$editOpen ? " showSmooth 0.3s" : "outSmooth 0.3s")};
`;

const Container = styled.div<openTypeProps>`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    padding-top: 100px;
    background-color: #ffffff;
    z-index: 3;
    animation: ${(props) => (props.$editOpen ? "upSmooth 0.3s" : "downSmooth 0.3s")};
`;

const Top = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-bottom: 50px;
    background-color: #ffffff;
    cursor: pointer;
`;

const Xbutton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
`;

const OKbutton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    height: 50px;
`;

const Input = styled.input`
    box-sizing: border-box;
    width: calc(100%);
    margin-top: 6px;
    margin-bottom: 16px;
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

const CategoryForm = styled.form``;

const CategoryContainer = styled.div`
    margin-top: 10px;
`;

const CategoryRadio = styled.input`
    display: none;

    &:checked + label {
        color: #ffffff;
        background-color: ${variable.primaryColor};
        border: 1px solid ${variable.primaryColor};
    }
`;

const CategoryLabel = styled.label`
    padding: 10px;
    border-radius: 6px;
    border: 1px solid ${variable.borderDefaultColor};
    font-size: 16px;
`;

const DeleteButton = styled.div`
    margin-top: 40px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
`;

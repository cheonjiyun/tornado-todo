import styled from "styled-components";
import { variable } from "../../style/variable";
import { InputLabel } from "../../style/styleComponents";
import { useEffect, useState } from "react";
import { CategoryType, TodoType } from "../../type/todo";
import { useForm } from "react-hook-form";
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { Calendar } from "../../pages/Calendar";

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
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);
    useEffect(() => {
        setValue("text", editCurrentTodo.text);
        setValue(
            "calendar",
            editCurrentTodo.calendar ? editCurrentTodo.calendar.toLocaleDateString() : ""
        );

        setCurrentCategory(editCurrentTodo.category);
    }, [editCurrentTodo]);

    const user = auth.currentUser;

    // 날짜선택
    const [calendarOpen, setCalendarOpen] = useState(false);
    const setCalendarDate = async (calendarDate: Date) => {
        try {
            await updateDoc(doc(db, "todos", `${editCurrentTodo.id}`), {
                calendar: calendarDate,
            });
        } catch (e) {
            console.log(e);
        }
        setValue("calendar", calendarDate.toLocaleDateString());
        setCalendarOpen(false);
    };

    // 카테고리 추가
    const [categorys, setCategorys] = useState<string[]>([]);

    const onAddCategory = async (data) => {
        if (!user || !user.email) {
            return;
        }

        const newCategory: CategoryType = {
            userEmail: user.email,
            category: data.category,
        };

        try {
            await setDoc(doc(db, "category", `${categorys.length}`), newCategory);
            setValue("category", "");
        } catch (e) {
            console.log(e);
        } finally {
            getCategory();
        }
    };

    // 카테고리 불러오기
    const getCategory = async () => {
        const snapshot = await getDocs(collection(db, "category"));

        const categoryList: string[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return data.category;
        });

        setCategorys(categoryList);
    };

    useEffect(() => {
        getCategory();
    }, []);

    // 카테고리 선택
    const setCategory = async (categoryName: string) => {
        try {
            await updateDoc(doc(db, "todos", `${editCurrentTodo.id}`), {
                category: categoryName,
            });
        } catch (e) {
            console.log(e);
        }
        setCurrentCategory(categoryName);
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
                        <SelectDateContainer onClick={() => setCalendarOpen(true)}>
                            <Input {...register("calendar")} placeholder="날짜를 선택해주세요." />
                            <DateSelectButton>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z"
                                        fill="#545454"
                                    />
                                </svg>
                            </DateSelectButton>
                        </SelectDateContainer>
                        {/* <DateSelectContainer>
                            <EachDateGroup>
                                <EachDate>2023</EachDate>
                                <EachDate>2024</EachDate>
                                <EachDate>2025</EachDate>
                                <EachDate>2023</EachDate>
                                <EachDate>2024</EachDate>
                                <EachDate>2025</EachDate>
                            </EachDateGroup>
                            <EachDateGroup>
                                <EachDate>04</EachDate>
                                <EachDate>05</EachDate>
                                <EachDate>06</EachDate>
                            </EachDateGroup>
                            <EachDateGroup>
                                <EachDate>16</EachDate>
                                <EachDate>17</EachDate>
                                <EachDate>18</EachDate>
                            </EachDateGroup>
                        </DateSelectContainer> */}
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
                            {categorys.map((category, i) => {
                                return (
                                    <>
                                        <CategoryRadio
                                            id={category}
                                            type="radio"
                                            name="category"
                                            value={category}
                                            onChange={() => setCategory(category)}
                                            checked={currentCategory === category}
                                            key={`${category} ${i} radio`}
                                        />
                                        <CategoryLabel
                                            htmlFor={category}
                                            key={`${category} ${i} label`}
                                        >
                                            {category}
                                        </CategoryLabel>
                                    </>
                                );
                            })}
                        </CategoryContainer>
                        <DeleteButton onClick={() => deleteTodo(editCurrentTodo.id)}>
                            삭제
                        </DeleteButton>
                        {calendarOpen && (
                            <>
                                <ModalWhite onClick={() => setCalendarOpen(false)}></ModalWhite>
                                <CalendarModal>
                                    <Calendar setCalendarDate={setCalendarDate} />
                                </CalendarModal>
                            </>
                        )}
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

const SelectDateContainer = styled.div`
    position: relative;
    cursor: pointer;
`;

const DateSelectButton = styled.div`
    position: absolute;
    top: 2px;
    right: 0;
    padding: 14px;
    font-size: 14px;
`;

const DateSelectContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;

    &::before {
        content: "";
        position: absolute;
        top: 7px;
        left: 1px;
        width: calc(100% - 2px);
        height: 40px;
        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.6) 70%,
            rgba(255, 255, 255, 0.2) 100%
        );
        border-radius: 6px 6px 0 0;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 17px;
        left: 1px;
        width: calc(100% - 2px);
        height: 40px;
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.6) 70%,
            rgba(255, 255, 255, 0.2) 100%
        );
        border-radius: 0 0 6px 6px;
    }
`;

const EachDateGroup = styled.div`
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 6px;
    margin-bottom: 16px;
    border: 1px solid ${variable.borderDefaultColor};
    height: 120px;
    overflow: scroll;

    &:not(:first-child) {
        border-left: 0px solid ${variable.borderDefaultColor};
    }

    &:first-child {
        border-radius: 6px 0 0 6px;
    }
    &:last-child {
        border-radius: 0 6px 6px 0;
    }

    z-index: 1;
`;

const EachDate = styled.div`
    padding: 10px;
    font-size: 16px;
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
    margin: 6px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid ${variable.borderDefaultColor};
    font-size: 16px;
    cursor: pointer;
`;

const DeleteButton = styled.div`
    margin-top: 40px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
`;

const ModalWhite = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
`;

const CalendarModal = styled.div`
    box-sizing: border-box;
    position: absolute;
    margin: auto;
    width: 95%;
    height: 70%;
    top: 50%;
    //border: 1px solid ${variable.borderDefaultColor};
    border-radius: 16px;
    transform: translate(0, -50%);
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
    overflow: scroll;

    z-index: 3;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

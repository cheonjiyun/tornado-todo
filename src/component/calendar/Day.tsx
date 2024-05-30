import styled from "styled-components";
import { variable } from "../../style/variable";
import { restDates } from "../../store/restDate";
import { getRestInfo } from "../../axios/http";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { todosRecoil } from "../../recoil/todos/atom";

type PropsType = {
    date: Date;
    index: number;
    displayYearMonth: (year: number, month: number) => void;
    setCalendarDate?: (calendarDate: Date) => void;
};

export const Day = ({ date, displayYearMonth, setCalendarDate }: PropsType) => {
    const [color, setColor] = useState("default");

    useEffect(() => {
        if (isRest(date)) {
            setColor("red");
        } else if (date.getDay() == 0) {
            setColor("red");
        } else if (date.getDay() == 6) {
            setColor("blue");
        }
    }, []);

    const [todos] = useRecoilState(todosRecoil);
    const todoFilters = todos.filter((todo) => {
        if (
            todo.calendar?.getFullYear() === date.getFullYear() &&
            todo.calendar.getMonth() === date.getMonth() &&
            todo.calendar.getDate() === date.getDate()
        ) {
            return true;
        } else {
            return false;
        }
    });

    return (
        <Container
            $color={color}
            onMouseEnter={() => {
                displayYearMonth(+date.getFullYear(), date.getMonth() + 1);
            }}
            onClick={() => setCalendarDate && setCalendarDate(date)}
        >
            <DateText>{date.getDate()}</DateText>
            <TodosDiv>
                {todoFilters && todoFilters.map((todo) => <TodoDiv>{todo.text}</TodoDiv>)}
            </TodosDiv>
        </Container>
    );
};

const colorVal = {
    red: variable.redColor,
    default: variable.textDefaultColor,
    blue: variable.primaryColor,
};

type PropsColor = {
    $color: string;
};

const Container = styled.div<PropsColor>`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    color: ${(props) => colorVal[props.$color]};
`;

const DateText = styled.div`
    padding: 6px;
    text-align: center;
`;

const TodosDiv = styled.div`
    overflow: scroll;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const TodoDiv = styled.div`
    margin: 2px;
    color: #ffffff;
    font-weight: 300;
    background-color: ${variable.primaryColor};
    padding: 6px;
    border-radius: 6px;
`;

const isRest = (date: Date) => {
    const fullyearString: string = String(date.getFullYear());
    const monthString: string = String(date.getMonth() + 1).padStart(2, "0");
    const dayString: string = String(date.getDate()).padStart(2, "0");

    if (!(fullyearString in restDates)) {
        restDates[fullyearString] = { monthString: [] };
    }
    if (!(fullyearString in restDates) || !(monthString in restDates[fullyearString])) {
        // 년도가 없음
        //달이 없음
        (async () => {
            const response = await getRestInfo(fullyearString, monthString);
            const item = response.response.body.items.item;
            if (!item) {
                // 공휴일이 없으면
                return;
            }
            if (!item.length) {
                // 공휴일이 하나밖에 없으면
                const year = `${item.locdate}`.slice(0, 4);
                const month = `${item.locdate}`.slice(4, 6);
                const day = `${item.locdate}`.slice(6, 8);
                restDates[year][month] = [day];
            } else {
                // 공휴일이 여러개
                const year = `${item[0].locdate}`.slice(0, 4);
                const month = `${item[0].locdate}`.slice(4, 6);
                const dayArr = [];
                for (let i = 0; i < item.length; i++) {
                    const day = `${item[i].locdate}`.slice(6, 8);
                    dayArr.push(day);
                }

                restDates[year][month] = dayArr;
            }
        })();
    }

    if (
        restDates[fullyearString] &&
        restDates[fullyearString][monthString] &&
        restDates[fullyearString][monthString].includes(dayString)
    ) {
        return true;
    }
};

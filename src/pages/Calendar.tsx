import styled from "styled-components";
import { Week } from "../component/calendar/Week";
import { Day } from "../component/calendar/Day";
import { useEffect, useRef, useState } from "react";
import { getRestInfo } from "../axios/http";

export const Calendar = () => {
    const today = new Date();
    const todayDate = today.getDate();

    // 가장 가까운 일요일
    const getCloseSunday = () => {
        for (let i = 0; i < 7; i++) {
            const temp = new Date();
            temp.setDate(todayDate - i);
            if (temp.getDay() == 0) {
                return temp;
            }
        }
        return today;
    };

    // 일요일을 기점으로 일주일 반환
    const getAWeek = (date: Date) => {
        const arr: Date[] = [];
        for (let i = 0; i < 7; i++) {
            arr.push(new Date(+date + 86400000 * i));
        }
        return arr;
    };

    const [weeks, setWeeks] = useState<Date[][]>([getAWeek(getCloseSunday())]);

    // 새 일주일
    const addNewWeek = (topBottom: "TOP" | "BOTTOM") => {
        const temp = [...weeks];
        if (topBottom === "TOP") {
            const firstSunDayDate = temp[0][0];
            const newWeek = getAWeek(new Date(+firstSunDayDate - 86400000 * 7));
            temp.unshift(newWeek);
        } else {
            const lastSunDayDate = temp[temp.length - 1][0];
            const newWeek = getAWeek(new Date(+lastSunDayDate + 86400000 * 7));
            temp.push(newWeek);
        }

        setWeeks(temp);
    };

    const [scrollCountBottom, setScrollBottom] = useState(0);
    const observerscrollBottom = () => {
        setScrollBottom((scrollCountBottom) => scrollCountBottom + 1);
    };
    const [scrollCountTop, setScrollTop] = useState(0);
    const observerscrollTOP = () => {
        setScrollTop((scrollCountTop) => scrollCountTop + 1);
    };

    useEffect(() => {
        const observerTop = new IntersectionObserver(observerscrollTOP, {
            threshold: 0,
        });
        const $observerTop = document.getElementById("observerTop");
        if ($observerTop) {
            observerTop.observe($observerTop);
        }

        const observerBottom = new IntersectionObserver(observerscrollBottom, {
            threshold: 0,
        });
        const $observerBottom = document.getElementById("observerBottom");
        if ($observerBottom) {
            observerBottom.observe($observerBottom);
        }
    }, []);

    useEffect(() => {
        if (weeks.length < 4) {
            addNewWeek("TOP");
        } else if (weeks.length < 7) {
            addNewWeek("BOTTOM");
            thirdItemRef.current?.scrollIntoView({ block: "center" });
        }
    }, [weeks]);

    const thirdItemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        addNewWeek("TOP");
        thirdItemRef.current?.scrollIntoView({ block: "center" });
    }, [scrollCountTop]);

    useEffect(() => {
        addNewWeek("BOTTOM");
    }, [scrollCountBottom]);

    // 연도 월 표시
    const [currentYear, setCurrentYear] = useState(+today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);

    const displayYearMonth = (year: number, month: number) => {
        setCurrentYear(year);
        setCurrentMonth(month);
    };

    return (
        <Container>
            <Number>
                {currentYear}.{currentMonth}
            </Number>
            <Contents>
                <div id="observerTop" style={{ height: "10px", margin: "-5px" }}></div>
                {weeks.map((week, idx) => (
                    <Week ref={idx === 3 ? thirdItemRef : null} key={`${week[0]} ${idx}`}>
                        <>
                            {week.map((date, i) => {
                                return (
                                    <Day
                                        displayYearMonth={displayYearMonth}
                                        date={date}
                                        key={`${date} ${i}`}
                                        index={i}
                                    />
                                );
                            })}
                        </>
                    </Week>
                ))}
                <div id="observerBottom" style={{ height: "10px" }}></div>
            </Contents>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    /* min-height: 100vh; */
    height: 100vh;
    background-color: #f6f6f6;
`;

const Number = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    border-bottom: 1px solid #cccccc;
    background-color: #f6f6f6;
`;

const Contents = styled.div`
    height: calc(100% - 100px);
    padding-top: 60px;
    overflow: scroll;
`;

import styled from "styled-components";
import { Week } from "../component/calendar/Week";
import { Day } from "../component/calendar/Day";
import { useEffect, useRef, useState } from "react";

export const Calendar = () => {
    const today = new Date();
    const todayDate = today.getDate();

    // 가장 가까운 일요일
    const getCloseSunday = () => {
        for (let i = 0; i < 7; i++) {
            const temp = new Date();
            temp.setDate(todayDate - i);
            if (temp.getDay() == 0) {
                return temp.getDate();
            }
        }
        return today.getDate();
    };

    // 일요일을 기점으로 일주일 반환
    const getAWeek = (date: number) => {
        const arr: Date[] = [];

        for (let i = 0; i < 7; i++) {
            const temp = new Date();
            temp.setDate(date + i);
            arr.push(temp);
        }

        return arr;
    };

    // const weeks = [getAWeek(getCloseSunday())];
    const [weeks, setWeeks] = useState<Date[][]>([getAWeek(getCloseSunday())]);

    // 뒤로 새 일주일
    const addNewWeek = (topBottom: "TOP" | "BOTTOM") => {
        console.log(topBottom);

        const temp = [...weeks];
        if (topBottom === "TOP") {
            const firstSunDayDate = temp[0][0].getDate();
            const newWeek = getAWeek(firstSunDayDate - 7);
            temp.unshift(newWeek);
        } else {
            const lastSunDayDate = temp[temp.length - 1][0].getDate();
            const newWeek = getAWeek(lastSunDayDate + 7);
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
        }
        firstItemRef.current?.scrollIntoView({ block: "center" });
    }, [weeks]);

    const firstItemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        addNewWeek("TOP");
        firstItemRef.current?.scrollIntoView({ block: "center" });
    }, [scrollCountTop]);

    useEffect(() => {
        addNewWeek("BOTTOM");
    }, [scrollCountBottom]);

    return (
        <Container>
            <Number>2024.05</Number>
            <Contents>
                <div id="observerTop" style={{ height: "10px", margin: "-5px" }}></div>
                {weeks.map((week, idx) => (
                    <Week ref={idx === 3 ? firstItemRef : null} key={`${week[0]} ${idx}`}>
                        <>
                            {week.map((date, i) => {
                                return <Day date={date} key={`${date} ${i}`} index={i} />;
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

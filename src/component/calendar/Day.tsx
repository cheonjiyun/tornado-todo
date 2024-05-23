import styled from "styled-components";
import { variable } from "../../style/variable";

type PropsType = {
    date: Date;
    index: number;
};

export const Day = ({ date, index }: PropsType) => {
    return <Container $color={index}>{date.getDate()}</Container>;
};

type PropsColor = {
    $color: number;
};

const Container = styled.div<PropsColor>`
    display: flex;
    justify-content: center;
    flex: 1;
    height: 100%;
    padding-top: 10px;
    color: ${(props) => (props.$color == 0 ? variable.redColor : variable.textDefaultColor)};
`;

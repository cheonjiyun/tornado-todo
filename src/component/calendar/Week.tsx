import { forwardRef } from "react";
import styled from "styled-components";

type PropsType = {
    children: JSX.Element;
};

export const Week = forwardRef(
    ({ children }: PropsType, ref: React.ForwardedRef<HTMLDivElement>) => {
        return <Container ref={ref}>{children}</Container>;
    }
);

const Container = styled.div`
    display: flex;
    margin: 10px 2% 0 2%;
    height: 16%;
    border-top: 1px solid #cccccc;
`;

import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { CategoryGroup } from "../component/cateogory/CategoryGroup";

export const Category = () => {
    // 카테고리 불러오기
    const [categorys, setCategorys] = useState<string[]>([]);

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

    return (
        <Container>
            {categorys.map((category) => (
                <CategoryGroup category={category} />
            ))}
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    /* min-height: 100vh; */
    height: 99vh;
    padding-top: 1px;
    background-color: #f6f6f6;
`;

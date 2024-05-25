type restItem = {
    locdate: number;
    dateName: string;
    dateKind: string;
    isHoliday: number;
    seq: number;
};

export type RestDate = {
    response: {
        body: {
            items: {
                item: restItem | restItem[];
            };
        };
    };
};

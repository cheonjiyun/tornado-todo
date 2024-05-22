export type TodoType = {
    userEmail: string;
    id: number;
    text: string;
    completed: boolean;
    calendar: Date | null;
    category: string | null;
};

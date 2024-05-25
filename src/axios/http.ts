import { RestDate } from "../type/restdayapi";
import { http } from "./axiosInstance";

export const getRestInfo = (year: string, month: string) => {
    return http.get<RestDate>(
        `/getRestDeInfo?serviceKey=${
            import.meta.env.VITE_SERVICE_KEY
        }&solYear=${year}&solMonth=${month.padStart(2, "0")}`
    );
};

import axios from "axios";

export const resolveBacktickVulnerability = async (code: string) => {
    const { data } = await axios.post(`${ import.meta.env.VITE_API_URL }/php/backticks`, { code });
    return data;
}
import {useQuery} from "@tanstack/react-query"
import type {DutyRoster} from "@/types/DutyRoster.ts";



export const useDutyRosters = () =>
    useQuery({
        queryKey: ["dutyRosters"],
        queryFn: async () => {
            const response = await fetch("http://localhost:8080/rosters");
            if (!response.ok) throw new Error("failed to fetch rosters");
            console.log(response);
            return await response.json() as Promise<DutyRoster[]>;
        }
    })
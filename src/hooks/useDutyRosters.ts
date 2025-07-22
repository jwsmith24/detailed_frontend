import {useQuery} from "@tanstack/react-query"

export interface DutyRoster {
    id: number;
    description: string;
    detailType: string;
    dutyAssignments: string[];
}

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
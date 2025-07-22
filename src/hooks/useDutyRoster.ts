import {useQuery} from "@tanstack/react-query";
import type {DutyRoster} from "@/types/DutyRoster.ts";


export const useDutyRoster = (id?:string) =>
    useQuery({
        queryKey:["roster", id],
        queryFn: async () => {
            const response =  await fetch(`http://localhost:8080/rosters/${id}`);
            if (!response.ok) throw new Error(`failed to fetch roster with ID: ${id}`);
            return await response.json() as Promise<DutyRoster>;
        },
        enabled: !!id,
    })

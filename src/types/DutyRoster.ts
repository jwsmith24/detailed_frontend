import type {DetailType} from "@/types/DetailType.ts";

export interface DutyRoster {
    id?: number;
    description: string;
    detailType: DetailType;
    dutyAssignments: string[];
}


export const detailTypeLabels: Record<DetailType, string> = {
    CQ_NCO: "CQ NCO",
    CQ_RUNNER: "CQ Runner",
    SD_NCO: "Staff Duty NCO",
    SD_RUNNER: "Staff Duty Runner",
    ROAD_GUARD: "Road Guard"
}


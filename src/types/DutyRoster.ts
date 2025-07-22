export interface DutyRoster {
    id: number;
    description: string;
    detailType: DetailType;
    dutyAssignments: string[];
}

export type DetailType = "CQ_NCO" | "CQ_RUNNER" | "SD_NCO" | "SD_RUNNER" | "ROAD_GUARD";

export const detailTypeLabels: Record<DetailType, string> = {
    CQ_NCO: "CQ NCO",
    CQ_RUNNER: "CQ Runner",
    SD_NCO: "Staff Duty NCO",
    SD_RUNNER: "Staff Duty Runner",
    ROAD_GUARD: "Road Guard"
}


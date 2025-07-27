import { useQuery } from "@tanstack/react-query";
import type { DutyRoster } from "@/types/DutyRoster.ts";
import type { DutyAssignment } from "@/types/DutyAssignment.ts";

export const useDutyAssignments = (roster?: DutyRoster) =>
  useQuery({
    queryKey: ["assignments", roster?.id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8080/rosters/${roster?.id}/assignments`,
      );
      return (await response.json()) as Promise<DutyAssignment[]>;
    },
    enabled: !!roster,
  });

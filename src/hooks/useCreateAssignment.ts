import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {DutyAssignment} from "@/types/DutyAssignment.ts";

export const useCreateAssignment = (rosterId?:number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAssignment?: DutyAssignment) => {
      const response = await fetch(`http://localhost:8080/rosters/${rosterId}/assignments`, {
        method: "POST",
        body: JSON.stringify(newAssignment),
        headers: {"Content-Type": "application/json"}
      })
      if (!response.ok) throw new Error("something went wrong")

      return await response.json();
    },
    onSettled: () => queryClient.invalidateQueries({queryKey: ["assignments", rosterId]})
  })

}
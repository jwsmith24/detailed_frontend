import {useDutyRosters} from "./hooks/useDutyRosters.ts";
import {Button} from "@/components/ui/button.tsx";
export default function RosterList() {
    const { data, isLoading, error } = useDutyRosters();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{(error as Error).message}</p>;

    return (
        <>
            <p className={"mb-2 text-2xl font-bold"}>Rosters</p>
            <ul>
                {data?.map((roster) => (
                    <li key={roster.id}>{roster.description}</li>
                ))}
            </ul>
            <Button className={"mt-4"}>I AM A BUTTON</Button>
        </>

    )
}
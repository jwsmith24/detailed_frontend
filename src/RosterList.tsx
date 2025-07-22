import {useDutyRosters} from "./hooks/useDutyRosters.ts";
export default function RosterList() {
    const { data, isLoading, error } = useDutyRosters();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{(error as Error).message}</p>;

    return (
        <>
            <p>Rosters</p>
            <ul>
                {data?.map((roster) => (
                    <li key={roster.id}>{roster.description}</li>
                ))}
            </ul>
        </>

    )
}
import './App.css';
import {useNavigate, useParams} from "react-router-dom";
import {useDutyRoster} from "@/hooks/useDutyRoster.ts";
import {useEffect} from "react";

export default function RosterView() {

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate("/rosters")
        }
    }, [id, navigate]);

    const {data: roster, isLoading, error} = useDutyRoster(id);

    if (isLoading) return <p>Loading roster...</p>;
    if (error) return <p>Error: {(error as Error).message}</p>;
    if (!roster) return <p>Roster not found</p>;

    return (
        <div>
            <h1>Soldiers Eligible For Detail</h1>
            <p>Viewing roster with id: {roster.id}</p>
        </div>
    )
}
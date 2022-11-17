import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getNexTBetEvents } from "../api/getEvents";
import EventsList from "../components/EventsList";

export default function Home() {
  const [currentRange, setCurrentRange] = useState(3);
  const [events, setEvents] = useState([]);
  const { isSuccess, data, isLoading, isError } = useQuery(
    ["getNextBets", currentRange],
    () => getNexTBetEvents({ hoursRange: currentRange })
  );

  useEffect(() => {
    setEvents(data?.events);
    console.log("🚀 ~ file: index.tsx ~ line 16 ~ useEffect ~ data", data);
  }, [data, isLoading, setEvents]);

  return (
    <main>
      <div className="w-full max-w-lg h-screen mx-auto flex items-center  flex-col">
        <h1 className="text-4xl font-semibold my-7">Proximos eventos</h1>
        <label className="px-4 text-lg flex justify-center gap-2 w-full ">
          {" "}
          Nas próximas{" "}
          <select
            className="text-black p-1 rounded-md "
            name="currentRange"
            id="currentRange"
            onChange={(event) => setCurrentRange(parseInt(event.target.value))}
          >
            <option value="3">3 horas</option>
            <option value="12">12 horas</option>
            <option value="24">24 horas</option>
          </select>
        </label>
        {!isSuccess && (
          <div className="h-screen  items-center flex">
            {isLoading && <h1>Carregando...</h1>}

            {isError && <h1>Ocorreu um erro, tente novamente </h1>}
          </div>
        )}
        {events && <EventsList betEvents={events} />}
        <span>
          With ❤️ by <a href="https://github.com/vitu-lemos">Vitu Lemos</a>
        </span>
      </div>
    </main>
  );
}

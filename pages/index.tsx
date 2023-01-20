import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getNexTBetanoEvents } from "../api/services/betanoIntagration";

import EventsList from "../components/EventsList";
import { TBetEvent } from "../types";

export default function Home() {
  const [currentRange, setCurrentRange] = useState(3);
  const [events, setEvents] = useState<TBetEvent[]>([]);
  const { isSuccess, data, isLoading, isError } = useQuery(
    ["getNextBets", currentRange],
    () => getNexTBetanoEvents({ hours: currentRange })
  );

  useEffect(() => {
    if (isSuccess) {
      setEvents(data.events);
    }

    console.log("🚀 ~ file: index.tsx ~ line 16 ~ useEffect ~ data", data);
  }, [data, setEvents, isSuccess]);

  return (
    <main>
      <div className="flex flex-col items-center w-full h-screen max-w-lg mx-auto">
        <h1 className="text-4xl font-semibold my-7">Proximos eventos</h1>
        <label className="flex justify-center w-full gap-2 px-4 text-lg ">
          {" "}
          Nas próximas{" "}
          <select
            className="p-1 text-black rounded-md "
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
          <div className="flex items-center h-screen">
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

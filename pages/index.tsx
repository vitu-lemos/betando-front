import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getNexTBetanoEvents } from "../api/services/betanoIntagration";

import EventsList from "../components/EventsList";
import { TBetEvent } from "../types";

export default function Home() {
  const [currentRange, setCurrentRange] = useState(3);
  const [nextEvents, setNextEvents] = useState<TBetEvent[]>([]);
  const [prevEvents, setPrevEvents] = useState<TBetEvent[]>([]);
  const { isSuccess, data, isLoading, isError } = useQuery(
    ["getNextBets", currentRange],
    () => getNexTBetanoEvents({ hours: currentRange })
  );

  useEffect(() => {
    if (isSuccess) {
      setNextEvents(data.events);
    }

  }, [data, setNextEvents, isSuccess]);
const onSelectedEvent = (event: TBetEvent) => {
    const newPrevEvents = [...prevEvents, event];
    setPrevEvents(newPrevEvents);
    const newNextEvents = nextEvents.filter((nextEvent) => nextEvent.id !== event.id);
    setNextEvents(newNextEvents);
  };
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
        {nextEvents && (
          <EventsList
            onSelectEvent={onSelectedEvent}
            titleLabel="Prox eventos"
            betEvents={nextEvents}
          />
        )}
        {prevEvents && (
          <EventsList
            titleLabel="Eventos selecionados"
            betEvents={prevEvents}
          />
        )}
        <span>
          With ❤️ by <a href="https://github.com/vitu-lemos">Vitu Lemos</a>
        </span>
      </div>
    </main>
  );
}

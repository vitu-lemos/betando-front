import React from "react";
import { TBetEvent } from "../../types";
import EventCard from "../EventCard";

interface Props {
  betEvents: Array<TBetEvent>;
}

const BetEventsList = ({ betEvents }: Props) => {
  return (
    <div className="w-full py-5 px-4">
       <div className="w-full flex justify-around mb-2">
        <span className="font-semibold text-xl">
          Eventos: {betEvents.length}
        </span>
        <span className="font-semibold text-xl">Odd total: 10</span>
      </div>
      {betEvents.map((bet) => (
        <EventCard betEvent={bet} />
      ))}
    </div>
  );
};

export default BetEventsList;

import React from "react";
import { TBetEvent } from "../../types";
import EventCard from "../EventCard";

interface Props {
  betEvents: Array<TBetEvent>;
  titleLabel: string;
  onSelectEvent?: (event: TBetEvent) => void;
}

const BetEventsList = ({ betEvents, titleLabel, onSelectEvent }: Props) => {
  const totalOdd = () => {
    let total = 0;
    betEvents.forEach((bet) => {
      bet.markets.forEach((market) => {
        market.selections.forEach((selection) => {
          if (selection.BETANDO_SELECTION) {
            total += selection.price - 1;
          }
        });
      });
    });
    return total.toFixed(2);
  };
  return (
    <div className="w-full px-4 py-5">
      <div className="flex justify-around w-full mb-2">
        <span className="text-xl font-semibold">
          {`${titleLabel}: ${betEvents.length}`}
        </span>
        <span className="text-xl font-semibold">{`Odd total: ${totalOdd()}`}</span>
      </div>
      {betEvents.map((bet) => (
        <EventCard onSelectEvent={onSelectEvent} betEvent={bet} key={bet.id} />
      ))}
    </div>
  );
};

export default BetEventsList;

import React, { useState } from "react";
import Timestamp from "react-timestamp";
import {
  TBetEvent,
  TBetEventMarket,
  TBetEventMarketSelection,
} from "../../types";
import { convertTimestamp } from "../../utils";
import EventMarket from "./EventMaket";

interface Props {
  betEvent: TBetEvent;
  onSelectEvent?: (event: TBetEvent) => void;
}
const EventCard = ({ betEvent, onSelectEvent }: Props) => {
  const onSelectOption = (
    market: TBetEventMarket,
    select: TBetEventMarketSelection
  ) => {
    const BETANDO_BASE_SITE_URL = process.env.NEXT_PUBLIC_BETANDO_BASE_SITE_URL;
    const url = `${BETANDO_BASE_SITE_URL}${betEvent.url}`;
    onSelectEvent && onSelectEvent(betEvent);
    window.open(url, "_blank");
  };

  return (
    <div
      className={`flex flex-col justify-center mb-6 text-center text-black bg-white border divide-y divide-black rounded-lg`}
    >
      <div className="py-2 mb-3">
        <p className="text-lg font-semibold text-red-500">
          {betEvent.participants[0].name} x {betEvent.participants[1].name}
        </p>
        <p>
          🕒 <span>{convertTimestamp(betEvent.startTime)} </span>
        </p>
      </div>
      {betEvent.markets.map((market) => (
        <EventMarket
          onSelectOption={onSelectOption}
          key={market.id}
          market={market}
        />
      ))}
    </div>
  );
};

export default EventCard;

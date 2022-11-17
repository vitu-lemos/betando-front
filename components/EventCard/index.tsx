
import React from "react";
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
}
const EventCard = ({ betEvent }: Props) => {
  const onSelectOption = (
    market: TBetEventMarket,
    select: TBetEventMarketSelection
  ) => {
    console.log(
      `apostando em:${betEvent.name} - ${market.name} - opção: ${select.name}`
    );

    const BETANDO_BASE_SITE_URL = process.env.NEXT_PUBLIC_BETANDO_BASE_SITE_URL;
    const url = `${BETANDO_BASE_SITE_URL}${betEvent.url}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white border text-black rounded-lg text-center flex flex-col justify-center mb-4 divide-y divide-black">
      <div className=" py-2 ">
        <p className="font-semibold text-md">
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

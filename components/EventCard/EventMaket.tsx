import React from "react";
import { TBetEventMarket, TBetEventMarketSelection } from "../../types";
interface Props {
  market: TBetEventMarket;
  onSelectOption: (
    marketId: TBetEventMarket,
    selectId: TBetEventMarketSelection
  ) => void;
}
const EventMarket = ({ market, onSelectOption }: Props) => {
  return (
    <div className="flex flex-col items-center p-2 mb-4">
      <strong className="pb-2">{market.name}</strong>
      <div className="flex w-full gap-1 justify-evenly ">
        {market.selections.map((select) => (
          <button
            key={select.id}
            onClick={() => onSelectOption(market, select)}
            className={`border-black border flex justify-around w-1/3 text-base rounded-md ${
              select.BETANDO_SELECTION
                ? "border-green-600 shadow-md bg-green-600 text-white"
                : ""
            }`}
          >
            <span> {select.name}</span>
            <span> {select.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventMarket;

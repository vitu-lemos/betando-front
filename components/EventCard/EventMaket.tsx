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
    <div className="flex flex-col p-2">
      <span className="pb-2">{market.name}</span>
      <div className="flex gap-1 w-full">
        {market.selections.map((select) => (
          <button
            onClick={() => onSelectOption(market, select)}
            className={`border-black border flex justify-around w-1/3 font-semibold rounded-md ${
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

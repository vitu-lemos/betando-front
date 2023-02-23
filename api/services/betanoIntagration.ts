import { TBetEvent, TBetEventMarket } from "../../types";
import betanoInstance from "./betanoApi";

const marketSelectionWithMinimalPrice = (market: TBetEventMarket) => {
  const MAX_PRICE = 1.5;
  const selectionWithMinimalPrice = market.selections.find((selection: any) => {
    const isMatchPrice = selection.price <= MAX_PRICE;
    return isMatchPrice;
  });
  if (selectionWithMinimalPrice) {
    return {
      ...selectionWithMinimalPrice,
      BETANDO_SELECTION: true,
    };
  }
  return null;
};

const getBestEvents = (events: Array<TBetEvent>) => {
  // console.log("🚀 ~ file: betanoIntagration.ts ~ line 19 ~ getBestEvents ~ events", events)
  const FINAL_RESULT_MARKET = "Resultado Final";
  const bestEvents: Array<TBetEvent> = [];

  events.forEach((event) => {
    let finalResultMarket = event.markets.find(
      (market: any) => market.name === FINAL_RESULT_MARKET
    );

    if (finalResultMarket) {
    // console.log('>>selection id', finalResultMarket.selections[0].id)
      const bestSelection = marketSelectionWithMinimalPrice(finalResultMarket);
   

      if (bestSelection) {
        const parsedMarket = finalResultMarket.selections.map((selection) => {
          if (selection.id === bestSelection.id) {
            return bestSelection;
          }
          return selection;
        });
        
        const newEventMarkets = event.markets.map((market) => {
          if(market.name === FINAL_RESULT_MARKET){
            return {
              ...market,
              selections: parsedMarket,
            }
          }
          return market
        });
        
        bestEvents.push({
          ...event,
          markets: newEventMarkets,
        });
      }
    }
  });

 

  return bestEvents;
};

const getNexTBetanoEvents = async ({
  hours = 3,
  sport = "futebol",
}: {
  hours?: any;
  sport?: string;
}) => {
  const URL = `/sport/${sport}/proximas-${hours}-horas/?req=la,l,s,stnf,c,mb,mbl`;

  try {
    const { data } = await betanoInstance.get(URL);

    const events = data.data.blocks[0].events;

    const response={events: getBestEvents(events)}
    console.log('response',response)
    return response;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

export { getNexTBetanoEvents };

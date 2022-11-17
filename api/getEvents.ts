import apiInstance from ".";

export const getNexTBetEvents = async ({
  hoursRange = 3,
  sport = "futebol",
}: {
  hoursRange?: number;
  sport?: string;
}) => {
  const { data } = await apiInstance.get(`/next-bets?hoursRange=${hoursRange}`);
  return data;
};

export const convertTimestamp = (timestamp: number) => {
  var date = new Date(timestamp), // Convert the passed timestamp to milliseconds
    years = date.getFullYear(),
    months = ("0" + (date.getMonth() + 1)).slice(-2), // Months are zero basedate. Adays leading 0.
    days = ("0" + date.getDate()).slice(-2), // Adays leading 0.
    hours = date.getHours(),
    minutes = ("0" + date.getMinutes()).slice(-2); // Adays leading 0.

  const convertHourToPeriod = (hours: number) => {
    let period = "AM";
    let parsedHour = hours;
    if (hours > 12) {
      parsedHour = hours - 12;
      period = "PM";
    } else if (hours === 12) {
      parsedHour = 12;
      period = "PM";
    } else if (hours == 0) {
      parsedHour = 12;
    }
    return {
      hour: parsedHour,
      period: period,
    };
  };

  const { hour, period } = convertHourToPeriod(hours);
  const time = `${days}-${months}-${years} - ${hour}:${minutes} ${period}`;
  return time;
};

function formatDate(selectedDate: Date) {
  const date = new Date(selectedDate);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function formatTime(selectedTime: any) {
  const time = selectedTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${time}`;
}

function generateParams(value: string[], query: string) {
  let params = value
    ?.map((q) => `filters[${query}][$containsi]=${q}`)
    .join("&");

  return params;
}

export { formatDate, formatTime, generateParams };

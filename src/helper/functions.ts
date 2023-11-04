function formatDate(selectedDate: Date | null | undefined) {
  const date = new Date(selectedDate!);

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

function isFilled(obj: {}) {
  return Object.values(obj).every((value) => value !== "" && value !== false);
}

function numberOfDays(start: string, end: string) {
  const startDate = new Date(`${start}`);
  const endDate = new Date(`${end}`);

  const timeDifference = endDate.getTime() - startDate.getTime();
  const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return numberOfDays.toFixed(2);
}

export { formatDate, formatTime, generateParams, isFilled, numberOfDays };

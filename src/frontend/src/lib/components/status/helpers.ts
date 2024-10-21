export function formatUnixDateTimeToReadable(unixNano: bigint): string {
  const date = new Date(Number(unixNano) / 1000000);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-UK", dateOptions).format(
    date,
  );

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Europe/London",
  };
  const formattedTime = new Intl.DateTimeFormat("en-GB", timeOptions).format(
    date,
  );

  return `${formattedDate}, ${formattedTime}`;
}
export function formatCycles(cycles: bigint): string {
  const trillionsOfCycles = Number(cycles) / 1_000_000_000_000;
  return (
    trillionsOfCycles.toLocaleString(undefined, {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }) + "T"
  );
}

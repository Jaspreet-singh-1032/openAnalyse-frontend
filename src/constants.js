const monthDays = 28;
export const chartFilters = [
  { text: "Today", days: 0 },
  { text: "Last Three Days", days: 3 },
  { text: "Last Week", days: 7 },
  { text: "Last Month", days: monthDays },
  { text: "Last Three Months", days: monthDays * 3 },
  { text: "Last Six Months", days: monthDays * 6 },
  { text: "Last Nine Months", days: monthDays * 9 },
  { text: "Last Year", days: 365 },
];

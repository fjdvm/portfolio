export type Writing = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  summary: string;
  tags: string[];
  /** Minutes */
  readingTime: number;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2026-10-18" → "18 Oct 2026" */
export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day} ${months[Number(month) - 1]} ${year}`;
}

/** Newest first. */
export function sortWritings(writings: Writing[]) {
  return [...writings].sort((a, b) => b.date.localeCompare(a.date));
}

/** Groups already-sorted Writings by year, keeping their order. */
export function groupByYear(writings: Writing[]) {
  const groups: { year: string; writings: Writing[] }[] = [];
  for (const writing of writings) {
    const year = writing.date.slice(0, 4);
    const group = groups.find((g) => g.year === year);
    if (group) group.writings.push(writing);
    else groups.push({ year, writings: [writing] });
  }
  return groups;
}

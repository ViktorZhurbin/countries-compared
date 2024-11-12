const getRelativeDay = (date: string) => {
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const diff = new Date(date).getTime() - Date.now();

  return formatter.format(Math.round(diff / 86400000), "day");
};

export { getRelativeDay };

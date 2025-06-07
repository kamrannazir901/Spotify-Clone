export function rankedSearch(dataArray, searchTerm) {
  const lowerTerm = searchTerm.toLowerCase();

  const exactMatches = dataArray.filter((item) => {
    const text = `${item.title} ${item.desc}`.toLowerCase();
    return text.includes(lowerTerm);
  });

  const partialMatches = dataArray.filter((item) => {
    const text = `${item.title} ${item.desc}`.toLowerCase();
    return (
      !exactMatches.includes(item) &&
      [...lowerTerm].some((char) => text.includes(char))
    );
  });

  return [...exactMatches, ...partialMatches];
}

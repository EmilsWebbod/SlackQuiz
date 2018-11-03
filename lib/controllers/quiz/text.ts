export function getPlaceString(i: number) {
  const place = i + 1;
  switch (i) {
    case 0:
      return `${place}st`;
    case 1:
      return `${place}nd`;
    case 2:
      return `${place}rd`;
    case 3:
      return `${place}th`;
  }
}

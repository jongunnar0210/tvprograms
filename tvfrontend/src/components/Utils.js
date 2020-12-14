export function readableDate(d) {
  let retval = new Date(d).toLocaleDateString(
    'is-IS',
    {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }
  );

  return retval;
}

export function getInitials(name?: string) {
  if (!name) {
    return null;
  }
  const words = name.split(" ");
  let initials = "";
  words.forEach((word) => {
    initials += word.charAt(0);
  });
  return initials.toUpperCase();
}

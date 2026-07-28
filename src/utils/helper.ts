export function getInitials(fullname: string) {
  const words = fullname ? fullname.trim().split(" ") : [];
  const initials = words && words.map((word) => word[0].toUpperCase()).join("");
  return initials;
}

export default function postedAt(date) {
  const dateNow = new Date();
  const datePosted = new Date(date);
  const dateDifferent = dateNow - datePosted;
  const dateDifferentInDays = Math.floor(dateDifferent / (1000 * 3600 * 24));
  const dateDifferentInHours = Math.floor(dateDifferent / (1000 * 3600));
  const dateDifferentInMinutes = Math.floor(dateDifferent / (1000 * 60));
  const dateDifferentInSeconds = Math.floor(dateDifferent / 1000);

  if (dateDifferentInDays > 0) {
    return `${Math.floor(dateDifferentInDays)} days ago`;
  }
  if (dateDifferentInHours > 0) {
    return `${Math.floor(dateDifferentInHours)} hours ago`;
  }
  if (dateDifferentInMinutes > 0) {
    return `${Math.floor(dateDifferentInMinutes)} minutes ago`;
  }
  if (dateDifferentInSeconds > 0) {
    return `${Math.floor(dateDifferentInSeconds)} seconds ago`;
  }
  return 'Just now';
}

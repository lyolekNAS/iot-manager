export function formatSince(lastUpdated?: string): string {
  if (!lastUpdated) return '—';

  const updated = new Date(lastUpdated);
  const now = new Date();

  const diffMs = now.getTime() - updated.getTime();
  if (diffMs < 0) return '00 д 00:00:00';

  const totalSeconds = Math.floor(diffMs / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days.toString().padStart(2, '0')} д `
       + `${hours.toString().padStart(2, '0')}:`
       + `${minutes.toString().padStart(2, '0')}:`
       + `${seconds.toString().padStart(2, '0')}`;
}

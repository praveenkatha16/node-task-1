export function jsonToCsv(objects: { [x: string]: string | number }[]) {
  const cols = objects.reduce((keys: string[], object) => {
    return [...new Set([...keys, ...Object.keys(object)])];
  }, []);
  const firstRow = cols.join(",");
  const rows = objects.map(ob => cols.filter(col => col in ob).map(col => ob[col]).join(","));
  return [firstRow, ...rows].join('\n');
}

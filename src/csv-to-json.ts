export function csvToJson(csv: string) {
  const lines = csv.split("\n");
  const [cols, ...rows] = lines.map(line => line.split(","));
  return rows.map(row => getRowObject(row, cols));
}

function getRowObject(row: string[], cols: string[]) {
  return cols.reduce(
    (jsonOb, col, index) => index in row ? ({ ...jsonOb, [col]: row[index] }) : jsonOb,
    {}
  );
}

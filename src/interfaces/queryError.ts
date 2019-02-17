export interface QueryError {
  file: string;
  hint: string;
  internalPosition: string;
  internalQuery: string;
  length: number;
  line: string;
  message: string;
  name: string;
  position: string;
  query: string;
  routine: string;
  schema: string;
  severity: string;
  stack: string;
  table: string;
  where: string;
}

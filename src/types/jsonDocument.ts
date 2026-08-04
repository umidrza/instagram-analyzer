export interface JsonDocument<T = unknown> {
  path: string;
  name: string;
  data: T;
}
/**
 * Interface for Model Adapter design pattern.
 * Models must have a class (ModelAdapter) which implements this class:
 * adapt method which will be used in services to map WS returns and prepare before WS calls
 */
export interface Adapter<T> {
  adapt(item: any): T;
  prepare?(object: T): any;
}

import type { ViewerAction, ViewerState } from "../types";
import { reducer } from "./reducer";

export type StoreListener = (state: ViewerState, previous: ViewerState) => void;

export class ViewerStore {
  private state: ViewerState;
  private listeners = new Set<StoreListener>();

  constructor(initialState: ViewerState) {
    this.state = initialState;
  }

  getState(): ViewerState {
    return this.state;
  }

  dispatch(action: ViewerAction): void {
    const previous = this.state;
    const next = reducer(previous, action);

    if (next === previous) {
      return;
    }

    this.state = next;
    for (const listener of this.listeners) {
      listener(next, previous);
    }
  }

  subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

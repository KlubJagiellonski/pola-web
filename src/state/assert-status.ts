import { StateMachineError } from 'services/api-errors';

export type StateMember<T extends string> = { status: T };
export function assertStatus<T extends string>(
  state: { status: T },
  ...validStatuses: T[]
): asserts state is StateMember<T> {
  if (!validStatuses.includes(state.status as T)) {
    throw new StateMachineError(`Invalid state "${state.status}" (expected one of: ${validStatuses})`);
  }
}

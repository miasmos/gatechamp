import { SetterOrUpdater } from "recoil";
import { KillState } from "../atom";

const addSubscriptionsSetter =
  (setter: SetterOrUpdater<KillState>) => (addedEventIds: string[]) =>
    setter((state) => {
      const filteredAddedEventIds = addedEventIds.filter(
        (eventId) => !state.subscriptions.includes(eventId)
      );
      return {
        ...state,
        addSubscription: [],
        subscriptions: [...state.subscriptions, ...filteredAddedEventIds],
      };
    });

const removeSubscriptionsSetter =
  (setter: SetterOrUpdater<KillState>) => (removedEventIds: string[]) =>
    setter((state) => {
      const filteredRemovedEventIds = removedEventIds.filter((eventId) =>
        state.subscriptions.includes(eventId)
      );
      const nextSubscriptions = state.subscriptions
        .slice()
        .filter((eventId) => !filteredRemovedEventIds.includes(eventId));
      return {
        ...state,
        removeSubscription: [],
        subscriptions: nextSubscriptions,
      };
    });

const clearSubscriptionsSetter = (setter: SetterOrUpdater<KillState>) => () =>
  setter((state) => ({
    ...state,
    subscriptions: [],
  }));

export {
  removeSubscriptionsSetter,
  addSubscriptionsSetter,
  clearSubscriptionsSetter,
};

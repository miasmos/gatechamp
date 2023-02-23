import store from "store";
interface AppState {}

class Storage {
  static prefix = "crown:app";

  static setState(payload: AppState) {
    store.set(`${Storage.prefix}:state`, JSON.stringify(payload));
  }

  static deleteState() {
    store.set(`${Storage.prefix}:state`, undefined);
  }

  static getState(): AppState | undefined {
    const payload = store.get(`${Storage.prefix}:state`);
    if (!!payload) {
      return JSON.parse(payload);
    }
    return undefined;
  }
}

export default Storage;

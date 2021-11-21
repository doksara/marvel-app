import { watch } from 'vue'
import { PiniaPluginContext, StoreActions, _GettersTree } from 'pinia'

type Store = PiniaPluginContext['store'];

type PersistOptions = {
  key: string
  storage: StorageOptions
}
type StorageOptions = typeof localStorage | typeof indexedDB

declare module 'pinia' {
  export interface DefineStoreOptions<Id extends string, S extends StateTree, G extends _GettersTree<S>, A> {
    persistOptions?: PersistOptions
  }
}

const updateStorage = (store: Store) => {
  const storage = localStorage
  const storeKey = store.$id

  storage.setItem(storeKey, JSON.stringify(store.$state))
}

const loadStorage = (store: Store) => {
  store.$state = JSON.parse(localStorage.getItem(store.$id) || '{}')
}

export default ({ options, store }: PiniaPluginContext): void => {
  if (options.persistOptions) {
    // Define default settings here
    const defaultSettings = {
      key: store.$id,
      storage: localStorage,
    }
    console.log(store.$state)
    const storageResult = defaultSettings?.storage?.getItem(defaultSettings.key || '')

    if (storageResult) {
      store.$patch(JSON.parse(storageResult))
      updateStorage(store)
    }

    // Load store data from storage
    loadStorage(store)

    // Watch the store for changes
    watch(() => store.$state, () => {
      updateStorage(store)
    }, { deep: true })
  }
}
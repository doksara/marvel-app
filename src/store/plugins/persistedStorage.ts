import { watch } from 'vue'
import { PiniaPluginContext, _GettersTree } from 'pinia'

type Store = PiniaPluginContext['store'];

declare module 'pinia' {
  export interface DefineStoreOptions<Id extends string, S extends StateTree, G extends _GettersTree<S>, A> {
    persist?: boolean;
  }
}

const updateStorage = (store: Store) => {
  const storage = localStorage
  const storeKey = store.$id

  storage.setItem(storeKey, JSON.stringify(store.$state))
}

const loadStorage = (store: Store) => {
  store.$state = JSON.parse(sessionStorage.getItem(store.$id) || '{}')
}

export default ({ options, store }: PiniaPluginContext): void => {
  if (options.persist) {
    const defaultSettings = {
      key: store.$id,
      storage: localStorage,
    }

    const storageResult = defaultSettings?.storage?.getItem(defaultSettings.key || '')

    if (storageResult) {
      store.$patch(JSON.parse(storageResult))
      updateStorage(store)
    }

    loadStorage(store)

    watch(() => store.$state, () => {
      updateStorage(store)
    }, { deep: true })
  }
}
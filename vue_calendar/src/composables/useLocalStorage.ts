import { reactive } from "vue";

const storage = reactive<Record<string, any>>({});

const storageType = localStorage;


const storageInit = (key: string) => {
	if(typeof key !== 'string') return false
	if(storage.hasOwnProperty(key)) return
	storage[key] = storageType.getItem(key) ? storageGet(key) : []
}

const storageGet = (key: string) => {
  const storageItem = storageType.getItem(key)
	if(!storageItem) return
	return JSON.parse(storageItem)
}

const storageSet = (key: string) => {
	storageType.setItem(key, JSON.stringify(storage[key]))
}


const storageAdd = (key: string, item: unknown) => {
	if(storageInit(key) === false) return
		storage[key].push(item);
		storageSet(key);
}


const storageHas = (key: string, item: unknown) => {
	if(storageInit(key) === false) return
	return storage.hasOwnProperty(key) && JSON.parse(JSON.stringify(storage[key]))?.includes(item);
}

const storageRemove = (key: string, item: unknown) => {
  if(storageInit(key) === false) return;
  const newStorage = storage[key].filter((el: unknown) => el !== item)
  storage[key] = newStorage
  storageSet(key)
}

const storageRemoveById = (key: string, id: string | number) => {
  if(storageInit(key) === false) return;
  const newStorage = storage[key].filter((el: { id: string | number; }) => el?.id !== id)
  storage[key] = newStorage
  storageSet(key)
}


export const useStorage = () => {
	return {
		storageAdd,
		storageHas,
		storage,
    storageGet,
    storageRemove,
    storageRemoveById,
    storageSet
	}
}
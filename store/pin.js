import {defineStore} from "pinia";

export const usePinStore = defineStore('pin', {
    state: () => {
        return {
            pinLeft: 0,
            pinTop: 0,
            pinShow: false,
            clipShow: false
        }
    }
});

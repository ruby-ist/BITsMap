import {defineStore} from "pinia";

export const usePinStore = defineStore('pin', {
    state: () => {
        return {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0
        }
    }
});

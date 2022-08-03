import {defineStore} from "pinia";

export const useMapStore = defineStore('map', {
    state: () => {
        return {
            svg: true,
            level: 4,
            fullZoomOutTrigger: 0
        }
    },
    actions: {
        fullZoomOut(){
            this.fullZoomOutTrigger++;
        }
    }
});

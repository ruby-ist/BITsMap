import {defineStore} from "pinia";

export const useDirectionStore = defineStore('direction', {
    state: () => {
        return{
            directionTrigger: 0,
            fromId: "",
            toId: "",
        }
    },
    actions: {
        findRoute(){
            this.directionTrigger++;
        }
    }
});

import {defineStore} from "pinia";

export const useToBarStore = defineStore('toBar',{
    state: () => {
        return{
            id: "",
            name: "",
        }
    },
})
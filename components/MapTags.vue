<template>
    <div>
        <div class="tags">
            <div v-for="tag in tags" :id="tag['id']" :style="{ top: tag['top'], left: tag['left'] }" class="tag"
                 @click="getDetails(tag['id'])">
                {{ tag["name"] }}
            </div>
        </div>

        <div v-show="details !== {}">
            <ShowBox :details="details" ref="showBox"/>
        </div>
    </div>
</template>

<script>
import {mapWritableState} from "pinia";
import {useDetailsBoxStore} from "@/store/detailsBox";

export default {
    props: ['level'],
    data() {
        return {
            tags: [],
            details: {}
        }
    },
    computed: {
        ...mapWritableState(useDetailsBoxStore, ['showBox'])
    },
    methods: {
        async getTags(level) {
            let response = await this.$http.$get(`https://api-geobits.onrender.com/map/tags/${this.level}`);
            this.tags = await response["tags"];
        },

        async getDetails(id) {
            this.details = await this.$http.$get(`https://api-geobits.onrender.com/map/details/${id}?level=${this.level}`);
            this.showBox = true;
        },
    },

    watch: {
        level(num) {
            this.getTags();
        }
    },

    mounted() {
        this.getTags();
    }
}
</script>

<style scoped lang="scss">
.tag {
    position: absolute;
    font-weight: 400;
    font-size: 1rem;
    text-align: center;
    color: #ffffff;
    text-shadow: 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black;
    font-family: 'Inter', sans-serif;
    width: 60px;
    text-wrap: normal;
    z-index: 1;
    cursor: pointer;
}

.dark-tags {
    .tag{
        color: #7a88ef;
        text-shadow: 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black;
    }

    .tag:nth-child(2n) {
        color: #ee9a25
    }

    .tag:nth-child(3n) {
        color: #f27025;
    }

    .tag:nth-child(4n) {
        color: #d36db8;
    }

    .tag:nth-child(5n) {
        color: #ed5d69;
    }

    .tag:nth-child(6n) {
        color: #a083ff;
    }

    .tag:nth-child(7n) {
        color: #35a470;
    }

    .tag:nth-child(8n) {
        color: #419dd3;
    }

    .tag:nth-child(9n) {
        color: #5a91fe;
    }
}
</style>

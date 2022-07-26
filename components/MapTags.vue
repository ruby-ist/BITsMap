<template>
    <div>
        <div v-for="tag in tags">
            <div :id="tag['id']" :style="{ top: tag['top'], left: tag['left'] }" class="tag"
                 @click="getDetails(tag['id'])">
                {{ tag["name"] }}
            </div>
        </div>

        <div v-show="details !== {}">
            <ShowBox :details="details" :floorNum="num" ref="showBox"/>
        </div>
    </div>
</template>

<script>
export default {
    props: ['level', 'num'],
    data() {
        return {
            tags: [],
            details: {}
        }
    },

    methods: {
        async getTags(level) {
            let response = await this.$http.$get(`http://localhost:4567/map/tags/${this.level}`);
            this.tags = await response["tags"];
        },

        async getDetails(id) {
            this.details = await this.$http.$get(`http://localhost:4567/map/details/${id}?level=${this.level}`);
            $('.show-box').css({
                'bottom' : '0',
                'height' : 'initial'
            });
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

<style scoped>
.tag {
    position: absolute;
    font-weight: 400;
    font-size: 1rem;
    text-align: center;
    color: white;
    text-shadow: 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black;
    font-family: 'Inter', sans-serif;
    width: 60px;
    text-wrap: normal;
    z-index: 1;
    cursor: pointer;
}
</style>

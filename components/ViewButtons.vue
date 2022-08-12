<template>
    <div id="view-buttons" class="map-buttons">
        <button class="ui blue icon button"
                data-tooltip="Info"
                data-position="right center"
                data-inverted=""
                data-variation="tiny">
            <i class="large info icon"></i>
        </button>

        <button class="ui blue icon button"
                :data-tooltip="(isDark) ? 'Light mode' : 'Dark mode'"
                data-position="right center"
                data-inverted=""
                data-variation="tiny"
                @click="$emit('changeTheme')">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.32642 190.67239">
                <g id="round">
                    <path id="half-round" class="cls-1"
                          d="M186.24074,169.41346a56.66575,56.66575,0,0,1-8.72829-19.32722c.649-1.65792,1.32629-3.26217,2.069-4.83873,5.89218-12.48591,14.43511-22.44573,27.11049-28.44561a60.14969,60.14969,0,0,1,26.11237-6.08377,60.93886,60.93886,0,0,1,21.34441,3.796c12.80883,4.76575,22.15214,13.55662,28.90281,25.28367a86.15392,86.15392,0,0,1,4.9656,10.17494,2.15816,2.15816,0,0,0,.3963-1.11349c.167-.73243.32343-1.46675.46331-2.19855a56.89616,56.89616,0,0,1-102.636,22.75275Z"
                          transform="translate(-134.61141 -41.44139)"/>
                    <path id="moon" class="cls-1"
                          d="M177.51245,150.08624A56.91443,56.91443,0,0,1,261.8983,87.84742c.05919.03207.10789.06223.15658.09245a56.30043,56.30043,0,0,1,14.86542,12.89856.36688.36688,0,0,1,.058.06965c.2664.32794.52662.66025.78686.99251q.28668.35043.55494.71382c.24109.31812.48219.63618.71283.95243.14.18678.27811.38405.41624.58133.29784.42535.58951.855.87686,1.27854.24231.37233.47852.749.71038,1.11951l.04747.0678c.19056.29833.37926.60722.55747.91419.13876.22443.27316.44264.39961.67568.10418.17506.21276.3563.3108.53572.23925.4204.468.839.69068,1.26188a56.44087,56.44087,0,0,1,6.68479,25.55376c.00372.16275.01176.33168.00931.49875a57.23178,57.23178,0,0,1-.82283,10.39708c-.01726.0672-.024.13626-.037.20963-.13988.7318-.29634,1.46612-.46331,2.19855a2.15816,2.15816,0,0,1-.3963,1.11349,86.15392,86.15392,0,0,0-4.9656-10.17494c-6.75067-11.727-16.094-20.51792-28.90281-25.28367a60.93886,60.93886,0,0,0-21.34441-3.796,60.14969,60.14969,0,0,0-26.11237,6.08377c-12.67538,5.99988-21.21831,15.9597-27.11049,28.44561C178.83874,146.82407,178.16143,148.42832,177.51245,150.08624Z"
                          transform="translate(-134.61141 -41.44139)"/>
                    <g id="stars">
                        <path class="cls-1"
                              d="M239.8202,171.62168c1.748-2.18987,3.43676-4.28116,5.09629-6.39543.788-1.004,1.55507-2.02829,2.27-3.08507a6.61759,6.61759,0,0,0,.74078-5.958c-1.05532-3.36223-2.148-6.71274-3.22815-10.06715-.05324-.16531-.13542-.32056-.00144-.49606.42418-.134.60288.25165.84922.4462,2.65512,2.0969,5.2975,4.20865,8.01653,6.22471a7.0827,7.0827,0,0,0,6.94213,1.03764c3.3357-1.13912,6.69766-2.20138,10.04877-3.29535.1232-.04022.25093-.06657.65714-.17267-.64006.83056-1.12277,1.4668-1.6158,2.09494-1.792,2.28314-3.56669,4.58031-5.38763,6.84018a7.11947,7.11947,0,0,0-1.27824,7.1036c1.12534,3.44815,2.23436,6.90163,3.39425,10.48842a8.93765,8.93765,0,0,1-2.22038-1.50369q-3.12247-2.40143-6.17766-4.88993a7.883,7.883,0,0,0-7.8699-1.49434c-2.85677.92908-5.69161,1.92555-8.53682,2.89026A3.31267,3.31267,0,0,1,239.8202,171.62168Z"
                              transform="translate(-134.61141 -41.44139)"/>
                        <path class="cls-1"
                              d="M203.80342,169.25938c1.375-2.07356,2.92983-3.82023,4.35413-5.66405a5.08292,5.08292,0,0,0,.90925-4.961,56.00577,56.00577,0,0,1-1.90554-6.85478,17.04456,17.04456,0,0,1,3.15328,2.474c2.964,3.01818,6.132,3.5979,9.98952,1.839a30.0098,30.0098,0,0,1,3.61563-1.25607c.19549-.06059.42321-.207.57371-.02677.20375.244-.0364.45638-.17892.63367-1.12466,1.39909-2.22478,2.82007-3.39912,4.17659a6.392,6.392,0,0,0-1.2325,7.11186,29.84785,29.84785,0,0,1,1.68768,5.81c-1.77367-1.40526-3.40056-2.613-4.9339-3.92964a5.97616,5.97616,0,0,0-6.3493-1.218A47.81046,47.81046,0,0,1,203.80342,169.25938Z"
                              transform="translate(-134.61141 -41.44139)"/>
                        <path class="cls-1"
                              d="M234.04707,178.924c1.78316,1.40332,3.4902,2.6786,5.11932,4.04665a5.933,5.933,0,0,0,6.20364.974,44.58622,44.58622,0,0,1,6.29567-1.90905c-1.4921,1.88517-2.7834,3.61689-4.18276,5.25637a5.32734,5.32734,0,0,0-1.24338,5.45278q.483,1.47513.916,2.96652c.35643,1.22185.68941,2.45055,1.08766,3.87324-1.73021-1.06227-3.0688-2.33739-4.55212-3.41295-.50305-.36476-.97784-.76855-1.48161-1.13225a4.70178,4.70178,0,0,0-4.42766-.661c-2.09825.68515-4.18634,1.40139-6.28071,2.0985-.23983.07983-.51913.358-.73236.01239-.18748-.30389.19352-.38066.31884-.55467,1.04825-1.45548,2.19687-2.82656,3.37109-4.18459a6.51873,6.51873,0,0,0,1.18161-7.1387A23.55194,23.55194,0,0,1,234.04707,178.924Z"
                              transform="translate(-134.61141 -41.44139)"/>
                        <path class="cls-1"
                              d="M255.52271,135.98883a3.752,3.752,0,0,1-5.36812-.93456,3.81921,3.81921,0,0,1,1.04433-5.45487,3.90376,3.90376,0,0,1,5.41256,1.00442A3.83159,3.83159,0,0,1,255.52271,135.98883Z"
                              transform="translate(-134.61141 -41.44139)"/>
                        <path class="cls-1"
                              d="M228.02129,127.31373a2.42642,2.42642,0,1,1-2.7603-3.99063,2.36472,2.36472,0,0,1,3.43182.66748A2.27405,2.27405,0,0,1,228.02129,127.31373Z"
                              transform="translate(-134.61141 -41.44139)"/>
                    </g>
                </g>
                <g id="stripes">
                    <path id="stripe-8" class="cls-1"
                          d="M167.33526,70.20765h7.867a8.8142,8.8142,0,0,1,8.8142,8.8142v0a8.81419,8.81419,0,0,1-8.81419,8.81419h-7.867a8.81419,8.81419,0,0,1-8.81419-8.81419v0A8.8142,8.8142,0,0,1,167.33526,70.20765Z"
                          transform="translate(101.88578 214.56263) rotate(-135.00001)"/>
                    <rect id="stripe-7" class="cls-1" x="134.61141" y="129.49301" width="25.6456" height="17.62841"
                          rx="8.8142" transform="translate(160.25701 235.17303) rotate(180)"/>
                    <path id="stripe-6" class="cls-1"
                          d="M167.6569,186.19355h7.88171a8.81419,8.81419,0,0,1,8.81419,8.81419v0a8.8142,8.8142,0,0,1-8.8142,8.8142H167.6569a8.81419,8.81419,0,0,1-8.81419-8.81419v0a8.8142,8.8142,0,0,1,8.8142-8.8142Z"
                          transform="translate(296.2156 170.11968) rotate(134.99999)"/>
                    <rect id="stripe-5" class="cls-1" x="220.12837" y="210.47678" width="25.6456" height="17.62841"
                          rx="8.8142" transform="translate(317.63063 -55.10168) rotate(89.99997)"/>
                    <path id="stripe-4" class="cls-1"
                          d="M286.79543,186.67262h7.88229a8.8142,8.8142,0,0,1,8.8142,8.8142v0a8.8142,8.8142,0,0,1-8.8142,8.8142h-7.88229a8.8142,8.8142,0,0,1-8.8142-8.8142v0a8.81419,8.81419,0,0,1,8.81419-8.81419Z"
                          transform="translate(88.77309 -189.76637) rotate(44.99994)"/>
                    <rect id="stripe-3" class="cls-1" x="167.91986" y="86.50455" width="25.40656" height="17.62841"
                          rx="8.8142"/>
                    <path id="stripe-2" class="cls-1"
                          d="M287.2774,69.75312h7.91288a8.8142,8.8142,0,0,1,8.8142,8.8142v0a8.8142,8.8142,0,0,1-8.8142,8.8142H287.2774a8.8142,8.8142,0,0,1-8.8142-8.8142v0A8.81419,8.81419,0,0,1,287.2774,69.75312Z"
                          transform="translate(-104.86648 187.50387) rotate(-45)"/>
                    <rect id="stripe-1" class="cls-1" x="217.12255" y="45.44999" width="25.6456" height="17.62841"
                          rx="8.8142" transform="translate(41.06975 242.76815) rotate(-90)"/>
                </g>
            </svg>
        </button>

        <button class="ui blue icon button"
                id="location-btn"
                data-content="Find your location"
                data-position="right center"
                data-variation="tiny inverted"
                @click="$emit('getLocation')">
            <i class="large street view icon"></i>
        </button>
        <button class="ui blue icon button"
                :data-tooltip="(lined) ? 'Satellite map' : 'SVG map'"
                data-position="right center"
                data-inverted=""
                data-variation="tiny"
                @click="$emit('changeSVG')">
            <i class="large map icon" :class="{ outline: !lined }"></i>
        </button>
    </div>
</template>

<script>
import {mapState} from "pinia";
import {useDetailsBoxStore} from "@/store/detailsBox";

export default {
    props: {lined: Boolean, isDark: Boolean},
    data(){
        return{
            timeLine: {}
        }
    },
    emits: ["changeSVG", "changeTheme"],
    computed: {
        ...mapState(useDetailsBoxStore, ['showBox', 'directionBox'])
    },
    methods: {
        toggleButtons() {
            if (screen.width < 540 && (this.showBox || this.directionBox))
                gsap.to('#view-buttons button', {xPercent: -200, duration: 0.4});
            else
                gsap.to('#view-buttons button', {xPercent: 0, duration: 0.4, stagger: 0.2});
        },

        animation() {
            return gsap.timeline({paused: true}).to('#stripes rect, #stripes path', {
                scaleX: 0,
                duration: 0.4,
                stagger: 0.05,
            }).to('#round', {
                scale: 1.5,
                transformOrigin: "center",
                duration: 0.2
            }).to('#half-round', {
                opacity: 0,
                duration: 0.1,
                delay: -0.1
            }).to('#round', {
                rotation: -145,
                transformOrigin: "center",
                duration: 0.5,
            }).to('#stars', {
                opacity: 1,
                duration: 0.3,
                delay: -0.1
            });
        }
    },
    mounted() {
        gsap.set('#stars', {
            opacity: 0
        });
        this.timeLine = this.animation();
        if(!this.isDark)
            this.timeLine.play();
    },
    watch: {
        showBox() {
            this.toggleButtons();
        },
        directionBox() {
            this.toggleButtons();
        },
        isDark(newValue){
            if(newValue)
                this.timeLine.reverse();
            else
                this.timeLine.play();
        }
    }
}
</script>

<style scoped lang="scss">
#view-buttons {
    position: fixed;
    left: 50px;
    bottom: 30px;
    z-index: 3;

    button {
        display: block;
        margin: 25px auto;
    }
}

button.blue.button {
    background-color: var(--button-background);

    &:hover, &:focus {
        background-color: var(--button-background);
    }

    i.icon {
        color: var(--button-icon);
    }

    svg{
        width: 1.5rem;
    }

    .cls-1 {
        fill: var(--button-icon);
    }
}

button.ui.icon.button {
    box-shadow: 0 0 2px black;
}

@media screen and (max-width: 520px) {
    #view-buttons {
        left: 30px;
    }
}
</style>

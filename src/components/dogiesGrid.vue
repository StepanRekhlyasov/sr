<template>
    <h2>Here come dogies!</h2>
    <div class="dg">
        <div class="d" v-for="dog in dogies" :key="dog" @click="favHandle(dog)">
            <heart v-if="checkFav(dog)"/>
            <img :src="dog"/>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import heart from '@/components/heart.vue';
export default defineComponent({
    data() {
        return {
            dogies: this.dg
        }  
    },
    components: {
        heart,
    },
    props: ['dg'],
    watch: {
        dg: function (val){
            this.dogies = val
        }
    },
    computed: {
        ...mapGetters(['favs'])
    },
    mounted(){
        // console.log(this.favs)
        // 
    },
    methods: {
        ...mapMutations(['addfavs','removeFav','mutateDogies']),
        checkFav(dog : string){
            if(localStorage.dogies){
                if(localStorage.dogies.includes(dog)){
                    return true
                } else {
                    return false
                }
            }
        },
        favHandle(dog : string){
            if(this.checkFav(dog)){
                this.removeFav(dog)
                this.$forceUpdate(); 
            }else{
                this.addfavs(dog);
                this.$forceUpdate(); 
            }
        }
    }
})
</script>
<style lang="scss" scoped>
    .dg {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 15px;
        .d {
            position: relative;
            max-width: 100%;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                &:hover {
                    cursor: pointer;
                    filter: grayscale(100%)
                }
            }
            &:hover{
                transform: scale(1.1);
                transition: .1s;
                #heart:after,
                #heart:before {
                    background: red;
                }
            }
        }
    }
</style>
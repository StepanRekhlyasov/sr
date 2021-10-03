<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.svg">
    <h1>This is an Favorites page</h1>
    <button @click="resetFav">Reset LocalStorage</button>
    <dogies-grid :dg="favs"/>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import dogiesGrid from '@/components/dogiesGrid.vue';
export default {
  data() {
    return {
    }
  },
  components: {
    dogiesGrid,
  },
  methods: {
    ...mapMutations(['resetfavs']),
    resetFav(){
        this.resetfavs()
    },
  },
  computed: {
    ...mapGetters(['dogies','favs'])
  },
}
</script>

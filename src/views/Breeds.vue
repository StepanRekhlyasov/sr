<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.svg">
    <h1>This is one of the Breed's page</h1>
    <dogies-grid :dg="dogies"/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import dogiesGrid from '@/components/dogiesGrid.vue';
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  props: ['sb'],
  components: {
    dogiesGrid,
  },
  methods: {
    ...mapActions(['getBreeds','getDogies','addDogies']),
    scrollHandler(){
      var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      if(window.scrollY + 200 >= scrollHeight - innerHeight){
          this.addDogies({count: 4, breed: this.breed})
      }
    },
  },
  computed: {
    ...mapGetters(['breeds','dogies']),
    breed(){
      return this.$route.params.breed
    }
  },
  mounted(){
    this.getDogies({count: 20, breed: this.breed})
    window.addEventListener('scroll', this.scrollHandler)
  },
  unmounted () {
    window.removeEventListener('scroll', this.scrollHandler);
  },
  watch: {
    sb: function (val){
      this.getDogies({count: 20, breed: val})
    }
  },
 
  
})
</script>


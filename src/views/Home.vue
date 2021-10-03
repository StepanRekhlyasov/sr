<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.svg">
    <h1>Home, Sweet Home</h1>
    <dogies-grid :dg="dogies"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dogiesGrid from '@/components/dogiesGrid.vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'Home',
  components: {
    dogiesGrid,
  },
  computed: {
    ...mapGetters(['dogies'])
  },
  methods: {
    ...mapActions(['getDogies','addDogies']),
    scrollHandler(){
      var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      if(window.scrollY + 200 >= scrollHeight - innerHeight){
          this.addDogies({count:4})
      }
    },
  },
  mounted(){
    this.getDogies({count:20})
    window.addEventListener('scroll', this.scrollHandler)
  },
  unmounted () {
    window.removeEventListener('scroll', this.scrollHandler);
  },
});

</script>

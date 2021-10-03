<template>
  <div id="nav" class="row">
    <div>
      <router-link to="/">Home</router-link>
    </div>
    <div class="column">
      <router-link :to="{ name: 'breeds', params: { breed: selectedBreed }}" v-if="selectedBreed&&$route.name!='breeds'">
        <label for="select_breed">To selected Breed</label>
      </router-link>
      <label v-else for="select_breed">Select Breed</label>
      <select id="select_breed" v-model="selectedBreed" @change="toPage('breeds', selectedBreed)">
        <option v-for="(value, name, index) in breeds" :key="index">{{name}}</option>
      </select>
    </div>
    <div>
      <router-link to="/favorites">Favorites</router-link>
    </div>
  </div>
  <div class="main_wrapper">
    <router-view :sb="selectedBreed"/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  data() {
    return {
      selectedBreed: this.$route.params.breed,
    } 
  },
  methods:{
    ...mapActions(['getBreeds','getDogies']),
    ...mapMutations(['setfavs']),
    toPage(name : string, param : any){
      this.$router.push( { name: name, params: { breed: param }});
    }
  },
  computed:{
    ...mapGetters(['breeds'])
  },
  created(){
    this.getBreeds()
  },
  mounted(){
    if (localStorage.getItem('dogies')) {
      try {
        this.setfavs(localStorage.getItem('dogies'))
      } catch (e) {
        localStorage.removeItem('dogies');
      }
    }
  }
})
</script>

<style lang="scss">
@mixin flexbox($direction,$align-y : center,$align-x: center){
  display: flex;
  align-items: $align-y;
  justify-content: $align-x;
  flex-direction: $direction;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.row {
  @include flexbox(row,flex-start,center)
}
.column {
  @include flexbox(column)
}
#nav {
  padding: 30px;
  font-weight: bold;
  color: #2c3e50;
  div {
    margin: 0 10px;
    select {
      margin-top: 10px;
    }
    label {
      cursor:pointer;
    }
  }
  a {
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

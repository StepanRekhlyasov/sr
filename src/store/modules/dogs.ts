
import axios from 'axios'
export default {
    state: {
        breeds: {

        },
        dogies: {

        },
        favs: [

        ]
    },
    actions: {
        getBreeds(ctx : any){
            axios.get('https://dog.ceo/api/breeds/list/all').then(
                responce => {
                    let data = responce.data['message']
                    ctx.commit('mutateBreeds',data)
                }).catch(e => {
                    console.log(e)
                });
        },
        getDogies(ctx:any,{count=1,breed=''}){
            if(breed){
                var url = 'https://dog.ceo/api/breed/'+breed+'/images/random/'+count 
            } else {
                var url = 'https://dog.ceo/api/breeds/image/random/'+count
            }
            axios.get(url).then(
                responce => {
                    let data = responce.data['message']
                    ctx.commit('mutateDogies',data)
                }).catch(e => {
                    console.log(e)
            });
        },
        addDogies(ctx:any,{count=1,breed=''}){
            if(breed){
                var url = 'https://dog.ceo/api/breed/'+breed+'/images/random/'+count 
            } else {
                var url = 'https://dog.ceo/api/breeds/image/random/'+count
            }
            axios.get(url).then(
                responce => {
                    let data = responce.data['message']
                    ctx.commit('mutateDogiesAdd',data)
                }).catch(e => {
                    console.log(e)
            });
        }
    },
    mutations: {
        mutateBreeds(state : any, breeds : any){
            state.breeds = breeds
        },
        mutateDogies(state: any, dogies : any){
            state.dogies = dogies
        },
        mutateDogiesAdd(state: any, dogies : any){
            Array.prototype.push.apply(state.dogies, dogies)
        },
        setfavs(state: any, localStorage : any){
            state.favs = JSON.parse(localStorage)
        },
        addfavs(state: any, string : any){
            Array.prototype.push.apply(state.favs, [string])
            localStorage.setItem('dogies', JSON.stringify(state.favs));
        },
        removeFav(state: any, dog : any){
            state.favs = state.favs.filter((i : string) => {
                return i != dog
            });      
            localStorage.setItem('dogies', JSON.stringify(state.favs));
        },
        resetfavs(state: any){
            state.favs = []
            localStorage.removeItem('dogies')
        }
    },
    getters: {
        breeds(state : any) {
            return state.breeds
        },
        dogies(state : any){
            return state.dogies
        },
        favs(state : any){
            return state.favs
        }
    }
}
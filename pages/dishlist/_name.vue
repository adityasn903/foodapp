<template>

  <section id='main-contentdishes'>
  
    <article id="dishcard" v-for="loadedDish in loadedDishes" :key="loadedDish._id">
      <nuxt-link :to="'/dishdetails/'+loadedDish.name">
        <img :src="'/getimage/'+loadedDish.imgname" alt="oopsie" id="dishlogo"/>
        <h2>{{loadedDish.name}}</h2>
        <span>
           {{ loadedDish.timetomake}} <img src="https://img.icons8.com/android/96/000000/alarm-clock.png" class="clockicon">
        </span>
        <p> {{ loadedDish.description}} </p>
    </nuxt-link>
    </article>
  </section>
  
</template>

<script>
import mynavbar from '~/components/navbar';
import popuplogin from '~/components/poplogin';
import popupsignup from '~/components/popsignup';
import axios from "axios";

export default {
  components: {
    'mynavheader': mynavbar,
    'popuplogin':popuplogin,
    'popupsignup':popupsignup
  },
  data(){
    return {
      loadedDishes:[]
    }
  },
  created(){
    var myUrl = '/dishlist/'+ this.$route.params.name;
    axios.get(myUrl)
      .then((res)=>{
        this.$store.dispatch('storeDishes', res.data);
        this.loadedDishes = this.$store.state.listOfDishes;
        console.log(this.loadedDishes);

      })
      .catch((err)=>{
        console.log('sorry about the dishes!!!');
      })

  }
}

</script>

<style>
@media(min-width:768px){

  #main-contentdishes {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 583px;
  color: #000000;
  margin-top: 82px;
  margin-right: 30px;
  font-family: 'Oleo Script';
  font-weight: 900;
  background-color: #2B303B;
  }

#dishcard {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  width: 200px;
  height: 450px;
  margin: 20px;
  border: 1px solid black;
  background-color: white;
  border-radius: 3%;
  }
}

#dishcard #dishlogo {
  width: 100%;
  height: 160px;
  border-top-left-radius: 3%;
  border-top-right-radius: 3%;
}
#dishcard h2 {
  font-family: Poppins;
  font-weight: 600;
  letter-spacing: 0.2px;
  text-align: left;
  color: #ffa500;
  padding-left: 5px;
  padding-right: 5px;
}
#dishcard span {
  color: #AAAAAA;
  padding-left: 6px;
}
#dishcard p {
  margin-left:2px;
  color: #39CCCC;
  padding-left: 3px;
  font-weight: 500;
}
.clockicon {
  width: 25px;
  height: 20px;
  padding-left: 5px;
  margin-left: 2px;
  padding-bottom: 3px;
  margin-bottom: 2px;
}


</style>
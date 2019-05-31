<template>
	<section id="main-dishdetail">
		  <img src="http://clipart-library.com/img/1639808.jpg" class="imgg" />
      <h2>{{particularDish.name.toUpperCase()}}</h2>
      <ul >
        <li v-for="dishingredient in particularDish.ingredients">{{dishingredient}}</li>
      </ul>

	</section>
</template>

<script>
import axios from 'axios';
export default{
  
  data(){
    return {
      particularDish:''
    }
  },
  created() {
    if(this.$store.state.listOfDishes){
      console.log("inside if");
      this.particularDish = this.$store.state.listOfDishes.filter((selectedDish)=>{
        return selectedDish.name === this.$route.params.dish;
      })[0];
    }
    if(this.particularDish){
      console.log("inside second if");
      this.$store.dispatch('storeDishDetail', this.particularDish);
      this.particularDish = this.$store.state.dishDetail;
    }
    else{
      var myUrl = '/getdish/'+ this.$route.params.dish;
      axios.get(myUrl)
      .then((res)=>{
        console.log("inside else");
        console.log(this.$store.state.dishDetail);
        this.$store.dispatch('storeDishDetail', res.data);
        this.particularDish = this.$store.state.dishDetail[0];
      })
      .catch((err)=>{
        console.log("Dish not found!!!");
      })  
    }
  }
}
</script>

<style>
@media(min-width:768px){
  #main-dishdetail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 583px;
    color: #000000;
    padding-top: 2px;
    margin-top: 82px;
    margin-right: 30px;
    font-family: 'Oleo Script';
    font-weight: 900;
    background-color: #FFFDD0;
  }
}
#main-dishdetail .imgg {
  width: 500px;
  height: 580px;
  z-index: 10;
  filter: blur(1px);
  -webkit-filter: blur(1px);
  position: absolute;
}
#main-dishdetail h2 {
  padding: 7px 5px;
  z-index:11;
  color: #264E36;
  -webkit-transform: scaleY(1.5); /* Safari 3-8 */
  transform: scaleY(1.5);
}
#main-dishdetail ul {
  list-style: none;
  color: #006E6D;
  z-index:11;
  font-size: 18px;
}


</style>
<template>

  <section id='main-content'>

    <h1>You are in the {{$route.params.name}} dishes list page . </h1>
  
  </section>
  
</template>

<script>
import mynavbar from '~/components/navbar';
import popuplogin from '~/components/poplogin';
import popupsignup from '~/components/popsignup';
export default {
  components: {
    'mynavheader': mynavbar,
    'popuplogin':popuplogin,
    'popupsignup':popupsignup
  },
  data(){
    return {

    }
  },
  created(){
    
  }
}
</script>

<style>

#main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 580px;
  color: #000000;
  margin-top: 84px;
  font-family: 'Oleo Script';
  font-weight: 900;
}

#main-content h1{
  z-index: 2;
  font-weight: 800;
  align-self: center;
  -webkit-transform: scaleY(1.5); /* Safari 3-8 */
  transform: scaleY(1.5);
  padding-bottom: 15rem;
}

</style>
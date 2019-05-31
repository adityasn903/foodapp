<template>

  <section id='main-contentindex'>
    <img src="../assets/2.jpg" id="image" />
    <h1>Discover some amazing recipes which makes you hearts filled.<br> Go on! Explore the site...</h1>
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
  }
}
</script>

<style>

#main-contentindex {
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

#image {
  width: 100%;
  height: 580px;
  z-index: -1;
  filter: blur(1.5px);
  -webkit-filter: blur(1.5px);
  position: absolute;
}
#main-contentindex h1{
  z-index: 2;
  font-weight: 800;
  align-self: center;
  -webkit-transform: scaleY(1.5); /* Safari 3-8 */
  transform: scaleY(1.5);
  padding-bottom: 15rem;
}

</style>

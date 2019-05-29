<template>      
<div class="maindiv"> 
  <header>
    <mynavheader />
    <popuplogin />
    <popupsignup />
  </header>
  <section id='main-content'>
    <img src="../assets/2.jpg" id="image" />
    <h1>Discover some amazing recipes which makes you hearts filled.<br> Go on! Explore the site...</h1>
  </section>
  <footer class="myfooter">
      <span>All trademarks are properties of their respective owners. © 2008-2019 - My food blog. All rights reserved.</span>
      <nuxt-link to=""><i class="fa fa-facebook socialicon" ></i></nuxt-link>
      <nuxt-link to=""><i class="fa fa-instagram socialicon"></i></nuxt-link>
      <nuxt-link to=""><i class="fa fa-twitter socialicon" ></i></nuxt-link>
  </footer>
</div>
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

.maindiv {
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: flex-start;
  align-content: flex-start;
}
#main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 580px;
  color: #000000;
  margin-top: 85px;
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
#main-content h1{
  z-index: 2;
  font-weight: 800;
  align-self: center;
  -webkit-transform: scaleY(1.5); /* Safari 3-8 */
  transform: scaleY(1.5);
  padding-bottom: 15rem;
}
.myfooter {
  color: #28A745;
  background-color: #1C2128;
  display: -ms-flexbox; /* IE10 */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 3.5rem;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-family: 'Lobster Two';
  z-index: 3;
  font-size: 1.2rem;
  margin: 0 auto;
}
.myfooter span {
  margin-right: 15rem;
  margin-left: 20rem;
}
.socialicon {
  color: #28A745;
  border: 2px solid #28A745;
  padding: 6px;
  margin: 0 1.2rem;
  border-radius: 30%;
}

</style>

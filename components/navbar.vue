<template>
		<nav id="navv">
			<nuxt-link to="/"><img src="~/assets/foodblog.jpg" alt='oops' id="mylogo" width="70" height='60'/></nuxt-link>
			<ul>
				<nuxt-link tag="li" to="/dishlist/indian" >Indian</nuxt-link>
				<nuxt-link tag="li" to="/dishlist/italian" >Italian</nuxt-link>
				<nuxt-link tag="li" to="/dishlist/chinese" >Chinese</nuxt-link>
			</ul>
			<div class='input-icons'>
				<button class="btn" @click = "getresults"><i class="fa fa-search icon"></i></button>
				<input type="text" class="form-control" id="recipesearch" placeholder="Search your favorite recipes" v-model='searchVal' >
			</div>
			<span v-if='!$store.state.logInState'>
			<button @click = "gotoLogin" class="btn btn-outline-success" id="loginbtn">Login</button>
			<button @click = "gotoSignup" class="btn btn-outline-success" id="signupbtn">Not a user? SignUp</button>
			</span>
			<span v-if="$store.state.logInState">
				<label style="margin-right: 3px; color:white;" >Welcome! {{userName}} </label> 
				<button @click = "gotoLogout" class="btn btn-outline-danger" style="margin-left: 5px;" id="loginbtn">Logout</button>
			</span>
			<nuxt-link to="/faq" class="about">FAQ ?</nuxt-link>
		</nav>
</template>

<script>
import {eventBus} from '~/plugins/myeventbus.js'
import axios from 'axios';

export default {
	created(){
		eventBus.$on('signedIn',(name)=>{
		this.userName = name;
		})
	},
	mounted() {
		let name = localStorage.getItem('userName');
		if(name){
			this.userName = name;
		}
	},
	data(){
		return {
			searchVal:'',
			userName: ''
		}
	},
	methods:{
		getresults(){
			var myUrl = '/getdish/'+ this.searchVal;
			console.log(this.searchVal);
			this.$store.dispatch('getMyDish', myUrl);
			this.$router.push("/dishdetails/"+this.searchVal);
		},
		gotoLogin(){
			document.getElementById("myLoginForm").style.display = "flex";
			document.getElementById("main-content").style.filter= 'blur(2px)';
			document.getElementById("navv").style.filter= 'blur(2px)';
      		document.getElementById("myfooter").style.filter= 'blur(2px)';
		},
		gotoSignup(){
			document.getElementById("mySignupForm").style.display = "flex";
			document.getElementById("main-content").style.filter= 'blur(2px)';
			document.getElementById("navv").style.filter= 'blur(2px)';
      		document.getElementById("myfooter").style.filter= 'blur(2px)';
		},
		async gotoLogout(){
			await this.$store.dispatch('logout');

		}
	}
}

</script>

<style>

#navv {
	display: -ms-flexbox; /* IE10 */
	display: flex;
	flex-direction: row;
	background-color: #1C2128;
	width: 100%;
	justify-content: flex-start;
	align-items: center;
	align-content: center;
	font-family: 'Lobster Two';
  	text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
	z-index: 3;
  	position: fixed;
  	font-size: 2rem;
}

#mylogo{
	padding-left: 5px;
}
#navv ul {
	display: -ms-flexbox; /* IE10 */
	display: flex;
	font-size: 18px;
	flex-direction: row;
	justify-content: stretch;
	list-style: none;
	align-items: stretch;
	align-content: stretch;
}
#navv ul li {
	box-sizing: border-box;
	padding: 10px 30px;
	color: #28A745;
	text-align: center;
	align-self: space-around;
	margin-top: 20px;
} 
#navv ul li:hover{
	background-color: #20262E;
}
.input-icons{
	width: 25%;
	margin-left: 90px;
	margin-right: 30px;
}
.input-icons .btn { 
    position: absolute; 
}
.icon { 
    min-width: 40px;
}
#recipesearch { 
	width: 100%; 
    padding: 10px;
    text-align: center;
}
#loginbtn{
	margin-left: 50px;
	margin-right: 20px;
}
.about{
	margin-left: 30px;
	color: #28A745;
	font-weight: 550;
}
.about:hover {
	outline: none;
	color: #28A745;
}
</style>

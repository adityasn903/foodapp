<template>
  <div class="form-container" id="myLoginForm">
    
    <h1 style='margin-left: 7rem; flex-grow: 2'>Login</h1>
    
    <div>
		<label for="Phone" style="margin: 0.5rem 0.5rem 0.2rem 0.8rem;color: #1CEF5B;"><b>Phone</b></label>
    	<input type="text" v-model='formUsername' class="form-control" 
    	style=" margin: 0.5rem 0.5rem 0.2rem 2.2rem;" placeholder="Enter Phone Number" name="phonenum" required>
	</div>

	<div>
    	<label for="psw" style="margin: 0.5rem 0.5rem 0.2rem 0.8rem;color: #1CEF5B;"><b>Password</b></label>
    	<input type="password" v-model='formPassword' class="form-control"
    	 style="margin: 0.5rem 0.5rem 0.2rem 0.8rem" placeholder="Enter Password" name="pswd" required>
	</div>
	
	<div>
    	<button class="btn" style="background-color: green; padding:5px 10px; margin: 8px;" @click="login">Login</button>
    	<button class="btn btn-danger" style="padding:5px 10px;margin: 8px;" @click="closeForm">Close</button>
  	</div>
  </div>
</template>

<script>

export default{
	data(){
		return {
			formUsername:'',
			formPassword:''
		}
	}
	,methods:{
		async login() {
	      	try {
	        	await this.$store.dispatch('login', {
	          			username: this.formUsername,
	          			password: this.formPassword
	        			});
	        	this.formUsername = '';
	        	this.formPassword = '';
	        	this.formError = null;
	      		} catch (e) {
	        		this.formError = e.message
	  			}
    	},
		closeForm(){
		  	document.getElementById("myLoginForm").style.display = "none";
		    document.getElementById("main-content").style.filter= 'blur(0px)';
		    document.getElementById("navv").style.filter= 'blur(0px)';

		}	
	}
}

</script>

<style>

.form-container {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 15%;
  left: 35%;
  border-radius: 5px;
  z-index: 4;
  min-width: 350px;
  min-height: 350px;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  background-image: url('../assets/loginbackground.jpg');
}

.form-container h1 {
	display: block;
	color: green;
	font-weight: 500;

}

.form-container div {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;
	flex-grow: 2
}

.form-container label {
	color: green;
	font-weight: 500;
}

</style>
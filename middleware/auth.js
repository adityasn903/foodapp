export default function ({ store, error }) {

    if (!store.state.logInState) {
      error({
        message: 'You are not signed in ',
        statusCode: 403
      })
    }
  }
/*one more way to check session middleware on client side /*
export default function ({ store, error }) {

    if(process.client){
    	store.dispatch('initAuth');
        if(!store.state.token){
        	error({
        		message:"oops! please login",
        		statusCode:403
        	})
        }
    }
  }*/
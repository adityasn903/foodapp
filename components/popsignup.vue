<template>
  <div class="container" id="mySignupForm">
    <div class="card-body">
      <div class="card-header signupheader" style="text-align:center;background-color:#20262E;">
        <span style="color: green; margin-top: 0.5rem;"><h3>SignUp</h3></span>
        <span  @click="closeform" style="width:50px"> <i class="fa fa-lg fa-window-close" style="width:100px;margin-left: 45px;margin-top: 18px;color:white;background-color:#20262E;"></i> </span>
      </div>

      <form @submit.prevent="handleSubmit" id="signupformel">
        <p v-if="formError" class="error">{{ formError }}</p>

        <div class="input-container">
          <input
            class="form-control"
            v-validate="'required'"
            type="text"
            name="fullName"
            v-model="UserData.fullName"
            placeholder="Enter Your Name"
          >
          <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
        </div>
        <div class="alert alert-danger" v-if="errors.has('fullName')">{{ errors.first('fullName') }}</div>

        <div class="input-container">
          <input
            class="form-control"
            type="password"
            name="password"
            v-validate="{ required: true, min: 6 }"
            v-model="UserData.password"
            placeholder="Enter Your Password"
            ref="password"
          >
          <i class="fa fa-key fa-lg fa-fw" aria-hidden="true"></i>
        </div>
        <div>
          <div
            class="alert alert-danger"
            v-if="errors.has('password') "
          >{{ errors.first('password') }}</div>
        </div>

        <div class="input-container">
          <input
            class="form-control"
            type="password"
            name="password_confirmation"
            v-model="UserData.confirmPassWord"
            placeholder="Confirm Your Password"
            v-validate="'required|confirmed:password'"
            data-vv-as="password"
          >
          <i class="fa fa-key fa-lg fa-fw" aria-hidden="true"></i>
        </div>
        <div>
          <div
            v-if="errors.has('password_confirmation')"
            class="alert alert-danger"
          >{{ errors.first('password_confirmation') }}</div>
        </div>
        <div class="input-container">
          <input
            :class="{'form-control':true, 'is-valid':vflag, 'is-invalid':iflag}"
            type="Text"
            v-model="phoneNumber"
            placeholder="Enter Your Phone Number"
          >
          <i class="fa fa-phone fa-lg fa-fw" aria-hidden="true"></i>
          <button
            class="btn btn-green"
            @click="sendOTP"
            v-if="verify_Button"
            style="width:80px;background-color:green;outline: 0;color: white;margin-left:4px;"
          >Verify</button>
        </div>
        <div class="alert alert-danger" v-if="phoneErrorMessage">{{phoneErrorMessage}}</div>

        <div class="input-container" v-if="flag1">
          <input
            type="text"
            :class="{ 'form-control':true, 'is-valid':vflag1, 'is-invalid':iflag1 }"
            v-model="otp"
            placeholder="OTP Here"
          >
          <i class="fa fa-pencil fa-lg fa-fw" aria-hidden="true"></i>
          <button @click.prevent="verifyOTP" v-if="otp_sub_button" class="btn btn-primary">Submit</button>
        </div>
        <div class="alert alert-danger" v-if="otpErrorMessage">{{otpErrorMessage}}</div>
        <div v-if="flag2">
          <div class="input-container">
            <input
              class="form-control"
              type="number"
              name="postalcode"
              value="zipCode"
              v-model="UserData.zipCode"
              placeholder="Enter Your Zipcode"
            >
            <i class="fa fa-map-pin fa-lg fa-fw" aria-hidden="true"></i>
          </div>
          <div class="input-container">
            <input
              class="form-control"
              type="text"
              name="email"
              v-model="UserData.userEmail"
              placeholder="Enter Your Email" >
              <i class="fas fa-envelope-square"></i>
          </div>

          <div class="radio-inline">
            <div class="radio-inline">
              <label for="male">
                <input type="radio" id="male" value="Male" v-model="UserData.gender"> Male
              </label>
            </div>

            <div class="radio-inline">
              <label for="female">
                <input type="radio" id="female" value="Female" v-model="UserData.gender"> Female
              </label>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-success"
            @click="signup"
            style="margin-left:30px;width:120px;margin-bottom: 5px;"
          >SignUp</button>
          <button
            type="click"
            class="btn btn-danger"
            @click="closeform"
            style="margin-left:30px;width:120px;margin-bottom: 5px;"
          >SignUp</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import axios from "axios";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

export default {
  data() {
    return {
      UserData: {
        fullName: "",
        password: "",
        confirmPassWord: "",
        contact: [],
        gender: "Male",
        zipCode: "",
        userEmail:'',
        OTPtoken: null
      },
      passwordError: "",
      verifiedPhoneNumber: "",
      phoneNumber: "",
      formError: null,
      otp_data: null,
      otp: null,
      flag1: false,
      flag2: false,
      phoneErrorMessage: "",
      otpErrorMessage: "",
      vflag: false,
      iflag: false,
      verify_Button: true,
      otp_sub_button: true,
      vflag1: false,
      iflag1: false,
      submitted: false
    }
  },
  methods: {
    closeform(){
      document.getElementById("mySignupForm").style.display = "none";
      document.getElementById("main-content").style.filter= 'blur(0px)';
      document.getElementById("navv").style.filter= 'blur(0px)';
    },
    sendOTP() {
      axios
        .post("/api/sendotp", { phoneNumber: this.phoneNumber })
        .then(response => {
          this.otp_data = response.data;

          if (this.otp_data.status == 0) {
            this.verifiedPhoneNumber = this.phoneNumber;
            this.phoneErrorMessage = "";
            this.verify_Button = false;
            this.iflag = false;
            this.vflag = true;
            this.flag1 = true;
          } else {
            this.phoneErrorMessage = this.messageFilter(
              this.otp_data.error_text
            );
            setTimeout(() => {
              this.phoneErrorMessage = '';
              this.iflag = false;
            }, 9000);
            this.vflag = false;
            this.iflag = true;
          }
        })
        .catch(error => {
          this.phoneErrorMessage = "User Already exists";
           setTimeout(() => {
              this.phoneErrorMessage = '';
              this.iflag = false;
            }, 4000);
        });
    },
    verifyOTP() {
      axios
        .post("/api/verifyotp", {
          request_id: this.otp_data.request_id,
          code: this.otp
        })
        .then(response => {
          if (response.data.resp.status == 0) {
            this.OTPtoken = response.data.token;
            this.otpErrorMessage = "";
            this.otp_sub_button = false;
            this.iflag1 = false;
            this.vflag1 = true;
            this.flag2 = true;
          } else {
            this.otpErrorMessage = this.messageFilter(response.data.error_text);
            this.vflag1 = false;
            this.iflag1 = true;
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            throw new Error("User Already existsss");
          }
          throw error;
        });
    },
   async signup() {
    this.UserData.contact = [];
      this.UserData.contact.push(this.verifiedPhoneNumber);

      if(this.UserData.password == this.UserData.confirmPassWord) {
          try {
                await this.$store.dispatch("signup", this.UserData);
                if (this.$store.state.authUser) {
                  this.$router.push("/dishlist");
                }
                this.formError = null;
              } catch (e) {
                this.formError = e.message;
              }
      }else{
          this.formError = 'Passwords does not match';
          this.$router.push('/')
      }
    },
    messageFilter(emessage) {
      if (emessage === "Invalid value for param: number") {
        return "Invalid Phone Number";
      }
      if (emessage === "Concurrent verifications to the same number are not allowed") {
        return "Message Already sent";
      }
      if (emessage === "The code provided does not match the expected value") {
        return "Invalid code";
      }
      if (emessage === "Your request is incomplete and missing the mandatory parameter: number") {
        return "Please Enter Phone Number ";
      }
    },
    handleSubmit(e) {
      this.submitted = true;
      setTimeout(() => {
        this.errors.clear();
      }, 9000);
      this.$validator.validate().then(valid => {
        if (valid) {
           console.log("success");
        }
      });
    }
  }
};

</script>

<style>

.container {
  display: none;
  position: absolute;
  flex-direction: column;
  justify-items: stretch;
  align-items: center;
  align-content: center;
  top: 15%;
  left: 35%;
  border-radius: 5px;
  background: #1C2128;
  padding: 30px;
  max-width: 800px;
  width: 500px;
  z-index: 4;
}
.signupheader {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
.input-container {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  margin-bottom: 10px;
  margin-top: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
  border-radius: 5px;
  width: 1000px;
}

.input-field:focus {
  border: 2px solid dodgerblue;
}


.input-container input[type="text"],
[type="password"],
[type="number"] {
  padding-left: 40px;
}

.input-container {
  position: relative;
}
.input-container i {
  position: absolute;
  left: 0;
  top: 6px;
  padding: 5px 15px;
  color: #aaa;
  transition: 3s;
}
.input-container input[type="text"]:focus + i {
  color: dodgerblue;
}
.input-container input[type="password"]:focus + i {
  color: dodgerblue;
}
.input-container input[type="number"]:focus + i {
  color: dodgerblue;
}

#signupformel {
  margin-left: 25px;
}
.error {
  color: red;
}
.htttt {
  border: 1px solid red;
  background-color: blue;
}
</style>

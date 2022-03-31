<template>
  <div class="container">
    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form class="user" @submit.prevent="onRegister">
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="firstName"
                      placeholder="First Name"
                      :class="{ 'error-input': formError.firstName }"
                      v-model="formData.firstName"
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="lastName"
                      placeholder="Last Name"
                      :class="{ 'error-input': formError.lastName }"
                      v-model="formData.lastName"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control form-control-user"
                    id="inputEmail"
                    placeholder="Email Address"
                    :class="{ 'error-input': formError.email }"
                    v-model="formData.email"
                  />
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="password"
                      class="form-control form-control-user"
                      id="Password"
                      placeholder="Password"
                      :class="{ 'error-input': formError.password }"
                      v-model="formData.password"
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="password"
                      class="form-control form-control-user"
                      id="RepeatPassword"
                      placeholder="Repeat Password"
                      :class="{ 'error-input': formError.repeatPassword }"
                      v-model="formData.repeatPassword"
                    />
                  </div>
                </div>
                <div
                  class="alert text-center"
                  role="alert"
                  :class="{
                    'alert-danger': errorRegister,
                    'alert-success': !errorRegister,
                  }"
                  v-if="messageError"
                >
                  {{ messageError }}
                </div>
                <button type="submit" class="btn btn-dark btn-user btn-block">
                  Register Account
                </button>
              </form>
              <hr />
              <div class="text-center">
                <p class="change-form" @click="changeForm">
                  Already have an account? Login!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import * as Yup from "yup";

import { auth } from "../../utils/firebase";

export default {
  name: "Register",
  props: {
    changeForm: Function,
  },
  setup(props) {
    let formData = {};
    let formError = ref({});
    let messageError = ref("");
    let errorRegister = ref(false);

    const schemaForm = Yup.object().shape({
      firstName: Yup.string().required(true),
      lastName: Yup.string().required(true),
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
      repeatPassword: Yup.string()
        .required(true)
        .oneOf([Yup.ref("password"), true]),
    });

    const onRegister = async () => {
      formError.value = {};
      messageError.value = "";
      errorRegister.value = false;

      try {
        await schemaForm.validate(formData, { abortEarly: false });

        try {
          const { email, password } = formData;

          await auth.createUserWithEmailAndPassword(email, password);

          messageError.value = "Registred";
          setTimeout(() => {
            props.changeForm();
          }, 1500);
          //
        } catch (error) {
          errorRegister.value = true;
          messageError.value = error.message;
        }
      } catch (err) {
        errorRegister.value = true;
        err.inner.forEach((error) => {
          formError.value[error.path] = error.message;
        });
      }
    };

    return {
      formData,
      formError,
      messageError,
      errorRegister,

      onRegister,
    };
  },
};
</script>

<style>
.bg-register-image {
  background: url("https://source.unsplash.com/Mv9hjnEUHR4/600x800");
  background-position: center;
  background-size: cover;
}
</style>

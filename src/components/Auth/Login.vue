<template>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <form class="user" @submit.prevent="onLogin">
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        :class="{ 'error-input': formError.email }"
                        v-model="formData.email"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        :class="{ 'error-input': formError.password }"
                        v-model="formData.password"
                      />
                    </div>
                    <button
                      class="btn btn-primary btn-user btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                  <hr />
                  <div class="text-center">
                    <p class="change-form" @click="changeForm">
                      Create an Account!
                    </p>
                  </div>
                </div>
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

export default {
  name: "Login",
  props: {
    changeForm: Function,
  },
  setup() {
    let formData = {};
    let formError = ref({});

    const schemaFrom = Yup.object().shape({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    });

    const onLogin = async () => {
      formError.value = {};
      try {
        await schemaFrom.validate(formData, { abortEarly: false });
        console.log("TODO OK");
      } catch (err) {
        err.inner.forEach((error) => {
          formError.value[error.path] = error.message;
        });
        console.log(formError);
      }
    };

    return {
      formData,
      formError,

      onLogin,
    };
  },
};
</script>

<style></style>

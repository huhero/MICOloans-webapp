<template>
  <div class="card">
    <div class="card-header">Featured</div>
    <form class="card-body" @submit.prevent="onChangeName">
      <h5 class="card-title">Special title treatment</h5>
      <div class="row">
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="First name"
            aria-label="First name"
            :class="{ 'error-input': formError }"
            v-model="formData.name"
            required
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="Last name"
            aria-label="Last name"
            :class="{ 'error-input': formError }"
            v-model="formData.lastName"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-3">
        <span v-if="!isLoading">Update</span>
        <beat-loader
          v-bind:loading="isLoading"
          v-bind:color="'#fff'"
          v-bind:size="'8px'"
        >
        </beat-loader>
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import * as Yup from "yup";
import { auth } from "../../utils/firebase";
import { useStore } from "vuex";

import BeatLoader from "vue-spinner/src/BeatLoader.vue";

export default {
  name: "FormChangeName",
  components: {
    BeatLoader,
  },
  setup() {
    const store = useStore();
    let formData = ref({});
    let formError = ref(false);
    let formErrorMessage = ref("");
    let isLoading = ref(false);

    const schemaForm = Yup.object().shape({
      name: Yup.string().required(true),
      lastName: Yup.string().required(true),
    });

    const onChangeName = async () => {
      formError.value = false;
      isLoading.value = true;
      try {
        await schemaForm.validate(formData.value, { abortEarly: false });

        try {
          const { name, lastName } = formData.value;
          await auth.currentUser.updateProfile({
            displayName: `${name} ${lastName}`,
          });
          store.dispatch("reloadUser");
        } catch (error) {
          formErrorMessage.value = error.message;
        }
      } catch (err) {
        err.inner.forEach((error) => {
          formError.value = error.message;
        });
      }
      isLoading.value = false;
    };

    return {
      formData,
      formError,
      isLoading,

      onChangeName,
    };
  },
};
</script>

<style></style>

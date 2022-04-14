<template>
  <BasicLayout>
    <FormChangeName />
  </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout.vue";

import FormChangeName from "../components/Account/FormChangeName.vue";
export default {
  name: "Account",
  components: {
    BasicLayout,
    FormChangeName,
  },
};
</script>

<style></style>

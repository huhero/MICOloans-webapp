<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <b-icon-front class="d-inline-block align-text-top" />
        MICOloans
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        :aria-expanded="navResponsive"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" @click="onNavResponsive"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ show: navResponsive }"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              :aria-expanded="dropButtonOpen"
              @click="onDropButton"
              >Dropdown</a
            >
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
              :class="{ show: dropButtonOpen }"
            >
              <li>
                <a class="dropdown-item" href="#">
                  <b-icon-person-fill />
                  My account
                </a>
              </li>
              <!-- <li><a class="dropdown-item" href="#">Another action</a></li> -->
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#" @click="onLogout">
                  <b-icon-arrow-right-square-fill />
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Page content-->
  <div class="container">
    <div class="text-center mt-5">
      <slot />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "../utils/firebase";
export default {
  name: "BasicLayout",
  setup() {
    let navResponsive = ref(false);
    let dropButtonOpen = ref(false);

    const onNavResponsive = () => {
      navResponsive.value = !navResponsive.value;
    };

    const onDropButton = () => {
      dropButtonOpen.value = !dropButtonOpen.value;
    };
    const onLogout = () => {
      auth.signOut();
    };

    return {
      navResponsive,
      dropButtonOpen,

      onLogout,
      onNavResponsive,
      onDropButton,
    };
  },
};
</script>

<style></style>

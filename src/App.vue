<template>
  <v-app>
    <v-main class="mb-10">
      <router-view/>
    </v-main>
     <v-footer color="grey lighten-2" padless>
            <v-col
            class="text-center pb-2"
            cols="12"
            >
              <a href="https://www.linkedin.com/in/liyumk/" target="_blank"  class="text-decoration-none">Liyu Mesfin</a> - {{ new Date().getFullYear() }} 
            </v-col>
        </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

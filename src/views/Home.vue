<template>
  <div class="">
    <Navbar/>
    <div class="" >
      <InputFile/>
    </div>
       
  </div>
</template>

<script>
  
  import Navbar from "../components/Navbar.vue";
  import InputFile from '../components/InputFile.vue'
  export default {
    name: 'Home',

    components: {
      Navbar,
      InputFile
    },
  }
</script>

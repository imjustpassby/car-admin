<template>
  <div class="app-container">
    <el-button @click="getRes">api test</el-button>
  </div>
</template>

<script>
import axios from "axios";
import { test } from "@/api/login";
export default {
  data() {
    return {};
  },
  methods: {
    getRes() {
      axios
        .get("/test/getInfo")
        .then(response => {
          let res = response.data;
          console.log(res.result);
        })
        .catch(() => {
          console.log("error sorry");
        });
    },
    testApi() {
      test()
        .then(response => {
          const data = response.result; //request.js会直接返回response.data 这里可以直接取值response.result;
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

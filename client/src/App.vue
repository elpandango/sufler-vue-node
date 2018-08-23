<template>
  <div id="app">
    <h1>Styles modifier</h1>
    <div class="textarea-block">
        <textarea
          class="textarea"
          autofocus
          name="textarea" id="textSource" cols="30" rows="10" v-model="text"></textarea>
      <pre class="textarea">{{responseText}}</pre>
    </div>
    <br>
    <button @click="onUglify">Minify CSS</button>
    <button @click="onAutoprefix">Autoprefix CSS</button>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'App',
    data() {
      return {
        text: '',
        email: '',
        password: '',
        responseText: ''
      }
    },
    methods: {
      onUglify() {
        axios.post('http://localhost:8081/uglify', {
          text: this.text
        }).then(response => {
          console.log(response.data);
          this.responseText = response.data.message;
        }).catch(error => {
          console.log(error);
        })
      },
      onAutoprefix() {
        axios.post('http://localhost:8081/autoprefix', {
          text: this.text
        }).then(response => {
          console.log(response.data);
          this.responseText = response.data.message;
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .textarea-block {
    display: flex;
  }

  .textarea {
    display: block;
    overflow: auto;
    margin: 0;
    padding: 1em;
    min-height: 60vh;
    width: 50%;
    height: 500px;
    border: 0;
    background: #f5f5f5;
    box-shadow: 0 0 0 1px #ddd;
    font-family: 'Fira Code', 'Operator Mono', Consolas, Monaco, 'Andale Mono', monospace;
    resize: none;
    -webkit-appearance: none;
  }
  pre {
    text-align: left;
  }
</style>

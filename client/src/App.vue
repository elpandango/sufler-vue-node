<template>
  <div id="app">
    <div class="container">
      <h1>Styles modifier</h1>
      <div class="textarea-block">
        <textarea
          class="textarea"
          autofocus
          name="textarea"
          id="textSource"
          cols="30"
          rows="10"
          v-model="text"></textarea>
        <pre class="textarea">{{responseText}}</pre>
      </div>
      <br>
      <button
        class="btn btn-warning"
        @click="onClean"
        v-bind:disabled="text === ''">Clean Data
      </button>
      <button
        class="btn btn-primary"
        @click="onUglify"
        v-bind:disabled="text === ''">Minify CSS
      </button>
      <button
        class="btn btn-primary"
        @click="onAutoprefix"
        v-bind:disabled="text === ''">Autoprefix CSS
      </button>
    </div>
  </div>
</template>

<script>
  import axiosInstance from './axios';

  export default {
    name: 'App',
    data() {
      return {
        text: '.example {\n' +
        '    display: grid;\n' +
        '    transition: all .5s;\n' +
        '    user-select: none;\n' +
        '    background: linear-gradient(to bottom, white, black);\n' +
        '}',
        responseText: ''
      }
    },
    methods: {
      onClean(){
        this.responseText = '';
        this.text = '';
      },
      onUglify() {
        axiosInstance.post('/uglify', {
          text: this.text
        }).then(response => {
//          console.log(response.data);
          this.responseText = response.data.message;
        }).catch(error => {
          console.log(error);
        })
      },
      onAutoprefix() {
        axiosInstance.post('/autoprefix', {
          text: this.text
        }).then(response => {
//          console.log(response.data);
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
    justify-content: space-between;
  }

  .textarea {
    display: block;
    overflow: auto;
    margin: 0;
    padding: 1em;
    min-height: 60vh;
    width: calc(50% - 1px);
    height: 500px;
    border: 0;
    background: #f5f5f5;
    box-shadow: 0 0 0 1px #ddd;
    font-family: 'Fira Code', 'Operator Mono', Consolas, Monaco, 'Andale Mono', monospace;
    resize: none;
    -webkit-appearance: none;
    font-size: 16px;
    line-height: 1.15;
  }

  pre {
    text-align: left;
    white-space: pre-wrap;
  }
</style>

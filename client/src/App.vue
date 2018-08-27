<template>
  <div id="app">
    <div class="container">
      <div class="wrapper">
        <h1 class="title">Styles modifier</h1>
        <div class="textarea-block">
        <textarea
          class="textarea"
          autofocus
          name="textarea"
          id="textSource"
          cols="30"
          rows="10"
          v-model="text"
          @change="onChange"></textarea>
          <textarea ref="result" class="textarea">{{responseText}}</textarea>
        </div>
        <br>
        <div class="btn-box">
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
          <button
            class="btn btn-success"
            @click="onCopyResult"
            v-bind:disabled="responseText === ''">Copy result
          </button>
        </div>
      </div>
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
        responseText: '',
        isPrefixed: false
      }
    },
    methods: {
      onClean() {
        this.responseText = '';
        this.text = '';
      },
      onChange() {
        this.isPrefixed = false;
      },
      onUglify() {
        let tempText = '';
        if (this.isPrefixed) {
          tempText = this.responseText
        } else {
          tempText = this.text
        }
        axiosInstance.post('/uglify', {
          text: tempText
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
          this.isPrefixed = true;
        }).catch(error => {
          console.log(error);
        })
      },
      onCopyResult() {
        this.$refs.result.select();
        document.execCommand("copy");
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .wrapper {
    padding: 35px 0;
  }

  .title {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 30px;
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
    width: calc(50% - 1px);
    height: 500px;
    border: 0;
    border-radius: 0;
    background: #f5f5f5;
    box-shadow: 0 0 0 1px #ddd;
    font-family: 'Lato', sans-serif;
    resize: none;
    -webkit-appearance: none;
    font-size: 16px;
    line-height: 1.15;
  }

  pre {
    text-align: left;
    white-space: pre-wrap;
  }

  @media only screen and (max-width: 767px) {
    .textarea-block {
      flex-direction: column;
    }

    .textarea {
      width: 100%;
      height: 400px;
    }
  }
</style>

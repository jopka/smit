<template>
  <div id="app">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <img src="./assets/logo.png">
    <router-view
    @manager="manager = $event"
    :manager="manager"
    >
    </router-view>
  </div>
</template>

<script>
import Manager from './components/Manager.vue'
import Call from './components/Call.vue'
export default {
  name: 'App',
  data () {
    return {
      manager: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 700px;
  margin: auto;
}
a.call, button.call{
border-radius: 4px;
-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.08);
-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.08);
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.08);
color: #fff;
display:block;
width:100px;
text-align: center;
font-family: Arial, Helvetica, sans-serif;
font-size: 14px;
padding: 8px 16px;
margin: 20px auto;
text-decoration: none;
text-shadow: 0 1px 1px rgba(0, 0, 0, 0.075);
-webkit-transition: background-color 0.1s linear;
-moz-transition: background-color 0.1s linear;
-o-transition: background-color 0.1s linear;
transition: background-color 0.1s linear;        
}
a.green, button.green {
background-color: rgb( 43, 153, 91 );
border: 1px solid rgb( 33, 126, 74 );
}    
a.green:hover, button.green:hover {
background-color: rgb( 75, 183, 141 );
}
a.red, button.red {
background-color: #da2825;
border: 1px solid #d00d14;
}    
a.red:hover, button.red:hover {
background-color: #fb4657;
}
</style>

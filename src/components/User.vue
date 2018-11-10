<template>
  <div id="app">
    <h1>User</h1>
    <div class="mass">
    <button 
    v-for="rList in roomsList"
    :key="rList.id"
    v-if="!rList.user && rList.manager"
    class="call green" @click="connection(rList.id)" >Комната "{{rList.roomName}}" Вызов</button>
    </div>
    <!--<button class="btn vtn-success" @click="loadRooms()">Обновить</button>-->
  </div>
</template>

<script>

export default {
  
  name: 'User',
  created() {
      this.conversation(); 
      const api = require('vk-wrapper')
    
    api('users.get', {
      user_ids: 1
    }).then(body => {
      console.log(body) // => { response: [ { id: 1, first_name: 'Павел', last_name: 'Дуров' } ] }
    })
  },
  data () {
    return {
      roomsList: {},
    }
  },
  methods:{
    connection(id){
      let room ={
                  user: true
                  };
      this.$http.patch('http://localhost:3000/rooms/' + id, room);
      this.$router.push('/call/' + id);
    },
    loadRooms(){
      this.$http.get('http://localhost:3000/rooms')
      .then(response => {
        return response.json()
      })
      .then( newRoom => {
        this.roomsList = newRoom;
      })
    },
    conversation(){
      //setTimeout(created(), 1000);
      
      this.$http.get('http://localhost:3000/rooms')
      .then(response => {
        return response.json()
      })
      .then( newRoom => {
        this.roomsList = newRoom;
      })
      setTimeout(() =>{
        this.conversation()
      }, 1000);
      
    }
  }
}
</script>

<style scoped>

.mass{
  display: flex;
}

</style>

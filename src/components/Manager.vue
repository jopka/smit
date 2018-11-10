<template>
  <div id="app">
    <h1>Admin</h1>
    <button v-if="choice" class="btn vtn-success" @click="loadRooms()">Выбрать из старых</button>
    <button v-else class="btn vtn-success" @click="NoRooms()">Новая Комната</button>

    <select v-model="sorting" v-on:change="change" v-if="!choice">
      <option disabled>Выберите комнату</option>
      <option 
      v-for="rList in roomsList"
      :key="rList.id"
      :value="rList.id"
      >{{rList.roomName}} / {{rList.name}}</option>
    </select>

    <div v-if="!newRoom.id && choice">
      <div class="from-group">
        <label for="name">Название комнаты</label>
        <input type="text" id="room" class="form-control" v-model.trim="roomName">
      </div>
      <div class="from-group">
        <label for="name">Имя менеджера</label>
        <input type="text" id="name" class="form-control" v-model.trim="name">
      </div>
      <button class="btn vtn-success" @click="createRoom">Создать комнтату</button>
    </div>

    <div v-if="newRoom.id">
      {{manager}}
      <input type="text" id="room" class="form-control" v-model.trim="roomName">
      <p>Комната: {{roomName}}</p>
      <input type="text" id="room" class="form-control" v-model.trim="name">
      <p>Имя: {{name}}</p>
      <button class="btn vtn-success" @click="patchRoom(newRoom.id)">Изменить комнтату</button>
      <button class="btn vtn-success" @click="deleteRoom(newRoom.id)">Удалить комнтату</button>
      <router-link v-if="newRoom.roomName == roomName && newRoom.name == name" class="call green" :to="'/call/' + newRoom.id">Нарать работу</router-link>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Manager',
  props:{
    manager:Boolean
  },
  data () {
    return {
      sorting: null,
      roomsList: {},
      choice: true,
      roomName: '',
      name: '',
      newRoom: {},
      begin_work: false,
      in_work: false
    }
  },
  methods:{
    NoRooms(){
      this.choice = !this.choice;
      this.newRoom = {};
      this.roomName = '';
      this.name = '';
    },
    loadRooms(){
      this.$emit('manager',this.manager = true);
      this.choice = !this.choice;
      this.$http.get('http://localhost:3000/rooms')
      .then(response => {
        return response.json()
      })
      .then( newRoom => {
        this.roomsList = newRoom;
      })
    },
    createRoom(){
      this.$emit('manager',this.manager = true);
      const room = {
        roomName: this.roomName,
        name: this.name,
        manager: false,
        user: false
      }
      this.$http.post('http://localhost:3000/rooms', room)
      .then(response => {
        return response.json()
      })
      .then( newRoom => {
        this.newRoom=newRoom
      })
    },
    change(){
      this.$http.get('http://localhost:3000/rooms/' + this.sorting)
      .then(response => {
        return response.json()
      })
      .then( newRoom => {
        this.newRoom = newRoom;
        this.roomName = newRoom.roomName;
        this.name = newRoom.name;
      })
    },
    cRoom(room){
      this.newRoom = room;
      this.roomName = room.roomName;
      this.name = room.name;
    },
    patchRoom(id){
      let room ={
                name: this.name,
                roomName: this.roomName,
                id: id
                };
      this.$http.patch('http://localhost:3000/rooms/' + id, room)
      .then(response => {
        return response.json()
      })
      .then( newRoom => {
        this.newRoom=newRoom;
      })
      
    },
    deleteRoom(id){
      for (let key in this.roomsList){
        if(this.roomsList[key].id == id){
          console.log(key);
          this.roomsList.splice(key, key);
        }
      }
      this.$http.delete('http://localhost:3000/rooms/' + id);
      this.roomName = '';
      this.name = '';
      this.newRoom = {};
    }
  }
}


</script>

<style scoped>

</style>

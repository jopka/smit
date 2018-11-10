<template>
  <div id="app">
    {{newRoom.roomName}}
    {{newRoom.name}}
    <div class="box" v-for="message in messages"
      :key="message.id"
      v-if="message.room_id == roomId"
      ><div>{{message.name}}</div><div>{{message.text}}</div>
    </div>
    <div class="direction">
      <div class="box">
        <textarea v-model="text" @keyup.enter="chat">
        </textarea>
        <button class="btn vtn-success" @click="chat">Отправить</button>
      </div>
      <div v-if="manager"> 
        <button v-if="!newRoom.user" class="btn vtn-success" @click="proceed">{{startWork}}</button>
        <button v-if="!newRoom.user" class="call red" @click="connection">Завершить работу</button>
      </div>
        <button v-else   class="call red" @click="connection">Завершить вызов</button>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    manager:Boolean
  },
  created() {
      this.conversation(); 
      this.chatBD();
  },
  data () {
    return {
      startWork: 'Приступить к работе',
      choice: false,
      roomId: this.$route.params['roomId'],
      newRoom:{},
      messages:{},
      text: '',
      resourceComms: '',
      resourceRooms: ''
    }
  },
  methods:{
    proceed(f=true){
      let room ={};
      if(this.manager){
        if(f){
          this.$choice = !this.$choice;
          room ={
                  manager: false
                  };
          if (this.$choice){
            this.startWork = 'Завершить работу';
            room ={
                    manager: true
                    };
          }
          else{
            this.startWork = 'Приступить к работе';
          }
        }
        else{
          room ={
                  manager: false
                  };
        }
      }
      else{
        room ={
                user: false
                };
      }/*
      this.resourceRooms.update({id:this.roomId},room);
      */
      this.$http.patch('http://localhost:3000/rooms/' + this.roomId, room)
      .then(response => {
        console.log(response);
      });
      
    },
    connection(){
      /*
      this.resourceComms.delete({room_id:this.roomId});
      */
      for(let message of this.messages){
        this.$http.delete('http://localhost:3000/comments/' + message.id)
      }

      this.proceed(false);
      if(this.manager){
        this.$router.push('/manager');
      }
      else{
        this.$router.push('/');
      }
    },
    conversation(){
      //setTimeout(created(), 1000);
      /*
      this.resourceRooms.get({id:this.roomId}).then(response => {
        this.newRoom = response.body;
        
      });
      console.log(1);
      */
      this.$http.get('http://localhost:3000/rooms/' + this.roomId)
      .then(response => {
        return response.json()
      })
      .then( newRoom => {
        this.newRoom = newRoom;
      })
      
      setTimeout(() =>{
        this.conversation()
      }, 1000);
    },
    chatBD(){/*
      this.resourceComms.get().then(response => {
        console.log(response);
        this.messages = response.body;
      });
      */
      this.$http.get('http://localhost:3000/comments')
      .then(response => {
        return response.json()
      })
      .then( messages => {
        this.messages=messages
      })
      
      setTimeout(() =>{
        this.chatBD()
      }, 1000);
    },
    chat(){
      if(this.manager){
        name = this.newRoom.name;
      }
      else{
        name = 'user';
      } 

      const comment = {
        name: name,
        text: this.text,
        room_id: this.roomId
      }
      this.text = '';
      //this.resourceComms.save(comment);
      this.$http.post('http://localhost:3000/comments', comment)
    }
  },
  watch:{
    $route(toR, fromR){
      this.roomId = tiR.params['roomId'];
    }
  }
}
</script>

<style scoped>
.box:nth-child(even){
  background-color: beige;
}
.box{
  display: flex;
}
.box div{
  width: 20%;
}
.box div:nth-child(even){
  width: 80%;
  text-align: left;
}
.box textarea {
  width: 80%; /* Ширина поля в процентах */
  height: 50px; /* Высота поля в пикселах */
  resize: none; /* Запрещаем изменять размер */
} 
.box button{
  width: 20%;
}
.direction{
  display: flex;
  flex-direction:column;
}
.direction .call{
  width: auto;
  margin: 20px 0;
}
</style>

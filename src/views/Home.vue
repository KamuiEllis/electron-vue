<template>
  <div class="home">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Link</label>
      <input type="text" v-model='bot.link' class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Name</label>
      <input type="text" v-model='bot.name' class="form-control" id="exampleFormControlInput1" placeholder="amazon bot">
    </div>
    <button @click="save" class='btn btn-success'>Save</button>
  </div>
</template>

<script>
// @ is an alias to /src
const axios = require('axios');
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import swal from 'sweetalert2';


export default {
  name: 'Home',
  data: function() {
    return {
      bot: {
        name: '',
        link: '',
        status: 'unavailable',
        lastChecked: '',
        nextChecked: ''
      }
    }
  },

  created() {
    if(this.$route.params.id != 1) {
      this.getBot(this.$route.params.id)
    }

     this.ws = new WebSocket("ws://localhost:1000");


        this.ws.addEventListener("open", () => {
          console.log('connected')

          this.ws.send('wassup')

        })

        this.ws.addEventListener('message', e => {
              console.log(e)
        })
  },

  methods: {

    async getBot(id) {
      await axios.get('http://localhost:3000/_bots/getBot', {params:{_id:id}}).then(data => {
            this.bot = data.data.data[0];
      })
    },

    save() {
      if(this.$route.params.id == 1) {
        console.log(this.$route.params.id)
        axios.post('http://localhost:3000/_bots/createBot', this.bot).then(() => {
          swal.fire({
              icon: 'success',
              title: 'You bot has been saved',
              showConfirmButton: false,
              timer: 1500
          }).then(() => {
            this.bot = {
                name: '',
                link: '',
                status: 'unavailable',
                lastChecked: '',
                nextChecked: ''
              }
          })
        })
      } else {
        axios.put(`http://localhost:3000/_bots/editBot?_id=${this.$route.params.id}`, this.bot).then(() => {
            swal.fire({
              icon: 'success',
              title: 'You bot has been saved',
              showConfirmButton: false,
              timer: 1500
          }).then(() => {
            this.bot = {
                name: '',
                link: '',
                status: 'unavailable',
                lastChecked: '',
                nextChecked: ''
              }
          })
        })
      }
    }
  }

}
</script>

<style>
  .home{
    padding:50px;
  }

</style>
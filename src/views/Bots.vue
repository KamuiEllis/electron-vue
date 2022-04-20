<template>
  <div class="home">
    <table class=' hover'>
  <tr>
    <th>Name</th>
    <th>Status</th>
    <th>Last Checked</th>
    <th>Next Checked</th>
    <th>Action</th>
  </tr>
  <tr v-for="bot in bots" :key="bot._id">
    <td>{{bot.name}}</td>
    <td>{{bot.status}}</td>
    <td>{{bot.lastChecked}}</td>
    <td>{{bot.nextChecked}}</td>
    <td> <router-link class='btn btn-success' :to="'/home/'+bot._id">Edit</router-link> |<button @click="deleter(bot._id)" class='btn btn-danger'>Delete</button></td>
  </tr>
</table>
  </div>
</template>

<script>
const axios = require('axios');
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import swal from 'sweetalert2';



// import {btn} from 'bootstrap';
// @ is an alias to /src

export default {
  name: 'Home',
  data: function () {
      return {
            name:'nate',
            bots:[],
            ws: null
      }
  },

    async created () {
        this.getBots();
        this.ws = new WebSocket("ws://localhost:1000");

        this.ws.addEventListener("open", () => {
          console.log('connected')

          this.ws.send('wassup')

        })

        this.ws.addEventListener('message', e => {
              this.getBots();
              console.log(e)
        })

    },

    methods: {
        async getBots() {
            await axios.get('http://localhost:3000/_bots/getBots').then(data => {
                this.bots = data.data.data;
            })
        },

        async deleter(id) {
            await axios.delete('http://localhost:3000/_bots/deleteBot', {params:{_id:id}}).then(() => {
                swal.fire({
                        icon: 'success',
                        title: 'Bot has been deleted',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        this.getBots()
                    })
            })
        },

    }

}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

</style>
<template>
  <!-- justify-center items-center -->
  <q-page class="row  justify-center items-center ">
    <div class="col-md-8">
      <div>
        <div class="q-pa-md">
          <q-btn label="Dialog" color="primary" @click="dialog = true" />

          <q-dialog v-model="dialog">
            <q-card>
              <q-card-section class=" items-center q-gutter-sm">
                <div>
                  <q-input
                  label="name"
                  v-model="form.name"
                  />
                  <q-input
                  label="email"
                  v-model="form.email"
                  />
                </div>
                <div>
                  <q-btn no-caps v-if="upbtn" label="update" @click="updateStudent()" color="primary" v-close-popup />
                  <q-btn no-caps v-if="addbtn" label="submit" @click="addStudent()" color="primary" v-close-popup />
                  <q-btn no-caps label="Close dialog" color="red-14" v-close-popup />
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </div>
     <students :rows="rows" :columns="columns" :buttons="buttons" @deleteStudent="deleteStudent" @editStudent="editStudent"/>
    </div>
  </q-page>
</template>

<script>

const columns = [
  {
    name: 'id',
    required: true,
    label: '#ID',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'name', label: 'Name', field: 'name', sortable: true },
  { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
  { name: 'action', align: 'center', label: 'Action', field: 'action', sortable: true },

]
const buttons =[
  {
    label: '',
    icon: 'edit',
    color: 'teal-10',
    event: 'editStudent'
  },
  {
    label: '',
    icon: 'delete',
    color: 'red-10',
    event: 'deleteStudent'
  }
]



import { useGlobalStore } from 'src/stores/GlobalStore';
import { mapActions } from 'pinia';
import students from 'src/components/students.vue';
import { ref } from 'vue'


export default {
  components:{students},
  data () {
    return {
      addbtn:true,
      upbtn:false,
      dialog: ref(false),
      edit_id: null,
      columns,
      buttons,
      rows:[],
      form:{
        email: '',
        name: ''
      },
    }
  },
  created(){
    this.getStudents();
  },
  methods:{
    ...mapActions(useGlobalStore,['apiRequest']),

    // function for get all students

    async getStudents(){
      let obj={
        url: 'students',
        method:'get'
      }
      return await this.apiRequest(obj).then(res=>{
        this.rows=res.data.data;
      });
    },

    // function for delete student data

    async deleteStudent(id){
      let obj={
        url:'students/'+id,
        method:'delete'
      }
      return await this.apiRequest(obj).then(res=>{
       this.rows.splice(id,1)
      })
    },

    // function for add students data

    async addStudent(){
      let obj={
        url:'students',
        method:'post',
        data:this.form
      }
      return await this.apiRequest(obj).then(res=>{

        this.getStudents();
      })
    },

    // function for edit student

    async editStudent(id){
      let obj={
        url:'students/'+id,
        method:'get'
      }
      return await this.apiRequest(obj).then(res=>{
        this.edit_id = res.data.data.id
        this.form.name=res.data.data.name,
        this.form.email=res.data.data.email,
        this.dialog= ref(true)
        this.addbtn=false,
        this.upbtn=true
      })
    },

    async updateStudent(){
     let obj={
      url:'students/' + this.edit_id,
      method:'put',
      data:this.form
     }
     return await this.apiRequest(obj).then(res=>{
      this.getStudents();
     })
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>

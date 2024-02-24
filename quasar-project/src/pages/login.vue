<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274C5, #5A4A9F);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:500px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Company &amp; Co</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="add" color="purple-4" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input square clearable v-model="form.email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="form.password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pa-md q-gutter-md">
              <q-btn round color="indigo-7">
                <q-icon name="fab fa-facebook-f" size="1.2rem" />
              </q-btn>
              <q-btn round color="red-8">
                <q-icon name="fab fa-google-plus-g" size="1.2rem" />
              </q-btn>
              <q-btn round color="light-blue-5">
                <q-icon name="fab fa-twitter" size="1.2rem" />
              </q-btn>
            </div>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" @click="loginUser()" color="purple-4" class="full-width text-white" label="login" />
          </q-card-actions>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" @click="$router.push('/')" color="purple-4" class="full-width text-white" label="register -->" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <div class="text-grey-6" >Forgot your password?</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script>
import { useAuthStore } from 'src/stores/Auth/AuthStore';
import { mapActions } from 'pinia';
export default {
  name: 'Login',
  data () {
    return {
     form:{
      email: '',
      password: ''
     }
    }
  },
 methods:{
  ...mapActions(useAuthStore,['login']),
  async loginUser(){
    return await this.login(this.form).then(res=>{
      console.log(res)
    })
  }
 }
}
</script>

<style>
</style>

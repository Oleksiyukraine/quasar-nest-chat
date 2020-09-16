<template>
  <q-page class="auth">
    <q-form
      @submit.prevent="onSubmit(user)"
      class="auth-form"
    >
      <div class="form-content-wrapper">
        <div class="form-content">
          <div class="text-h6 q-pb-md text-uppercase text-bold text-center">
            {{ 'Login form' }}
          </div>
          <q-input
            ref="email"
            type="email"
            v-model.trim="user.email"
            label="Email"
            dense
            rounded
            outlined
            lazy-rules
            bg-color="white"
            class="q-mb-md"
            :rules="[rules.required, rules.email]"
          >
            <template v-if="user.email" v-slot:append>
              <q-icon name="close" @click="user.email = null" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input
            ref="password"
            v-model="user.password"
            label="Enter password"
            dense
            rounded
            outlined
            counter
            lazy-rules
            :type="isPwd ? 'password' : 'text'"
            :rules="[rules.required]"
          >
            <template v-slot:append>
              <q-icon v-if="user.password" name="close" @click="user.password = null" class="cursor-pointer" />
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div class="form-actions-wrapper">
          <div class="flex justify-between">
            <q-btn
              label="Login"
              type="submit"
              rounded
              text-color="dark"
              class="full-width"
              style="min-width: 150px; margin: 0"
            />
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {},
  data () {
    return {
      hasError: false,
      restorePassword: false,
      isPwd: true,
      formHasError: null,
      user: {
        email: null,
        password: null
      },
      rules: {
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || this.$t('Wrong email format')
        },
        required: (v) => !!v || this.$t('The field cannot be empty')
      }
    }
  },
  methods: {
    onSubmit (user) {
      this.$refs.email.validate()
      this.$refs.password.validate()

      if (this.$refs.email.hasError || this.$refs.password.hasError) {
        this.formHasError = true
      } else {
        this.$q.loading.show()
        this.$store.dispatch('auth/login', user).then((response) => {
          this.$q.notify({ icon: 'done', color: 'positive', message: this.$t('loginSuccess') })
          this.$q.loading.hide()
          this.$router.go(-1)
        }).catch(() => {
          this.$q.loading.hide()
          this.$q.notify({ icon: 'report_problem', color: 'negative', message: this.$t('unknownError') })
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .auth {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 90%;
    background-size: cover;
    position: relative;
    z-index: 1;
  }
  .auth-form {
    position: absolute;
    width: 500px;
    height: 400px;
    z-index: 999;
    background-color: whitesmoke;
    padding: 1rem;
    border-radius: 20px;
    button {
      margin: 0 1rem;
    }
  }
  .form-content-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>

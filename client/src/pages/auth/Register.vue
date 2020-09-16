<template>
  <q-page class="auth">
    <q-form
      @submit.prevent.stop="onSubmit(form)"
      class="auth-form"
    >
      <div class="form-content-wrapper">
        <div class="text-h6 q-pb-md text-uppercase text-bold text-center">
          {{ 'Register' }}
        </div>
        <q-input
          ref="name"
          v-model.trim="form.name"
          label="Enter name"
          type="text"
          dense
          rounded
          outlined
          lazy-rules
          bg-color="white"
          :rules="[rules.required]"
        >
          <template v-if="form.name" v-slot:append>
            <q-icon name="close" @click="form.name = null" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          ref="email"
          v-model.trim="form.email"
          type="email"
          label="Enter email"
          dense
          rounded
          outlined
          lazy-rules
          bg-color="white"
          :rules="[rules.required, rules.email]"
        >
          <template v-if="form.email" v-slot:append>
            <q-icon name="close" @click="form.email = null" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          ref="password"
          v-model.trim="form.password"
          label="Enter password"
          :type="isPwd ? 'password' : 'text'"
          dense
          rounded
          outlined
          counter
          lazy-rules
          :rules="[rules.required, rules.length]"
          class="password-input"
        >
          <template v-slot:append>
            <q-icon v-if="form.password" name="close" @click="form.password = null" class="cursor-pointer" />
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input
          ref="passwordConfirm"
          v-model.trim="form.passwordConfirm"
          label="Confirm password"
          :type="isConfirmPwd ? 'password' : 'text'"
          dense
          rounded
          outlined
          counter
          lazy-rules
          :rules="[rules.required, rules.length]"
          class="password-input"
        >
          <template v-slot:append>
            <q-icon v-if="form.passwordConfirm"  name="close" @click="form.passwordConfirm = null" class="cursor-pointer" />
            <q-icon
              :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isConfirmPwd = !isConfirmPwd"
            />
          </template>
        </q-input>
        <div class="flex justify-around">
          <q-btn
            class="full-width"
            label="Register"
            type="submit"
            rounded
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>

export default {
  name: 'RegisterPage',
  data () {
    return {
      isPwd: true,
      isConfirmPwd: true,
      formHasError: true,
      hasError: false,
      form: {
        name: null,
        email: null,
        emailValidate: false,
        phone: [{
          code: '',
          number: '',
          country: null,
          default: true,
          validate: false,
          fullPhoneNumber: null
        }],
        password: null,
        passwordConfirm: null,
        lastLogin: Date.now()
      },
      rules: {
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || this.$t('Wrong email format')
        },
        required: (v) => !!v || this.$t('The field cannot be empty'),
        length: (v) => v.length > 6 || `${this.$t('Wrong password char')}`
      }
    }
  },
  methods: {
    onSubmit (user) {
      this.form.email = this.form.email.toLowerCase()
      this.form.phone[0].fullPhoneNumber = this.form.phone[0].code + this.form.phone[0].number
      this.$refs.name.validate()
      this.$refs.email.validate()
      this.$refs.password.validate()
      this.$refs.passwordConfirm.validate()
      if (this.form.password === this.form.passwordConfirm) {
        if (this.$refs.email.hasError || this.$refs.password.hasError || this.$refs.name.hasError || this.$refs.passwordConfirm.hasError) {
          this.formHasError = true
          this.$q.notify({ icon: 'done', color: 'warning', message: this.$t('registerWrongData') })
        } else {
          this.$q.loading.show()
          user.locale = this.$q.cookies.get('lang') || 'ru'
          this.$store.dispatch('auth/registration', user).then((res) => {
            if (res.status === 226) {
              this.$q.notify({ icon: 'report_problem', color: 'negative', message: res.data.errors[0].messages })
            } else {
              res.data.user.password = this.form.password
              this.$store.dispatch('auth/login', res.data.user).then(() => {
                this.$router.push('/dashboard/user')
              })
            }
            this.$q.loading.hide()
          }).catch(e => {
            this.$q.loading.hide()
          })
        }
      } else {
        this.$q.notify({ icon: 'report_problem', color: 'negative', message: this.$t('confirmPasswordError') })
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

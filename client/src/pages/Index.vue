<template>
  <q-page class="flex flex-center">
    <div v-if="!showChat">
      <q-input
        v-model="user.name"
        label="Please enter your name"
        dense
        v-on:keyup.enter="enterName"
      />
    </div>
    <div class="chat-wrapper" v-if="showChat">
      <div class="q-pa-md row justify-center">
        <div class="messages-wrapper shadow-2">
          <div class="text-subtitle1 text-center messages-header">
            Chat room
          </div>
          <div class="message-item-wrapper">
            <div v-if="messages.length > 0">
              <q-chat-message
                class="message-item"
                :name="message.from._id === user._id ? 'me' : message.from.name"
                v-for="message in messages"
                :key="message.id"
                avatar="~/assets/user.svg"
                :sent="message.from._id === user._id"
                :text="[message.text]"
              />
            </div>
          </div>
          <div class="text-subtitle1 text-center messages-footer">
            <q-input
              bottom-slots
              v-model="text"
              label="Please enter text..."
              dense
              v-on:keyup.enter="sendMessage"
            >
              <template v-slot:append>
                <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
              </template>
              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  icon="send"
                  @click="sendMessage"
                />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { v4 as uuid } from 'uuid'

export default {
  name: 'IndexPage',
  data: () => {
    return {
      showChat: false,
      user: {
        _id: uuid(),
        name: ''
      },
      text: '',
      messages: [],
      statusMessage: []
    }
  },
  created () {
    this.$IO.on('messageListUpdated', message => {
      this.messages.push(message)
    })
    this.$IO.on('userConnected', data => {
      this.$q.notify({
        message: `'New user ${data} connected'`,
        type: 'positive'
      })
    })
    this.$IO.on('userDisconnected', data => {
      this.$q.notify({
        message: 'User disconnected',
        type: 'warning'
      })
    })
  },
  methods: {
    enterName () {
      this.$IO.emit('getMessageFromServer', this.user.name)
      this.$IO.on('messageList', messageList => {
        if (messageList) {
          this.messages = messageList
        }
      })
      this.showChat = true
    },
    sendMessage () {
      if (this.text) {
        const message = {
          from: {
            _id: this.user._id,
            name: this.user.name,
            avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
          },
          room: { name: 'Main' },
          text: this.text
        }
        this.$IO.emit('createMessage', message)
        this.text = ''
      }
    }
  }
}
</script>
<style lang="scss">
.chat-wrapper {
  width: 100%;
}
.my-emoticon {
  vertical-align: middle;
  height: 2em;
  width: 2em;
}
.messages-wrapper {
  width: 100%;
  max-width: 400px;
  max-height: 600px;
}
.message-item-wrapper {
  width: 100%;
  max-width: 400px;
  min-height: 425px;
  max-height: 425px;
  overflow: auto;
}
.messages-header {
  text-transform: uppercase;
  font-weight: bold;
  padding: 1rem 0;
  background-color: lightblue;
  border-bottom: 1px solid gray;
}
.messages-footer {
  padding: 0 20px;
  box-shadow: 0 0 1px grey;
}
.message-item {
  padding: 1rem;
}
</style>

<template>
  <div>
    <q-item clickable to="/">
      <q-item-section avatar>
        <q-icon name="chat" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ 'Chat' }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/login">
      <q-item-section avatar>
        <q-icon name="login" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ 'Login' }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/register">
      <q-item-section avatar>
        <q-icon name="how_to_reg" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ 'Register' }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'EssentialLink'
}
</script>

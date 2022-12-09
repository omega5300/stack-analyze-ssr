<script lang="ts" setup>
import { TwitchSchema, TwitchUser } from '~~/utils/interfaces/twitchInterface'

definePageMeta({
  alias: ['/twitch']
})

useHead({
  title: 'twitch info',
  meta: [
    { name: 'description', content: 'tool for query twitch user info' },
    { name: 'keywords', content: 'stack-analyze, bitly info, stack-analyze bitly info' }
  ]
})

const config = useRuntimeConfig()

const users = ref('')

const twitchUsers = ref<TwitchUser[]>([])

const isEmptyTwitchUsers = computed(
  () => twitchUsers.value.length === 0
)

const twitchInfo = async () => {
  if(!users.value) return useToast("this field is required", "warning")
  
  // split
  const userList = users.value.split(",");

  // params
  const params = new URLSearchParams();

  if(userList.length === 100) return useToast("users must be 100", "danger")

  userList.forEach((item) => {
    params.append('login', item)
  })
  
  try {
    const twitchData: TwitchSchema = await $fetch(`https://api.twitch.tv/helix/users?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${config.public.twitchToken}`,
        "Client-Id": config.public.twitchClient
      }
    })

    twitchUsers.value = twitchData.data
  } catch (err) {
    useAlert({
      message: (err as Error).message,
      header: "Error twitch info",
      subHeader: "problem to api",
    })
  }
  
  users.value = ''
}

const clearUsers = () => {
  twitchUsers.value = []
}
</script>

<template>
  <ion-page>
    <stack-toolbar page-title="twitch search" />
    <ion-content>
      <stack-input v-model="users" msg="enter a twitch user for search example a,b,c:" />
      <ion-grid>
        <search-buttons :clear-search="isEmptyTwitchUsers" @clear-search="clearUsers" @start-search="twitchInfo" />
        <ion-row>
          <twitch-user-info v-for="user of twitchUsers" :key="user.id" :twitch-user="user" />
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

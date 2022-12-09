<script lang="ts" setup>
import { format } from 'timeago.js';

import { GithubSchema } from '~~/utils/interfaces/githubInterface';

definePageMeta({
  alias: ['/github']
})

useHead({
  title: 'github info',
  meta: [
    { name: 'description', content: 'tool using github api for query users' },
    { name: 'keywords', content: 'stack-analyze, github info, github user service stack' }
  ]
})

const user = ref('')

const githubUser = ref<GithubSchema>(({} as GithubSchema))

const isEmptyGithubUser = computed(
  () => Object.values(githubUser.value).length === 0
)

const githubSearch = async () => {
  if (!user.value) return useToast('this field is required', 'warning')

  try {
    const data: GithubSchema = await $fetch(`https://api.github.com/users/${user.value}`)

    githubUser.value = data
  } catch (err) {
    useAlert({
      message: (err as Error).message,
      header: 'Error github user info',
      subHeader: 'problem to req api'
    })
  }

  user.value = ''
}

const clearGithubUser = () => {
  githubUser.value = ({} as GithubSchema)
}
</script>

<template>
  <ion-page>
    <stack-toolbar page-title="github info" />
    <ion-content>
      <stack-input v-model="user" msg="enter a github user" />
      <ion-grid>
        <search-buttons :clear-search="isEmptyGithubUser" @start-search="githubSearch"
          @clear-search="clearGithubUser" />
      </ion-grid>
      <ion-card class="stack-card" mode="ios">
        <ion-card-header mode="md">
          <ion-img :src="githubUser.avatar_url || '/img/No-image-found.jpg'"
            :alt="githubUser.login || 'profile github'" class="img" />
          <ion-card-title>
            {{ githubUser.login || "no username" }}
          </ion-card-title>
          <ion-card-subtitle>
            {{ githubUser.name || "no name" }}
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content mode="md">
          <ion-grid>
            <ion-row>
              <ion-col size="12">
                <ion-item>{{ githubUser.bio || "no bio" }}</ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">Followers:</ion-label>
                  <ion-text>{{ githubUser.followers }}</ion-text>
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">Following:</ion-label>
                  <ion-text>{{ githubUser.following }}</ion-text>
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">Account age:</ion-label>
                  <ion-text>{{ format(githubUser.created_at) }}</ion-text>
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">Twitter username:</ion-label>
                  <ion-text>
                    {{ githubUser.twitter_username ?? "no twitter info" }}
                  </ion-text>
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">Repos:</ion-label>
                  <ion-text>{{ githubUser.public_repos }}</ion-text>
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">Gists:</ion-label>
                  <ion-text>{{ githubUser.public_repos }}</ion-text>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

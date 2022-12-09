<template>
    <ion-menu :contentId="menuId" side="start" type="overlay">
      <ion-header>
        <ion-toolbar class="toolbar ion-text-center">
          <ion-avatar class="horizontal logo">
            <ion-img src="/assets/img/logo-mobile.png" alt="icon logo" />
          </ion-avatar>
          <ion-title>stack-analyze</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>tools</ion-label>
          </ion-item-divider>
        </ion-item-group>
      </ion-content>
    </ion-menu>
  </template>
  <script setup lang="ts">
  import {
    IonMenu,
    IonMenuToggle,
    IonItemGroup,
    IonItemDivider,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonAvatar,
    IonImg,
    IonIcon,
    modalController,
  } from "@ionic/vue";
  
  import { libraryOutline } from "ionicons/icons";
  
  defineProps<{
    menuId: string;
  }>();
  </script>
  
  <style>
  .horizontal {
    margin: auto;
  }
  
  .toolbar {
    --padding-bottom: 20px;
    --background: linear-gradient(to right, #0575e6, #021b79);
    --color: #fff;
    border: 3px solid var(--ion-color-secondary);
    border-radius: 70px 0;
  }
  
  .logo {
    margin-top: 6%;
  }
  
  .modal {
    --height: 100%;
  }
  </style>
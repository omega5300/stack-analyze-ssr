import { alertController } from "@ionic/vue";

interface Alert {
  message: string;
  header: string;
  subHeader: string;
}

export const useAlert = async ({ message, header, subHeader }: Alert) => {
  const alert = await alertController.create({
    header,
    subHeader,
    backdropDismiss: false,
    message,
    mode: 'ios',
    buttons: ['OK']
  })

  alert.present()
}
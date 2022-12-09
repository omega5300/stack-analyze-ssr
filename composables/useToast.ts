import { toastController } from "@ionic/vue"

export const useToast = async (message: string, color: string) => {
  const toast = await toastController.create({
    message,
    color,
    duration: 2000
  })

  toast.present()
}
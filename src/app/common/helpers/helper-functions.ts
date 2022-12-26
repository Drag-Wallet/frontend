import { ToastController, AlertController, AlertButton, LoadingController } from "@ionic/angular";
import { ToastDuration } from "./enums";

export async function ShowToast(toast: ToastController,
    message: string,
    duration: ToastDuration = ToastDuration.Short) {
    await toast.create({
        message,
        buttons: [{
            text: 'OK',
            handler: () => toast.dismiss()
        }],
        duration
    }).then(toast => toast.present());
}

export async function ShowSuccessAlert(alert: AlertController,
    message: string,
    buttons: AlertButton[] = [{ text: 'OK' }]) {
    await alert.create({
        header: 'Success',
        message: message,
        animated: true,
        cssClass: 'alert-success',
        buttons
    }).then(alert => alert.present());
}

export async function ShowErrorAlert(alert: AlertController,
    message: string,
    buttons: AlertButton[] = [{ text: 'OK' }]) {
    await alert.create({
        header: 'Error!',
        message: message,
        animated: true,
        cssClass: 'alert-error',
        buttons
    }).then(alert => alert.present());
}

export async function ShowLoader(loader: LoadingController, message = 'Please wait...') {
    await loader.create({
        message,
        animated: true
    }).then(loader => loader.present());
}

export function handleAuthError(alert: AlertController, error: any) {
    let errorMessage = '';
    if (typeof error === "object") {
        if (error.message)
            errorMessage = error.message;
        else {
            Object.entries(error.error).forEach(([key, message]) => {
                errorMessage += `${key.replace('_', ' ')}: ${message}<br/>`;
            });
        }
    } else errorMessage = "Something went wrong, please try again later";
    ShowErrorAlert(alert, errorMessage);
}
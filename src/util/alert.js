const alerter = {
  confirm (title, body, okHandler) {
    return this.customAlerter({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Okay',
          handler: okHandler
        }
      ]
    })
  },
  customAlerter (altererOptions) {
    const alertController = document.querySelector('ion-alert-controller')
    return alertController.componentOnReady()
      .then(() => {
        return alertController.create(altererOptions)
          .then(alert => alert.present())
      })
  }
}

export { alerter }

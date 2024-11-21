import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  EventType,
  Notification,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native'

class Notifications {
  constructor () {
    // Bootstrap method is called when the app is launched from a notification
    this.bootstrap()

    this.channelId = ''

    // Listen for events
    // This is called when the app is in the foreground
    notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification)
          break
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification)
          break
      }
    })

    // This is called when the app is in the background
    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification} = detail
      console.log('Notification received: background', type, detail)
      if (notification) {
        this.handleNotificationOpen(notification)
      }
    })
  }

  // This method deals with what what happens when the user clicks on the notification
  async handleNotificationOpen (notification) {
    const {data} = notification
    console.log('Notification Opened', data)
    await this.displayNotification(notification?.title, notification?.body)
  }

  async createChannelId () {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    })
    this.channelId = channelId
  }

  async displayNotification (title, body) {
    try {
      await notifee.displayNotification({
        body: body,
        title: title,
        android: {
          channelId: this.channelId,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  // This method is called when the app is launched from a notification
  async bootstrap () {
    const initialNotification = await notifee.getInitialNotification()
    if (initialNotification) {
      this.handleNotificationOpen(initialNotification.notification)
    }
  }

  // This method is called to check if the user has granted permission to send notifications
  async checkPermissions () {
    const settings = await notifee.requestPermission()

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings)
      return true
    } else {
      console.log('User declined permissions')
      return false
    }
  }

   async deleteAllScheduledNotifications() {
    await notifee.cancelAllNotifications()
  //   RootNavigation.navigate('Detail', {savedReminder: data?.details});
  }

  async scheduleNotification ({reminder, date, title, body}) {
    const randomId = Math.floor(Math.random() * 100000).toString()
    const hasPermissions = await this.checkPermissions()
    if (hasPermissions) {
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: +date,

        alarmManager: {
          allowWhileIdle: true,
        },
      }

      console.log('trigger-->' , trigger)

      await notifee.createTriggerNotification(
        {
          id: randomId,
          title: title,
          body: body,
          android: {
            channelId: 'reminder',
            importance: AndroidImportance.HIGH,
            smallIcon: 'ic_launcher',
            pressAction: {
              id: 'default',
            },
          },
          data: {
            id: randomId,
            action: 'reminder',
            details: {
              name: reminder,
              date: date.toString(),
            },
          },
        },
        trigger,
      )
    }
  }
}

// Exporting an instance of the class
export default new Notifications()

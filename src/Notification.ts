import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  EventType,
  Notification,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import * as RootNavigation from '../src/navigation/RootNavigation';
import {getValueFromStorage} from './helpers/asyncStorage';

class Notifications {
  constructor() {
    this.bootstrap();

    notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          this.handleNotificationOpen(detail.notification as Notification);
          break;
      }
    });

    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification} = detail;
      console.log('Notification received: background', type, detail);
      if (notification) {
        this.handleNotificationOpen(notification);
      }
    });

    notifee
      .getTriggerNotificationIds()
      .then(ids => console.log('All trigger notifications: ', ids));
    notifee
      .getTriggerNotifications()
      .then(notifications =>
        console.log('All trigger notifications: ', notifications),
      );
    // notifee.cancelAllNotifications()
  }

  // public async createChannelId() {

  //   //   RootNavigation.navigate('Detail', {savedReminder: data?.details});
  // }

  public async deleteAllScheduledNotifications() {
    await notifee.cancelAllNotifications();
    //   RootNavigation.navigate('Detail', {savedReminder: data?.details});
  }

  public async handleNotificationOpen(notification: Notification) {
    const {data} = notification;
    console.log('Notification received: foreground', data);
    const channelId = JSON.parse(await getValueFromStorage('channelId'));

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  //   RootNavigation.navigate('Detail', {savedReminder: data?.details});

  public async bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
      this.handleNotificationOpen(initialNotification.notification);
    }
  }

  public async checkPermissions() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
      return true;
    } else {
      console.log('User declined permissions');
      return false;
    }
  }

  public async scheduleNotification({
    reminder,
    date,
    title,
    body,
  }: {
    reminder: string;
    date: Date;
    title: string;
    body: string;
  }) {
    const randomId = Math.floor(Math.random() * 100000).toString();
    const hasPermissions = await this.checkPermissions();
    if (hasPermissions) {
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: +date,
        alarmManager: {
          allowWhileIdle: true,
        },
      };

      await notifee.createTriggerNotification(
        {
          id: date.toString(),
          title: title,
          body: body,
          android: {
            channelId: 'reminder',
            importance: AndroidImportance.HIGH,
          },
          data: {
            id: reminder,
            action: 'reminder',
          },
        },
        trigger,
      );
    }
  }

  public async cancelNotification() {
    await notifee.cancelNotification('1');
  }
}

export default new Notifications();

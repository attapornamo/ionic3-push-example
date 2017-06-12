import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { Push, PushToken, IPushMessage } from '@ionic/cloud-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    push: Push
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('cordova')) {
        push.register().then((t: PushToken) => {
          // เรียกขอ token จาก ionic account project ตาม project_id
          return push.saveToken(t);
        }).then((t: PushToken) => {
          console.log("Register token success!" + JSON.stringify(t))
          push.rx.notification().subscribe((pushData: IPushMessage) => {
            // ถ้าสำเร็จ
            alert(pushData.title + ":" + pushData.text)
          })
        }).catch((err) => {
          // ถ้าไม่สำเร็จ
        });
      }
    });
  }
}


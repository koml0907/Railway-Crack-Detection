// File generated by FlutterFire CLI.
// ignore_for_file: type=lint
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return windows;
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyDiVVCSX3489SP50NCbU6kSbyEJHOMR4fg',
    appId: '1:967453187698:web:19295963c88d9271f6eceb',
    messagingSenderId: '967453187698',
    projectId: 'crack-railway',
    authDomain: 'crack-railway.firebaseapp.com',
    databaseURL: 'https://crack-railway-default-rtdb.firebaseio.com',
    storageBucket: 'crack-railway.firebasestorage.app',
    measurementId: 'G-897L7PEK1D',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyCV3UbVE_oNwnBBDQ0cqNxE0m9fK2RoPrE',
    appId: '1:967453187698:android:31fc2ad4eb796f4ff6eceb',
    messagingSenderId: '967453187698',
    projectId: 'crack-railway',
    databaseURL: 'https://crack-railway-default-rtdb.firebaseio.com',
    storageBucket: 'crack-railway.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyDEwxoNyqf8cvpp_YRMkUNohwIKJRPcK_Y',
    appId: '1:967453187698:ios:b1af54c15558adf6f6eceb',
    messagingSenderId: '967453187698',
    projectId: 'crack-railway',
    databaseURL: 'https://crack-railway-default-rtdb.firebaseio.com',
    storageBucket: 'crack-railway.firebasestorage.app',
    iosBundleId: 'com.example.mapcracks',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyDEwxoNyqf8cvpp_YRMkUNohwIKJRPcK_Y',
    appId: '1:967453187698:ios:b1af54c15558adf6f6eceb',
    messagingSenderId: '967453187698',
    projectId: 'crack-railway',
    databaseURL: 'https://crack-railway-default-rtdb.firebaseio.com',
    storageBucket: 'crack-railway.firebasestorage.app',
    iosBundleId: 'com.example.mapcracks',
  );

  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyDiVVCSX3489SP50NCbU6kSbyEJHOMR4fg',
    appId: '1:967453187698:web:fbf538f784adb94ef6eceb',
    messagingSenderId: '967453187698',
    projectId: 'crack-railway',
    authDomain: 'crack-railway.firebaseapp.com',
    databaseURL: 'https://crack-railway-default-rtdb.firebaseio.com',
    storageBucket: 'crack-railway.firebasestorage.app',
    measurementId: 'G-FYY8SGXB39',
  );

}
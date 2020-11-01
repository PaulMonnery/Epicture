# Epicture

Epicture is an EPITECH school project, the goal is to create a mobile app based on the imgur API.  
The app is built with Expo (React Native) and is written in Typescript

## Requirements

#### The Expo Client App

The Expo App will load the build bundle of the Expo CLI and allow you to test our app without deploying it or building with Android Studio

Download links:
- [iOS](https://apps.apple.com/us/app/expo-client/id982107779)
- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

#### An imgur account

The app requires you to login with an imgur account, with email and password **only**: auth with Google or Social medias are not supported
[Create an account here](https://imgur.com/register).

#### An imgur Oauth2 application

The Oauth2 application is required to request the public API. A callback URL is set in the app and is depedent of you IP because of Expo behavior. The calback URL must be `exp://your_dev_server_id`  
- [create the Oauth App here](https://imgur.com/account/settings/apps).  
- replace the callback URL and client id variables in the `.env.example` by your own
- rename the file into `.env`.

## Run with Expo

To launch the app:
- Open the expo client on your phone
- Run `npm i` to install dependencies
- Update and rename your `.env`
- Run `npm start` to start the development server
- Scan the QR code displayed in your terminal with your phone

## Code Structure

```tree
├── App.tsx                       <-- Main component of the App
├── assets
│   └── ...
├── components                    <-- All components used/re-used in screens
│   ├── Buttons
│   │   └── LoginButton.tsx
│   ├── Checkbox.tsx
│   ├── FilterModal.tsx
│   ├── PictureCard
│   │   ├── BigPictureCard.tsx
│   │   ├── SmallPictureCard.tsx
│   │   └── UploadPictureCard.tsx
│   ├── Skeleton.tsx
│   └── Svg
│       └── ...
├── constants                     <-- Constant variables like screen size
│   ├── Colors.ts
│   └── Layout.ts
├── hooks                         <-- Functions to reduce components complexity
│   └── ...
├── navigation                    <-- Navigation schemas
│   ├── AuthNavigator.tsx
│   ├── BottomTabNavigator.tsx
│   ├── index.tsx
│   └── ProfileTabNavigator.tsx
├── network                       <-- API calls
│   ├── album.ts
│   ├── gallery.ts
│   ├── image.ts
│   └── user.ts
├── screens                       <-- App screens and subscreens
│   ├── AuthScreen.tsx
│   ├── FavoriteScreen.tsx
│   ├── HomeScreen.tsx
│   ├── PictureScreen.tsx
│   ├── ProfileScreens
│   │   ├── ProfileAboutScreen.tsx
│   │   ├── ProfilePostsScreen.tsx
│   │   └── ProfileSettingsScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── SearchScreen.tsx
│   ├── UploadScreens
│   │   ├── Camera.tsx
│   │   └── PostDraft.tsx
│   └── UploadScreen.tsx
├── types                         <-- types and interfaces
│   └── ...
└── utils                         <-- Authentication context
    └── auth.tsx
```

## Authors
- [Paul Monnery](https://github.com/PaulMonnery)

# Epicture

Epicture is an EPITECH school project where the goal is to create a mobile app for the imgur website. We used TypeScript React Native with Expo because of the simplicity of it's workflow.

## Requirements

First off, you'll need an Imgur account to use the app.

Then, this app uses an imgur application to be allowed to request the public API, so you have to [create one first](https://imgur.com/account/settings/apps).  
Then replace the callback url and client id variables in the `.env.example` by your own and rename the file into `.env`.

> the calback url must be `exp://your_dev_server_id` if you build with expo or `epicture://` if you eject you the app.

## Run with Expo

To launch the app:
- Download the expo app on your phone
- Run `npm i` to install dependencies
- Run `npm start` to start the development server
- Scan the QR code displayed in your terminal

## Run without Expo

Object {
  "NODE_ENV": "development"
}

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

## Good to know

- We used Eslint, see configuration in [eslint.yaml](./.eslintrc.yaml)
- We used `babel-plugin-inline-dotenv` to load the `.env` file, see [babel.config.js](./babel.config.js)


## Authors
- [Paul Monnery](https://github.com/PaulMonnery)
- [Théo Ardouin](https://github.com/Qwexta)
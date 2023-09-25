# MeatFreed 

MeatFreed is the place to indulge in all things plant-based.

From tasty recipes to awesome discounts, MeatFreed is the quickest and easiest way to access the best restaurants, get delicious and exciting recipes, connect with like-minded individuals and find some inspiration for the plant-based lifestyle.

Whether you’re introducing a couple of meals or have been plant-based for years, come along and safely connect, share and discuss your favourite top tips.

Most importantly, there is no pressure. We welcome everybody with open arms, wherever they may be on their journey.

## Build Status

Check the build status of the project on various platforms:

-  **Android**: ![Android Build Status](https://build.appcenter.ms/v0.1/apps/876c2ab2-b3ed-4c68-9979-b34d933c6a3a/branches/master/badge)
-  **iOS**: ![iOS Build Status](https://build.appcenter.ms/v0.1/apps/cd0f3b6d-9d37-4f11-9c66-eeee0855d97b/branches/master/badge)

## Environment Parameters

Before you begin, make sure to set up any environment parameters or configuration settings required for your project. These may include API keys, database connections, or environment-specific variables. 

Here's an example of setting up environment variables:
```
JAVA_HOME=
POST_ASSET_URL=
POST_HOG_API_HOST=
MAP_API_KEY=
GOOGLE_API_KEY=
GOOGLE_API_URL=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
GOOGLE_IOS_REVERSED_CLIENT_ID=
GOOGLE_IOS_CLIENT_ID=
GOOGLE_WEB_ID=
POST_HOG_API_KEY=
URL_SCHEMA=
BUNDLE_ID=
HOST_URL=
APP_STORE_ID=
FIREBASE_REFERRAL_URL=
FIREBASE_DYNAMIC_URL_PREFIX=
ANDROID_APP_CENTER_SECRET=
IOS_APP_CENTER_SECRET=
ANDROID_FIREBASE_SECRET=
IOS_FIREBASE_SECRET=
LIVE_CHAT_URL=
LIVE_CHAT_LICENSE=
FIREBASE_POST_URL=
STORY_BLOK_API_KEY=
COURIER_API_URL=
COURIER_API_KEY=
BREVO_API_URL=
BREVO_API_KEY=
```

## Firebase Dependencies 

Place your Firebase configuration files in the following locations:

-   Android: `/android/app/google-services.json`
-   iOS: Place `GoogleService-Info.plist` in the root of your iOS folder.

Ensure these files contain the correct Firebase configuration for your project.

## App Center Dependencies

Place your AppCenter configuration files in the following locations:

-   Android: `/android/app/src/main/assets/appcenter-config.json`
-   iOS: Place `AppCenter-Config.plist` in the root of your iOS folder.

Customize these configuration files with your App Center details.

## Getting Started

Follow these steps to get the project up and running:

1. Clone the repository:
`https://github.com/MeatFreed/meatfreed-mobile.git`

2. Navigate to the project directory:
`cd meatfreed-mobile`

3. Install dependencies:
`npm install`

4. Start the development server:
`npm start`

5. Run the app on Android:
`npx react-native run-android`

6. Run the app on iOS:
`npx react-native run-ios`

## Commitlint Rules

We follow commit message conventions to maintain a clean and consistent commit history. Please use the following rules when creating commits:

-   **feat**: For new features.
-   **fix**: For bug fixes.
-   **chore**: For routine tasks, maintenance, or refactoring.
-   **docs**: For documentation changes.
-   **style**: For code style changes (e.g., formatting).
-   **test**: For adding or modifying tests.
-   **ci**: For CI/CD related changes.
-   **perf**: For performance improvements.

Each commit message should have the following format:
```
<type>(<scope>): <description> 

[optional body] 

[optional footer]
```

#### Example Commits

For more examples of commit messages and how they are formatted, refer to the [Example Commits](https://chat.openai.com/c/EXAMPLE_COMMITS.md) document.
# MetaFreed

#### Android Build Status
![Android build status](https://build.appcenter.ms/v0.1/apps/fb76fada-417b-4679-83d0-351d7e2fa398/branches/master/badge)

#### iOS Build Status
![iOS build status](https://build.appcenter.ms/v0.1/apps/09cdea93-e668-4296-bf25-bf45cb36f10c/branches/master/badge)

### Built With
* [React Native@0.69](https://reactnative.dev/blog/2022/06/21/version-069)
* [Typescript](https://www.typescriptlang.org/)
* [React Navigation](https://reactnavigation.org/)
* [RTK, RTK Query & Redux Persist](https://redux-toolkit.js.org/rtk-query/overview)
* [Firebase](https://rnfirebase.io/)

### Environments
```
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
FIREBASE_DYNAMIC_URL=
FIREBASE_DYNAMIC_URL_PREFIX=
```

### Inspired by
* [Feature Sliced Architecture](https://feature-sliced.design/en/)

## Get Started
1. Make sure React Native environment is set up https://reactnative.dev/docs/environment-setup

2. npm ci

3. cd ios && pod install

4. npm run ios - to run iOS build

5. npm run android - to run Android build


### Commits format

Commitlint is used to check if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

In general the pattern mostly looks like this:

```sh
type(scope?): subject
```

Real world examples can look like this:

```
chore: run tests on travis ci
```

```
fix(stepper): update button actions
```

```
feat(passenger): add comment section
```

Common types according to [commitlint-config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

- build
- ci
- chore
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test
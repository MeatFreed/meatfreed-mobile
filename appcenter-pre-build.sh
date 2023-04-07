#!/usr/bin/env bash
#Jetify
node node_modules/jetifier/bin/jetify

# Creates environments
ENV_WHITELIST=${ENV_WHITELIST:-"^RN_"}
printf "Creating an .env file with the following whitelist:\n"
printf "%s\n" $ENV_WHITELIST
set | egrep -e $ENV_WHITELIST | sed 's/^RN_//g' > .env
printf "\n.env created with contents:\n\n"
cat .env

# Creates appcenter configs
printf "Updating AppCenter settings\n"
if [ -z "$ANDROID_APP_CENTER_SECRET" ]
then
  printf "ANDROID_APP_CENTER_SECRET is not found. Skipping\n"
else
  echo $ANDROID_APP_CENTER_SECRET | base64 --decode > $APPCENTER_SOURCE_DIRECTORY/android/app/src/main/assets/appcenter-config.json
fi

if [ -z "$IOS_APP_CENTER_SECRET" ]
then
  printf "IOS_APP_CENTER_SECRET is not found. Skipping\n"
else
  echo $IOS_APP_CENTER_SECRET | base64 --decode > $APPCENTER_SOURCE_DIRECTORY/ios/AppCenter-Config.plist
fi

# Creates appcenter configs
printf "Updating Firebase settings\n"
if [ -z "$ANDROID_FIREBASE_SECRET" ]
then
  printf "ANDROID_FIREBASE_SECRET is not found. Skipping\n"
else
  echo $ANDROID_FIREBASE_SECRET | base64 --decode > $APPCENTER_SOURCE_DIRECTORY/android/app/google-services.json
fi

if [ -z "$IOS_FIREBASE_SECRET" ]
then
  printf "IOS_FIREBASE_SECRET is not found. Skipping\n"
else
  echo $IOS_FIREBASE_SECRET | base64 --decode > $APPCENTER_SOURCE_DIRECTORY/ios/GoogleService-Info.plist
fi

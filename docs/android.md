## Install Android

Follow steps below to setup iOS Real device(iPhone/iPad) automation,

Android automation can work on Mac, Ubuntu and Windows

- Install [Android SDK](https://developer.android.com/studio)
   - Download & load Android Studio, From Toolbar(of IDE) tap on SDK Manager icon
   - Note down the Android SDK Location and download latest tools,apis & emulator from SDK Manager
   - [Android Emulator] From Android Studio Toolbar tap on AVD Manager, create emulator with default settings
        Already created emulator can also be loaded from same screen
   - Open `.bash_profile` or `.zshrc` file and paste the following lines to set environment variables,

            export ANDROID_HOME=/android/sdk/location
            export PATH=$ANDROID_HOME/platform-tools:$PATH
            export PATH=$ANDROID_HOME/build-tools:$PATH
            export PATH=$ANDROID_HOME/tools:$PATH

- Verify installation looks good

        appium-doctor --android

###Prerequisites Devices Requirements

####Android(Device,Emulator)
    1. Select Berlin,Germany as current location

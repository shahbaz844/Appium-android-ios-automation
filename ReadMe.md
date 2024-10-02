Automated testing for KAYAK Web, Android and iOS mobile applications for Kayak, Momondo, Hotelscombined on en-US, da-DK and ko-KR Locales
# 1. Installation

Automated testing for KAYAK Android & iOS mobile applications should be able to work with Python3

### 1.1.1 [nodeJS](https://nodejs.org/en/)


- **Mac**  - Easiest way is to install through [brew](https://brew.sh/) using command below. `brew` can be installed
  using its given link

            //bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  - Install Node

        brew install node

  - Check the Node version to verify your installation

    	node -v


### 1.1.2 [appium](http://appium.io/)

- **Mac** - execute following command

      npm install -g appium@next

  Run `appium -v` will show installed version


### 1.1.3 Java

- **Mac** - Open terminal and load `.bash_profile` or `.zshrc` file, if not avaialble type `cd ~/ ; touch .bash_profile` to create one,
  - [Download & install latest Java Development Kit](https://java.com/en/download/help/mac_install.xml)
  - Open terminal and type java, if it shows `java - command not found error`, open `.bash_profile` or `.zshrc` file and
  paste the following lines,

            export JAVA_HOME=$(/usr/libexec/java_home)
            export PATH=${JAVA_HOME}/bin:$PATH

  - Open terminal and run `java -version`, it will show installed version


### 1.1.4 [Allure reporting](https://docs.qameta.io/allure)
**Note** - please note that installing this library is only needed when one needs executing results in Allure Reporting

- **Mac** - execute following command

      brew install allure

### 1.1.5 Appium Doctor
Required to make sure everything needed for automation is setup. Use the following command to install

        npm install appium-doctor -g

### 1.1.6 iOS(Real Device)

Follow the [link to setup iOS Real Device](./docs/ios-real-device.md)

### 1.1.7 Android(Phone/Tablet/Emulator)
Follow the [link for Android Installation](./docs/android.md)

## 2. Configuration
Once the above installation is complete setup following,

  - Connect/start Android/iOS Device

**Mac** - Open .zshenv file using the following command

		nano ~/.zshenv

- Set following environment variables,

**Environment Variable**
		DEVICE_NAME = " <Your Device Name>"

        DEVICE_UUID = " <Your Device UUID>"
        DEVICE_VERSION = " <Your device version>"

  - Install KAYAK, Momondo, Hotelscombined iOS/Android apps from playstore
  - Clone / Download the source code
  - Run the `npm install` to install the requirements


## 3 Builds Link
 - Follow the [link for Kayak Android app ](https://play.google.com/store/apps/details?id=com.kayak.android&hl=en&gl=US)
 - Follow the [link for Kayak iOS app ](https://apps.apple.com/us/app/kayak-flights-hotels-cars/id305204535)
 - Follow the [link for momondo Android app ](https://play.google.com/store/apps/details?id=com.momondo.flightsearch&hl=en&gl=US)
 - Follow the [link for momondo iOS app ](https://apps.apple.com/us/app/momondo-flights-hotels-cars/id436736538)


## 3. Execution

Execution can be started using following `npm` commands,

    platform=ios br_lc=kayak:en_US npm run wdio

For Android

    platform=android br_lc=kayak:en_US npm run wdio

For iOS 

    platform=ios br_lc=momondo:da_DK npm run wdio

## 4. Reporting

To generate Allure Report for your execution, run

    allure serve allure_results

## Linting

100% default ESLint Options Coverage

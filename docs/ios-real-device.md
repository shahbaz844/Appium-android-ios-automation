## iOS Device
Follow steps below to setup iOS Real device(iPhone/iPad) automation,

- Open Xcode, go to Preferences -> Accounts
  - Add account in Xcode (Developer Account)
    * iOS Dev - needs to change status of specific account as developer
- Select  Software Corp then Click on Manage Certificate
    * Click plus button and select "Apple Development" option, tap on Done
- Load Terminal and type following command to open WebDriverProject in Xcode
`open /usr/local/lib/node_modules/appium/node_modules/appium-webdriveragent/WebDriverAgent.xcodeproj`
    * Click on Project (WebDriverAgent) inside xcode project navigator
    * From Targets section select IntegrationApp. If "Target' section is not visible, click on "Show Project and target list icon" from top left
    * Click on Signing & Capabilities tab
    * Check Automatically manage signing option
    * Click Team & select  Software Corp option
    * Press Command + b  to build the project
    * Once project builds close the xCode
- Connect a device with your machine & type this command in terminal
`instruments -s devices`
    * it will show UUID & device name, copy the UUID vlaue of your device
- Set following environment variables,

        export DEVICE_NAME = " <Your Device Name>"
        export IS_DEVICE = True
        export DEVICE_UUID = " <Your Device UUID>"

- Verify installation looks good

        appium-doctor --ios

###Prerequisites Devices Requirements

####IOS(device,Simulator)
    Select autolock never

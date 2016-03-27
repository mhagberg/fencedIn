
DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy fencedin.secomafence.com --settings /Users/mhagberg/meteor/projects/fencedIn/settings.json

meteor build /Users/mhagberg/meteor/projects/fencedIn/productionBuild --server=fencedIn.secomafence.com


cd productionBuild
cd android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 release-unsigned.apk fencedIn
cp release-unsigned.apk ~/java/tools/android-sdk-macosx/build-tools/22.0.1
cd ~/java/tools/android-sdk-macosx/build-tools/22.0.1
./zipalign -f 4 release-unsigned.apk release-new.apk
cp release-new.apk /Users/mhagberg/meteor/projects/fencedIn/productionBuild
cd /Users/mhagberg/meteor/projects/fencedIn/productionBuild

update the version number in mobile-config.js   version: '0.0.3'

Goto
https://play.google.com/apps/publish/?dev_acc=08352491891247468237#AppListPlace

I can't figure out how to update my version number.   I had to update meteor... but that won't work every time
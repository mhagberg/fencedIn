
DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy fencedin.secomafence.com --settings /Users/mhagberg/meteor/projects/fencedIn/settings.json

update the version number in mobile-config.js   version: '0.0.3'
meteor build /Users/doug/productionBuild --server=fencedIn.secomafence.com


cd productionBuild
cd android

cp release-unsigned.apk ~/Library/Android/sdk/build-tools/26.0.2
cd ~/Library/Android/sdk/build-tools/26.0.2
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 release-unsigned.apk fencedIn
#password j6yb1rds for the keystore and j6yb1rd for the fencedIn allis
./zipalign -f 4 release-unsigned.apk release-new.apk
rm -rf  release-unsigned.apk
mv release-new.apk ~/productionBuild
cd ~/productionBuild



Goto
https://play.google.com/apps/publish/?dev_acc=08352491891247468237#AppListPlace

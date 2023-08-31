
DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy fencedin.secomafence.com --settings /Users/mhagberg/meteor/projects/fencedIn/settings.json

update the version number in mobile-config.js   version: '0.0.3'
meteor build /Users/mike/IdeaProjects/productionBuild --server=fencedIn.secomafence.com

cd /Users/mike/IdeaProjects/productionBuild/android
cp /Users/mike/IdeaProjects/productionBuild/android/project/app/build/outputs/apk/release/app-release-unsigned.apk $ANDROID_HOME/build-tools/32.0.0
cd $ANDROID_HOME/build-tools/32.0.0
./zipalign -f 4 app-release-unsigned.apk app-release-new.apk
apksigner sign --ks ~/.keystore --ks-key-alias fencedin-upload-key --v2-signing-enabled true app-release-new.apk
#jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 app-release-unsigned.apk fencedin-upload-key
rm -rf  release-unsigned.apk
mv app-release-new.apk /Users/mike/IdeaProjects/productionBuild
cd /Users/mike/IdeaProjects/productionBuild



Goto
https://play.google.com/apps/publish/?dev_acc=08352491891247468237#AppListPlace

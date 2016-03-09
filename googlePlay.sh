
meteor build /Users/mhagberg/meteor/projects/fencedIn/productionBuild --server=fencedIn.secomafence.com

DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy fencedin.secomafence.com --settings /Users/mhagberg/meteor/projects/fencedIn/settings.json


cd productionBuild
cd android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 release-unsigned.apk fencedIn
./zipalign -f 4 release-unsigned.apk release-new.apk



Goto
https://play.google.com/apps/publish/?dev_acc=08352491891247468237#AppListPlace

I can't figure out how to update my version number.
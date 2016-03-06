meteor build /Users/mhagberg/meteor/projects/fencedIn/productionBuild --server=fencedIn.secomafence.com
cd productionBuild
cd android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 release-unsigned.apk fencedIn
./zipalign -f 4 release-unsigned.apk release-new.apk

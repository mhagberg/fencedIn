#!/bin/sh

#
# Daniele Brugnara 
#
# usage:
# meteor mongo fecncedin.meteor.com --url | ./backup-mongodb.sh
#

read mongo_auth

echo "hi"
db_name=`echo $mongo_auth | awk '{split($0,array,"/")} END{print array[4]}'`
ar=`echo $mongo_auth | tr '//' '\n' | grep client | tr ':' '\n' | head -n 2 | tr '@' '\n' | tr '\n' ':'`

username=`echo $ar | awk '{split($0,array,":")} END{print array[1]}'`
password=`echo $ar | awk '{split($0,array,":")} END{print array[2]}'`
host=`echo $ar | awk '{split($0,array,":")} END{print array[3]}'`

# echo $host
# echo $username
# echo $password
# echo $db_name

mongodump -h $host --port 27017 --username $username --password $password -d $db_name


#mongodump -h ds023478.mlab.com:23478 -d fencedin -u mhagberg -p j6yb1rd -o /Users/mhagberg/meteor/projects/fencedIn/dump/fencedin_meteor_com
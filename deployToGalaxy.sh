DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy fencedin.secomafence.com --settings /Users/mhagberg/meteor/projects/fencedIn/settings.json

NEW ENV VAR

export MAIL_URL="smtp://mike.hagberg@gmail.com:K^mbr13h@smtp.gmail.com:465/";
smtp://secomafence.com.mailgun.org:mypassword@smtp.mailgun.org:587


6f40c99377e2c7385aa70bb8572dee93

curl -s --user 'key-a909f67a08d28f14885606803dd95a5f' -G \
    https://api.mailgun.net/v3/domains \
    -d skip=0 \
    -d limit=3

meteor add cunneen:mailgun

    6f40c99377e2c7385aa70bb8572dee93


        curl -s --user 'api:key-a909f67a08d28f14885606803dd95a5f' \
            https://api.mailgun.net/v3/secomafence.com/messages \
            -F from='Mailgun Sandbox <postmaster@sandboxd73a69830fea4c169c7b8fd29b33ea3e.mailgun.org>' \
            -F to='Mike Hagbeg <mike@secomafence.com>' \
            -F subject='Hello Mike Hagbeg' \
            -F text='Congratulations Mike Hagbeg, you just sent an email with Mailgun!  You are truly awesome!'
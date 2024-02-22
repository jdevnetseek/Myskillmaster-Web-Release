#!/bin/bash

FILENAME=web.conf
SERVER_NAME=staging.myskillmaster.com
SERVER_LOGS=webstaging
DOMAIN_ALIASES=staging.myskillmaster.com

if [[ "$DEPLOYMENT_GROUP_NAME" == *-dev-asg ]]
then
    # this only executes when only in development asg
    SERVER_NAME=myskillmaster.appetiserdev.tech
    SERVER_LOGS=webdevelopment
    DOMAIN_ALIASES=myskillmaster.appetiserdev.tech
elif [[ "$DEPLOYMENT_GROUP_NAME" == *-prod-asg ]]
then
    # this only executes when only in production asg
    SERVER_NAME=myskillmaster.com
    SERVER_LOGS=webproduction
    DOMAIN_ALIASES=www.myskillmaster.com
fi


cp /var/www/web/codedeploy/nginx/vhost.conf /etc/nginx/sites-available/$FILENAME

ln -sf /etc/nginx/sites-available/$FILENAME /etc/nginx/sites-enabled/$FILENAME

sed -i -e "s/{{SERVER_NAME}}/$SERVER_NAME/g" /etc/nginx/sites-available/$FILENAME

sed -i -e "s/{{DOMAIN_ALIASES}}/$DOMAIN_ALIASES/g" /etc/nginx/sites-available/$FILENAME

sed -i -e "s/{{SERVER_LOGS}}/$SERVER_LOGS/g" /etc/nginx/sites-available/$FILENAME

mkdir -p /var/log/nginx/${SERVER_LOGS}/

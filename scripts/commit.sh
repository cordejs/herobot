#!/bin/bash -e

commit_message="$1"

if [ -z "$commit_message"]
then 

    echo -e "\e[31mNo commit message was informed. Please describe something"
    echo -ne -e "\e[39mMessage: "
    read commit_message
    
    while [[ -z "$commit_message" ]]
     do
        echo "There still no message."
        echo -ne "Message: "
        read commit_message
    done     
fi

git add .
git commit -m "$commit_message"
git push

read -p "Press any key to continue..."
#!/bin/bash -e
commit_message="$1"
if [ -z "$commit_message"]
then 
    commit_message="Default message"
fi

git add .
git commit -m "$commit_message"
git push
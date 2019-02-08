#!/bin/bash

HOOKS="./hooks/*"

 # To include hidden files
shopt -s nullglob dotglob
files=($HOOKS)

if [ ${#files[@]} -gt 0 ];
    then
        echo "Found hooks:";

        for filename in $HOOKS
            do
                echo "$filename"
            done;

        echo "Copying then to .git/hooks folder";

        for filepath in $HOOKS
            do
                filename=$(basename "$filepath")
                echo "Copying $filename";
                ln -s -f ../../hooks/"$filename" .git/hooks/"$filename"
            done;
     fi

echo "";
echo "Finished hooks"

read -p "Press enter to continue..."

exit 0;
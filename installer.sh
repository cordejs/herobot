#!/bin/sh
# Thanks https://github.com/shikhir-arora for the install files

function failed {
    echo "$(tput setaf 1)$@$(tput sgr0)"
    echo -e "\nFailed to install. Please visit https://github.com/lucasgmagalhaes/herobot/issues.\n"
    exit 1
}

echo ""
echo "HeroBot Installer - Starting..."

if hash git 1>/dev/null 2>&1
then
    echo ""
    echo "Git is installed on this system."
else
    echo ""    
    echo "Git is not installed on this system. Please install Git."
    exit 1
fi

if hash node 1>/dev/null 2>&1
then
    echo ""
    echo "Node.js is installed on this system."
else
    echo ""    
    echo "Node.js is not installed on this system. Please install Node v10 or above."
    exit 1
fi

# Make temporary directory to ensure fresh install. The package will be downloaded and the node_modules will be installed in a temporary directory
# After installing the modules, karma-simple (which includes the node_modules) will be moved out of the temporary folder and that temporary folder will be deleted

directory=$(pwd)
tempinstalldir=karmatmp

rm -r "$tempinstalldir" 1>/dev/null 2>&1
mkdir "$tempinstalldir"
cd "$tempinstalldir"

echo ""
echo "Downloading HeroBot, please wait.."
git clone --recursive --depth 1 https://github.com/lucasgmagalhaes/herobot.git || failed "Cannot install. Ensure you have permissions!"
echo ""
echo "HeroBot downloaded!"

echo ""
echo "Downloading HeroBot dependencies with pnpm."
cd $directory/$tempinstalldir/herobot || failed "Could not enter the herobot folder - please check permissions!"
curl -L https://unpkg.com/@pnpm/self-installer | node
pnpm install 

cd "$directory"
mv "$tempinstalldir"/herobot herobot
rm -r "$tempinstalldir"

echo ""
echo "Installation Complete. Please edit .env.example with your variables!"
# comment out as it's not fair to say this until the docs are actually updated someday™ 
# echo "To start the bot, use npm run bot"
exit 0
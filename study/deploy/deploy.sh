#!/bin/sh

GIT_HOME=/root/git/
DEST_PATH=/root/project/front/
echo $1
if [ ! -n "$1" ];
then
  echo -e "please input a project name! you can input as follows:"
  echo -e "./deploy.sh react-dom"
  exit
fi

if [ $1 = "react-dom" ];
then
  echo -e "--------enter project--------"
  cd $GIT_HOME$1;
else
  echo -e "Invalid project name!"
  exit
fi

# clean dist
echo -e "-------- clean dist --------"
rm -rf ./dist

echo -e "------git pull-----"
git pull

echo -e "-----yarn install-----"
yarn

echo -e "-----yarn run dist-----"
yarn dist

if [ -d "./dist" ];
then 
  echo -e "------- clean dist ---------"
  rm -rf $DEST_PATH/dist

  echo -e "------- copy dist ---------"
  cp -R $DEST_PATH/$1/

  echo -e "------- deploy success ---------"
else 
  echo -e " ------- deploy faile ---------"
fi
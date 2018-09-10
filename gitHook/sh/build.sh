SITE_PATH='/home/code/Air-Matters-web'

cd $SITE_PATH
git reset --hard origin/master
git clean -f
git pull
git checkout master

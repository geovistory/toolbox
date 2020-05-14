
# create a copy of svg folder
echo 'create a copy of svg folder'

cp -R svg svg-tmp

# rename all files from gv-icons_* to gv-icon-* in the copy folder
echo 'rename all files from gv-icons_* to gv-icon-* in the copy folder'
autoload -U zmv;
cd svg-tmp;
zmv -W 'gv-icons_*' '*';
cd ..;

# empty the dist folder
echo 'empty the dist folder'
rm -rf dist/*;

# create the font (in dist folder)
echo 'create the font (in dist folder)'
node_modules/icon-font-generator/bin/icon-font-generator svg-tmp/*.svg -p=gv-icon -t=.gv-icon  -o dist --name="Geovistory" --descent=213 --round=10e40;

# delete the copy folder
rm -r svg-tmp;
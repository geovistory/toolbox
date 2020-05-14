# Geovistory Font
This font contains icons used in geovistory. The style of the icons is so that the icons can be combined with fontawesome 4 icons.

## Steps to create / update the font

1. Modifing the svgs in Illustrator
    - Open the illustrator file `gv-icons.ai`
    - For modifing an icon, just edit the icon. 
    - For adding an icon, duplicate an artboard and change the artbord name to the name of the icon (and css class it will get) and create the icon.
    - Remark: the width of the artboard should be the width of the icon + 6px (rounded on integer), while the icon is horizontally centered on the artboard. 
2. Saving / exporting SVGs 
    - Delete all SVGs in the folder `svg`
    - Save as --> SVG --> use Artboard --> All
    - Save to the folder `svg`
    - Default svg settings are ok
3. Create Font
    - in shell in this directory run `npm run font`

Thats it.

## Remaks
The baseline of 213 pixels from the bottom (see illustrator) corresponds to the `--descent=213` option of the command that creates the icons.

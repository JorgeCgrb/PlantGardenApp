# Plant Images for Huerto Project

## Installation Instructions

1. Make sure you have the following directory structure in your project:
```
assets/
└── images/
    ├── plants/
    │   ├── alliums/
    │   ├── cole_crops/
    │   ├── fruiting_vegetables/
    │   ├── leafy_greens/
    │   ├── root_vegetables/
    │   └── herbs/
    ├── icons/
    ├── navigation/
    ├── grid/
    ├── tools/
    └── buttons/
```

2. Save each SVG image to your computer by:
   - Right-clicking on each image
   - Selecting "Save Image As..."
   - Save with the appropriate filename (e.g., "garlic.svg")

3. Convert the SVG files to PNG format using one of these methods:
   - Use an online converter like https://svgtopng.com/
   - Use a graphics program like Inkscape, Adobe Illustrator, or GIMP
   - Use command line tools like ImageMagick (`convert input.svg output.png`)

4. Place the PNG files in their corresponding directories:

   **Alliums:**
   - assets/images/plants/alliums/chives.png
   - assets/images/plants/alliums/garlic.png
   - assets/images/plants/alliums/leeks.png
   - assets/images/plants/alliums/onions.png
   - assets/images/plants/alliums/shallots.png

   **Cole Crops:**
   - assets/images/plants/cole_crops/bok_choy.png
   - assets/images/plants/cole_crops/broccoli.png
   - assets/images/plants/cole_crops/broccoli_rabe.png
   - assets/images/plants/cole_crops/brussels_sprouts.png
   - assets/images/plants/cole_crops/cabbage.png
   - assets/images/plants/cole_crops/cauliflower.png

   **Fruiting Vegetables:**
   - assets/images/plants/fruiting_vegetables/cucumber.png
   - assets/images/plants/fruiting_vegetables/pumpkin.png
   - assets/images/plants/fruiting_vegetables/tomato.png

   **Leafy Greens:**
   - assets/images/plants/leafy_greens/lettuce.png
   - assets/images/plants/leafy_greens/spinach.png
   - assets/images/plants/leafy_greens/kale.png

   **Root Vegetables:**
   - assets/images/plants/root_vegetables/carrots.png
   - assets/images/plants/root_vegetables/radishes.png
   - assets/images/plants/root_vegetables/beets.png

   **Herbs:**
   - assets/images/plants/herbs/basil.png
   - assets/images/plants/herbs/cilantro.png
   - assets/images/plants/herbs/parsley.png

   **Activity Icons:**
   - assets/images/icons/start_inside.png
   - assets/images/icons/transplant.png
   - assets/images/icons/sow_outside.png
   - assets/images/icons/begin_harvest.png

   **Navigation Icons:**
   - assets/images/navigation/gardens.png
   - assets/images/navigation/plants.png
   - assets/images/navigation/calendar.png
   - assets/images/navigation/guide.png

   **Garden Grid Elements:**
   - assets/images/grid/soil.png
   - assets/images/grid/grid_cell.png
   
   **Tool Icons:**
   - assets/images/tools/select.png
   - assets/images/tools/plant.png
   - assets/images/tools/erase.png
   - assets/images/tools/info.png
   
   **Button Icons:**
   - assets/images/buttons/add.png

5. Extract individual elements from the Garden Grid View SVG:
   - For the soil background, extract just the brown rectangle
   - For grid cells, extract a single cell with border
   - For tool icons, extract each circular tool button
   - For the add button, extract the green circle with plus sign

6. Replace the existing assetUtils.js file with the updated version that includes references to all these assets.

## Using the Images in the App

The updated assetUtils.js provides four main functions:

```javascript
// Get plant image (chives, garlic, tomato, etc.)
const plantImage = getPlantImage('tomato');

// Get activity icon (startInside, transplant, etc.)
const activityIcon = getActivityIcon('startInside');

// Get navigation icon (gardens, plants, etc.)
const navIcon = getNavigationIcon('gardens');

// Get garden element (soil, gridCell, select tool, etc.)
const element = getGardenElement('soil');
```

## For SVG to PNG Conversion

Use these specifications when converting SVG to PNG:

- **Plant Icons:** 
  - Size: 64x64 or 128x128 pixels
  - Format: PNG with transparency

- **Navigation Icons:**
  - Size: 32x32 pixels
  - Format: PNG with transparency

- **Garden Grid Elements:**
  - Soil: 300x300 pixels (tileable texture)
  - Grid Cell: 40x40 pixels
  - Tool Icons: 32x32 pixels
  - Add Button: 60x60 pixels

## Additional Tips

- Keep the original SVG files for future editing
- Test the icons at different sizes to ensure visibility
- For the garden grid, you may need to create a repeating soil texture
- You can adjust colors in the SVG files before converting to match your app's theme
/**
 * Utility functions for asset management
 */

// Plant image mapping
const plantImages = {
  // Alliums
  chives: require('../../assets/images/plants/alliums/chives.png'),
  garlic: require('../../assets/images/plants/alliums/garlic.png'),
  leeks: require('../../assets/images/plants/alliums/leeks.png'),
  onions: require('../../assets/images/plants/alliums/onions.png'),
  shallots: require('../../assets/images/plants/alliums/shallots.png'),

  // Cole crops
  bok_choy: require('../../assets/images/plants/cole_crops/bok_choy.png'),
  broccoli: require('../../assets/images/plants/cole_crops/broccoli.png'),
  broccoli_rabe: require('../../assets/images/plants/cole_crops/broccoli_rabe.png'),
  brussels_sprouts: require('../../assets/images/plants/cole_crops/brussels_sprouts.png'),
  cabbage: require('../../assets/images/plants/cole_crops/cabbage.png'),
  cauliflower: require('../../assets/images/plants/cole_crops/cauliflower.png'),

  // Fruiting vegetables
  cucumber: require('../../assets/images/plants/fruiting_vegetables/cucumber.png'),
  pumpkin: require('../../assets/images/plants/fruiting_vegetables/pumpkin.png'),
  tomato: require('../../assets/images/plants/fruiting_vegetables/tomato.png'),

  // Default
  default: require('../../assets/images/plants/alliums/garlic.png'),
};

// Activity icons mapping
const activityIcons = {
  startInside: require('../../assets/images/icons/start_inside.png'),
  transplant: require('../../assets/images/icons/transplant.png'),
  sowOutside: require('../../assets/images/icons/sow_outside.png'),
  beginHarvest: require('../../assets/images/icons/begin_harvest.png'),
};

// Navigation icons mapping
const navigationIcons = {
  gardens: require('../../assets/images/navigation/gardens.png'),
  plants: require('../../assets/images/navigation/plants.png'),
  calendar: require('../../assets/images/navigation/calendar.png'),
  guide: require('../../assets/images/navigation/guide.png'),
};

// Garden grid elements mapping
const gardenElements = {
  soil: require('../../assets/images/grid/soil.png'),
  gridCell: require('../../assets/images/grid/grid_cell.png'),
  select: require('../../assets/images/tools/select.png'),
  plant: require('../../assets/images/tools/plant.png'),
  erase: require('../../assets/images/tools/erase.png'),
  info: require('../../assets/images/tools/info.png'),
  add: require('../../assets/images/buttons/add.png'),
};

/**
 * Get image for a plant by name
 * @param {string} plantName - Plant name (lowercase)
 * @returns {Object} - Image source object
 */
export const getPlantImage = (plantName) => {
  // Verifica que plantName no sea undefined
  if (!plantName) {
    return plantImages.default;
  }

  // Intenta encontrar la imagen por nombre o devuelve la default
  return plantImages[plantName.toLowerCase()] || plantImages.default;
};

/**
 * Get icon for a growing activity
 * @param {string} activity - Activity name
 * @returns {Object} - Image source object
 */
export const getActivityIcon = (activity) => {
  return activityIcons[activity] || null;
};

/**
 * Get navigation icon by name
 * @param {string} navItem - Navigation item name
 * @returns {Object} - Image source object
 */
export const getNavigationIcon = (navItem) => {
  return navigationIcons[navItem] || null;
};

/**
 * Get garden grid element by name
 * @param {string} element - Garden grid element name
 * @returns {Object} - Image source object
 */
export const getGardenElement = (element) => {
  return gardenElements[element] || null;
};
//The Layer computed on GEE to overlay Basemap
//Require: 
//			1. the asset 'Balkans_6_2020_export_prep' created and shared on https://code.earthengine.google.com/
//				the source for assest is here solar-is-simple\datasets\GlobalPetrolPrices\Balkans_6_2020_export_prep.csv
//			2. 


//Load list of Balkans countries with electricity prices data
var balkanElectricityPricesCSV = ee.FeatureCollection("users/EgorBEremeev/Balkans_6_2020_export_prep");
//Load the Countries borders. The dataset below contains the contries metadata and shapes with borders.
//The shapes loaded as Geometry properties of Features in collection
var allCountries = ee.FeatureCollection("FAO/GAUL/2015/level0");


// Use an equals filter to specify how the collections match.
var joinFilter = ee.Filter.equals({
  leftField: 'Country_GAUL_ADM0_NAME',
  rightField: 'ADM0_NAME'
});

// Apply the join.  The leftField corresponds to the primary collection
// and the rightField corresponds to the secondary collection.  The
// matching condition is specified by the filter.
var balkansElectricityPricesFC = ee.Join.inner().apply({
  primary: balkanElectricityPricesCSV,
  secondary: allCountries,
  condition: joinFilter
});

// Map a function to merge the results in the output FeatureCollection.
var balkansElectricityPricesFC = balkansElectricityPricesFC.map(function(feature) {
  return ee.Feature(feature.get('secondary')).copyProperties(feature.get('primary'));
});

// Print the result into console for debug.
print('Cleaned Inner join:', balkansElectricityPricesFC);

// Create Image object from Feature to obtain it then in geo-app-client side as a Tiles.
var balkansElectricityPricesIm = balkansElectricityPricesFC.reduceToImage(['kWh_EUR'], 'mean');


//This is actually the geo-app-client side code.

//This part works in
//	1. GEE Code Editor environment: https://code.earthengine.google.com/ 
//	2. When deployed via GEE App: https://developers.google.com/earth-engine/guides/apps
//
//It is kept here as the GEE Code Editor / GEE App both provide the environment for a geo-app-client side code execution.
//The Earth Engine User Interface API, factualy, is used in both cases.
//	see: https://developers.google.com/earth-engine/apidocs/map-add 
//	see: https://developers.google.com/earth-engine/guides/ui_widgets#ui.map

var visParams = {
  min: 0.0721056,
  max: 0.15706746,
  palette: ['FFFF66', '7D7D00']};

Map.centerObject(balkansElectricityPricesFC);
Map.addLayer(balkansElectricityPricesIm, visParams,'Electicity Prices',true,0.5);

// The other option to implement the geo-app-client side code is GCP App Engine: https://developers.google.com/earth-engine/guides/apps
// But this will require using 
//			the Google Maps JavaScript API to render Basemap: https://developers.google.com/maps/documentation/javascript/overview
//			and, probably, one of approaches to render and style the Prices Layer
//					Custom Overlays: https://developers.google.com/maps/documentation/javascript/customoverlays
//					Data Layer: https://developers.google.com/maps/documentation/javascript/datalayer
//					Heatmap Layer: google.maps.visualization library, https://developers.google.com/maps/documentation/javascript/heatmaplayer
// 
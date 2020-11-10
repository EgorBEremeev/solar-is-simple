# solar-is-simple
[Simple Web-over-GIS application around Solar Energetics](https://egorberemeev.users.earthengine.app/view/solar-is-simple) created during the [planet-balkan-hackathon](https://github.com/serbiancaseforspace/planet-balkan-hackathon).

The initial brainstorm of the idea is archived [here](https://github.com/serbiancaseforspace/planet-balkan-hackathon/issues/5)

![Building Blocks diagram](https://raw.githubusercontent.com/EgorBEremeev/solar-is-simple/main/doc/SiS%20-%20MVP1%20-%20Architecture.png "Building Blocks diagram")

# Explanation
**The Data Layers** computed on GEE to overlay basemap
Currently only Electricity Prices Layer implemented: gee-js/layers-electricity_prices_balkans.js
Script requires: 
1. the asset _'Balkans_6_2020_export_prep'_ created and shared on [GEE Code Editor](https://code.earthengine.google.com/). The source for assest is here _solar-is-simple\datasets\GlobalPetrolPrices\Balkans_6_2020_export_prep.csv_
      
**Geo App Client side code**

1. Options with GEE App environment

   This part works in

    1. GEE Code Editor environment: https://code.earthengine.google.com/ 
    2. When deployed via GEE App: https://developers.google.com/earth-engine/guides/apps

   This code now is put directly into the Data Layer script as the _GEE Code Editor_ / _GEE App_ both provide the environment for a geo app client side code execution.
   The _Earth Engine User Interface API_, factualy, is used in both cases.
    - see: https://developers.google.com/earth-engine/apidocs/map-add 
    - see: https://developers.google.com/earth-engine/guides/ui_widgets#ui.map
    
2. Option with [GCP App Engine](https://developers.google.com/earth-engine/guides/apps)

   This will require using
  
   - the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) to render Basemap 
   - and, probably, one of an approaches to render and style the _Data Layers_	  
       - [Custom Overlays](https://developers.google.com/maps/documentation/javascript/customoverlays)
       - [Data Layer](https://developers.google.com/maps/documentation/javascript/datalayer)
       - [Heatmap Layer - google.maps.visualization library](https://developers.google.com/maps/documentation/javascript/heatmaplayer)
       
   # Deployed application
   https://egorberemeev.users.earthengine.app/view/solar-is-simple
   https://code.earthengine.google.com/c496e3748e94b5e5739786b1e902f76c
   

**The API Reference**

https://ec.europa.eu/jrc/en/PVGIS/docs/noninteractive

**Usefull tool**

Download the [Postman](https://www.postman.com/downloads/)

**Endpoints**

Let's use 

- Grid-connected & Tracking PV systems
- Off-grid PV systems

For output format use `outputformat=json`
 
We are interested in these output fields:

```
{
	"outputs": {
		"monthly": {
			"fixed": [
				{
					"month": 1,
					...
					"E_m": 37.38,
					...
				},
				...
				,
				{
					"month": 12,
					...
					"E_m": 32.21,
					...
				}
			]
		},
		"totals": {
			"fixed": {
					...
				"E_m": 94.78,
				"E_y": 1137.32,
					...
				"l_aoi": -3.95,
				"l_spec": "0.92",
				"l_tg": -7.42,
				"l_total": -22.82
			}
		}
	}
}
```

----
Note the mistake for Off-grid PV systems Example:

The &-separators are missed in the middle.
The corrected example is:

```         
https://re.jrc.ec.europa.eu/api/SHScalc?lat=45&lon=8&peakpower=1&batterysize=5&consumptionday=200&cutoff=40
```


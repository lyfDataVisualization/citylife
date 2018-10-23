/**
 * lyf
 */
var viewer_one;
function initPage()
{
//	alert("oooo");
	viewer_one = new Cesium.Viewer('cesiumContainer', {
//    	imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
//            url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer'
//        }),
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
            url : 'http://223.223.200.50:9300/styles/chinablue/{z}/{x}/{y}@2x.png',
            credit : '© Analytical Graphics, Inc.'
//            tilingScheme : new Cesium.GeographicTilingScheme(),
//            maximumLevel : 5
        }),
        
//		imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
//		    url : 'https://api.mapbox.com/styles/v1/liuyunfei/cjnfuacbh4gb02smfl4aswdwn/wmts?access_token=pk.eyJ1IjoibGl1eXVuZmVpIiwiYSI6ImNpbHN1cWFiZzAwN2J1c2tzdDlycmw1dXEifQ.VZ3F5EJTi1uT3H6s-4o6gQ',
//		    layer : 'cjnfuacbh4gb02smfl4aswdwn',
//		    style : 'default',
//		    format : 'image/png',
//		    tileMatrixSetID : 'GoogleMapsCompatible',
//		    // tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ...],
//		    //maximumLevel: 19,
//		    //credit : new Cesium.Credit('U. S. Geological Survey')
//		}),
        //sceneMode : Cesium.SceneMode.SCENE2D,
        sceneModePicker: false,
        navigationHelpButton: false,
        fullscreenButton: false,
		geocoder: false,
		homeButton: false,
        baseLayerPicker: false,
        timeline : false,
        animation : false,
        shouldAnimate : true
    });
	viewer_one.camera.setView({
	    destination : Cesium.Cartesian3.fromDegrees(116.413, 39.913,205000.0)
	});
	viewer_one._cesiumWidget._creditContainer.style.display = "none";
	
	LoadData();
}
function LoadData()
{
	var dataSource = new Cesium.CustomDataSource('myAnimation1');
	
	var colors = [
        new Cesium.Color(77 / 255, 201 / 255, 255 / 255, 1),
        new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 1),
        new Cesium.Color(221 / 255, 221 / 255, 221 / 255, 1),
        new Cesium.Color(60 / 255, 39/ 255, 255 / 255, 1),
        new Cesium.Color(25 / 255, 20 / 255, 38 / 255, 1),
        new Cesium.Color(221 / 255, 20 / 255, 20 / 255, 1)
    ];
	var positions = [Cesium.Cartesian3.fromDegrees(116.434, 40.222),
		Cesium.Cartesian3.fromDegrees(116.04, 39.946),
		Cesium.Cartesian3.fromDegrees(116.639, 39.816),
		Cesium.Cartesian3.fromDegrees(116.825, 40.52),
		Cesium.Cartesian3.fromDegrees(117.216, 40.196),
		Cesium.Cartesian3.fromDegrees(116.654, 40.716),
		]
//	var startPoint = Cesium.Cartesian3.fromDegrees(116.434, 40.222);
//	childData
	/*
	var glowingLine = dataSource.entities.add({
		position:startPoint,
        point: {
        	color: colors[0],
        	pixelSize: 25
            //material: new Cesium.PolylineAttackLinkMaterialProperty({
//            material: new Cesium.PolylineArrowLinkMaterialProperty({
//                //color: new Cesium.Color(77 / 255, 201 / 255, 255 / 255, 1)
//                color: colors[singleRow%6],
//                duration:2000
//            }),
//            material: new Cesium.PolylineDashMaterialProperty({
//                color: colors[i % 3]
//            })
        }
        
    });*/
	for(var i = 0;i<positions.length;i++)
	{
		var glowingLine = dataSource.entities.add({
	        position: positions[i],
	        ellipse: {
	            semiMinorAxis: 30000.0,
	            semiMajorAxis: 30000.0,
	            height: 0.0,
	            material: new Cesium.ElliposidFadeMaterialProperty({
	                color: colors[i]
	            }),
	            //material: colors[i % 3],
	            //material: new Cesium.ColorMaterialProperty(colors[i % 3])
	        }
	    });
	}
	
	viewer_one.dataSources.add(dataSource);
}
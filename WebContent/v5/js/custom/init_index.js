/**
 * lyf
 */
var viewer_one;
function initPage()
{
//	alert("oooo");
	viewer_one = new Cesium.Viewer('cesiumContainer_page1', {
//    	imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
//            url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer'
//        }),
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
            url : 'http://223.223.200.50:9300/styles/chinablue/{z}/{x}/{y}@2x.png',
            credit : '© Analytical Graphics, Inc.'
//            minimumLevel:7
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
        infoBox:false,
        selectionIndicator:false,
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
	    destination : Cesium.Cartesian3.fromDegrees(116.413, 39.913,55000.0)
	});
	viewer_one._cesiumWidget._creditContainer.style.display = "none";
	//鼠标点击事件  左键
    var handler = new Cesium.ScreenSpaceEventHandler(viewer_one.scene.canvas);
    handler.setInputAction(function(click) {
       // 处理鼠标按下事件
       // 获取鼠标当前位置
        // console.log('1111');
        var pick = viewer_one.scene.pick(click.position);
        //选中某模型   pick选中的对象
        if(pick && pick.id){
        	//console.log(pick.id);
        	$('.png2_2').css({'top':(click.position.y-283)+'px','left':(click.position.x+5)+'px'});
        	$('.png2_2').toggle();
        }

     }, Cesium.ScreenSpaceEventType.LEFT_DOWN);


	LoadData();
}
function LoadData()
{
	var dataSource = new Cesium.CustomDataSource('myAnimation1');
	
	var colors = [
        new Cesium.Color(172 / 255, 18 / 255, 29 / 255, 1),
        new Cesium.Color(235 / 255, 179 / 255, 7 / 255, 1),
        new Cesium.Color(172 / 255, 18 / 255, 29 / 255, 1)
//        new Cesium.Color(60 / 255, 39/ 255, 255 / 255, 1),
//        new Cesium.Color(25 / 255, 20 / 255, 38 / 255, 1),
//        new Cesium.Color(221 / 255, 20 / 255, 20 / 255, 1)
    ];
	var materials = ['/citylife/v5/img/page2/m2.png','/citylife/v5/img/page2/m1.png','/citylife/v5/img/page2/m3.png'];
	var positions = [Cesium.Cartesian3.fromDegrees(116.300943, 39.954704),
		Cesium.Cartesian3.fromDegrees(116.322335, 39.844385),
		Cesium.Cartesian3.fromDegrees(116.508470, 39.829314)
		
//		Cesium.Cartesian3.fromDegrees(116.825, 40.52),
//		Cesium.Cartesian3.fromDegrees(117.216, 40.196),
//		Cesium.Cartesian3.fromDegrees(116.654, 40.716),
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
		var glowingLine1 = dataSource.entities.add({
	        position: positions[i],
	        ellipse: {
	            semiMinorAxis: 3000.0,
	            semiMajorAxis: 3000.0,
	            height: 0.0,
	            material: new Cesium.ElliposidFadeMaterialProperty({
//	                color: colors[i]
	            	color:new Cesium.Color(255 / 255, 255 / 255, 255 / 255, 1)
	            }),
	            //material: colors[i % 3],
	            //material: new Cesium.ColorMaterialProperty(colors[i % 3])
	        }
	    });
		var glowingLine2 = dataSource.entities.add({
	        position: positions[i],
	        ellipse: {
	            semiMinorAxis: 2000.0,
	            semiMajorAxis: 2000.0,
	            height: 0.0,
	            material: new Cesium.ElliposidFadeMaterialProperty({
	                //color: colors[i]
	            	color:new Cesium.Color(255 / 255, 255 / 255, 255 / 255, 1)
	            }),
	            //material: colors[i % 3],
	            //material: new Cesium.ColorMaterialProperty(colors[i % 3])
	        }
	    });
		var glowingLine3 = dataSource.entities.add({
	        position: positions[i],
	        ellipse: {
	            semiMinorAxis: 1500.0,
	            semiMajorAxis: 1500.0,
	            height: 0.0,
	            material: materials[i]
//	            material: new Cesium.ElliposidFadeMaterialProperty({
////	                color: colors[i]
//	            	color:new Cesium.Color(255 / 255, 255 / 255, 255 / 255, 1)
//	            }),
	            //material: colors[i % 3],
	            //material: new Cesium.ColorMaterialProperty(colors[i % 3])
	        }
	    });
	}
	
	viewer_one.dataSources.add(dataSource);
}
var showCityLifePanelFirst = true;
var viewer_two;
var preSelectedEntity = null;
var newBillboardEntity = null;
function showCityLifePanel()
{
//	alert('oooook');
	$('#assist_panel').show();
	if(showCityLifePanelFirst)//第一次显示 初始化地图 等元素
	{
		viewer_two = new Cesium.Viewer('cesiumContainer_citylife', {
//	    	imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
//	            url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer'
//	        }),
	        imageryProvider: new Cesium.UrlTemplateImageryProvider({
	            url : 'http://223.223.200.50:9300/styles/chinablue/{z}/{x}/{y}@2x.png',
	            credit : '© Analytical Graphics, Inc.'
//	            tilingScheme : new Cesium.GeographicTilingScheme(),
//	            maximumLevel : 5
	        }),
	        
//			imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
//			    url : 'https://api.mapbox.com/styles/v1/liuyunfei/cjnfuacbh4gb02smfl4aswdwn/wmts?access_token=pk.eyJ1IjoibGl1eXVuZmVpIiwiYSI6ImNpbHN1cWFiZzAwN2J1c2tzdDlycmw1dXEifQ.VZ3F5EJTi1uT3H6s-4o6gQ',
//			    layer : 'cjnfuacbh4gb02smfl4aswdwn',
//			    style : 'default',
//			    format : 'image/png',
//			    tileMatrixSetID : 'GoogleMapsCompatible',
//			    // tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ...],
//			    //maximumLevel: 19,
//			    //credit : new Cesium.Credit('U. S. Geological Survey')
//			}),
	        //sceneMode : Cesium.SceneMode.SCENE2D,
	        infoBox:false,
	        selectionIndicator:false,
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
		viewer_two.camera.setView({
		    destination : Cesium.Cartesian3.fromDegrees(116.413, 39.913,95000.0)
		});
		viewer_two._cesiumWidget._creditContainer.style.display = "none";
		//鼠标点击事件  左键
	    var handler = new Cesium.ScreenSpaceEventHandler(viewer_two.scene.canvas);
	    handler.setInputAction(function(click) {
	       // 处理鼠标按下事件
	       // 获取鼠标当前位置
	        // console.log('1111');
	        var pick = viewer_two.scene.pick(click.position);
	        //选中某模型   pick选中的对象
	        if(pick && pick.id){
//	        	console.log(pick);
//	        	console.log(pick.id);
//	        	console.log(click.position);
//	        	var cartesian = viewer_two.camera
	        	var selectedEntity = pick.id;
	        	if(preSelectedEntity)
	        	{
	        		preSelectedEntity.billboard.image = '/citylife/v5/img/citylife/p.png';
	        	}
	        	if(newBillboardEntity)
	        	{
	        		viewer_two.dataSources.get(0).entities.remove(newBillboardEntity);
	        	}
	        	
	        	var pick1= new Cesium.Cartesian2(click.position.x,click.position.y);
	            var cartesian = viewer_two.scene.globe.pick(viewer_two.camera.getPickRay(pick1),viewer_two.scene);
	            newBillboardEntity = new Cesium.Entity({
	            	position : cartesian,
		            billboard : {
		                //position : Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
//		                scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
		                image : '../v5/img/citylife/tck.png',
		                pixelOffset : new Cesium.Cartesian2(100, 20),
		            }
	            });
	            viewer_two.dataSources.get(0).entities.add(newBillboardEntity);
	            
	        	preSelectedEntity = selectedEntity;
	        	
	        	selectedEntity.billboard.image = '/citylife/v5/img/citylife/p1.png';
	        	
//	        	$('.assist_panel_group4').css({'top':click.position.y+'px','left':(click.position.x+10)+'px'});
//	        	$('.assist_panel_group4').toggle();
	        }

	     }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

	  //设置鼠标滚动事件的处理函数，这里负责监听倾斜值变化 防止穿透
	    var removeChanged = viewer_two.camera.changed.addEventListener(function(percentage) {
	        if(viewer_two.camera.pitch<=0.1&&viewer_two.camera.pitch>=-0.1){
	        	viewer_two.camera.setView({
	    		    destination : Cesium.Cartesian3.fromDegrees(116.413, 39.913,95000.0)
	    		});
	        }
	    });
	    
		LoadMarketData();
	}
	showCityLifePanelFirst = false;
}
function LoadMarketData()
{
	var materials = ['/citylife/v5/img/citylife/p.png'];
	var dataSource = new Cesium.CustomDataSource('market');
	$.ajax({
		  url: '../data/market.csv',
		  dataType: 'text',
		}).done(AftersuccessFunction);
	function AftersuccessFunction(data) {
		var allRows = data.split(/\r?\n|\r/);
//		  var max = 0;
		  //var table = '<table>';
		  
		    var image = new Image();
		    image.onload = function() {
		    	for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
				    
				    var rowCells = allRows[singleRow].split(',');

				    var marketName = rowCells[0];//Cesium.JulianDate.fromDate(new Date(2017,7,11));
//				    console.log(marketName);
				    dataSource.entities.add({
			            position : Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
			            billboard : {
			                //position : Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
//			                scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
			                image : image
			            },
			            label : {
			                text : marketName,
			                font : '15px sans-serif',
			                showBackground : false,
			                horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
			                pixelOffset : new Cesium.Cartesian2(0.0, -image.height),
			                pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)
			            }
			        });
			    	
		    	}
		    	
		    };
		    image.src = '../v5/img/citylife/p.png';
		    
//		    var marketEntity = dataSource.entities.add({
//		    	position: Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
//		        ellipse: {
//		            semiMinorAxis: 1500.0,
//		            semiMajorAxis: 1500.0,
//		            height: 0.0,
//		            material: materials[0]
//		        }
//	        });
//		    

		  
		  viewer_two.dataSources.add(dataSource);
	}
}
function hideCityLifePanel()
{
//	alert('jinri');
	$('#assist_panel').hide();
}
function showChildPanel1(){
	
	$("#assist_panel_group2_2").html("<img src='../v5/img/citylife/c-2.png' class='' alt=''>");
	$('.assist_panel_group3').show(1000);
	
}
function hideChildPanel1()
{
	$("#assist_panel_group2_2").html("<img src='../v5/img/citylife/c-2-0.png' class='' alt=''>");
	$('.assist_panel_group3').hide(1000);
}
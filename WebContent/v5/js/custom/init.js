/**
 * lyf
 */
var m_color=[];
var B_map = false;
var E_charts;
function initMap(){
	
	viewer = new Cesium.Viewer('cesiumContainer', {
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
	viewer.camera.setView({
	    destination : Cesium.Cartesian3.fromDegrees(116.413, 39.913,205000.0)
	});
	viewer._cesiumWidget._creditContainer.style.display = "none";
	// 2 Set view with heading, pitch and roll
	viewer.camera.setView({
	   // destination : Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0),
	    orientation: {
//	        heading : Cesium.Math.toRadians(-10.0), // east, default value is 0.0 (north)
//	        pitch : Cesium.Math.toRadians(-60),    // default value (looking down)
	        roll : 0.0                             // default value
	    }
	});
    var dataSource = Cesium.GeoJsonDataSource.load('../data/beijingshijie.topojson',{
    	  stroke: Cesium.Color.HOTPINK,
	  	  fill: Cesium.Color.TRANSPARENT,
	  	  stroke:Cesium.Color.DODGERBLUE,
	  	  strokeWidth: 3
	  	  
    });
//    
//    viewer.camera.rotateLeft(0.01);
    viewer.dataSources.add(dataSource);
  //防止穿透
    var removeChanged = viewer.camera.changed.addEventListener(function(percentage) {
        if(viewer.camera.pitch<=0.1&&viewer.camera.pitch>=-0.1)
        {
        	viewer.camera.setView({
        	    destination : Cesium.Cartesian3.fromDegrees(116.413, 39.913,205000.0)
        	});
        }
    });
//    viewer.zoomTo(dataSource);
    //loadData(0);
}
function closeLayersPanel()
{
	$('#showM').hide();
}
function showLayersPanel()
{
//	alert("kkkkkkk");
	$('#showM').show();
}
function loadData(index){
	
//	$(".ttt > span").removeClass('turnRed');
//	$(testdiv).children("span").eq(0).addClass('turnRed');
//	$(testdiv).siblings("span").addClass('turnRed');
//	$('#showM').hide();
	$('#assist_panel').hide();
	$("#middlepanel_1_0").html("");
	$(".bottom_s").hide();
	$(".infopanel").hide();
	
//	alert(index);
	
//	var dataSource = viewer.dataSources.get(1);
//	if(dataSource)
//	{
//		viewer.dataSources.remove(dataSource);
//	}
	if(index==0)
	{
		$("#person_legend").show(2000);
		$("#middlepanel_1_0").html("<img src='../v5/img/person/pc-2-2_06.png' class='' alt=''>");
		$("#person_infopanel_right").show(2000);
		$("#person_infopanel_left").show(2000);
		//		console.log(dataHtml["person"]);
//		B_map = false;
		resetView(B_map);
//		adjustCss(index);
//		rotateMap();
	    var promise = Cesium.GeoJsonDataSource.load('../data/person_polygon.geojson');
	    promise.then(function(dataSource) {
	    	
	        viewer.dataSources.add(dataSource);
	        //console.log(dataSource.entities);
	        //Get the array of entities
	        var entities = dataSource.entities.values;
			//console.log(entities);
	        var colorHash = {};
	        for (var i = 0; i < entities.length; i++) {
	            //For each entity, create a random color based on the state name.
	            //Some states have multiple entities, so we store the color in a
	            //hash so that we use the same color for the entire state.
	            var entity = entities[i];
//	            console.log(entity);
	            var Home = entity.properties.home;
	            //var color = Cesium.Color.fromHsl((1 - (entity.properties.home * 0.005)), 1.0, 0.5);
	            //Set the polygon material to our random color.
	            if(Home==0)
	            {
	            	entity.polygon.material = Cesium.Color.TRANSPARENT;
	            	//entity.polygon.material = Cesium.Color.fromBytes(40,67, 71,200);
	            }
	            else if(Home>0&&Home<=490){
	            	entity.polygon.material = Cesium.Color.fromBytes(40, 146, 199,250);
	            }
	            else if(Home>490&&Home<=1535)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(116, 171, 173,250);
	            }
	            else if(Home>1535&&Home<=2830)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(172, 201, 147);
	            }
	            else if(Home>2830&&Home<=4375)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(227, 235, 117);
	            }
	            else if(Home>4375&&Home<=6241)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(252, 222, 86);
	            }
	            else if(Home>6241&&Home<=8540)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(252, 160, 61);
	            }
	            else if(Home>8540&&Home<=12135)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(245, 99, 37);
	            }
	            else if(Home>12135&&Home<=20000)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(232, 16, 20);
	            }
	           	//entity.polygon.material = color;
	            //Remove the outlines.
	            entity.polygon.outline = false;

	            //Extrude the polygon based on the state's population.  Each entity
	            //stores the properties for the GeoJSON feature it was created from
	            //Since the population is a huge number, we divide by 50.
	            entity.polygon.extrudedHeight = entity.properties.home;
	        }
	        
	    	/*
	    	var cusdataSource = new Cesium.CustomDataSource('myperson');
//	        viewer.dataSources.add(dataSource);
	        //console.log(dataSource.entities);
	        //Get the array of entities
	        var entities = dataSource.entities.values;
			//console.log(entities);
	        var colorHash = {};
	        for (var i = 0; i < entities.length; i++) {
	            //For each entity, create a random color based on the state name.
	            //Some states have multiple entities, so we store the color in a
	            //hash so that we use the same color for the entire state.
	            var entity = entities[i];
	            console.log(entity);
	            var Home = entity.properties.home;
	            var x = entity.properties.x_center;
	            var y = entity.properties.y_center;
	            var material;
	            //var color = Cesium.Color.fromHsl((1 - (entity.properties.home * 0.005)), 1.0, 0.5);
	            //Set the polygon material to our random color.
	            if(Home==0)
	            {
	            	material = Cesium.Color.TRANSPARENT;
	            	//entity.polygon.material = Cesium.Color.fromBytes(40,67, 71,200);
	            }
	            else if(Home>0&&Home<=490){
	            	material = Cesium.Color.fromBytes(40, 146, 199,200);
	            }
	            else if(Home>490&&Home<=1535)
	            {
	            	material = Cesium.Color.fromBytes(116, 171, 173,200);
	            }
	            else if(Home>1535&&Home<=2830)
	            {
	            	material = Cesium.Color.fromBytes(172, 201, 147,200);
	            }
	            else if(Home>2830&&Home<=4375)
	            {
	            	material = Cesium.Color.fromBytes(227, 235, 117,200);
	            }
	            else if(Home>4375&&Home<=6241)
	            {
	            	material = Cesium.Color.fromBytes(252, 222, 86,200);
	            }
	            else if(Home>6241&&Home<=8540)
	            {
	            	material = Cesium.Color.fromBytes(252, 160, 61,200);
	            }
	            else if(Home>8540&&Home<=12135)
	            {
	            	material = Cesium.Color.fromBytes(245, 99, 37,200);
	            }
	            else if(Home>12135&&Home<=20000)
	            {
	            	material = Cesium.Color.fromBytes(232, 16, 20,200);
	            }
	           	//entity.polygon.material = color;
	            //Remove the outlines.
	            //entity.polygon.outline = false;

	            //Extrude the polygon based on the state's population.  Each entity
	            //stores the properties for the GeoJSON feature it was created from
	            //Since the population is a huge number, we divide by 50.
	            //entity.polygon.extrudedHeight = entity.properties.home;
	            cusdataSource.entities.add({
	                //name : 'Red box with black outline',
	                position: Cesium.Cartesian3.fromDegrees(x, y),
	                box : {
	                    dimensions : new Cesium.Cartesian3(400.0, 400.0, Home),
	                    material : material,
	                    //outline : false,
	                    //outlineColor : Cesium.Color.BLACK
	                }
	            });
	        }
	        viewer.dataSources.add(cusdataSource);
	        */
	        
	    }).otherwise(function(error){
	        //Display any errrors encountered while loading.
	        window.alert(error);
	    });
	   
	}
	else if(index==1)
	{
		$("#middlepanel_1_0").html("<img src='../v5/img/company/pc-2-3_03.png' class='' alt=''>");
		$("#company_infopanel_right").show();
		$("#company_infopanel_left").show();
		
		$("#company_legend").show();
		
//		$("#middlepanel_1").html(dataHtml["company"]);
//		B_map = false;
		resetView(B_map);
//		adjustCss(index);
		/*
		var dataSource = Cesium.GeoJsonDataSource.load('../data/company.geojson',{
			markerColor: Cesium.Color.fromBytes(198, 135, 138,200),
			markerSize: 3
//			markerSymbol:'0'
//			markerSymbol:"../data/marker-11.svg"
		});
		viewer.dataSources.add(dataSource);*/
		var cusdataSource = new Cesium.CustomDataSource('mycompany');
		var promise = Cesium.GeoJsonDataSource.load('../data/company.geojson');
		promise.then(function(dataSource) {
//	        viewer.dataSources.add(dataSource);
	        //console.log(dataSource.entities);
	        //Get the array of entities
	        var entities = dataSource.entities.values;
			//console.log(entities);
	        var colorHash = {};
	        for (var i = 0; i < entities.length; i++) {
	            //For each entity, create a random color based on the state name.
	            //Some states have multiple entities, so we store the color in a
	            //hash so that we use the same color for the entire state.
	            var entity = entities[i];
//	            console.log(entity);
//	            var type = entity.properties.TYPE;
//	            alert(type);
	            //var color = Cesium.Color.fromHsl((1 - (entity.properties.home * 0.005)), 1.0, 0.5);
	            //Set the polygon material to our random color.
	            /*
	            if(type=='A980'){
	            	entity.point.color = Cesium.Color.fromBytes(222, 149, 161);
	            }
	            else if(type=='A982')
	            {
	            	entity.point.color = Cesium.Color.fromBytes(193, 144, 152);
	            }
	            else if(type=='A983')
	            {
	            	entity.point.color = Cesium.Color.fromBytes(138, 75, 82);
	            }
	            else if(type=='A984')
	            {
	            	entity.point.color = Cesium.Color.fromBytes(198, 135, 138);
	            }
	            else 
	            {
	            	entity.point.color = Cesium.Color.fromBytes(71, 39, 43);
	            }
	            
	            entity.point.pixelSize = 5;
//	            entity.polygon.outline = true;
	            */
	            var x = entity.properties.DISPLAY_X;
	            var y = entity.properties.DISPLAY_Y;
	            var type = entity.properties.TYPE;
	            var point_color;
	            if(type=='A980'){
	            	point_color = Cesium.Color.fromBytes(209, 136, 147);
	            }
	            else if(type=='A982')
	            {
	            	point_color = Cesium.Color.fromBytes(193, 144, 152);
	            }
	            else if(type=='A983')
	            {
	            	point_color = Cesium.Color.fromBytes(138, 75, 82);
	            }
	            else if(type=='A984')
	            {
	            	point_color = Cesium.Color.fromBytes(198, 135, 138);
	            }
	            else 
	            {
	            	point_color = Cesium.Color.fromBytes(71, 39, 43);
	            }
	            cusdataSource.entities.add({
	                
	                
	                position: Cesium.Cartesian3.fromDegrees(x, y),
	                point:{
//	                	color : Cesium.Color.fromBytes(198, 135, 138,200),
	                	color : point_color,
	                	pixelSize : 3
	                }
	                
	            });
	          
	        }
	        viewer.dataSources.add(cusdataSource);
	    }).otherwise(function(error){
	       
	        window.alert(error);
	    });
	}
	else if(index==2)
	{	
		$("#sharebikes_legend").show(2000);
		$("#middlepanel_1_0").html("<img src='../v5/img/sharebikes/pc-2-4_06.png' class='' alt=''>");
		$("#sharebikes_infopanel_right").show(2000);
		$("#sharebikes_infopanel_left").show(2000);
		resetView(B_map);
		addtrailLayer('../data/06.csv');
//		adjustCss(index);
		/*
		var promise = Cesium.GeoJsonDataSource.load('../data/beijing_1km_pop-2.geojson');
	    promise.then(function(dataSource) {
	        viewer.dataSources.add(dataSource);
	        //console.log(dataSource.entities);
	        //Get the array of entities
	        var entities = dataSource.entities.values;
			//console.log(entities);
	        var colorHash = {};
	        for (var i = 0; i < entities.length; i++) {
	            //For each entity, create a random color based on the state name.
	            //Some states have multiple entities, so we store the color in a
	            //hash so that we use the same color for the entire state.
	            var entity = entities[i];
	            var Home = entity.properties.home;
	            //var color = Cesium.Color.fromHsl((1 - (entity.properties.home * 0.005)), 1.0, 0.5);
	            //Set the polygon material to our random color.
	            if(Home>=0&&Home<=1201){
	            	entity.polygon.material = Cesium.Color.fromBytes(18, 118, 130,200);
	            }
	            else if(Home>1202&&Home<=3486)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(73, 131, 37,200);
	            }
	            else if(Home>3487&&Home<=6201)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(117, 118, 28,200);
	            }
	            else if(Home>6202&&Home<=9759)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(120, 73, 31,200);
	            }
	            else if(Home>9760&&Home<=18998)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(105, 31, 39,200);
	            }
	            
	           
	           	//entity.polygon.material = color;
	            //Remove the outlines.
	            entity.polygon.outline = true;
//	            entity.polygon.outlineColor = Cesium.Color.AQUA;
//	            entity.polygon.outlineWidth = 0.5;
	            //Extrude the polygon based on the state's population.  Each entity
	            //stores the properties for the GeoJSON feature it was created from
	            //Since the population is a huge number, we divide by 50.
//	            entity.polygon.extrudedHeight = entity.properties.home;
	        }
	    }).otherwise(function(error){
	        //Display any errrors encountered while loading.
	        window.alert(error);
	    });
	    */

		
	}
	else if(index==3){//index==3
		$("#gongwuche_legend").show(2000);
		$("#middlepanel_1_0").html("<img src='../v5/img/gongwuche/pc-2-5_03.png' class='' alt=''>");
		$("#gongwuche_infopanel_right").show(2000);
		$("#gongwuche_infopanel_left").show(2000);
		
		
//		$("#middlepanel_1_1").html("<img src='../img/page2/p4.png' class='' alt=''>");
//		adjustCss(3);
//		$("#middlepanel_1").html(dataHtml["gongwuche"]);
//		B_map = true;
		resetView(B_map);
//		var dataSource = new Cesium.CustomDataSource('myAnimation');
		addtrailLayer('../data/08.csv');
//		getPositionData();
//		alert(positionDataSet.length);
//		console.log(positionDataSet);
//		console.log(maxTime);
		
//		var data = [];
//
//        data[0] = [{longitude:116.405419, dimension:39.918034,time:0},{longitude:116.2821, dimension:39.918145,time:40},{longitude:115.497402, dimension:39.344641, time:100},{longitude:107.942392, dimension:29.559967, time:280}, {longitude:106.549265, dimension:29.559967,time:360}];
//
//        data[1] = [{longitude:116.405419, dimension:39.918034,time:0},{longitude:117.034586, dimension:39.881202,time:40},{longitude:116.340088, dimension:38.842224,time:100},{longitude:113.489176, dimension:23.464017, time:280}, {longitude:113.262084, dimension:23.13901,  time:360}];
//
//        data[2] = [{longitude:118.838979, dimension:32.073514,time:0},{longitude:118.438838, dimension:32.03777,time:40},{longitude:117.802406, dimension:31.91231,time:100},{longitude:104.043645, dimension:35.993845, time:280}, {longitude:101.807224, dimension:36.660972,time:360}];
		/*
        // 起始时间
        var start = Cesium.JulianDate.fromDate(new Date(2017,7,11));
        // 结束时间
        var stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate());

        // 设置始时钟始时间
        viewer.clock.startTime = start.clone();
        // 设置时钟当前时间
        viewer.clock.currentTime = start.clone();
        // 设置始终停止时间
        viewer.clock.stopTime  = stop.clone();
        // 时间速率，数字越大时间过的越快
        viewer.clock.multiplier = 1;
        // 时间轴
        viewer.timeline.zoomTo(start,stop);
        // 循环执行
        viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
        //alert(positionDataSet.length);
        for(let j=0; j<positionDataSet.length; j++){
        	alert(positionDataSet.length);
            var property = computeFlight(positionDataSet[j]);
            // 添加模型
            var planeModel   = dataSource.entities.add({
                // 和时间轴关联
                availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                    start : start,
                    stop : stop
                })]),
                position: property,
                // 根据所提供的速度计算点
                orientation: new Cesium.VelocityOrientationProperty(property),
                // 模型数据
//                model: {
//                	color:Cesium.Color.fromBytes(120, 73, 31,200),
//                    uri: '../js/Cesium/models/moving-box.gltf',
//                    minimumPixelSize:128
//                },
              //实时轨迹显示
                path: {
                    show: true,
                    leadTime: 0,//飞机将要经过的路径，路径存在的时间
                    trailTime: 2,//飞机已经经过的路径，路径存在的时间
                    width: 10,//线宽度
                    resolution: 1,
                    material: new Cesium.PolylineGlowMaterialProperty({
                        glowPower: 5.3,//应该是轨迹线的发光强度
                        color: Cesium.Color.RED//颜色
                    })
                }
            });
            
        }
        viewer.dataSources.add(dataSource);
       
        function computeFlight(source) {
            // 取样位置 相当于一个集合
            var property = new Cesium.SampledPositionProperty();
            for(var i=0; i<source.length; i++){
                var time = Cesium.JulianDate.addSeconds(start, source[i].time, new Cesium.JulianDate);
                var position = Cesium.Cartesian3.fromDegrees(source[i].longitude, source[i].dimension);
                // 添加位置，和时间对应
                property.addSample(time, position);
            }
            return property;
        }
        */
//		$("#middlepanel_1").html(dataHtml["gongwuche"]);
////		B_map = true;
//		resetView(B_map);
		
//		E_charts = echarts.init(document.getElementById('cesiumContainer'));
//		initGongwucheMaop(E_charts);
	}
	else{//index == 4 //职住态势
		$("#zhizhu_legend").show(2000);
		$("#middlepanel_1_0").html("<img src='../v5/img/zhizhu/pc-2-1_06.png' class='' alt=''>");
		$("#zhizhu_infopanel_right").show(2000);
		$("#zhizhu_infopanel_left").show(2000);
		
		resetView(B_map);
		
		var heatdataSource = new Cesium.CustomDataSource('myheatmap');
		
		var bounds = {
			    west: 115.412021, south: 39.439668, east: 117.507093, north: 41.058550
			};

		// init heatmap
		// 初始化CesiumHeatmap
		var heatMap = CesiumHeatmap.create(
			heatdataSource, // 视图层
		    bounds, // 矩形坐标
		    { // heatmap相应参数
		        backgroundColor: "rgba(0,0,0,0)",
		        radius: 15,
		        maxOpacity: 1,
		        minOpacity: 0,
		        blur: .75
		    }
		);
		
//		viewer.zoomTo(heatdataSource);

		var data = [];
		var promise = Cesium.GeoJsonDataSource.load('../data/person_polygon.geojson');
	    promise.then(function(dataSource) {
	    	
	        var entities = dataSource.entities.values;
			
	        for (var i = 0; i < entities.length; i++) {
	            //For each entity, create a random color based on the state name.
	            //Some states have multiple entities, so we store the color in a
	            //hash so that we use the same color for the entire state.
	            var entity = entities[i];
//	            console.log(entity);
	            var Home = entity.properties.home;
	            var x=entity.properties.x_center;
	            var y=entity.properties.y_center;
	            data.push({x: x, y: y, value: Home});
	        }

			// 添加数据 最小值，最大值，数据集
			heatMap.setWGS84Data(0, 20000, data);
			viewer.dataSources.add(heatdataSource);
	        
	    }).otherwise(function(error){
	        //Display any errrors encountered while loading.
	        window.alert(error);
	    });
	    
	}
	
}
function resetView(B_map)
{
	
	var dataSource = viewer.dataSources.get(1);
	if(dataSource)
	{
		viewer.dataSources.remove(dataSource);
	}
}
function rotateMap()
{
	var lastNow = Date.now();
	viewer.clockViewModel.clock.onTick.addEventListener(function(clock) {
        var now = Date.now();
        var spinRate = 1;
        var delta = (now - lastNow) / 1000;
        lastNow = now;
        viewer.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta);
});
//	widget1.clock.onTick.addEventListener(function(clock) {
//	                var now = Date.now();
//	                var spinRate = 2;
//	                var delta = (now - lastNow) / 1000;
//	                lastNow = now;
//	widget1.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta);
//	});
}

var initPanel2Frist = true;
var viewer_panel2;
var preSelectedEntity_panel2 = null;
var preSelectedEntity_img_panel2 = null;
function initPanel2()
{
	$('#assist_panel').hide();
	if(initPanel2Frist)
	{
		viewer_panel2 = new Cesium.Viewer('cesiumContainer_panel2', {

	        imageryProvider: new Cesium.UrlTemplateImageryProvider({
	            url : 'http://223.223.200.50:9300/styles/chinablue/{z}/{x}/{y}@2x.png',
	            credit : '© Analytical Graphics, Inc.'

	        }),
	        infoBox:false,
	        sceneModePicker: false,
	        selectionIndicator:false,
	        navigationHelpButton: false,
	        fullscreenButton: false,
			geocoder: false,
			homeButton: false,
	        baseLayerPicker: false,
	        timeline : false,
	        animation : false,
	        shouldAnimate : true
	    });
		viewer_panel2.camera.setView({
		    destination : Cesium.Cartesian3.fromDegrees(116.413, 39.913,55000.0)
		});
		viewer_panel2._cesiumWidget._creditContainer.style.display = "none";
		//鼠标点击事件  左键
	    var handler = new Cesium.ScreenSpaceEventHandler(viewer_panel2.scene.canvas);
	    handler.setInputAction(function(click) {
	       // 处理鼠标按下事件
	       // 获取鼠标当前位置
	        // console.log('1111');
	        var pick = viewer_panel2.scene.pick(click.position);
	        //选中某模型   pick选中的对象
	        if(pick && pick.id){
	        	//console.log(pick.id);
//	        	$('.assist_panel_group4').toggle();
	        	var selectedEntity = pick.id;
	        	
	        	if(preSelectedEntity_panel2)
	        	{
	        		preSelectedEntity_panel2.billboard.image = preSelectedEntity_img_panel2;
	        	}
	        	
	        	preSelectedEntity_panel2 = selectedEntity;
	        	preSelectedEntity_img_panel2 = selectedEntity.billboard.image
	        	
	        	selectedEntity.billboard.image = '/citylife/v5/img/jishui/4.png';
	        	
	        	$('.panel2_info').css({'top':(click.position.y-325)+'px','left':(click.position.x+10)+'px'});
	        	$('.panel2_info').toggle();
	        }

	     }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
	  //设置鼠标滚动事件的处理函数，这里负责监听高度值变化
        handler.setInputAction(function(wheelment) {
            height = Math.ceil(viewer_panel2.camera.positionCartographic.height);
//            console.log(height);
            if(height<3000)
            {
            	$('.info_panel2').hide();
            	$('#jishui_infopanel_right_2').show();
            	
            }
            else{
            	$('.info_panel2').hide();
            	$('#jishui_infopanel_right_1').show();
            }
        }, Cesium.ScreenSpaceEventType.WHEEL);
        //防止穿透
        var removeChanged = viewer_panel2.camera.changed.addEventListener(function(percentage) {
            if(viewer_panel2.camera.pitch<=0.1&&viewer_panel2.camera.pitch>=-0.1)
            {
            	viewer_panel2.camera.setView({
        		    destination : Cesium.Cartesian3.fromDegrees(116.413, 39.913,55000.0)
        		});
            }
        });
	    
	    loadLayer2Panel2();
	}
	initPanel2Frist = false;
}
function loadLayer2Panel2()
{
	var materials = ['/citylife/v5/img/jishui/1.png','/citylife/v5/img/jishui/2.png','/citylife/v5/img/jishui/3.png'];
	var dataSource = new Cesium.CustomDataSource('jishui');
	$.ajax({
		  url: '../data/jishui.csv',
		  dataType: 'text',
		}).done(AftersuccessFunction);
	function AftersuccessFunction(data) {
		var allRows = data.split(/\r?\n|\r/);
//		  var max = 0;
		  //var table = '<table>';
		  
		   
		    	var imageurl;
		    	for (var singleRow = 0; singleRow < allRows.length-1; singleRow++) {
				    
				    var rowCells = allRows[singleRow].split(',');
//				    console.log(rowCells);
				    var jishuiKind = rowCells[4];//Cesium.JulianDate.fromDate(new Date(2017,7,11));
				    var entity;
				    if(jishuiKind=='轻度积水')
				    {
				    	imageurl = materials[1];
				    	entity={
				    			 position : Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
						            billboard : {
						                position : Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
//						                scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
						                image : imageurl
						            }
//				    				,
//						            label : {
//						                text : rowCells[0],
//						                font : '10px sans-serif',
//						                showBackground : true,
//						                horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
//						                pixelOffset : new Cesium.Cartesian2(0.0, -12),
//						                pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)
//						            }	
				    	}
				    }
				    else if(jishuiKind=='中度积水')
				    {
				    	imageurl = materials[2];
				    	entity={
				    			position : Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
					            billboard : {
					                position : Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
//					                scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
					                image : imageurl
					            }	
				    	}
				    	
				    }
				    else{
				    	imageurl = materials[0];
				    	entity={
				    			position : Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
					            billboard : {
					                position : Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
//					                scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
					                image : imageurl
					            }
						    	,
					            label : {
					                text : rowCells[0],
					                font : '10px sans-serif',
					                backgroundColor:Cesium.Color.BLACK,
					                showBackground : true,
//					                fillColor:Cesium.Color.AQUA,
					                outlineColor:Cesium.Color.AQUA,
					                outlineWidth:3.0,
					                horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
					                pixelOffset : new Cesium.Cartesian2(0.0, -12),
					                pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)
					            }	
				    	}
				    }
				    dataSource.entities.add(entity);
//				    console.log(marketName);
				    /*
				    dataSource.entities.add({
			            position : Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
			            billboard : {
			                position : Cesium.Cartesian3.fromDegrees(rowCells[1], rowCells[2]),
//			                scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
			                image : imageurl
			            }
//				    	,
//			            label : {
//			                text : rowCells[0],
//			                font : '10px sans-serif',
//			                showBackground : true,
//			                horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
//			                pixelOffset : new Cesium.Cartesian2(0.0, -12),
//			                pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)
//			            }
			        });
			    	*/
		    	}
		    
		    
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

		  
		   viewer_panel2.dataSources.add(dataSource);
	}
}
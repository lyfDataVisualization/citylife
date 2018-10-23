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
//    viewer.zoomTo(dataSource);
    loadData(0);
}
function loadData(index,testdiv){
	
	$(".ttt > span").removeClass('turnRed');
//	$(testdiv).children("span").eq(0).addClass('turnRed');
//	$(testdiv).siblings("span").addClass('turnRed');
	
	$("#middlepanel_1").html("");
//	alert(index);
	
//	var dataSource = viewer.dataSources.get(1);
//	if(dataSource)
//	{
//		viewer.dataSources.remove(dataSource);
//	}
	if(index==0)
	{
//		$("#middlepanel_1").html(dataHtml["person"]);
//		console.log(dataHtml["person"]);
//		B_map = false;
		resetView(B_map);
		adjustCss(index);
//		rotateMap();
	    var promise = Cesium.GeoJsonDataSource.load('../data/beijing_1km_pop-1.geojson');
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
	            if(Home==0)
	            {
	            	entity.polygon.material = Cesium.Color.TRANSPARENT;
	            	//entity.polygon.material = Cesium.Color.fromBytes(40,67, 71,200);
	            }
	            else if(Home>0&&Home<=490){
	            	entity.polygon.material = Cesium.Color.fromBytes(40, 146, 199);
	            }
	            else if(Home>490&&Home<=1535)
	            {
	            	entity.polygon.material = Cesium.Color.fromBytes(116, 171, 173);
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
	    }).otherwise(function(error){
	        //Display any errrors encountered while loading.
	        window.alert(error);
	    });
	   
	}
	else if(index==1)
	{
//		$("#middlepanel_1").html(dataHtml["company"]);
//		B_map = false;
		resetView(B_map);
		adjustCss(index);
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
//		$("#middlepanel_1").html(dataHtml["sharebikes"]);

		resetView(B_map);
		adjustCss(index);
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

	            //Extrude the polygon based on the state's population.  Each entity
	            //stores the properties for the GeoJSON feature it was created from
	            //Since the population is a huge number, we divide by 50.
//	            entity.polygon.extrudedHeight = entity.properties.home;
	        }
	    }).otherwise(function(error){
	        //Display any errrors encountered while loading.
	        window.alert(error);
	    });
	    
//		$("#middlepanel_1").html(dataHtml["sharebikes"]);
//		B_map = true;
//		resetView(B_map);
//		viewer.destroy();
		//E_charts= echarts.init(document.getElementById('cesiumContainer'));
		// 指定图表的配置项和数据
       
		 // 使用刚指定的配置项和数据显示图表。
		//E_charts.setOption(sharebikes_option);
		
	}
	else{//index==3
		adjustCss(3);
//		$("#middlepanel_1").html(dataHtml["gongwuche"]);
//		B_map = true;
		resetView(B_map);
//		var dataSource = new Cesium.CustomDataSource('myAnimation');
		addGongwucheLayer();
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
	
}
function resetView(B_map)
{
	/*
	if(B_map)//true
	{
		if(!viewer.isDestroyed())
		{
			viewer.destroy();
		}
		if(E_charts)
		{
//			alert("111");
			E_charts.dispose();
		}
		
	}
	else{//false
		if(E_charts)
		{
			E_charts.dispose();
		}
		if(viewer.isDestroyed())
		{
//			alert("0000");
			initMap();
		}
		else{
			
//			console.log(viewer.isDestroyed());
			var dataSource = viewer.dataSources.get(1);
			if(dataSource)
			{
				viewer.dataSources.remove(dataSource);
			}
		}
	}
	*/
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
function adjustCss(index)
{
	if(index == 0)//ren
	{
		$("#renkou").addClass('turnRed');
//		document.getElementById("renkou").find('span').addClass('turnRed');
//		$(".renkou > span").addClass('turnRed');
//		$(this).find('span').addClass('turnRed');
//		 document.getElementById('renkou').find('span').addClass('turnRed');
//		$("._t_col _border").find("img").attr('src','../one/image/4g.png');
//		console.log($(this).find("img"));
//		id="rk"
//			id="rk1"
//		console.log($("#rk").style);
//		$("#rk").style.display="block";
//		$("#rk1").style.display="block";
		$("#rk").show();
		$("#rk1").show();
		
		$("#dc").hide();
		$("#gxdc").hide();
		
		$("#qy").hide();
		$("#gxjs").hide();
	}
	else if(index == 1)//company
	{
		$("#company").addClass('turnRed');
//		id="dc"
//			id="gxdc"
		
		$("#dc").hide();
		$("#gxdc").hide();
		
		$("#rk").hide();
		$("#rk1").hide();
		
		$("#qy").show();
		$("#gxjs").show();
	}
	else if(index == 2)//sharebikes
	{
		$("#sharebikes").addClass('turnRed');
//		id="qy"
//			id="gxjs"
		$("#qy").hide();
		$("#gxjs").hide();
		
		$("#rk").hide();
		$("#rk1").hide();
		
		$("#dc").show();
		$("#gxdc").show();
	}
	else if(index == 3)
	{
		$("#gongwuche").addClass('turnRed');
		$("#qy").hide();
		$("#gxjs").hide();
		
		$("#rk").hide();
		$("#rk1").hide();
		
		$("#dc").hide();
		$("#gxdc").hide();
	}
}


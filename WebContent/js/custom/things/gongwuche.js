/**
 * lyf
 */
var positionDataSet= [];
var maxTime = 0;
function addGongwucheLayer()
{
	var dataSource = new Cesium.CustomDataSource('myAnimation');
	
	var colors = [
        new Cesium.Color(77 / 255, 201 / 255, 255 / 255, 1),
        new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 1),
        new Cesium.Color(221 / 255, 221 / 255, 221 / 255, 1),
        new Cesium.Color(60 / 255, 39/ 255, 255 / 255, 1),
        new Cesium.Color(25 / 255, 20 / 255, 38 / 255, 1),
        new Cesium.Color(221 / 255, 20 / 255, 20 / 255, 1)
    ];
	/*
	for (var i = 0, len = 1; i < len; i++) {
        var startPoint = Cesium.Cartesian3.fromDegrees(Math.random() * 100, Math.random() * 100);
        var endPoint = Cesium.Cartesian3.fromDegrees(Math.random() * 100, Math.random() * 100);
//        console.log();
        var positions = Cesium.getLinkedPointList(startPoint, endPoint, 30000, 50);
//        console.log(positions);
        var glowingLine = dataSource.entities.add({
            polyline: {
                positions: positions,
                width: 5,
                //material: new Cesium.PolylineAttackLinkMaterialProperty({
                material: new Cesium.PolylineArrowLinkMaterialProperty({
                    //color: new Cesium.Color(77 / 255, 201 / 255, 255 / 255, 1)
                    color: colors[i%3],
                    duration:1000
                }),
//                material: new Cesium.PolylineDashMaterialProperty({
//                    color: colors[i % 3]
//                })
            }
        });
    }
	*/
	$.ajax({
		  url: '../data/04.csv',
		  dataType: 'text',
		}).done(AftersuccessFunction);
	function AftersuccessFunction(data) {
		var allRows = data.split(/\r?\n|\r/);
//		  var max = 0;
		  //var table = '<table>';
		  for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
		    var childData = [];
		    var rowCells = allRows[singleRow].split(',');
//		    if(rowCells.length-7>maxTime)
//		    {
//		    	maxTime = rowCells.length-7;
//		    }
//		    var time = 0;
		    var startTime = Cesium.JulianDate.fromDate(new Date(rowCells[1]));//Cesium.JulianDate.fromDate(new Date(2017,7,11));
		    var endTime = Cesium.JulianDate.fromDate(new Date(rowCells[4]));
		    var durationTime = Cesium.JulianDate.secondsDifference(endTime, startTime); 
//		    console.log(durationTime);
		    for (var rowCell = 7; rowCell < rowCells.length; rowCell++) {
		    	var longitude_dimension = rowCells[rowCell].split(';');
//		        table += rowCells[rowCell];
//		        var singlePosition = {
//		        		longitude:parseFloat(longitude_dimension[0]),
//		        		dimension:parseFloat(longitude_dimension[1]),
//		        		time:time
//		        }
		    	var singlePosition = Cesium.Cartesian3.fromDegrees(longitude_dimension[0], longitude_dimension[1]);
		        childData.push(singlePosition);
//		        time +=1; 
		    }
//		    positionDataSet.push(childData);
		    var glowingLine = dataSource.entities.add({
	            polyline: {
	                positions: childData,
	                width: 5,
	                //material: new Cesium.PolylineAttackLinkMaterialProperty({
	                material: new Cesium.PolylineArrowLinkMaterialProperty({
	                    //color: new Cesium.Color(77 / 255, 201 / 255, 255 / 255, 1)
	                    color: colors[singleRow%6],
	                    duration:2000
	                }),
//	                material: new Cesium.PolylineDashMaterialProperty({
//	                    color: colors[i % 3]
//	                })
	            }
	        });
		    
		  }
		  
		  viewer.dataSources.add(dataSource);
	}
//	viewer.dataSources.add(dataSource);
}
function getPositionData()
{
	$.ajax({
		  url: '../data/04.csv',
		  dataType: 'text',
		}).done(successFunction);
}
function successFunction(data) {
//	var data = [];

//    data[0] = [{longitude:116.405419, dimension:39.918034,time:0},{longitude:116.2821, dimension:39.918145,time:40},{longitude:115.497402, dimension:39.344641, time:100},{longitude:107.942392, dimension:29.559967, time:280}, {longitude:106.549265, dimension:29.559967,time:360}];
//
//    data[1] = [{longitude:116.405419, dimension:39.918034,time:0},{longitude:117.034586, dimension:39.881202,time:40},{longitude:116.340088, dimension:38.842224,time:100},{longitude:113.489176, dimension:23.464017, time:280}, {longitude:113.262084, dimension:23.13901,  time:360}];
//
//    data[2] = [{longitude:118.838979, dimension:32.073514,time:0},{longitude:118.438838, dimension:32.03777,time:40},{longitude:117.802406, dimension:31.91231,time:100},{longitude:104.043645, dimension:35.993845, time:280}, {longitude:101.807224, dimension:36.660972,time:360}];

	  var allRows = data.split(/\r?\n|\r/);
//	  var max = 0;
	  //var table = '<table>';
	  for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
	    var childData = [];
	    var rowCells = allRows[singleRow].split(',');
	    if(rowCells.length-7>maxTime)
	    {
	    	maxTime = rowCells.length-7;
	    }
	    var time = 0;
	    for (var rowCell = 7; rowCell < rowCells.length; rowCell++) {
	    	var longitude_dimension = rowCells[rowCell].split(';');
//	        table += rowCells[rowCell];
	        var singlePosition = {
	        		longitude:parseFloat(longitude_dimension[0]),
	        		dimension:parseFloat(longitude_dimension[1]),
	        		time:time
	        }
	        childData.push(singlePosition);
	        time +=1; 
	    }
	    positionDataSet.push(childData);
	  } 
	  LoadPositionData2Map(positionDataSet);
	
}
function LoadPositionData2Map(positionDataSet)
{
	var dataSource = new Cesium.CustomDataSource('myAnimation');
	
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
//    	alert(positionDataSet.length);
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
//            model: {
//            	color:Cesium.Color.fromBytes(120, 73, 31,200),
//                uri: '../js/Cesium/models/moving-box.gltf',
//                minimumPixelSize:128
//            },
          //实时轨迹显示
            polyline:{
            	 material: new Cesium.ColorMaterialProperty({
                     
                     color: Cesium.Color.AQUA//颜色
                 })
            },
            path: {
                show: true,
                leadTime: 0,//飞机将要经过的路径，路径存在的时间
                trailTime: 1,//飞机已经经过的路径，路径存在的时间
                width: 5,//线宽度
                resolution: 30,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 1.3,//应该是轨迹线的发光强度
//                    color:  Cesium.Color.fromRandom({
//                        red : 1.0,
//                        green : 1.0,
//                        blue:1.0,
//                        alpha : 1.0
//                    })
                    color: Cesium.Color.AQUA//颜色
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
}
function initGongwucheMaop(myChart)
{
	$.get('../data/lines-bus.json', function(data) {
	    var hStep = 300 / (data.length - 1);
	    var busLines = [].concat.apply([], data.map(function (busLine, idx) {
	        var prevPt;
	        var points = [];
	        for (var i = 0; i < busLine.length; i += 2) {
	            var pt = [busLine[i], busLine[i + 1]];
	            if (i > 0) {
	                pt = [
	                    prevPt[0] + pt[0],
	                    prevPt[1] + pt[1]
	                ];
	            }
	            prevPt = pt;

	            points.push([pt[0] / 1e4, pt[1] / 1e4]);
	        }
	        return {
	            coords: points,
	            lineStyle: {
	                normal: {
	                    color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
	                }
	            }
	        };
	    }));
	    myChart.clear();
	    myChart.setOption(option = {
	        bmap: {
	            center: [116.46, 39.92],
	            zoom: 10,
	            roam: true,
	            mapStyle: {
	              'styleJson': [
	                {
	                  'featureType': 'water',
	                  'elementType': 'all',
	                  'stylers': {
	                    'color': '#031628'
	                  }
	                },
	                {
	                  'featureType': 'land',
	                  'elementType': 'geometry',
	                  'stylers': {
	                    'color': '#000102'
	                  }
	                },
	                {
	                  'featureType': 'highway',
	                  'elementType': 'all',
	                  'stylers': {
	                    'visibility': 'off'
	                  }
	                },
	                {
	                  'featureType': 'arterial',
	                  'elementType': 'geometry.fill',
	                  'stylers': {
	                    'color': '#000000'
	                  }
	                },
	                {
	                  'featureType': 'arterial',
	                  'elementType': 'geometry.stroke',
	                  'stylers': {
	                    'color': '#0b3d51'
	                  }
	                },
	                {
	                  'featureType': 'local',
	                  'elementType': 'geometry',
	                  'stylers': {
	                    'color': '#000000'
	                  }
	                },
	                {
	                  'featureType': 'railway',
	                  'elementType': 'geometry.fill',
	                  'stylers': {
	                    'color': '#000000'
	                  }
	                },
	                {
	                  'featureType': 'railway',
	                  'elementType': 'geometry.stroke',
	                  'stylers': {
	                    'color': '#08304b'
	                  }
	                },
	                {
	                  'featureType': 'subway',
	                  'elementType': 'geometry',
	                  'stylers': {
	                    'lightness': -70
	                  }
	                },
	                {
	                  'featureType': 'building',
	                  'elementType': 'geometry.fill',
	                  'stylers': {
	                    'color': '#000000'
	                  }
	                },
	                {
	                  'featureType': 'all',
	                  'elementType': 'labels.text.fill',
	                  'stylers': {
	                    'color': '#857f7f'
	                  }
	                },
	                {
	                  'featureType': 'all',
	                  'elementType': 'labels.text.stroke',
	                  'stylers': {
	                    'color': '#000000'
	                  }
	                },
	                {
	                  'featureType': 'building',
	                  'elementType': 'geometry',
	                  'stylers': {
	                    'color': '#022338'
	                  }
	                },
	                {
	                  'featureType': 'green',
	                  'elementType': 'geometry',
	                  'stylers': {
	                    'color': '#062032'
	                  }
	                },
	                {
	                  'featureType': 'boundary',
	                  'elementType': 'all',
	                  'stylers': {
	                    'color': '#465b6c'
	                  }
	                },
	                {
	                  'featureType': 'manmade',
	                  'elementType': 'all',
	                  'stylers': {
	                    'color': '#022338'
	                  }
	                },
	                {
	                  'featureType': 'label',
	                  'elementType': 'all',
	                  'stylers': {
	                    'visibility': 'off'
	                  }
	                }
	              ]
	            }
	        },
	        series: [{
	            type: 'lines',
	            coordinateSystem: 'bmap',
	            polyline: true,
	            data: busLines,
	            silent: true,
	            lineStyle: {
	                normal: {
	                    // color: '#c23531',
	                    // color: 'rgb(200, 35, 45)',
	                    opacity: 0.2,
	                    width: 1
	                }
	            },
	            progressiveThreshold: 500,
	            progressive: 200
	        }, {
	            type: 'lines',
	            coordinateSystem: 'bmap',
	            polyline: true,
	            data: busLines,
	            lineStyle: {
	                normal: {
	                    width: 0
	                }
	            },
	            effect: {
	                constantSpeed: 20,
	                show: true,
	                trailLength: 0.1,
	                symbolSize: 1.5
	            },
	            zlevel: 1
	        }]
	    });
	});
}

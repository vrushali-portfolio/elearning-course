function ButtonTrackingObj(exp, titleName, cm, frame){
   this.VarTrivBtnTracking = new Variable( 'VarTrivBtnTracking', null, 0, cm, frame, exp, titleName, true );
   this.title = null;
}

ButtonTrackingObj.codeToStateMap =
{
	'N' : 'normalState',
	'O' : 'overState',
	'D' : 'downState',
	'A' : 'disabledState',
	'V' : 'visitedState',
	'S' : 'selectedState'
};
ButtonTrackingObj.stateToCodeMap = {};
for (var key in ButtonTrackingObj.codeToStateMap)
	ButtonTrackingObj.stateToCodeMap[ButtonTrackingObj.codeToStateMap[key]] = key;

ButtonTrackingObj.prototype.InitPageTracking = function ( )
{
	var THIS = this;
	var pageTrackData = this.VarTrivBtnTracking.getValue();
	var bDoInit = true;
	try {
	    if (pageTrackData && pageTrackData.length > 0 && pageTrackData != '~~~null~~~')
	    {
	        var topLevelSplit = pageTrackData.split('#');
	        if (topLevelSplit && topLevelSplit.length > 1)
            {
		        var arrIds = topLevelSplit[0].split(',');
		        var arrStatus = topLevelSplit[1].split(',');
		        for( var i=0; i<arrIds.length; i++ )
		        {
			        var id = parseInt( '0x' + arrIds[i] );
			        var status = arrStatus[i];
			        var node = this.FindNode( this.title, id );
			        if( node )
						node.v = ButtonTrackingObj.codeToStateMap[status] || status;
		        }
    		}
        }
    } catch (e) { }
}

ButtonTrackingObj.prototype.FindNode = function( node, id )
{
	if( node.id == id )
		return node;
	
	var match = null;
	if( typeof( node.c ) != 'undefined' ){
		for( var i=0; i<node.c.length; i++ ){
			match = this.FindNode( node.c[i], id );
			if( match != null )
				break;
		}
	}
	
	return match;
}

ButtonTrackingObj.prototype.InternalGetRangeStatus = function( node )
{
	if( node == null )
		return -1;
		
	if( typeof(node.c) == 'undefined' )
	{
		return node.v;
	}
	else
	{
		return 'normalState';
	}
}


ButtonTrackingObj.prototype.GetRangeStatus = function( id, bInit )
{
	var status = -1;
	if ( bInit ) 
		this.InitPageTracking();
	
	status = this.InternalGetRangeStatus( this.FindNode( this.title, id ) );

	return status;
}


ButtonTrackingObj.prototype.InternalSetRangeStatus=function( node, status )
{
	if( node == null )
		return;
	node.v = status;
	if( status == 0 && typeof(node.c)!='undefined')
	{
		for( var i=0; i<node.c.length; i++ )
			this.InternalSetRangeStatus( node.c[i], status ); 
	}
}

ButtonTrackingObj.prototype.SetRangeStatus = function( id, status /*0 or 1 or 2*/)
{
	this.InternalSetRangeStatus( this.FindNode(this.title, id), status );
	
	this.SavePageTracking();
}

ButtonTrackingObj.prototype.IterateTree = function( func )
{
	var stack = [];
	stack.push( this.title );
	var i = 0;
	while( stack.length > 0 )
	{
		var node = stack.shift();
		
		if( typeof(node.c) != 'undefined' )
			stack = node.c.concat(stack);
			
		//do the thing
		func( node, i, stack );
		i++;
	}	
}

ButtonTrackingObj.prototype.SavePageTracking = function()
{
	var fnIsSaveState = window.ObjButton && ObjButton.isSaveState || function () { return false; };
	var hexString = '';
	var arrayIds = [];
	var arrayStatus= [];
	
	this.IterateTree(function(node, i, stack){
		if (fnIsSaveState(node.v))
		{
			arrayIds.push(node.id);
			arrayStatus.push(node.v);
		}
	});
	
	for( var i=0; i<arrayIds.length; i++ )
		hexString += (i > 0 ? ',' : '') + arrayIds[i].toString(16);

	hexString += (arrayIds.length > 0 ? '#' : '');
	
	for (var i = 0; i < arrayStatus.length; i++)
		hexString += (i > 0 ? ',' : '') + (ButtonTrackingObj.stateToCodeMap[arrayStatus[i]] || arrayStatus[i]);

	//LD-8267 - Added a condition to avoid tracking null/empty data unnecessarily
	if (hexString.length > 0 || (myTop.suspendDataCache && myTop.suspendDataCache.indexOf('VarTrivBtnTracking') >= 0) || !this.VarTrivBtnTracking.bSCORM)
		this.VarTrivBtnTracking.set(hexString);
}

var trivBtnTracking = new ButtonTrackingObj(365,'menopur_pix', 0, null);
trivBtnTracking.title={id:1,v:0,c:[{id:374087,v:'normalState'},{id:374077,v:'normalState'},{id:120952,v:'normalState'},{id:131471,v:'normalState'},{id:131426,v:'normalState'},{id:732684,v:'normalState'},{id:881527,v:'normalState'},{id:884008,v:'normalState'},{id:1213984,v:'normalState'},{id:1213991,v:'normalState'},{id:1213999,v:'normalState'},{id:1512196,v:'normalState'},{id:1512203,v:'normalState'},{id:1512211,v:'normalState'},{id:1512000,v:'normalState'},{id:1512007,v:'normalState'},{id:1512015,v:'normalState'},{id:1512396,v:'normalState'},{id:1512403,v:'normalState'},{id:1512411,v:'normalState'},{id:1512363,v:'normalState'},{id:1512370,v:'normalState'},{id:1512378,v:'normalState'},{id:1512327,v:'normalState'},{id:1512334,v:'normalState'},{id:1512342,v:'normalState'},{id:1512501,v:'normalState'},{id:1512508,v:'normalState'},{id:1512516,v:'normalState'},{id:1513383,v:'normalState'},{id:1513390,v:'normalState'},{id:1513398,v:'normalState'},{id:1513736,v:'normalState'},{id:1514258,v:'normalState'},{id:1513749,v:'normalState'},{id:1513756,v:'normalState'},{id:1513707,v:'normalState'},{id:1513720,v:'normalState'},{id:1513727,v:'normalState'},{id:1513678,v:'normalState'},{id:1513691,v:'normalState'},{id:1513698,v:'normalState'},{id:1513640,v:'normalState'},{id:1513662,v:'normalState'},{id:1513669,v:'normalState'},{id:1513611,v:'normalState'},{id:1513624,v:'normalState'},{id:1513631,v:'normalState'},{id:1513582,v:'normalState'},{id:1513595,v:'normalState'},{id:1513602,v:'normalState'},{id:1516249,v:'normalState'},{id:1516262,v:'normalState'},{id:1516269,v:'normalState'},{id:1516524,v:'normalState'},{id:1516537,v:'normalState'},{id:1516544,v:'normalState'},{id:1516734,v:'normalState'},{id:1516747,v:'normalState'},{id:1516754,v:'normalState'},{id:1517522,v:'normalState'},{id:1517535,v:'normalState'},{id:1517542,v:'normalState'},{id:1518093,v:'normalState'},{id:1518106,v:'normalState'},{id:1518113,v:'normalState'},{id:1524100,v:'normalState'},{id:1524107,v:'normalState'},{id:1524115,v:'normalState'},{id:1524131,v:'normalState'},{id:1524138,v:'normalState'},{id:1524146,v:'normalState'},{id:1524232,v:'normalState'},{id:1524239,v:'normalState'},{id:1524247,v:'normalState'},{id:1354240,v:'normalState'},{id:1354247,v:'normalState'},{id:1354255,v:'normalState'},{id:1525136,v:'normalState'},{id:1525143,v:'normalState'},{id:1525152,v:'normalState'},{id:1525522,v:'normalState'},{id:1525529,v:'normalState'},{id:1525538,v:'normalState'},{id:1525925,v:'normalState'},{id:1525932,v:'normalState'},{id:1525941,v:'normalState'},{id:1526371,v:'normalState'},{id:1526378,v:'normalState'},{id:1526387,v:'normalState'},{id:1359198,v:'normalState'},{id:1359189,v:'normalState'},{id:1607303,v:'normalState'},{id:1607294,v:'normalState'},{id:1252818,v:'normalState'},{id:1363792,v:'normalState'},{id:1363801,v:'normalState'},{id:1526689,v:'normalState'},{id:1526696,v:'normalState'},{id:1526704,v:'normalState'},{id:1526800,v:'normalState'},{id:1526807,v:'normalState'},{id:1526815,v:'normalState'},{id:1527256,v:'normalState'},{id:1527263,v:'normalState'},{id:1527271,v:'normalState'},{id:1527398,v:'normalState'},{id:1527405,v:'normalState'},{id:1527413,v:'normalState'},{id:1527540,v:'normalState'},{id:1527547,v:'normalState'},{id:1527555,v:'normalState'},{id:1527681,v:'normalState'},{id:1527688,v:'normalState'},{id:1527696,v:'normalState'},{id:1527822,v:'normalState'},{id:1527829,v:'normalState'},{id:1527837,v:'normalState'},{id:1527964,v:'normalState'},{id:1527971,v:'normalState'},{id:1527979,v:'normalState'},{id:1528105,v:'normalState'},{id:1528112,v:'normalState'},{id:1528120,v:'normalState'},{id:1528672,v:'normalState'},{id:1528694,v:'normalState'},{id:1528701,v:'normalState'},{id:1528643,v:'normalState'},{id:1528656,v:'normalState'},{id:1528663,v:'normalState'},{id:1528614,v:'normalState'},{id:1528627,v:'normalState'},{id:1528634,v:'normalState'},{id:1528585,v:'normalState'},{id:1528598,v:'normalState'},{id:1528605,v:'normalState'},{id:1528556,v:'normalState'},{id:1528569,v:'normalState'},{id:1528576,v:'normalState'},{id:1528527,v:'normalState'},{id:1528540,v:'normalState'},{id:1528547,v:'normalState'},{id:1528498,v:'normalState'},{id:1577773,v:'normalState'},{id:1528511,v:'normalState'},{id:1528518,v:'normalState'},{id:1528469,v:'normalState'},{id:1528482,v:'normalState'},{id:1528489,v:'normalState'},{id:1531253,v:'normalState'},{id:1531260,v:'normalState'},{id:1531268,v:'normalState'},{id:1531282,v:'normalState'},{id:1531289,v:'normalState'},{id:1531297,v:'normalState'},{id:1411251,v:'normalState'},{id:1411258,v:'normalState'},{id:1411266,v:'normalState'},{id:1531911,v:'normalState'},{id:1531924,v:'normalState'},{id:1531931,v:'normalState'},{id:1531882,v:'normalState'},{id:1531895,v:'normalState'},{id:1531902,v:'normalState'},{id:1531853,v:'normalState'},{id:1531866,v:'normalState'},{id:1531873,v:'normalState'},{id:1531824,v:'normalState'},{id:1531837,v:'normalState'},{id:1531844,v:'normalState'},{id:1531795,v:'normalState'},{id:1531808,v:'normalState'},{id:1531815,v:'normalState'},{id:1531766,v:'normalState'},{id:1531779,v:'normalState'},{id:1531786,v:'normalState'},{id:1531737,v:'normalState'},{id:1531750,v:'normalState'},{id:1531757,v:'normalState'},{id:1534708,v:'normalState'},{id:1534715,v:'normalState'},{id:1534723,v:'normalState'},{id:1534769,v:'normalState'},{id:1534776,v:'normalState'},{id:1534784,v:'normalState'},{id:1534677,v:'normalState'},{id:1534684,v:'normalState'},{id:1534692,v:'normalState'},{id:1534834,v:'normalState'},{id:1534841,v:'normalState'},{id:1534849,v:'normalState'},{id:1534901,v:'normalState'},{id:1534908,v:'normalState'},{id:1534916,v:'normalState'},{id:1534937,v:'normalState'},{id:1534944,v:'normalState'},{id:1534952,v:'normalState'},{id:1534646,v:'normalState'},{id:1534653,v:'normalState'},{id:1534661,v:'normalState'},{id:1535040,v:'normalState'},{id:1535047,v:'normalState'},{id:1535055,v:'normalState'},{id:1535770,v:'normalState'},{id:1535783,v:'normalState'},{id:1535790,v:'normalState'},{id:1536326,v:'normalState'},{id:1536333,v:'normalState'},{id:1536341,v:'normalState'},{id:1536481,v:'normalState'},{id:1536488,v:'normalState'},{id:1536496,v:'normalState'},{id:1536902,v:'normalState'},{id:1536915,v:'normalState'},{id:1536922,v:'normalState'},{id:1536873,v:'normalState'},{id:1536886,v:'normalState'},{id:1536893,v:'normalState'},{id:1362005,v:'normalState'},{id:1362019,v:'normalState'},{id:1362026,v:'normalState'},{id:1419592,v:'normalState'},{id:1419607,v:'normalState'},{id:1419614,v:'normalState'},{id:1537678,v:'normalState'},{id:1537685,v:'normalState'},{id:1537693,v:'normalState'},{id:1537707,v:'normalState'},{id:1537714,v:'normalState'},{id:1537722,v:'normalState'},{id:1245985,v:'normalState'},{id:1245992,v:'normalState'},{id:1246000,v:'normalState'},{id:1362513,v:'normalState'},{id:1362520,v:'normalState'},{id:1362528,v:'normalState'},{id:1362575,v:'normalState'},{id:1362582,v:'normalState'},{id:1362590,v:'normalState'},{id:1363972,v:'normalState'},{id:1363981,v:'normalState'},{id:1364228,v:'normalState'},{id:1364237,v:'normalState'},{id:1364396,v:'normalState'},{id:1364536,v:'normalState'},{id:1364545,v:'normalState'},{id:1538572,v:'normalState'},{id:1538579,v:'normalState'},{id:1538587,v:'normalState'},{id:1538724,v:'normalState'},{id:1538731,v:'normalState'},{id:1538739,v:'normalState'},{id:1538787,v:'normalState'},{id:1538794,v:'normalState'},{id:1538802,v:'normalState'},{id:1538941,v:'normalState'},{id:1538948,v:'normalState'},{id:1538956,v:'normalState'},{id:1539056,v:'normalState'},{id:1539063,v:'normalState'},{id:1539071,v:'normalState'},{id:1539657,v:'normalState'},{id:1539664,v:'normalState'},{id:1539672,v:'normalState'},{id:1539848,v:'normalState'},{id:1539855,v:'normalState'},{id:1539863,v:'normalState'},{id:1540140,v:'normalState'},{id:1540147,v:'normalState'},{id:1540155,v:'normalState'},{id:1540389,v:'normalState'},{id:1540396,v:'normalState'},{id:1540404,v:'normalState'},{id:1540420,v:'normalState'},{id:1540427,v:'normalState'},{id:1540435,v:'normalState'},{id:309644,v:'normalState'},{id:492599,v:'normalState'},{id:493081,v:'normalState'},{id:946531,v:'normalState'},{id:946539,v:'normalState'},{id:875414,v:'normalState'},{id:875422,v:'normalState'},{id:650188,v:'normalState'},{id:650199,v:'normalState'},{id:963763,v:'normalState'},{id:963774,v:'normalState'},{id:163764,v:'normalState'},{id:1597770,v:'normalState'},{id:164964,v:'normalState'},{id:1581935,v:'normalState'},{id:1584033,v:'normalState'},{id:164971,v:'normalState'},{id:842280,v:'normalState'},{id:164978,v:'normalState'},{id:164985,v:'normalState'},{id:638508,v:'normalState'},{id:1600169,v:'normalState'},{id:1600160,v:'normalState'},{id:640179,v:'normalState'},{id:640187,v:'normalState'},{id:638897,v:'normalState'},{id:1600609,v:'normalState'},{id:1600600,v:'normalState'},{id:1567416,v:'normalState'},{id:1601119,v:'normalState'},{id:1601110,v:'normalState'},{id:165817,v:'normalState'},{id:165828,v:'normalState'},{id:1601631,v:'normalState'},{id:167603,v:'normalState'},{id:674762,v:'normalState'},{id:688658,v:'normalState'},{id:751401,v:'normalState'},{id:363581,v:'normalState'},{id:363594,v:'normalState'},{id:363607,v:'normalState'},{id:363620,v:'normalState'},{id:363631,v:'normalState'},{id:363644,v:'normalState'},{id:363657,v:'normalState'},{id:363670,v:'normalState'},{id:363681,v:'normalState'},{id:363694,v:'normalState'},{id:363707,v:'normalState'},{id:363720,v:'normalState'},{id:363731,v:'normalState'},{id:363744,v:'normalState'},{id:363757,v:'normalState'},{id:363770,v:'normalState'},{id:363783,v:'normalState'},{id:363796,v:'normalState'},{id:363809,v:'normalState'},{id:363820,v:'normalState'},{id:363833,v:'normalState'},{id:363846,v:'normalState'},{id:363859,v:'normalState'},{id:363870,v:'normalState'},{id:363883,v:'normalState'},{id:363896,v:'normalState'},{id:363909,v:'normalState'}]};

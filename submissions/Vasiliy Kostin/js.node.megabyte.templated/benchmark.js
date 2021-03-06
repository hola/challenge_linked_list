//Megabyte 2015

var _linklist = require('./_linklist');
var _multilinklist = require('./_multilinklist');

echo('benchmark begin');
echo('');

var ITERATIONS=400000;
	

	var l = _linklist;
	var list1;
	var list2;
		benchmarkFunctions([
			
			'OLD list testing:',
			function ()
			{
				list1={};
				list2={};
				echo('Initialisation lists', true);
			
				l.init(list1);
				l.init(list2);
				echo('list1 is empty: '+l.isEmpty(list1));
				echo('list2 is empty: '+l.isEmpty(list2));
			
			},
			
			//------------------------------------------------------------
			'Adding '+ITERATIONS+' robots in to list1',
			function ()
			{
				
				for(var i = 0; i <ITERATIONS;i++)
				{
					l.append(list1, {name:'Robot r2d2',body:'gold'});
				}
				echo('list1 is empty: '+l.isEmpty(list1));
				echo('list2 is empty: '+l.isEmpty(list2));
			},
			
			//------------------------------------------------------------
			'Adding another '+ITERATIONS+' robots in to list1',
			function ()
			{
				for(var i = 0; i <ITERATIONS;i++)
				{
					l.append(list1, {name:'Robot t1000',body:'iron'});
				}
				echo('list1 is empty: '+l.isEmpty(list1));
				echo('list2 is empty: '+l.isEmpty(list2));
			},
			
				
			//------------------------------------------------------------
			'Moving '+ITERATIONS+' first robots from list1 to list2',
			function ()
			{
				for(var i = 0; i <ITERATIONS;i++)
				{
					l.append(list2, l.shift(list1));
				}
				
				echo('list1 is empty: '+l.isEmpty(list1));
				echo('list2 is empty: '+l.isEmpty(list2));
			},
			
			//------------------------------------------------------------
			'Destroying robots in both lists',
			function ()
			{
				while(!l.isEmpty(list1))
				{
					l.shift(list1);
				}
				while(!l.isEmpty(list2))
				{
					l.shift(list2);
				}
				
				echo('list1 is empty: '+l.isEmpty(list1));
				echo('list2 is empty: '+l.isEmpty(list2));
				
				return true;
			},
			
			
			//======================================================
			'---------------------------------------------------------\nNEW list testing',
			function ()
			{
				echo('Initialisation lists', true);
			
				list1=_multilinklist.getListInstance();
				list2=_multilinklist.getListInstance();;
				
				echo('list1 is empty: '+list1.isEmpty());
				echo('list2 is empty: '+list2.isEmpty());
			
			},
			
			//------------------------------------------------------------
			'Adding '+ITERATIONS+' robots in to list1',
			function ()
			{
				
				for(var i = 0; i <ITERATIONS;i++)
				{
					list1.append({name:'Robot r2d2',body:'gold'});
				}
				echo('list1 is empty: '+list1.isEmpty());
				echo('list2 is empty: '+list2.isEmpty());
			},
			
			//------------------------------------------------------------
			'Adding another '+ITERATIONS+' robots in to list1',
			function ()
			{
				for(var i = 0; i <ITERATIONS;i++)
				{
					list1.append({name:'Robot t1000',body:'iron'});
				}
				echo('list1 is empty: '+list1.isEmpty());
				echo('list2 is empty: '+list2.isEmpty());
			},
			
				
			//------------------------------------------------------------
			'Moving '+ITERATIONS+' first robots from list1 to list2',
			function ()
			{
				for(var i = 0; i <ITERATIONS;i++)
				{
					list2.append(list1.shift());
				}
				
				echo('list1 is empty: '+list1.isEmpty());
				echo('list2 is empty: '+list2.isEmpty());
			},
			
			//------------------------------------------------------------
			'Destroying robots in both lists',
			function ()
			{
				while(!list1.isEmpty())
				{
					list1.shift();
				}
				while(!list2.isEmpty())
				{
					list2.shift();
				}
				
				echo('list1 is empty: '+list1.isEmpty());
				echo('list2 is empty: '+list2.isEmpty());
				
				return true;
			}
			
			
			]);


echo('benchmark end');
echo('Press any key to exit...');
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));


//=============== benchmark processor ========================

function _benchmarkFunctionInside(f)
{
	rememberTime();
	f();
	echoElapsedTime();
}


function benchmarkFunctions(functions)
{
	echo('----------------------------------------------');

	while (functions.length > 0)
	{
		var title=functions.shift();
		if(title)
		{
			echo(title,true);
			var f = functions.shift();
			if(f)
			{
				_benchmarkFunctionInside(f);
				echo('');
			}
		}
	}
	}

rTime=0;
function rememberTime()
{
	var d = new Date();
	rTime = d.getTime();
}
function echoElapsedTime()
{
	var d = new Date();
	var eTime = (d.getTime()-rTime);
	echo ('time elapsed: '+eTime+' ms');
}

function echo(txt,isBold)
{
	if(isBold)
	{
		txt='-='+txt+'=-';
	}
	console.log(txt);
}


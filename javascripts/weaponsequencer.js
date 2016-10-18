$scope = this;
$rootScope = this;

function init() {	
	  $scope.artifacts = {
        1: [],
        2: [],
      };
	  
	  $scope.weapons = [];
      
	  for (var i in heroInfo) {
        $scope.weapons.push({
          name: heroInfo[i].name,
          current: 0,
          after: 0,
        });
      }

	  
	  for (var i in artifactInfo) {
        var a = artifactInfo[i];
        $scope.artifacts[a.world].push({
          name: a.name,
          id: a.id,
          owned: false,
          priority: 0,
        });
      }

      for (var w in $scope.artifacts) {
        // $scope.artifacts[w].sort(function(a, b) { return a.id - b.id; })
        $scope.artifacts[w].sort(function(a, b) { return a.name.localeCompare(b.name); })
      }
}

function calculateWeapons() {
	var weaponseed = getQueryParam("weaponSeed");
	if(weaponseed == "Not found") {
		weaponseed = 0;
	}
	
	$scope.weaponCurrentSeed = {1: weaponseed, 2: 0};
	$scope.weaponToCalculate = 20;
	$rootScope.world = 1;
	
	init();
		
      //if ($scope.weaponToCalculate > 1000) {
       // $scope.weaponToCalculate = 1000;
      //}
	  
      var currentSeed = $scope.weaponCurrentSeed[$rootScope.world];
      for (var i in $scope.weapons) {
        $scope.weapons[i].after = $scope.weapons[i].current;
      }

      $scope.weaponSteps =[];
      for (var i = 0; i < $scope.weaponToCalculate; i++) {
        if (currentSeed == 0) {
          //console.log("gg");
        }
        var random = new Random(currentSeed);
        var nextSeed = random.next(1, 2147483647);
        var weapon = random.next(1, 34);

        $scope.weaponSteps.push({
          index: i + 1,
          seed: currentSeed,
          weapon: heroToName[weapon],
          wi: weapon - 1,
          //currentWeapons: $.extend(true, [], $scope.weapons)//,
          //typeclass: cssclass
        });

        $scope.weapons[weapon - 1].after += 1;
        currentSeed = nextSeed;
      }

      $scope.weaponMinCurrent = Math.min.apply(null, $scope.weapons.map(function(x) { return x.current; }));
      $scope.weaponMinAfter = Math.min.apply(null, $scope.weapons.map(function(x) { return x.after; }));

	for (var i in $scope.weaponSteps) {
       console.log($scope.weaponSteps[i].weapon);
    }

    tableCreate();
	  //console.log($scope.weaponSteps);
      // $scope.recolorWeapons();

      // calculateColumns();
    };
	
calculateWeapons();
	
function getQueryParam(val) {
    var result = "Not found",
        tmp = [];
    location.search
    //.replace ( "?", "" ) 
    // this is better, there might be a question mark inside
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    });
    return result;
}

 function tableCreate() {
        //body reference
        var body = document.getElementById("weaponTable");

        // cells creation
        for (var j = 0; j <= $scope.weaponSteps.length-1; j++) {
            // table row creation
            var row = document.createElement("tr");

            // put <td> at end of the table row
            var cell = document.createElement("td");
            cell.style.padding = "4px 4px 4px 24px";
            var cellText = document.createTextNode( (j+1) + ". "+$scope.weaponSteps[j].weapon);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //row added to end of table body
            body.appendChild(row);
        }
    }
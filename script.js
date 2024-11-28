var numEl = document.querySelector('#number');
var unitEl = document.querySelector('#unit');
var days = 0;
var distOrbits = {dist:0,orbits:0};
var r = "orbit radius";
var theta = "position on orbit in radians";
var x = 0;
var y = 0;
var unitDays = {'seconds':1/86400,'minutes':1/1440,'hours':1/24,'days':1,'weeks':7,'months':365/12,'years':365};
var yearDays = {'mercury':88,'venus':225,'earth':365,'mars':687,'jupiter':4330,'saturn':10756,'uranus':30687,'neptune':60190};
var orbitRadii = {'mercury':36,'venus':69,'earth':102,'mars':135,'jupiter':168,'saturn':201,'uranus':234,'neptune':267}

function calcDays(number,unit){
  days = number * unitDays[unit];
  //console.log('days: '+days)
}
function calcPos(planet){
  var daysPerYear = yearDays[planet];
  //console.log('daysperyear: '+daysPerYear)
  var dist = (days % daysPerYear)/daysPerYear;
  var orbits = Math.floor(days/daysPerYear);
  totalOrbit = {dist:dist,orbits:orbits}
  //console.log(totalOrbit)
}
function calcCoor(r,theta){
  //console.log('r: '+r)
  //console.log('theta: '+theta)
  x = r * Math.cos(theta);
  y = r * Math.sin(theta);
  x = Math.round(x);
  y = Math.round(y);
  //console.log('x: '+x)
  //console.log('y: '+y)
}
function posPlanet(planet){
  var planetEl = document.querySelector('#'+planet);
  //console.log(numEl.value+' '+unitEl.value+': '+planetEl.id.toUpperCase())
  calcDays(numEl.value,unitEl.value);
  calcPos(planet);
  calcCoor(orbitRadii[planet],(totalOrbit.dist)*2*Math.PI + Math.PI/2);
  var pageX = (300 + x - 16)+'px';
  var pageY = (300 - y - 12)+'px';
  planetEl.style.left = pageX;
  planetEl.style.top = pageY;
  //console.log('page-x: '+pageX);
  //console.log('page-y: '+pageY);
  document.querySelector('#'+planet+'info').textContent = totalOrbit.orbits;
}
function posAll(){
  posPlanet('mercury');
  posPlanet('venus');
  posPlanet('earth');
  posPlanet('mars');
  posPlanet('jupiter');
  posPlanet('saturn');
  posPlanet('uranus');
  posPlanet('neptune');
}
posAll();
numEl.addEventListener("input", function(event) {
  posAll();
});
unitEl.addEventListener("input", function(event) {
  posAll();
});

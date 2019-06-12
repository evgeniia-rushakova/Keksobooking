'use strict';
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var screenWidth = document.documentElement.clientWidth;
var NUMBER_OF_LOCATIONS = 8;
var types = ['palace', 'flat', 'house', 'bungalo'];
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var WIDTH_OF_PIN = 50;
var HEIGHT_OF_PIN = 70;
var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};
var getAvatarAdresses = function (locations) {
  var listOfAdresses = [];
  for (var i = 1; i <= locations; i++) {
    var avatarAdress = 'img/avatars/user' + '0' + i + '.png';
    listOfAdresses.push(avatarAdress);
  }
  return listOfAdresses;
};
var adresses = getAvatarAdresses(NUMBER_OF_LOCATIONS);
var createObject = function (avatar, type, x, y) {
  var object = {};
  object.author = avatar;
  object.offer = type;
  object.location = {
    x: x,
    y: y
  };

  return object;
};
var getObjectsArray = function (numberOfLocations) {
  var objectsArray = [];
  for (var i = 0; i < numberOfLocations; i++) {
    var newObject = createObject(adresses[i], types[getRandomNumber(0, types.length - 1)], getRandomNumber(0, screenWidth), getRandomNumber(130, 630));
    objectsArray.push(newObject);
  }
  return objectsArray;
};
var objects = getObjectsArray(NUMBER_OF_LOCATIONS);
var addNewPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var newPin = templatePin.cloneNode(true);
    newPin.style.left = (array[i].location.x + WIDTH_OF_PIN / 2) + 'px';
    newPin.style.top = (array[i].location.y - HEIGHT_OF_PIN) + 'px';
    var pinImg = newPin.querySelector('img');
    pinImg.alt = array[i].offer;
    pinImg.src = array[i].author;
    fragment.appendChild(newPin);
  }
  return fragment;
};
var listOfNewPins = addNewPins(objects);
map.appendChild(listOfNewPins);

/*
 * Create a list that holds all of your cards
 */

const card_deck = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-anchor",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o",
    "fa-cube"
];

app.controller("GameCtrl", function($scope, $timeout, $window) {
    $scope.counter = 0;
    $scope.selectedTwoCardsId = [];
    $scope.pairOfCardsChosen = [];
    $scope.matchedCardsArray = [];
    $scope.activeGame = true;
  
    $scope.cardsArraySample = [
      { id: 1, type: "1", img: "fa fa-diamond", active: 0},
      { id: 2, type: "2", img: "fa fa-paper-plane-o", active: 0},
      { id: 3, type: "3", img: "fa fa-anchor", active: 0},
      { id: 4, type: "4", img: "fa fa-bolt", active: 0},
      { id: 5, type: "5", img: "fa fa-cube", active: 0},
      { id: 6, type: "6", img: "fa fa-bicycle", active: 0},
      { id: 7, type: "7", img: "fa fa-leaf", active: 0},
      { id: 8, type: "8", img: "fa fa-bomb", active: 0}
    ];
  
    $scope.cardsArrayUnshuffled = [
      { id: 1, type: "1", img: "fa fa-diamond", active: 0, matched: 0 },
      { id: 2, type: "1", img: "fa fa-diamond", active: 0, matched: 0 },
      { id: 3, type: "2", img: "fa fa-paper-plane-o", active: 0, matched: 0 },
      { id: 4, type: "2", img: "fa fa-paper-plane-o", active: 0, matched: 0 },
      { id: 5, type: "3", img: "fa fa-anchor", active: 0, matched: 0 },
      { id: 6, type: "3", img: "fa fa-anchor", active: 0, matched: 0 },
      { id: 7, type: "4", img: "fa fa-bolt", active: 0, matched: 0 },
      { id: 8, type: "4", img: "fa fa-bolt", active: 0, matched: 0 },
      { id: 9, type: "5", img: "fa fa-cube", active: 0, matched: 0 },
      { id: 10, type: "5", img: "fa fa-cube", active: 0, matched: 0 },
      { id: 11, type: "6", img: "fa fa-bicycle", active: 0, matched: 0 },
      { id: 12, type: "6", img: "fa fa-bicycle", active: 0, matched: 0 },
      { id: 13, type: "7", img: "fa fa-leaf", active: 0, matched: 0 },
      { id: 14, type: "7", img: "fa fa-leaf", active: 0, matched: 0 },
      { id: 15, type: "8", img: "fa fa-bomb", active: 0, matched: 0 },
      { id: 16, type: "8", img: "fa fa-bomb", active: 0, matched: 0 },
    ];
  
    $scope.resetGame = function(){
        $window.location.reload();
    }
  
    $scope.startGame = function(){
      angular.forEach($scope.cardsArraySample, function(card, key) {
          card.active = 1;
    });
    $timeout(function(){
      angular.forEach($scope.cardsArraySample, function(card, key) {
          card.active = 0;
      });
    },3000);
    };
  
  
    $scope.randomizeArray = function() {
      $scope.cardsArray = $scope.cardsArrayUnshuffled.sort(function(a, b) {
        return 0.5 - Math.random();
      });
    };
  
    $scope.randomizeArray();
  
    $scope.matchedCards = "";
    $scope.checkForEndGame = function() {
      if ($scope.matchedCardsArray.length === $scope.cardsArray.length) {
        $scope.activeGame = false;
        console.log($scope.activeGame);
        console.log("game initialized");
      } else {
        $scope.activeGame = true;
      }
    };
  
    $scope.placeSelectedCardsInArray = function(cardData) {
      angular.forEach($scope.cardsArray, function(card, key) {
        if (card.id == cardData.id) {
          $scope.selectedTwoCardsId.push(card.id);
          card.active = 1;
          
        }
      });
    };
    $scope.selectedCardsValidation = function() {
      if ($scope.pairOfCardsChosen.length == 2) {
        $timeout(function() {
          $scope.c1 = $scope.pairOfCardsChosen[0].id;
          $scope.c2 = $scope.pairOfCardsChosen[1].id;
          if (
            $scope.pairOfCardsChosen[0].type == $scope.pairOfCardsChosen[1].type
          ) {
            $scope.matchedCardsArray.push({ id: $scope.pairOfCardsChosen[0].id });
            $scope.matchedCardsArray.push({ id: $scope.pairOfCardsChosen[1].id });
  
            $scope.checkForEndGame();
            angular.forEach($scope.cardsArray, function(v, k) {
              if (v.id == $scope.c1 || v.id == $scope.c2) {
                v.matched = 1;
                $scope.counter = 0;
                $scope.matchedCards++;
                
              angular.forEach($scope.cardsArraySample, function(sampleCard,key){
                  if(v.type == sampleCard.type){
                      sampleCard.active = 1;
                  }
              });
              }
            });
          } else {
            angular.forEach($scope.cardsArray, function(v, k) {
              if (v.id == $scope.c1 || v.id == $scope.c2) {
                v.active = 0;
              }
            });
          }
          $scope.counter = 0;
          $scope.pairOfCardsChosen.length = 0;
          $scope.selectedTwoCardsId.length = 0;
        }, 600);
      }
    };
  
    $scope.selectCardAction = function(cardData) {
      $scope.counter++;
  
      if ($scope.counter < 3) {
        $scope.placeSelectedCardsInArray(cardData);
  
        if ($scope.counter == 2) {
          angular.forEach($scope.selectedTwoCardsId, function(v, k) {
            angular.forEach($scope.cardsArray, function(card, key) {
              if (card.id == v && card.matched != 1) {
                $scope.pairOfCardsChosen.push(card);
              }
            });
          });
  
          $scope.selectedCardsValidation();
        }
      }
    };
  });
  
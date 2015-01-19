 /* 
  *   Copyright (C) 2014 Tyler Raborn
  * 
  */
  
angular.module( 'RabornLandscapeDesign', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])

    .config(function($routeProvider) {
      $routeProvider
      .when('/', {templateUrl: 'page-home.html', controller: 'HomeController'})
      .when('/about', {templateUrl: 'page-about.html', controller: 'AboutController'})
      .when('/beforeAfter', {templateUrl: 'page-beforeAfter.html', controller: 'BeforeAfterController'})
      .when('/designProcess', {templateUrl: 'page-designProcess.html', controller: 'DesignProcessController'})
      .when('/givingBack', {templateUrl: 'page-givingBack.html', controller: 'GivingBackController'})
      .when('/contactUs', {templateUrl: 'page-contactUs.html', controller: 'ContactUsController'})
      //.when('/testimonials', {templateUrl: 'page-testimonials', controller: 'TestimonialsController'})
      .otherwise({redirectTo: '/'})
      ;
    })

    .controller('TestimonialsController', ['$scope', '$window', function TestimonialsController($scope, $window) {
      //$scope.pageClass='page-testimonials';

      //testimonial as testimonial.content for testimonial in testimonials
      $scope.testimonials = [
                              {testimonial: {name: 'Nelson Henderson', content: 'The true meaning of life is to plant trees, under whose shade you do not expect to sit'}, id: 0},
                              {testimonial: {name: 'anonymous', content: 'The best time to plant a tree was twenty years ago. The second best time is now.'}, id: 1},
                              {testimonial: {name: 'Thomas Fuller', content: 'He that plants trees loves others besides himself'}, id: 2},
                              {testimonial: {name: 'Frank Lloyd Wright', content: 'The best friend on earth of man is the tree: when we use the tree respectfully and economically we have one of the greatest resources of the earth'}, id: 3},
                              {testimonial: {name: 'Minnie Aumonier', content: 'There is always Music amongst the trees in the Garden, but our hearts must be very quiet to hear it'}, id: 4},
                              {testimonial: {name: 'Chief Edward Moody, Qwatsinas, Nuxalk Nation', content: "We must protect the forests for our children, grandchildren and children yet to be born. We must protect the forests for those who can't speak for themselves such as the birds, animals, fish and trees"}, id: 5},
                              {testimonial: {name: 'John Muir', content: 'In every walk with Nature one receives far more than he seeks'}, id: 6},
                              {testimonial: {name: 'Ralph Waldo Emerson', content: 'The creation of a thousand forests is in one acorn'}, id: 7},
                              {testimonial: {name: 'J. Sterling Morton', content: 'Other holidays repose on the past. Arbor Day proposes the future. '}, id: 8}
                            ];
    
      $scope.getRandomTestimonial = function() {
        return $scope.testimonials[Math.floor((Math.random() * $scope.testimonials.length) + 1)-1];
      };
      $scope.curTestimonial = $scope.getRandomTestimonial();
    }])

    .directive('testimonialDirective', ['$interval', function testimonialDirective($interval) {
      function link(scope, element, attrs) {
        var curTestimonial;
        var timeoutId;

        function updateTestimonial() {
          curTestimonial = scope.getRandomTestimonial();
          element.html("<p>\"" + curTestimonial.testimonial.content + "\"</p> " + "<div class=\"quotee\"> - "+curTestimonial.testimonial.name+"</div>");
          
        }

        scope.$watch(attrs.testimonialDirective, function(value) {
          curTestimonial=value;
          updateTestimonial();
        });

        element.on('$destroy', function() {
          $interval.cancel(timeoutId);
        });

        timeoutId = $interval(function() {
          updateTestimonial();
        }, 6000);
      }

      return {
        link: link
      };
    }])

    /* a controller with global scope over all pages */
    .controller('RLDMainController', ['$scope', function RLDMainController($scope) {
      $scope.notifications = [];

      $scope.testNotificationSystem = function() {
        $scope.notifications.push({msg: 'This is a test!', type: 'success'});
      };

      $scope.closeNotification = function(index) {
          $scope.notifications.splice(index, 1);
      };        

      $scope.getCopyrightDate = function() {
        var date = new Date();
        return date.getFullYear();
      };
    }])    

    .controller('ContactUsController', ['$scope', '$log', '$http', '$controller', function ContactUsController($scope, $log, $http, $controller) {
      
      $controller('RLDMainController', {$scope: $scope});

      $scope.pageClass='page-contactUs';
      $scope.email = {};
      $scope.empty = {};

      $scope.submit = function() {
        //$log.info("submitting form!");
        $http.post('ContactUs.php', {action: 'contactUs', address: $scope.email.address, subject: $scope.email.subject, body: $scope.email.body}, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function(response) {
          //response=true;
          if (response) {
            $log.info("pushing notification!");
            if (response.data === true) {
              $scope.notifications.push({msg: 'success!', type: 'success'});
            }
          }

        });
        $scope.email = angular.copy($scope.empty);
      };

      $scope.reset = function() {
        //$log.info("resetting email form!");
        $scope.email = angular.copy($scope.empty);
      };
    }])

    .controller('GivingBackController', ['$log', '$scope', '$location', '$anchorScroll', function GivingBackController($log, $scope, $location, $anchorScroll) {
      
      $scope.pageClass='page-givingBack';
      $scope.windowStates = [];
      $scope.windows = [
       {visible: true, title: "Tree Pittsburgh", altTitle: "Tree Pittsburgh", content: "Trees are what I feel most passionate about. They  inspire and benefit us in countless ways. Therefore, I pledge to donate 5% of my profits to Tree Pittsburgh, as they teach and support Pittsburgh residents to plant, maintain and protect our city trees. I  was trained as a Tree Tender in 2011 and  volunteer pruning city street trees.", images: [{title: 'Tree Pittsburgh', src: 'img/tree-pittsburgh-sm.jpg', hover: false, isLink: true, url: 'http://treepittsburgh.org'}], bulletPoints: []},
       {visible: true, title: "Forbes Elementary School in Penn Hills", altTitle: "Forbes Elementary", content: "I designed and organized the installation of a butterfly garden and a nature trail.", images: [], bulletPoints: []},
       {visible: true, title: "Winchester Thurston School, North Campus", altTitle: "Winchester Thurston", content: "I designed and organized the installation of the butterfly garden.", images: [], bulletPoints: []},
       {visible: true, title: "Penn Forest Natural Burial Park", altTitle: "Penn Forest", content: "I designed a forest showing the location and species of memorial trees to be planted. I give an environmentally themed talk at the open house/picnic each year.", images: [], bulletPoints: []},
       {visible: true, title: "Pittsburgh Botanical Garden", altTitle: "Pittsburgh Botanical Garden", content: "I work at the annual plant sale raising money to help transform 460 acres of abandoned mining land into a world class botanic garden. Member since 1998.", images: [], bulletPoints: []},        
       {visible: true, title: "Arbor Day Foundation", altTitle: "Arbor Day Foundation", content: "Member since 1990", images: [], bulletPoints: []},        
       {visible: true, title: "Western Pennsylvania Conservancy", altTitle: "Western Pennsylvania Conservancy", content: "Member since 1994", images: [], bulletPoints: []},        
       {visible: true, title: "Phipps Conservancy and Botanical Gardens", altTitle: "Phipps Conservancy", content: "Member since 2001", images: [], bulletPoints: []},        
       {visible: true, title: "Penn Hills Community Development Corporation", altTitle: "PHCDC", content: "Member since 2001", images: [], bulletPoints: []}
      ];

      for (var i = 0; i < $scope.windows.length; i++) {
        $scope.windowStates.push(true);
      }
 
      $scope.alterWindow = function(windowId) {
        if ($scope.windowStates[windowId]) {
          $scope.windowStates[windowId] = false;
        }
        else {
          $scope.windowStates[windowId] = true;
        }
      }; 

      $scope.goToWindow = function(windowId) {
        //$log.info("goToWindow: windowId is " + windowId);
        $location.hash(windowId);
        $anchorScroll();
      };      

      $scope.onImageHover = function(outerIndex, innerIndex) {
        //$scope.organizations[outerIndex].images[innerIndex].hover = ($scope.organizations[outerIndex].images[innerIndex].hover) ? false : true;
      };

      $scope.goToTop = function() {
        $location.hash('top');
        $anchorScroll;
      };
    }])

    .controller('DesignProcessController', ['$scope', '$location', '$anchorScroll', '$log', function DesignProcessController($scope, $location, $anchorScroll, $log) {
      $scope.pageClass='page-designProcess';
      $scope.processes = [{
        title: "step 1"
      }, {
        title: "step 2"
      }, {
        title: "step 3"
      }];

      $scope.windowStates = [];
      $scope.windows = [
        {visible: true, title: 'Why Hire a Designer?', content: "", images: [], bulletPoints: ["To increase your home's resale value. According to home expert Bob Vila, a well designed landscape can add 20% to the value of your property.", "To add to your home's living space without \"adding on\"", "To increase your property's functionality for whatever you want to do outside: entertain large groups, enjoy a private, intimate seating area, barbecue and dine conveniently close to the kitchen or to have a vegetable garden.", "To have the flexibility to implement the design one area at a time or all at once, as money and time permits. You can do some of the work yourself, now that you know where and what to plant."]}, 
        {visible: true, title: 'Horticulture + Art + Psychology = Good Design', content: "", images: [], bulletPoints: ["-Horticulture - Each site has unique environmental qualities. These micro-climates are determined by the direction of the sun, the direction of the prevailing winds, moisture and drainage issues and the quality of the soil. Plant species are chosen based on this information. Right plant for the right space.", "-Art - A well designed landscape does not arise from some abstract vision. It is the result of the application of solid design principles. While it certainly includes elements of creativity, it primarily uses proven techniques and applies them, sometimes in unexpected ways.", "-Psychology - The ability to determine what the customer really wants is crucial. This process involves listening carefully to you, sharing ideas back and forth and combining our visions. The end result should reduce stress and create a feeling of well being. Landscape affects people and arouses feelings."]},
        {visible: true, title: 'Step-by-Step', content: "", images: [], bulletPoints: [
            "1. A questionnaire will be sent to you for information and to encourage your thoughts and ideas.", 
            "2. During our first meeting, we will walk around your property discussing your thoughts and ideas.", 
            "3. Measurements will be taken of your existing property including trees, shrubs, driveway, patio, deck, fences, windows, electrical and cable wires, gas lines, etc.", 
            "4. A site assessment of existing environmental conditions will be completed, including a soil analysis that will be sent to Penn State Agricultural Analytical Services Laboratory.",
            "5. All accumulated information will be used to draw a base map to scale.",
            "6. Two preliminary plans will be developed and reviewed with you. These drawings show: \n-proposed hardscape \n-proposed general types of plantings \n-existing hardscape and plants that are to remain",
            "7. One of the preliminary plans will then be refined OR elements from both plans will be combined to create a new design. Plants are chosen based on your preferences, aesthetics and environmental conditions.",
            "8. We will meet a second time to review the refined drawing and to make any desired changes.",
            "9. Two copies of the construction plan will be presented, one for you and one for a landscape contractor, if you decide to hire one. This black ink drawing will show all proposed hardscape and plantings. A list of the plants, their descriptions and maintenance tips will be reviewed. Detailed construction drawings and installation specifications are not included.",
            "10. The color master plan will be presented and reviewed with you.",
            "11. Installation. I work with many landscape contractors and I can recommend someone who is right for your specific job."
        ]}
      ];

      for (var i = 0; i < $scope.windows.length; i++) {
        $scope.windowStates.push(true);
      }
 
      $scope.alterWindow = function(windowId) {
        if ($scope.windowStates[windowId]) {
          $scope.windowStates[windowId] = false;
        }
        else {
          $scope.windowStates[windowId] = true;
        }
      }; 

      $scope.goToWindow = function(windowId) {
        //$log.info("goToWindow: windowId is " + windowId);
        $location.hash(windowId);
        $anchorScroll();
      };      

      $scope.onImageHover = function(outerIndex, innerIndex) {
        //$scope.organizations[outerIndex].images[innerIndex].hover = ($scope.organizations[outerIndex].images[innerIndex].hover) ? false : true;
      };

      $scope.goToTop = function() {
        $location.hash('top');
        $anchorScroll;
      };
    }])

    .controller('BeforeAfterController', ['$scope', '$sce', '$log', '$location', '$anchorScroll', function BeforeAfterController($scope, $sce, $log, $location, $anchorScroll) {
      $scope.pageClass='page-beforeAfter';
      $scope.reveal = [false, false, false, false];
      $scope.curIndex=-1;

      $scope.windowStates = [];
      $scope.windows = [{
          title: 'Residence in O\'Hara',
          images: [{
            src: 'img/F/before1.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/F/before2.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/F/before3.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/F/before4.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/F/before5.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/F/before6.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/F/after1.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/F/after2.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/F/after3.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/F/after4.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/F/after5.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/F/after6.JPG', 
            before: false, 
            description: 'this is an image'
          }],
          imageGroupings: []
        }, {
          title: 'Residence in Point Breeze',
          images: [{
            src: 'img/A/before1.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/A/after1.JPG', 
            before: false, 
            description: 'this is an image'
          }],
          imageGroupings: []
        }, {
          title: 'Residence in Highland Park',
          images: [{
            src: 'img/B/before1.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/B/after1.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/B/after2.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/B/after3.JPG', 
            before: false, 
            description: 'this is an image'
          }],
          imageGroupings: []          
        }, {
          title: 'Residence in Fox Chapel',
          images: [{
            src: 'img/C/before1.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/C/after1.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/C/after2.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/B/after3.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/C/after4.JPG', 
            before: false, 
            description: 'this is an image'
          }],
          imageGroupings: []
        }, {
          title: 'Second Residence in Highland Park',
          images: [{
            src: 'img/D/before1.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/D/before2.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/D/before3.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/D/before4.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/D/after1.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/D/after2.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/D/after3.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/D/after4.JPG', 
            before: false, 
            description: 'this is an image'
          }],
          imageGroupings: []
        }, {
          title: 'Raborn Residence',
          images: [{
            src: 'img/G/before1.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/G/after1.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/G/after2.JPG', 
            before: false, 
            description: 'this is an image'
          }, {
            src: 'img/G/after3.JPG', 
            before: false, 
            description: 'this is an image'
          }],
          imageGroupings: []
        }, {
          title: 'Third residence in Highland Park',
          images: [{
            src: 'img/E/before1.JPG', 
            before: true, 
            description: 'this is an image'
          }, {
            src: 'img/E/after1.JPG', 
            before: false, 
            description: 'this is an image'
          }],
          imageGroupings: []
      }];

      for (var i = 0; i < $scope.windows.length; i++) {
        $scope.windowStates.push(true);
      }

      angular.forEach($scope.windows, function(curWindow) {
        if (curWindow.images.length > 3) {
          //$log.info(curWindow.title + " has more than 3 images!");
          var counter = 0;
          var imageGrouping = [];
          for (var i = 0; i < curWindow.images.length; i++) {
            curWindow.images[i].description = (curWindow.images[i].before) ? 'Before' : 'After';
            if ((counter >= 3) && ((counter % 3) == 0)) {
              curWindow.imageGroupings.push(imageGrouping);
              counter = 0;
              imageGrouping = [];
            } 
            //load groupings of three into imageGrouping array
            //$log.info("Loading image " + curWindow.images[i].src);
            imageGrouping.push(curWindow.images[i]);
            counter++;
          }
          //catch leftover images
          if (imageGrouping.length != 0) {
            curWindow.imageGroupings.push(imageGrouping);
            imageGrouping = [];
          }
        }
      });
 
      $scope.alterWindow = function(windowId) {
        if ($scope.windowStates[windowId]) {
          $scope.windowStates[windowId] = false;
        }
        else {
          $scope.windowStates[windowId] = true;
        }
      }; 

      $scope.goToWindow = function(windowId) {
        //$log.info("goToWindow: windowId is " + windowId);
        $location.hash(windowId);
        $anchorScroll();
      };      

      $scope.onImageHover = function(outerIndex, innerIndex) {
        //$scope.organizations[outerIndex].images[innerIndex].hover = ($scope.organizations[outerIndex].images[innerIndex].hover) ? false : true;
      };

      $scope.goToTop = function() {
        $location.hash('top');
        $anchorScroll;
      };

    }])

    .controller('AboutController', ['$anchorScroll', '$location', '$log', '$scope', function AboutController($anchorScroll, $location, $log, $scope) {
      
      $scope.pageClass='page-about';
      $scope.windowStates = [];
      $scope.windows = [
        {visible: true, title: 'Description', content: "Raborn Landscape Design LLC is a one woman landscape design business managed by myself, Kathy Raborn. I have been designing landscapes since 1997. Although my design work is primarily residential, I  also design commercial landscapes. My associate degree is in horticulture and landscape design and I continually further this education through attending lectures and workshops. My bachelor's degree is in psychology and I have 10 years of counseling experience. This has helped me develop the all-important listening skills. The ability to listen to a customer and to understand what they really want, is crucial in design.", images: [], bulletPoints: []}, 
        {visible: true, title: 'Mission', content: "My goal for every residential project is to design an outdoor sanctuary that enhances your quality of life. Your outdoor home environment should be aesthetically pleasing, functional, easy to maintain, and representative of your personal style. I consider every job a privilege and a responsibility.", images: [], bulletPoints: []}, 
        {visible: true, title: 'Specializing In:', content: "", images: [], bulletPoints: [
            "designing hardscapes such as terraces and pathways to bring you INTO the garden, not just past the garden", 
            "lower maintenance gardens", 
            "deer resistant gardens", 
            "sustainable designs with native plants and those that support wildlife, such as butterflies", 
            "storm water management systems, such as a rain gardens"
        ]},
        {visible: true, title: 'Why Choose RLD?', content: "", images: [], bulletPoints: ["There is no charge for my initial visit, since you are just getting to know me.", "All drawings are done by hand, not on the computer, creating a less generic, one-of-a-kind piece of art.", "Designs are a collaborative effort, compared to firms where you sit back and wait for a completed design. ", "At least two preliminary designs are developed, allowing you to choose your favorite design or to choose individual elements from each design."]}
      ];

      for (var i = 0; i < $scope.windows.length; i++) {
        $scope.windowStates.push(true);
      }

      $scope.alterWindow = function(windowId) {
        if ($scope.windowStates[windowId]) {
          $scope.windowStates[windowId] = false;
        }
        else {
          $scope.windowStates[windowId] = true;
        }
      };

      /* for navigating to a specific information window...close all windows except for the passed-in window */
      $scope.goToWindow = function(windowId) {
        //$log.info("goToWindow: windowId is " + windowId);
        $location.hash(windowId);
        $anchorScroll();
      };

      $scope.goToTop = function() {
        $location.hash('top');
        $anchorScroll;
      };      
    }])

    .controller('HomeController', ['$scope', function HomeController($scope) {
      $scope.pageClass='page-home';

    }])

  /* workaround for bug wherein AngularAnimate messes with the Bootstrap Carousel */
  .directive('disableAnimation', function($animate){
      return {
          restrict: 'A',
          link: function($scope, $element, $attrs){
              $attrs.$observe('disableAnimation', function(value){
                  $animate.enabled(!value, $element);
              });
          }
      }
  })    
;

  //controller for launching modal window
var ModalController = function ($scope, $modal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'ContactUsModalContent.html',
      controller: ModalInstanceController,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openCarousel = function (size, images, residenceName) {

    angular.forEach(images, function(image) {
      image.image = image.src;
      image.text = 'test!';
    });

    $scope.images = angular.copy(images);
    $scope.residenceName = residenceName;
    $scope.carouselInterval = 5000;

    var modalInstance = $modal.open({
      templateUrl: 'CarouselModalContent.html',
      controller: CarouselModalInstanceController,
      size: size,
      resolve: {
        images: function () {
          return $scope.images;
        },
        residenceName: function() {
          return $scope.residenceName;
        },
        carouselInterval: function() {
          return $scope.carouselInterval;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };  

  $scope.viewImage = function (size, imageSource, imageText) {

    $scope.imageSource = imageSource;
    $scope.imageText = imageText;

    var modalInstance = $modal.open({
      templateUrl: 'ImageModalContent.html',
      controller: ImageModalInstanceController,
      size: size,
      resolve: {
        imageSource: function () {
          return $scope.imageSource;
        },
        imageText: function() {
          return $scope.imageText;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });    
  };
};

var ModalInstanceController = function ($scope, $modalInstance, items, $rootScope) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $rootScope.$emit('modalResult', true);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

//controller for modal window instance
var CarouselModalInstanceController = function ($scope, $modalInstance, images, residenceName, carouselInterval, $rootScope) {

  console.log("Hello from CarouselModalInstanceController!");

  $scope.images = images;
  $scope.residenceName = residenceName;
  $scope.carouselInterval = carouselInterval;
  /*
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  */

  $scope.ok = function () {
    $rootScope.$emit('modalResult', true);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

//controller for modal window instance
var ImageModalInstanceController = function ($scope, $modalInstance, imageSource, imageText, $rootScope) {

  console.log("Hello from ImageModalInstanceController!");

  $scope.imageSource = imageSource;
  $scope.imageText = imageText;

  /*
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  */

  $scope.ok = function () {
    $rootScope.$emit('modalResult', true);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};


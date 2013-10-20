var App = {
	viewModel: {
		currentRoom: ko.observable({
			id: ko.observable(1),
			room: ko.observable(''),
			label:ko.observable(''),
			controls: ko.observable([])
		}),
		rooms: ko.observableArray([])
	},
	init: function(){
		$.mobile.defaultPageTransition = 'none';
		
		Home.init();
		Flip.init();
		Room.init();
		
		App.viewModel.onFlipChange = function($data){
			var id = $data.id();
			var status = $data.status();
			
			console.log(id, status);
		};
		
		App.viewModel.changePage = function($data){
			App.viewModel.currentRoom($data);
			
			if($data.room() == 'home'){	
				$.mobile.changePage('#page-home');
			}else{
				$.mobile.changePage('#page-room');
			}
		};
		
		App.viewModel.allLights = ko.computed({
			read: function(){
				var status = 'off';
				ko.utils.arrayForEach(App.viewModel.rooms(), function(room) {
					ko.utils.arrayForEach(room.controls(), function(control){
						if(control.type() == 'light'){
							if(control.status() == 'on'){
								status = 'on';
							}
						}
					});
				});
				
				return status;
			},
			write: function(value){
				ko.utils.arrayForEach(App.viewModel.rooms(), function(room) {
					ko.utils.arrayForEach(room.controls(), function(control){
						if(control.type() == 'light'){
							control.status(value);
						}
					});
				});
			}
		});
		
		App.viewModel.allCurtains = ko.computed({
			read: function(){
				var status = 'off';
				ko.utils.arrayForEach(App.viewModel.rooms(), function(room) {
					ko.utils.arrayForEach(room.controls(), function(control){
						if(control.type() == 'curtain'){
							if(control.status() == 'on'){
								status = 'on';
							}
						}
					});
				});
				
				return status;
			},
			write: function(value){
				ko.utils.arrayForEach(App.viewModel.rooms(), function(room) {
					ko.utils.arrayForEach(room.controls(), function(control){
						if(control.type() == 'curtain'){
							control.status(value);
						}
					});
				});
			}
		});
		
		/* read test data*/
		ko.mapping.fromJS(testRooms, {}, App.viewModel.rooms);
		ko.applyBindings(App.viewModel);
	}
}

var Home = {
	init: function(){
		var dockWidth = $('.dock').width();
		var ancherWidth = 0;
		$('.dock a').each(function(){
			ancherWidth += $(this).outerWidth(true);
		});
		$('.dock .logo').width(dockWidth - ancherWidth);
	}
}

var Flip = {
	init: function(){
		ko.bindingHandlers.flipHandler = {
			update: function(element, valueAccessor){
				$("#page-home").trigger("create");
			}
		};
	}
}

var Room = {
	init: function(){
		ko.bindingHandlers.roomHandler = {
			update: function(element, valueAccessor){
				$("#page-room").trigger("create");
			}
		};
	}
}

/********* Test ***********/
var testRooms = [
	{
		id: 1,
		label: '',
		room: 'home',
		controls: []
	},
	{
		id: 2,
		label: '',
		room: 'livingroom',
		controls: [
			{
				id:1,
				type: 'light',
				status: 'off'
			},
			{
				id:2,
				type: 'curtain',
				status: 'off'
			}
		]
	},
	{
		id: 3,
		label: '',
		room: 'corridor',
		controls: [
			{
				id:3,
				type: 'light',
				status: 'on'
			}
		]
	},
	{
		id: 4,
		label: '',
		room: 'kitchen',
		controls: [
			{
				id:4,
				type: 'light',
				status: 'off'
			}
		]
	},
	{
		id: 5,
		label: '',
		room: 'study',
		controls: [
			{
				id:5,
				type: 'light',
				status: 'off'
			}
		]
	},
	{
		id: 6,
		label: 'F',
		room: 'bedroom',
		controls: [
			{
				id:6,
				type: 'light',
				status: 'off'
			},
			{
				id:9,
				type: 'lamp',
				status: 'off'
			},
			{
				id:7,
				type: 'curtain',
				status: 'on'
			}
		]
	},
	{
		id: 8,
		label: 'S',
		room: 'bedroom',
		controls: [
			{
				id:10,
				type: 'light',
				status: 'off'
			},
			{
				id:11,
				type: 'lamp',
				status: 'on'
			},
			{
				id:12,
				type: 'curtain',
				status: 'on'
			}
		]
	},
	{
		id: 7,
		label: 'F',
		room: 'bathroom',
		controls: [
			{
				id:8,
				type: 'light',
				status: 'off'
			}
		]
	},
];
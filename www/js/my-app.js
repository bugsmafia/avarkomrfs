// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: false,
    precompileTemplates: true,
	swipeBackPage: false,
	swipeBackPageThreshold: 1,
	pushState: false,
    template7Pages: true,
	notificationHold: 2000,
	modalButtonOk: 'Ok',
    modalButtonCancel: 'Отмена'
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: false,
	crossDomain: true
});

document.addEventListener("deviceready", startDevice, false);

function startDevice() {
		var storage = window.localStorage;
		if ((storage.getItem('login') === '') || (storage.getItem('pass') === '') || (storage.getItem('login') === null) || (storage.getItem('pass') === null))
		{
			 myApp.popup('.popup-login');
		}
/* 	 	var callbackFn = function(location) {
		   
		   
			avarkom_id = window.localStorage.getItem('avarkom_id')
			phoneUser = window.localStorage.getItem('phone')
			loginUser = window.localStorage.getItem("login")
			passUser = window.localStorage.getItem("pass")
				coordinaty = location.latitude + ',' + location.longitude;
				$$.ajax({
					method     : "POST",
					url        : "http://otoexpert.ru/api/where_you.php",
					crossDomain: true,
					xhrFields  : {withCredentials: true},
					data       : {phone : phoneUser,  avarkom_id : avarkom_id, coordinaty : coordinaty, login : loginUser, pass : passUser },
					dataType   : 'json'

				});
			myApp.alert('BackgroundGeolocation sending');
			backgroundGeolocation.finish();
		};
	 
		var failureFn = function(error) {
			myApp.alert('BackgroundGeolocation error');
		};
	 
		// BackgroundGeolocation is highly configurable. See platform specific configuration options 
		backgroundGeolocation.configure(callbackFn, failureFn, {
			desiredAccuracy: 10,
			stationaryRadius: 20,
			distanceFilter: 30,
			interval: 30000
		});
	 
		// Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app. 
		backgroundGeolocation.start();
		myApp.alert('BackgroundGeolocation start'); 
		
		
		 */
		

		
		
		storage.setItem("deviceModel",  device.model);
		storage.setItem("deviceVersion",  device.version);
		storage.setItem("deviceUUID",  device.uuid);
		storage.setItem("devicePlatform",  device.platform);
		storage.setItem("deviceManufacturer",  device.manufacturer);
		
}




function dtpNotifications() {


 // console.warn("testNotifications Started");

  // Checks for permission
  cordova.plugins.notification.local.hasPermission(function (granted) {

    //console.warn("Testing permission");

    if( granted == false ) {

     // console.warn("No permission");
      // If app doesnt have permission request it
      cordova.plugins.notification.local.registerPermission(function (granted) {

        //console.warn("Ask for permission");
        if( granted == true ) {

          console.warn("Permission accepted");
          // If app is given permission try again
          dtpNotifications();

        } else {
          myApp.alert("We need permission to show you notifications");
        }

      });
    } else {
	cordova.plugins.notification.local.cancel(1, function () {
		// Notification was cancelled
	}, scope);
      var pathArray = window.location.pathname.split( "/www/" ),
          secondLevelLocation = window.location.protocol +"//"+ pathArray[0],
          now = new Date();


     // console.warn("sending notification");

     /*  var isAndroid = false;

      if ( device.platform === "Android" ) {
        isAndroid = true;
      } */

		//var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
		var date = new Date().getTime();

		cordova.plugins.notification.local.schedule({
			id: 1,
			title: "Message Title",
			message: "Message Text",
			at: date,
			sound: "http://otoexpert.ru/api/alert.mp3",
			icon: "http://otoexpert.ru/api/icon.png"
		});

    }

  });


};




 function whereYou() {
		avarkom_id = window.localStorage.getItem('avarkom_id')
		phoneUser = window.localStorage.getItem('phone')
		loginUser = window.localStorage.getItem("login")
		passUser = window.localStorage.getItem("pass")
		var onSuccess = function(position) {
			coordinaty = position.coords.latitude + ',' + position.coords.longitude;
			$$.ajax({
					method     : "POST",
					url        : "http://otoexpert.ru/api/where_you.php",
					crossDomain: true,
					xhrFields  : {withCredentials: true},
					data       : {phone : phoneUser,  avarkom_id : avarkom_id, coordinaty : coordinaty, login : loginUser, pass : passUser },
					dataType   : 'json'

				});
		};

		function onError(error) {
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
} 


function parseNum(str){ return parseFloat(String(str).match(/-?\d+(?:\.\d+)?/g, '') || 0, 10); }

function get_fb() {
	var loginUser = window.localStorage.getItem("login");
	var passUser = window.localStorage.getItem("pass");
	var avarkom_id = window.localStorage.getItem('avarkom_id');
	var phoneUser = window.localStorage.getItem('phone');
	$$.ajax({
		type: "POST",
		crossDomain: true,
		xhrFields  : {withCredentials: true},
		data       : {phone : phoneUser,  avarkom_id : avarkom_id, login : loginUser, pass : passUser },
		dataType   : 'json',
		url: "http://otoexpert.ru/api/kol.php",
		success : function(feedback){
			if (feedback['kol_messages'] >= 1) {
				$('#kolMessages').html("Новых: " + feedback['kol_messages']);
			}
			else {
				$('#kolMessages').html("");
			}
			if (feedback['kol_dtps'] >= 1) {
				$('#kolAva').html("Новых: " + feedback['kol_dtps']);
			}
			else {
				$('#kolAva').html("");
			}
			if ((feedback['kol_messages'] >= 1) || (feedback['kol_dtps'] >= 1)) {
				// Вызвать уведомление
				myApp.alert("1");
				/* cordova.plugins.notification.local.schedule({
					id: 1,
					title: "Новые сообщения и вызовы",
					text: "Проверьте новые сообщения и вызовы",
					sound: "http://otoexpert.ru/api/alert.mp3",
					icon: "http://otoexpert.ru/api/icon.png"
				}); */
				dtpNotifications();
				myApp.alert("2");
			}
		}
	});
		
}

var formatTime = function(unixTimestamp) {
    var dt = new Date(unixTimestamp * 1000);

    var day = dt.getDate();
    var month = dt.getMonth();
    var year = dt.getFullYear();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();

    // the above dt.get...() functions return a single digit
    // so I prepend the zero here when needed
    if (hours < 10) 
     hours = '0' + hours;

    if (minutes < 10) 
     minutes = '0' + minutes;

    if (seconds < 10) 
     seconds = '0' + seconds;
 
	 if (day < 10) 
     day = '0' + day;
	
	if (month < 10) 
	month = parseInt(month) + 1;
    month = '0' + month;

    return day + '.' + month + '.' + year + ' ' + hours + ":" + minutes + ":" + seconds;
} 



// Получаем данные из LocalStorage
function getRegionsData(){
	if (window.localStorage.getItem('regions') != '')
	{
		return JSON.parse(window.localStorage.getItem('regions'));
	}
    
}
// Записываем данные в LocalStorage
function setRegionsData(o){
    window.localStorage.setItem('regions', JSON.stringify(o));
    return false;
}

jQuery(document).ready(function() {
"use strict";
    var storage = window.localStorage;
	if ((storage.getItem('login') == '') || (storage.getItem('pass') == '') || (storage.getItem('login') == null) || (storage.getItem('pass') == null))
	{
		 myApp.popup('.popup-login');
	}

		if ((storage.getItem('login') !== '') || (storage.getItem('pass') !== '') || (storage.getItem('login') !== null) || (storage.getItem('pass') !== null)) {
		
			setInterval(get_fb, 15000);				
			setInterval(whereYou, 30000);				
		}
	
	

	$(".logo").animate({'top': '20px'},'slow',"easeInOutCirc");
	$(".cartitems").delay(1000).animate({'width': '30px', 'height': '30px', 'top':'10px', 'right':'10px', 'opacity':1},1000,"easeOutBounce");

		
    $('.item_delete').click(function(e){
        e.preventDefault();
        var currentVal = $(this).attr('id');
        $('div#'+currentVal).fadeOut('slow');
    });
	
    $('.qntyplus').click(function(e){
								  
        e.preventDefault();
        var fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal)) {
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            $('input[name='+fieldName+']').val(0);
        }
		
    });
    $(".qntyminus").click(function(e) {
        e.preventDefault();
        var fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal) && currentVal > 0) {
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            $('input[name='+fieldName+']').val(0);
        }
    });
							
});

$$(document).on('ajaxComplete',function(){myApp.hideIndicator();});	
$$(document).on('ajaxError',function(){myApp.hideIndicator();});	




/* $$('.popup').on('opened', function () {
  $(".close_loginpopup_button a").animate({'right':'10px', 'opacity':1},'slow',"easeInOutCirc");
});
$$('.popup').on('closed', function () {
  $(".close_loginpopup_button a").animate({'right':'0px', 'opacity':0},'slow',"easeInOutCirc");
}); */


function updateRegions() {
	$$.ajax({
			method     : "POST",
			url        : "http://otoexpert.ru/api/select_region.php",
			crossDomain: true,
			data       : {},
			xhrFields  : {withCredentials: true},
			dataType   : 'json',
			success    : function(response) {
				if (response != null)
				{
					$$.each(response, function (i, item) {
						var regionData = getRegionsData() || {};
						if(regionData.hasOwnProperty(item['id'])){ 
						}
						else
						{
							regionData[item['id']] = [item['id'], item['name']];
							setRegionsData(regionData);
						}
					});
				}
				mainView.router.refreshPage();
				myApp.addNotification({
					title: 'Готово',
					message: "Список регионов успешно обновлен!"
				});
			},
			error      : function(response) {
				myApp.addNotification({
					title: 'Ошибка',
					message: "Не удалось обновить список регионов!"
				});
			}
		});
		
}

myApp.onPageInit('index', function (page) {
    var storage = window.localStorage;
	
    //myApp.popup('.popup-login');

	$(".logo").animate({'top': '20px'},'slow',"easeInOutCirc");
	$(".cartitems").delay(1000).animate({'width': '30px', 'height': '30px', 'top':'10px', 'right':'10px', 'opacity':1},1000,"easeOutBounce");
	
  
})

$$('#loginForm').on('submitted', function (e) {
	// Авторизация аваркома
			var xhr = e.detail.xhr; // actual XHR object
			var data = e.detail.data; // Ajax response from action file
			data = jQuery.parseJSON(data);
			var storage = window.localStorage;
			if (data.error != null) {
				myApp.alert(data.error, 'Ошибка!');
			}
			else {
				storage.setItem("login", $("#loginAvarkom").val());
				storage.setItem("pass", $("#passAvarkom").val());
				storage.setItem("phone", data.phone);
				storage.setItem("region", data.region_id);
				storage.setItem("region_name", data.region_name); 
				storage.setItem("avarkom_id", data.id); 
				myApp.closeModal('.popup-login');
			
				setInterval(get_fb, 15000);				
			}
});





// Получаем данные из LocalStorage
function getTOData(){
	if (window.localStorage.getItem('dk_cards') != '') {
		return JSON.parse(window.localStorage.getItem('dk_cards'));
	}
    
}
// Записываем данные в LocalStorage
function setTOData(o){
    window.localStorage.setItem('dk_cards', JSON.stringify(o));
    return false;
}

// Получаем данные из LocalStorage
function getCardsData(){
	if (window.localStorage.getItem('cards') != '') {
		return JSON.parse(window.localStorage.getItem('cards'));
	}
    
}
// Записываем данные в LocalStorage
function setCardsData(o){
    window.localStorage.setItem('cards', JSON.stringify(o));
    return false;
}

// Получаем данные из LocalStorage
function getAvarkomData(){
	if (window.localStorage.getItem('avarkom') != '')
	{
		return JSON.parse(window.localStorage.getItem('avarkom'));
	}
    
}
// Записываем данные в LocalStorage
function setAvarkomData(o){
    window.localStorage.setItem('avarkom', JSON.stringify(o));
    return false;
}


// Получаем данные из LocalStorage
function getTehSupportData(){
	if (window.localStorage.getItem('teh_support') != '') {
		return JSON.parse(window.localStorage.getItem('teh_support'));
	}
    
}
// Записываем данные в LocalStorage
function setTehSupportData(o){
    window.localStorage.setItem('teh_support', JSON.stringify(o));
    return false;
}

// Получаем данные из LocalStorage
function getCartData(){
	if (localStorage.getItem('cart') != '') {
		 return JSON.parse(localStorage.getItem('cart'));
	}
   
}
// Записываем данные в LocalStorage
function setCartData(o){
    localStorage.setItem('cart', JSON.stringify(o));
    return false;
}

// Получаем данные из LocalStorage
function getDtpMessageData(){
	if (window.localStorage.getItem('dtp_message') != '') {
		return JSON.parse(window.localStorage.getItem('dtp_message'));
	}
    
}
// Записываем данные в LocalStorage
function setDtpMessageData(o){
    window.localStorage.setItem('dtp_message', JSON.stringify(o));
    return false;
}


myApp.onPageInit('me', function(){
	phoneUser = window.localStorage.getItem("phone");
	fnameUser = window.localStorage.getItem("fname");
	nameUser = window.localStorage.getItem("name");
	mnameUser = window.localStorage.getItem("mname");
	emailUser = window.localStorage.getItem("email");
	smsReportsUser = window.localStorage.getItem("sms_reports");
	emailReportsUser = window.localStorage.getItem("email_reports");
	regionReportsUser = window.localStorage.getItem("region");
	regionNameReportsUser = window.localStorage.getItem("region_name");
	
	$("#clientPhone").val(phoneUser);
	$("#clientFname").val(fnameUser);
	$("#clientName").val(nameUser);
	$("#clientMname").val(mnameUser);
	$("#clientEmail").val(emailUser);
	if (smsReportsUser == 'true')
	{
		$("#smsReports").attr("checked", "checked");
	}
	else
	{
		$("#smsReports").removeAttr("checked");
	}
	if (emailReportsUser == 'true')
	{
		$("#emailReports").attr("checked", "checked");
	}
	else
	{
		$("#emailReports").removeAttr("checked");
	}
	$("#userRegionSelectProfile").empty();
	if ((regionReportsUser != '') && (regionReportsUser != null) && (regionNameReportsUser != null) && (regionNameReportsUser != '')) {
		$("#userRegionSelectProfile").prepend( $('<option value="' + regionReportsUser + '">' + regionNameReportsUser + '</option>'));
	}
	
	
	var regionData = getRegionsData() || {};
	$.each(regionData, function (i, item) {
		if (item[0] != regionReportsUser)
		{
			$("#userRegionSelectProfile").append( $('<option value="' + item[0] + '">' + item[1] + '</option>'));
		}
		
	});
	

});


function updateDtpMessages() {
	phoneUser = window.localStorage.getItem("phone");
	regionUser = window.localStorage.getItem("region");
	loginUser = window.localStorage.getItem("login");
	passUser = window.localStorage.getItem("pass");
	$('#dtpMessageData').empty();
		$$.ajax({
				method     : "POST",
				url        : "http://otoexpert.ru/api/update_list_dtp_messages.php",
				crossDomain: true,
				xhrFields  : {withCredentials: true},
				data       : {phone : phoneUser, region : regionUser, login : loginUser, pass : passUser },
				dataType   : 'json',
				success    : function(response) {
					if (response != null)
					{
						$.each(response, function (i, item) {
										if (item.status == 0)
										{
											status = 'Новая';
										}
										else if (item.status == 1)
										{
											status = 'В обработке';
										}
										else if (item.status == 2)
										{
											status = 'Исполнена';
										}
										else if (item.status == 3)
										{
											status = 'Отказ';
										}
										else
										{
											status = 'Неизвестно';
										}
								$('#dtpMessageData').append('<div class="card"><div class="card-content"><div class="card-content-inner"><p>Статус: <br /><b>' + status + '</b></p><p>Время (по Москве): <br /><b>' + item.start + ' - ' + item.end + '</b></p><a onclick="seeDtpMessage(' + item.id + ');" class="button button-fill color-green">Посмотреть</a></div></div></div>');
							}); 
							
							
								
									
								} else {
								   $("#emptyDtpMessage").css("display", "block");
								}
					
				},
				error      : function(response) {
					myApp.addNotification({
						title: 'Ошибка!',
						message: response.error
					});
				}
			});
	return false;
}

myApp.onPageInit('dtp_message', function() {
	updateDtpMessages();
})


function updateZayavkiAvarkom() {
	phoneUser = window.localStorage.getItem("phone");
	regionUser = window.localStorage.getItem("region");
	loginUser = window.localStorage.getItem("login");
	passUser = window.localStorage.getItem("pass");
	$('#avarkomData').empty();
		$$.ajax({
				method     : "POST",
				url        : "http://otoexpert.ru/api/update_list_avarkom_messages.php",
				crossDomain: true,
				xhrFields  : {withCredentials: true},
				data       : {phone : phoneUser, region : regionUser, login : loginUser, pass : passUser },
				dataType   : 'json',
				success    : function(response) {
					if (response != null)
					{
						$.each(response, function (i, item) {
										if (item.status == 0)
										{
											status = 'Новая';
										}
										else if (item.status == 1)
										{
											status = 'В обработке';
										}
										else if (item.status == 2)
										{
											status = 'Исполнена';
										}
										else if (item.status == 3)
										{
											status = 'Отказ';
										}
										else
										{
											status = 'Неизвестно';
										}
								$('#avarkomData').append('<div class="card"><div class="card-content"><div class="card-content-inner"><p>Услуга: <br /><b>' + item.service + '</b></p><p>Статус: <br /><b>' + status + '</b></p><p>Время (по Москве): <br /><b>' + item.start + ' - ' + item.end + '</b></p><a onclick="seeAvarkomMessage(' + item.id + ');" class="button button-fill color-green">Посмотреть</a></div></div></div>');
							}); 
							
							
								
									
								} else {
								   $("#emptyAvarkom").css("display", "block");
								}
					
				},
				error      : function(response) {
					myApp.addNotification({
						title: 'Ошибка!',
						message: response.error
					});
				}
			});
	return false;
}

myApp.onPageInit('avarkom', function() {
	updateZayavkiAvarkom();
})

function seeDtpMessage(id) {
	mainView.router.loadPage('see_message.html?id=' +id + '');
}


function seeAvarkomMessage(id) {
	mainView.router.loadPage('see_avarkom.html?id=' +id + '');
}

myApp.onPageInit("see_avarkom", function(page) {
	var id = page.query['id'];
	$("#avarkomInfo").empty();
	loginUser = window.localStorage.getItem("login");
	passUser = window.localStorage.getItem("pass");
	
	$('#avarkomData').empty();
		$$.ajax({
				method     : "POST",
				url        : "http://otoexpert.ru/api/dannye_avarkom_messages.php",
				crossDomain: true,
				xhrFields  : {withCredentials: true},
				data       : {phone : phoneUser, region : regionUser, id_avarkom_message : id, login : loginUser, pass : passUser },
				dataType   : 'json',
				success    : function(response) {
					if (response != null)
					{
						$.each(response, function (i, item) {
										if (item.status == 0)
										{
											status = 'Новая';
										}
										else if (item.status == 1)
										{
											status = 'В обработке';
										}
										else if (item.status == 2)
										{
											status = 'Исполнена';
										}
										else if (item.status == 3)
										{
											status = 'Отказ';
										}
										else
										{
											status = 'Неизвестно';
										}
										var avarkom_dannye = '';
										var btnEdu = '';
										var btnOtkaz = '';
										var btnOformil = '';
										if (item.avarkom_id != 0) {
											var avarkom_dannye = "<p>Аварком: <br /><b>" + item.avarkom_fname + '  ' + item.avarkom_name + "</b></p>";
										}
										var status_ok = 0;
										if ((item.status == 0) || (item.status == 1)) {
											status_ok = 1;
										}
										if ((status_ok == 1) && (item.avarkom_id == 0) || (status_ok == 1) && (item.avarkom_id == item.avarkom_now_id)) {
											var btnEdu = '<a onclick="eduAvarkom(' + item.id + ', ' + item.avarkom_now_id + ');" class="button button-fill color-green">Еду</a>';
										}
										if ((item.status == 1) && (item.avarkom_id == item.avarkom_now_id)) {
											var btnEdu = '';
											var btnOtkaz = '<a onclick="otkazAvarkom(' + item.id + ', ' + item.avarkom_now_id + ');" class="button button-fill color-red">Не оформил</a>';
											var btnOformil = '<a onclick="oformilAvarkom(' + item.id + ', ' + item.avarkom_now_id + ');" class="button button-fill color-red">Оформил</a>';
										}
								$('#avarkomInfo').append('<div class="card"><div class="card-content"><div class="card-content-inner"><p>Услуга: <br /><b>' + item.service + '</b></p><p>Статус: <br /><b>' + status + '</b></p><p>Телефон: <br /><b><a href="tel:' + item.phone + '">' + item.phone + '</a></b></p><p>Время (по Москве): <br /><b>' + item.start + ' - ' + item.end + '</b>' + avarkom_dannye + '</p><p>Координаты: <br /><b>' + item.coords + '</b></p>' + btnEdu + ' ' + btnOtkaz + ' ' + btnOformil + '</div></div></div>');
								
								$("#map").empty();
							
							
							coords = item.coords;
							coords_res1 = coords.split(",");
							coord_res = coords.split(",");
								
								
							ymaps.ready(init);

						function init () {
							var myMap = new ymaps.Map("map", {
									center: [parseFloat(coord_res[0]), parseFloat(coord_res[1])],
									zoom: 12
								}, {
									searchControlProvider: 'yandex#search'
								}),
								myPlacemark = new ymaps.Placemark([parseFloat(coord_res[0]), parseFloat(coord_res[1])]);

							myMap.geoObjects.add(myPlacemark);

							
						}
							}); 
							
									
								} else {
								   $("#emptyAvarkom").css("display", "block");
								}
					
				},
				error      : function(response) {
					myApp.addNotification({
						title: 'Ошибка!',
						message: response.error
					});
				}
			});
})




myApp.onPageInit("see_message", function(page) {
	var id = page.query['id'];
	$("#messageInfo").empty();
	loginUser = window.localStorage.getItem("login");
	passUser = window.localStorage.getItem("pass");
	$('#avarkomData').empty();
		$$.ajax({
				method     : "POST",
				url        : "http://otoexpert.ru/api/dannye_messages.php",
				crossDomain: true,
				xhrFields  : {withCredentials: true},
				data       : {phone : phoneUser, region : regionUser, id_avarkom_message : id, login : loginUser, pass : passUser },
				dataType   : 'json',
				success    : function(response) {
					if (response != null)
					{
						$.each(response, function (i, item) {
										if (item.status == 0)
										{
											status = 'Новая';
										}
										else if (item.status == 1)
										{
											status = 'В обработке';
										}
										else if (item.status == 2)
										{
											status = 'Исполнена';
										}
										else if (item.status == 3)
										{
											status = 'Отказ';
										}
										else
										{
											status = 'Неизвестно';
										}
										
										var btnOtkaz = '';
										var btnEdu = '';
										var btnOformil = '';
										var avarkom_dannye = '';
										if (item.avarkom_id != 0) {
											var avarkom_dannye = "<p>Аварком: <br /><b>" + item.avarkom_fname + '  ' + item.avarkom_name + "</b></p>";
										}
										var status_ok = 0;
										if ((item.status == 0) || (item.status == 1)) {
											status_ok = 1;
										}
										if ((status_ok == 1) && (item.avarkom_id == 0) || (status_ok == 1) && (item.avarkom_id == item.avarkom_now_id)) {
											var btnEdu = '<a onclick="eduMessage(' + item.id + ', ' + item.avarkom_now_id + ');" class="button button-fill color-green">Еду</a>';
										}
										if ((item.status == 1) && (item.avarkom_id == item.avarkom_now_id)) {
											var btnOtkaz = '<a onclick="otkazMessage(' + item.id + ', ' + item.avarkom_now_id + ');" class="button button-fill color-red">Не оформил</a>';
											var btnOformil = '<a onclick="oformilMessage(' + item.id + ', ' + item.avarkom_now_id + ');" class="button button-fill color-green">Оформил</a>';
											var btnEdu = '';
										}
								$('#messageInfo').append('<div class="card"><div class="card-content"><div class="card-content-inner"><p>Статус: <br /><b>' + status + '</b></p><p>Телефон: <br /><b><a href="tel:' + item.phone + '">' + item.phone + '</a></b></p><p>Время (по Москве): <br /><b>' + item.start + ' - ' + item.end + '</b>' + avarkom_dannye + '</p><p>Координаты: <br /><b>' + item.coords + '</b></p>' + btnEdu + ' ' + btnOtkaz +'  ' + btnOformil +' </div></div></div>');
								
								$("#map").empty();
							
							
							coords = item.coords;
							coords_res1 = coords.split(",");
							coord_res = coords.split(",");
								
								
							ymaps.ready(init);

						function init () {
							var myMap = new ymaps.Map("map", {
									center: [parseFloat(coord_res[0]), parseFloat(coord_res[1])],
									zoom: 12
								}, {
									searchControlProvider: 'yandex#search'
								}),
								myPlacemark = new ymaps.Placemark([parseFloat(coord_res[0]), parseFloat(coord_res[1])]);

							myMap.geoObjects.add(myPlacemark);

							
						}

							}); 
							
									
								} else {
								   $("#emptyAvarkom").css("display", "block");
								}
					
				},
				error      : function(response) {
					myApp.addNotification({
						title: 'Ошибка!',
						message: response.error
					});
				}
			});
})


function eduMessage(id, avarkom_id) {
		loginUser = window.localStorage.getItem("login");
		passUser = window.localStorage.getItem("pass");
		myApp.confirm('Вы уверены?', 'Внимание!', 
		function () {
				$$.ajax({
				method     : "POST",
				url        : "http://otoexpert.ru/api/update_messages.php",
				crossDomain: true,
				xhrFields  : {withCredentials: true},
				data       : {phone : phoneUser, region : regionUser, id_avarkom_message : id, avarkom_set_id : avarkom_id, login : loginUser, pass : passUser },
				dataType   : 'json',
				success    : function(response) {
					if (response.success != '') {
						
						myApp.addNotification({
							title: 'Успешно!',
							message: response.success
						});
					}
					else {
						myApp.addNotification({
							title: 'Ошибка!',
							message: response.error
						});
					}
					
				},
				error      : function(response) {
					myApp.addNotification({
						title: 'Ошибка!',
						message: response.error
					});
				}
			});
			
		}
	);
};

function eduAvarkom(id, avarkom_id) {
	loginUser = window.localStorage.getItem("login");
	passUser = window.localStorage.getItem("pass");
		myApp.confirm('Вы уверены?', 'Внимание!', 
		function () {
				$$.ajax({
				method     : "POST",
				url        : "http://otoexpert.ru/api/update_avarkom_messages.php",
				crossDomain: true,
				xhrFields  : {withCredentials: true},
				data       : {phone : phoneUser, region : regionUser, id_avarkom_message : id, avarkom_set_id : avarkom_id, login : loginUser, pass : passUser },
				dataType   : 'json',
				success    : function(response) {
					if (response.success != '') {
						
						myApp.addNotification({
							title: 'Успешно!',
							message: response.success
						});
					}
					else {
						myApp.addNotification({
							title: 'Ошибка!',
							message: response.error
						});
					}
					
				},
				error      : function(response) {
					myApp.addNotification({
						title: 'Ошибка!',
						message: response.error
					});
				}
			});
			
		}
	);
};



function otkazMessage(id, avarkom_id) {
	loginUser = window.localStorage.getItem("login");
	passUser = window.localStorage.getItem("pass");
			myApp.confirm('Вы уверены?', 'Внимание!', 
		function () {
				$$.ajax({
				method     : "POST",
				url        : "http://otoexpert.ru/api/update_messages_not.php",
				crossDomain: true,
				xhrFields  : {withCredentials: true},
				data       : {phone : phoneUser, region : regionUser, id_avarkom_message : id, avarkom_set_id : avarkom_id, login : loginUser, pass : passUser },
				dataType   : 'json',
				success    : function(response) {
					if (response.success != '') {
						
						myApp.addNotification({
							title: 'Успешно!',
							message: response.success
						});
					}
					else {
						myApp.addNotification({
							title: 'Ошибка!',
							message: response.error
						});
					}
					
				},
				error      : function(response) {
					myApp.addNotification({
						title: 'Ошибка!',
						message: response.error
					});
				}
			});
			
		}
	);
};

function otkazAvarkom(id, avarkom_id) {
	loginUser = window.localStorage.getItem("login");
	passUser = window.localStorage.getItem("pass");
			myApp.confirm('Вы уверены?', 'Внимание!', 
		function () {
				$$.ajax({
				method     : "POST",
				url        : "http://otoexpert.ru/api/update_avarkom_messages_not.php",
				crossDomain: true,
				xhrFields  : {withCredentials: true},
				data       : {phone : phoneUser, region : regionUser, id_avarkom_message : id, avarkom_set_id : avarkom_id, login : loginUser, pass : passUser },
				dataType   : 'json',
				success    : function(response) {
					if (response.success != '') {
						
						myApp.addNotification({
							title: 'Успешно!',
							message: response.success
						});
					}
					else {
						myApp.addNotification({
							title: 'Ошибка!',
							message: response.error
						});
					}
					
				},
				error      : function(response) {
					myApp.addNotification({
						title: 'Ошибка!',
						message: response.error
					});
				}
			});
			
		}
	);
};



function oformilMessage(id, avarkom_id) {
	loginUser = window.localStorage.getItem("login");
	passUser = window.localStorage.getItem("pass");
			myApp.confirm('Вы уверены?', 'Внимание!', 
		function () {
				$$.ajax({
				method     : "POST",
				url        : "http://otoexpert.ru/api/update_messages_ok.php",
				crossDomain: true,
				xhrFields  : {withCredentials: true},
				data       : {phone : phoneUser, region : regionUser, id_avarkom_message : id, avarkom_set_id : avarkom_id, login : loginUser, pass : passUser },
				dataType   : 'json',
				success    : function(response) {
					if (response.success != '') {
						
						myApp.addNotification({
							title: 'Успешно!',
							message: response.success
						});
					}
					else {
						myApp.addNotification({
							title: 'Ошибка!',
							message: response.error
						});
					}
					
				},
				error      : function(response) {
					myApp.addNotification({
						title: 'Ошибка!',
						message: response.error
					});
				}
			});
			
		}
	);
};

function oformilAvarkom(id, avarkom_id) {
	loginUser = window.localStorage.getItem("login");
	passUser = window.localStorage.getItem("pass");
			myApp.confirm('Вы уверены?', 'Внимание!', 
		function () {
				$$.ajax({
				method     : "POST",
				url        : "http://otoexpert.ru/api/update_avarkom_messages_ok.php",
				crossDomain: true,
				xhrFields  : {withCredentials: true},
				data       : {phone : phoneUser, region : regionUser, id_avarkom_message : id, avarkom_set_id : avarkom_id, login : loginUser, pass : passUser },
				dataType   : 'json',
				success    : function(response) {
					if (response.success != '') {
						
						myApp.addNotification({
							title: 'Успешно!',
							message: response.success
						});
					}
					else {
						myApp.addNotification({
							title: 'Ошибка!',
							message: response.error
						});
					}
					
				},
				error      : function(response) {
					myApp.addNotification({
						title: 'Ошибка!',
						message: response.error
					});
				}
			});
			
		}
	);
};


myApp.onPageInit("documenty", function() {
	$("#dtpDateInputCheck").mask("99.99.9999");	
})

myApp.onPageInit("activate_start", function() {
	$("#actCardCode").mask("9999");
})



function exitFromThis() {
		myApp.confirm('Вы уверены что хотите выйти с данного устройства?', 'Внимание!', 
		function () {
			window.localStorage.clear();
            myApp.popup('.popup-login');
		}
	);
}


function closePopup()
{
	myApp.closeModal();
}

myApp.onPageInit("aska", function() {

	ymaps.ready(init);

function init() {
		var geolocation = ymaps.geolocation,
			myMap = new ymaps.Map('map', {
				center: [55, 34],
				zoom: 16
			}, {
				searchControlProvider: 'yandex#search'
			});
			
		

		geolocation.get({
			provider: 'auto'
		}).then(function (result) {
			// Синим цветом пометим положение, полученное через браузер.
			// Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.

			result.geoObjects.options.set("interactivityModel", "default#opaque");
			
			myMap.geoObjects.add(result.geoObjects);
			myMap.panTo([result.geoObjects.get(0).geometry.getCoordinates()], {flying: 1});
			myMap.geoObjects.events.add("click", function (e) {
				var coords = e.get('coords');
				
				// Если метка уже создана – просто передвигаем ее.
				if (myPlacemark) {
					myPlacemark.geometry.setCoordinates(coords);
				}
				// Если нет – создаем.
				else {
					myPlacemark = createPlacemark(coords);
					myMap.geoObjects.add(myPlacemark);
				}
				$("#mapCoordsAska").empty();
				$("#mapCoordsAska").text(coords);
				$("#mapBtnCancelAska").css("display", "block");
				$("#mapBtnGetAska").css("display", "block");
			});
		});
		var myPlacemark;
		$("#loadMap").empty();
		 myMap.events.add('click', function (e) {
			var coords = e.get('coords');

			myMap.geoObjects.remove(myPlacemark);
			myPlacemark = createPlacemark(coords);
			myMap.geoObjects.add(myPlacemark);
			$("#mapCoordsAska").empty();
			$("#mapCoordsAska").text(coords);
			$("#mapBtnCancelAska").css("display", "block");
			$("#mapBtnGetAska").css("display", "block");
		});
				 // Создание метки.
		function createPlacemark(coords) {
			return new ymaps.Placemark(coords, {
				iconCaption: 'поиск...'
			}, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'images/myIcon.png',
            // Размеры метки.
            iconImageSize: [32, 32],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-16, -16],
			draggable: false
        });
		}
		$('#mapBtnCancelAska').on('click', function(){
			$("#mapBtnCancelAska").css("display", "none");
			$("#mapBtnGetAska").css("display", "none");
			myMap.geoObjects.remove(myPlacemark);
			mainView.router.loadPage("avarkom.html");
		});
		
		$('#mapBtnGetAska').on('click', function(){
			
			myApp.confirm('Вы уверены что хотите добавить Аську?', 'Внимание!', 
				function () {
				phoneUser = window.localStorage.getItem("phone");
				loginUser = window.localStorage.getItem("login");
				passUser = window.localStorage.getItem("pass");
				status = 0;
				var mapCoords = $("#mapCoordsAska").text();
				if ((mapCoords == null) || (mapCoords == ''))
				{
					myApp.alert('Не удалось получить координаты, попробуйте позже!', 'Ошибка');
					return;
				}

													
									$$.ajax({
										method     : "POST",
										url        : "http://otoexpert.ru/api/new_aska.php",
										crossDomain: true,
										xhrFields  : {withCredentials: true},
										data       : {phone : phoneUser, login : loginUser, pass : passUser, coords : mapCoords},
										dataType   : 'json',
										success    : function(response) {
											if (response.success != '')
											{
												
												myApp.alert(response.success, 'Готово!');
												mainView.router.loadPage('index.html');
											}

										},
										error      : function(response) {
											myApp.alert(response.error, 'Ошибка!');
										}
									});
					
						
				},
				function () {
					$("#mapBtnCancelAska").css("display", "none");
					$("#mapBtnGetAska").css("display", "none");
					myMap.geoObjects.remove(myPlacemark);
				}
			);
		});
		
		
	
	}

})



$$(document).on('pageInit', function (e) {
									  
		$("ul.features_list_detailed > li")
			.css('opacity', '0')
			.each(function(index, item) {
				setTimeout(function() {
					$(item).fadeTo('slow',1,"easeInOutCirc");
				}, index*175);
		});	
			
		$("ul.features_list_detailed > li span")
			.css('opacity', '0')
			.each(function(index, item) {
				setTimeout(function() {
					$(item).animate({'bottom':'0px', 'right':'0px', 'opacity':1},800,"easeInOutCirc");
				}, index*175);
		});	
			
		$("ul.features_list_detailed > li h4")
			.css('opacity', '0')
			.each(function(index, item) {
				setTimeout(function() {
					$(item).animate({'right':'0px', 'opacity':1},800,"easeInOutCirc");
				}, index*175);
		});	
			
		$("ul.features_list_detailed > li div.feat_small_icon")
			.css('opacity', '0')
			.each(function(index, item) {
				setTimeout(function() {
					$(item).animate({'left':'0px', 'opacity':1},800,"easeInOutCirc");
				}, index*175);
		});		
		

		$("#RegisterForm").validate();
		$("#loginForm").validate();
		$("#checkForm").validate();
		
		$('a.backbutton').click(function(){
			parent.history.back();
			return false;
		});
})

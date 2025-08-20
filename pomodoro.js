angular.module('pomodoroApp', [])
    .controller('TomatoController', function(){

    var model = this;

    model.checkBoxes = [
        {order: 1, checked: false},
        {order: 2, checked: false},
        {order: 3, checked: false},
        {order: 4, checked: false}
    ];

    // possible values: 25, 5, 30
    model.currentTimer = 25;
    model.onBreak = false;
    model.isPiPActive = false;
    model.canvas = null;
    model.ctx = null;
    model.video = null;

    model.pause = function(){
        pauseTimer();
    };

    model.start = function(){
        startTimer();
    };

    model.togglePiP = function(){
        alert('PiP Mode toggled');

        if (!document.pictureInPictureSupported) {
            alert('Picture-in-Picture not supported in this browser');
            return;
        }
        if (!model.isPiPActive) {
            enablePiP();
        } else {
            document.exitPictureInPicture();
        }
    };

    var intervalId = '';

    function startTimer(){
        intervalId = setInterval(function(){
            if ($('.seconds').text() === '0' && $('.minutes').text() === '0'){
                //alert('beep!');
                nextPhase();
            } else {
                if ($('.seconds').text() === '0' || $('.seconds').text() === '00'){
                    $('.minutes').text($('.minutes').text() - 1);
                    $('.seconds').text('59');
                } else {
                    $('.seconds').text($('.seconds').text() - 1);
                }
            }
        }, 1000);

        if (model.isPiPActive) {
            updatePiPCanvas();
        }
    }

    function pauseTimer(){
        clearInterval(intervalId);
    }

    function nextPhase(){
        if (model.checkBoxes[0].checked === false){
            model.checkBoxes[0].checked = true;
            $('.checkbox-1 img').attr('src', 'checked_checkbox.PNG');
            playSound();
            setTime(5);
            model.onBreak = true;

        } else if (model.checkBoxes[1].checked === false){
            if (model.onBreak == true){
                playSound();
                setTime(25);
                model.onBreak = false;
            } else {
                model.checkBoxes[1].checked = true;
                $('.checkbox-2 img').attr('src', 'checked_checkbox.PNG');
                playSound();
                setTime(5);
                model.onBreak = true;
            }

        } else if (model.checkBoxes[2].checked === false){
            if (model.onBreak == true){
                playSound();
                setTime(25);
                model.onBreak = false;
            } else {
                model.checkBoxes[2].checked = true;
                $('.checkbox-3 img').attr('src', 'checked_checkbox.PNG');
                playSound();
                setTime(5);
                model.onBreak = true;
            }

        } else if (model.checkBoxes[3].checked === false) {
            if (model.onBreak == true){
                playSound();
                setTime(25);
                model.onBreak = false;
            } else {
                model.checkBoxes[3].checked = true;
                $('.checkbox-4 img').attr('src', 'checked_checkbox.PNG');
                playSound();
                setTime(30);
                model.onBreak = true;
            }
        } else {
            $('.checkbox-1 img').attr('src', 'empty_checkbox.PNG');
            $('.checkbox-2 img').attr('src', 'empty_checkbox.PNG');
            $('.checkbox-3 img').attr('src', 'empty_checkbox.PNG');
            $('.checkbox-4 img').attr('src', 'empty_checkbox.PNG');

            model.checkBoxes[0].checked = false;
            model.checkBoxes[1].checked = false;
            model.checkBoxes[2].checked = false;
            model.checkBoxes[3].checked = false;
        }
    }

    function playSound(){
        var sound = new Audio('shortbeep.wav');
        sound.play();
    }

    function setTime(minutes){
        $('.seconds').text('00');
        $('.minutes').text('' + minutes + '');
    }

    function enablePiP(){
        alert('Enabling PiP Mode');
        model.canvas = document.getElementById('pipCanvas');
        model.ctx = model.canvas.getContext('2d');
        model.video = document.getElementById('pipVideo');
        
        const stream = model.canvas.captureStream(5);
        model.video.srcObject = stream;
        
        model.video.onloadedmetadata = function() {
            model.video.requestPictureInPicture().then(() => {
                model.isPiPActive = true;
                updatePiPCanvas();
            });
        };
    }

    function updatePiPCanvas(){
        if (!model.isPiPActive) return;
        
        // Draw background
        model.ctx.fillStyle = model.onBreak ? '#28a745' : '#dc3545';
        model.ctx.fillRect(0, 0, model.canvas.width, model.canvas.height);
        
        // Draw timer
        model.ctx.fillStyle = 'white';
        model.ctx.font = 'bold 32px Arial';
        model.ctx.textAlign = 'center';
        const timeText = $('.minutes').text() + ':' + $('.seconds').text().padStart(2, '0');
        model.ctx.fillText(timeText, model.canvas.width / 2, 50);
        
        // Draw status
        model.ctx.font = '14px Arial';
        const status = model.onBreak ? 'BREAK' : 'FOCUS';
        model.ctx.fillText(status, model.canvas.width / 2, 80);
    }
})
// .config(function($sceDelegateProvider){
//     $sceDelegateProvider.resourceUrlWhitelist([
//         'self',
//         'null'
//     ])
// })
// .config(function($sceDelegateProvider){
//     $sceDelegateProvider.enabled(false);
//     $sceDelegateProvider.resourceUrlWhitelist(['self', 'file:///C:/Users/eenis/Documents/my%20stuff/GitHub/yet-another-pomodoro-timer/header.html']);
// });
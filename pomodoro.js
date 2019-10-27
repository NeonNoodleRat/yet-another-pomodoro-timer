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

    model.pause = function(){
        pauseTimer();
    };

    model.start = function(){
        startTimer();
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
    }

    function pauseTimer(){
        clearInterval(intervalId);
    }

    function nextPhase(){
        if (model.checkBoxes[0].checked === false){
            model.checkBoxes[0].checked = true;
            $('.checkbox-1 img').attr('src', 'checked_checkbox.PNG');
            $('.seconds').text('00');
            $('.minutes').text('05');
            model.onBreak = true;

        } else if (model.checkBoxes[1].checked === false){
            if (model.onBreak == true){
                $('.seconds').text('00');
                $('.minutes').text('25');
                model.onBreak = false;
            } else {
                model.checkBoxes[1].checked = true;
                $('.checkbox-2 img').attr('src', 'checked_checkbox.PNG');
                $('.seconds').text('00');
                $('.minutes').text('05');
                model.onBreak = true;
            }

        } else if (model.checkBoxes[2].checked === false){
            if (model.onBreak == true){
                $('.seconds').text('00');
                $('.minutes').text('25');
                model.onBreak = false;
            } else {
                model.checkBoxes[2].checked = true;
                $('.checkbox-3 img').attr('src', 'checked_checkbox.PNG');
                $('.seconds').text('00');
                $('.minutes').text('05');
            }

        } else {
            if (model.onBreak == true){
                $('.seconds').text('00');
                $('.minutes').text('25');
                model.onBreak = false;
            } else {
                model.checkBoxes[3].checked = true;
                $('.checkbox-4 img').attr('src', 'checked_checkbox.PNG');
                $('.seconds').text('00');
                $('.minutes').text('30');

                var sound = new Audio('shortbeep.wav');
                sound.play();
            }
        }
    }
});


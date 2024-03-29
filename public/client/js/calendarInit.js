$(document).ready(function() {
  var start, end;
  var calendar = $("#calendar, #calendar-nextday");
  var currentEvent;
  var isAdd = false;
  var username = '';
  var phonenumber = '';
  var dayType = '';
  var globalEvent = {};
  var testMonth = 9;
  var testStartDate = 29;
  var testEndDate = 30;
  var startTestDate = '2019-09-18';
  var endTestDate = '2018-09-19';
  var testDate = new moment('2018-10-25');
  var testNextDate = new moment('2018-10-25');
  var startHour = 7;
  $.ajax({
              type: "GET",
              url: '/getData',
              timeout: 1000000,
              success: function (json) {
                  console.log(json)
                  if(json.success == 200){

                    let eventDatas = json.data;
                    console.log(eventDatas);
                    var tempArray = []
                    for(var i=0; i<eventDatas.length; i++){
                      let tempObject = {
                        "id":eventDatas[i].id,
                        "title":eventDatas[i].title,
                        "start":new Date(eventDatas[i].startTime),
                        "end":new Date(eventDatas[i].endTime),
                        "content" : {
                          "location":eventDatas[i].location,
                          "anger" : eventDatas[i].anger,
                          "anxiety" : eventDatas[i].anxiety,
                          "agitation" : eventDatas[i].agitation,
                          "fatigue" : eventDatas[i].fatigue,
                          "happy" : eventDatas[i].happy,
                          "location" : eventDatas[i].location,
                          "satisfaction" : eventDatas[i].satisfation
                        },
                        "textColor" : eventDatas[i].textColor,
                        "color" : eventDatas[i].color,
                        "className":"customEventsClass",
                        'timezone': 'local',
                        "type":1
                      }
                      tempArray.push(tempObject);

                    }

                    calendar.fullCalendar({
                      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
                      themeSystem: 'standard',
                      defaultView: 'firstday',
                      groupByResource: true,
                      // resources: [
                      //   { id: phonenumber, title: name },
                      // ],
                      allDaySlot: false,
                      slotDuration: '00:10:00',
                      slotLabelFormat: 'a h:mm',
                      nowIndicator: true,
                      now: moment().subtract(startHour, 'hours'),
                      scrollTime: new Date().getHours()-1+':'+Math.floor(new Date().getMinutes()/10)*10+':'+new Date().getSeconds(),
                      height: function() {
                        return $(window).outerHeight() - $(".fixed-top").height() - 10;
                      },
                      header: false,
                      defaultDate: testDate,
                      // minTime: "07:00:00",
                      // maxTime: "06:00:00",
                      timezone: 'local',
                      // validRange: {
                      //   start: '2017-05-01'
                      // },
                      events : tempArray,
                      eventRender: function(event, element) {
                        var minutes = moment.duration(event.end.diff(event.start)).get("minutes");
                        if(minutes === 10) {
                          $(element).find('.fc-time').text( event.title );
                          $(element).find('.fc-title').remove();
                        }
                        console.log(moment(event.start), moment(event.end));
                        event.start = moment(event.start).subtract(startHour, 'hours');
                        event.end = moment(event.end).subtract(startHour, 'hours');

                        console.log( calendar.fullCalendar( 'clientEvents' ) );
                        // calendar.fullCalendar( 'updateEvent', event );
                      },
                      slotLabelFormat:"HH mm",
                      viewRender: function(view, element) {
                          var title = view.title;

                          console.log(view);
                          if(view.type === 'firstday'){

                            var curText = $(".fc-day-header").text();
                            $(".fc-day-header").text( curText + ' / 목요일' );
                            $("#title").html( '2018년 10월 24/25일' );

                          }
                          else if(view.type === 'secondday') {

                            var curText = $(".fc-day-header").text();
                            $(".fc-day-header").text( curText + ' / 금요일' );
                            $("#title").html( '2018년 10월 25/26일' );
                          }
                          else {
                            $("#title").html( '2018년 10월 24~26일' );
                            var headers = $(".fc-day-header");
                            $(headers[0]).text( '수/목' );
                            $(headers[1]).text( '목/금' );

                          }

                          // console.log(calendar.fullCalendar( 'getView' ));
                          var view = calendar.fullCalendar('getView');

                          var timeLabels = $(element).find('.fc-time');
                          for(var i = 0; i < timeLabels.length; ++i){
                            // console.log(timeLabels[i]);
                            if( $( timeLabels[i] ).find('span') ){
                              var text = $( timeLabels[i] ).find('span').text();

                              if( text.split( ' ' ).length > 1) {

                                var hour = text.split(' ')[0];
                                var mins = text.split(' ')[1];

                                $( timeLabels[i] ).find('span').text( (Number(hour) + startHour) % 24 + ':' + mins );
                              }
                            }


                          }
                          // $(element).find('.fc-time').text(testDate.format('hh:mm a') + ' - ' + testDate.format('hh:mm a'));
                          var curDate = view.start.format('DD');
                          var type = view.type;
                          var events = calendar.fullCalendar( 'clientEvents' );
                          var totTime = {
                            total: 0,
                          };
                          $.each(events, function( index, event ) {
                            var diff = moment.duration( event.end.diff(event.start) ).asMinutes();
                            var date = event.start.format('DD');
                            //if no key, initialize by 0
                            if( !(date in totTime) ) totTime[date] = 0;
                            totTime[date] += diff;
                            totTime['total'] += diff;
                          });

                          if(!events.length) {
                            $("#spent-time-hm").html('-');
                          }
                          else {
                            var curHour = Math.floor(totTime[curDate] / 60).toFixed(0);
                            var curMin = (totTime[curDate]) % 60;

                            curHour = isNaN(curHour) ? 0 : curHour;
                            curMin = isNaN(curMin) ? 0 : curMin;

                            var totHour = Math.floor(totTime['total'] / 60).toFixed(0);
                            var totMin =  totTime['total'] % 60;

                            totHour = isNaN(totHour) ? 0 : totHour;
                            totMin = isNaN(totMin) ? 0 : totMin;
                            $("#spent-time-hm").html(
                              type !== 'bothday' ? curHour  + '시간 ' + curMin + '분' :
                                                  totHour + '시간 ' + totMin + '분'
                            );
                          }


                          $("#remaining-time").html (
                            type !== 'bothday' ? '/ 24시간' : '/ 48시간'
                          );
                      },
                      views: {
                        firstday: {
                          type: 'agenda',
                          duration: { days: 1 },
                          buttonText: '1일',
                        },
                        secondday: {
                          type: 'agenda',
                          duration: { days: 1 },
                          buttonText: '1일',
                        },
                        bothday: {
                          type: 'agenda',
                          duration: { days: 2 },
                          buttonText: '2일'
                        }
                      },
                      eventBorderColor: '#333',
                      eventClick: function(event, element) {
                        console.log(event);
                        if(isAdd) return false;
                        $('#eventBlockModal').off('show.bs.modal').on('show.bs.modal', function () {
                          $('#startTime').timepicker('remove');
                          $('#endTime').timepicker('remove');

                          var startDate = event.start.format('a h:mm');
                          var endDate = event.end.format('a h:mm');
                          // $("#timeEditButton, #contentEditButton, #locationEditButton, #emotionEditButton").removeClass('active');

                          $("#eventContent").attr('contenteditable', true);
                          $('#locationContent input[type=radio]').prop('disabled', false);
                          $('#happyContent input[type=radio]').prop('disabled', false);
                          $('#satisfactionContent input[type=radio]').prop('disabled', false);
                          $('#agitationContent input[type=radio]').prop('disabled', false);
                          $('#anxietyContent input[type=radio]').prop('disabled', false);
                          $('#angerContent input[type=radio]').prop('disabled', false);
                          $('#fatigueContent input[type=radio]').prop('disabled', false);


                          $('#eventBlockModal #locationContent input[type=radio]').attr("checked", false);
                          $('#eventBlockModal #happyContent input[type=radio]').attr("checked", false);
                          $('#eventBlockModal #satisfactionContent input[type=radio]').attr("checked", false);
                          $('#eventBlockModal #agitationContent input[type=radio]').attr("checked", false);
                          $('#eventBlockModal #anxietyContent input[type=radio]').attr("checked", false);
                          $('#eventBlockModal #angerContent input[type=radio]').attr("checked", false);
                          $('#eventBlockModal #fatigueContent input[type=radio]').attr("checked", false);

                          $("#eventContent").text( event.title );
                          $('#eventBlockModal #locationContent input[type=radio][value=' + event.content.location + ']').attr("checked", true);
                          $('#eventBlockModal #happyContent input[type=radio][value=' + event.content.happy + ']').attr("checked", true);
                          $('#eventBlockModal #satisfactionContent input[type=radio][value=' + event.content.satisfaction + ']').attr("checked", true);
                          $('#eventBlockModal #agitationContent input[type=radio][value=' + event.content.agitation + ']').attr("checked", true);
                          $('#eventBlockModal #anxietyContent input[type=radio][value=' + event.content.anxiety + ']').attr("checked", true);
                          $('#eventBlockModal #angerContent input[type=radio][value=' + event.content.anger + ']').attr("checked", true);
                          $('#eventBlockModal #fatigueContent input[type=radio][value=' + event.content.fatigue + ']').attr("checked", true);

                          var options = {
                            timeFormat: 'a h:i',
                            step: 10,
                            lang: {am: '오전', pm: '오후'},
                            useSelect: true,
                          };
                          // $('.modal-title .start-time, .end-time').css('border', '1px solid grey');
                          console.log(moment(event.start).format('a h:mm'));
                          var events = calendar.fullCalendar( 'clientEvents' );
                          //find the next closest event start time;
                          events.sort(function(a,b) {return a.start - b.start});
                          var target_index = -1;
                          $.each( events, function( index, event ) {
                            if(moment(event.start).isSame(moment(event.start))){
                              target_index = index;
                            }
                          })

                          if(events.length === 0) {
                            options.minTime = moment(event.start).startOf('day').toDate();
                            options.maxTime = moment(event.start).endOf('day').toDate();
                          }
                          else if(events.length === 1){
                            options.minTime = moment(event.start).startOf('day').toDate();
                            options.maxTime = moment(event.start).endOf('day').toDate();
                          }
                          // else if(events.length === 2){
                          //   options.minTime = events[target_index-1] ? moment(events[target_index-1].start).format('a h:mm') : undefined;
                          //   options.maxTime = events[target_index+1] ? moment(events[target_index+1].start).format('a h:mm') : undefined;
                          // }
                          else {
                            options.minTime = events[target_index-1] ? moment(events[target_index-1].end).format('a h:mm') : undefined;
                            options.maxTime = events[target_index+1] ? moment(events[target_index+1].start).format('a h:mm') : undefined;
                          }

                          $('#startTime').val(moment(event.start).format('a h:mm'));
                          $('#endTime').val(moment(event.end).format('a h:mm'));

                          $('#startTime').timepicker(options);
                          $('#endTime').timepicker(options);
                          $('#endTime').timepicker('option', 'minTime', moment(event.start).format('a h:mm'));

                          $('#startTime').off('selectTime').on('selectTime', function(e) {

                            var s_time = $('#startTime').timepicker('getTime');
                            var e_time = $('#endTime').timepicker('getTime');

                            $('#startTime').text(moment(s_time).format('a h:mm'));
                            $('#startTime').val(s_time);

                            $('#endTime').text(moment(e_time).format('a h:mm'));
                            $('#endTime').val(e_time);

                            if(moment(s_time).isAfter(moment(e_time)) || moment(s_time).isSame(moment(e_time))){
                              console.log('after');
                              $("#endTime").text(moment(s_time).add(10, 'minutes').format('a h:mm'));
                              $("#endTime").val(moment(s_time).add(10, 'minutes').toDate());
                            }
                            $('#endTime').timepicker('option', 'minTime', moment(s_time).add(10, 'minutes').format('a h:mm'));

                          })

                          $('#endTime').off('selectTime').on('selectTime', function(e) {
                            var s_time = $('#startTime').timepicker('getTime');
                            var e_time = $('#endTime').timepicker('getTime');
                            $('#startTime').text(moment(s_time).format('a h:mm'));
                            $('#startTime').val(s_time);

                            $('#endTime').text(moment(e_time).format('a h:mm'));
                            $('#endTime').val(e_time);
                          })
                        });

                        $("#eventBlockModal").modal();
                        currentEvent = event;

                      },
                      selectHelper: true,
                      selectOverlap: false,
                      eventOverlap: false,
                      dayClick : function(date, jsEvent, view) {
                        if(!isAdd) return false;
                        console.log('dayclick', date, jsEvent, view);
                        if(!start) {
                          // console.log(date);
                          // start = moment(date).subtract(startHour, 'hours');
                          // console.log( start );
                          start = date;
                          console.log('[START DATE]');

                          $("#startMessage").slideUp();
                          $(jsEvent.target).css('background-color', getRandomColor());
                          // var time = date.format('hh:mm:ss');
                          $("#endMessage").slideDown();
                          return false;
                        }

                        if(!end) {
                          if( moment(date) < start ) { alert('시작 시간 보다 끝 시간이 더 빠를 수 없습니다\n다시 선택해 주세요'); return false; }

                          var events = calendar.fullCalendar( 'clientEvents' );
                          var isInclude = false;
                          $.each( events, function(index, event) {
                            var e_start = moment(event.start);
                            var e_end = moment(event.end);
                            if( start < e_start && date > e_end ) { alert('중복된 이벤트를 기입할 수 없습니다!\n다시 선택해 주세요'); isInclude = true; return false;}
                            isInclude = false;
                          });
                          if(isInclude) return false;
                          // end = moment(date).subtract(startHour, 'hours');
                          end = date;
                          console.log('[END DATE]');
                          // console.log(date);
                          // console.log(end);
                          // console.log(end.format());
                          // console.log(new Date(end.format()));

                          $("#endMessage").slideUp();
                          $(jsEvent.target).css('background-color', getRandomColor());
                          $(".fc-widget-content").css('background-color', '');
                          calendar.fullCalendar( 'select', start, end.add(10, 'minutes') );
                          var startDate = moment(start).add(startHour, 'hours').format('a hh:mm');
                          var endDate = moment(end).add(startHour, 'hours').format('a hh:mm');
                          $(".fc-content .fc-time").text( startDate + '-' + endDate );
                          setTimeout( function() {
                            if(confirm('시간: ' + startDate + ' ~ ' + endDate + '\n계속 진행하시겠습니까?')){
                              // calendar.fullCalendar('option', 'unselectAuto', true);
                              console.log(start, end);
                              $('#addBlockModal').on('show.bs.modal', function () {
                                $("#addBlockModal .modal-title").text( startDate + ' - ' + endDate );
                                $('#addBlockModal #addContent').focus()
                              });

                              $('#addBlockModal').on('hidden.bs.modal', function () {
                                console.log('bye');
                                $("#locationSel input[type=radio]").removeAttr("checked");
                                $(".button-wrap input[type=radio]").removeAttr("checked");

                                $("#addContent").val("");
                                $("#locationSel label:first").trigger('click');
                                $("#happySel label:first").trigger('click');
                                $("#satisfactionSel label:first").trigger('click');
                                $("#agitationSel label:first").trigger('click');
                                $("#anxietySel label:first").trigger('click');
                                $("#angerSel label:first").trigger('click');
                                $("#fatigueSel label:first").trigger('click');

                              });

                              $("#addBlockModal").modal();

                              $("#cancelAddBlockButton").click(function(e) {
                                console.log('cancel clicked');
                                $("#cancelAddBlockButton, #addBlockButton").off('click');
                                $("#addButton").removeClass('active');
                                isAdd = false;
                                // calendar.fullCalendar('option', 'selectable', false);
                              });

                              $("#addBlockButton").off('click').click( function(e) {
                                var location = $("#addBlockModal #locationSel input[type=radio]:checked").val();
                                var title = $("#addContent").val();
                                var happy = $("#addBlockModal #happySel input[type=radio]:checked").val();
                                var satisfaction = $("#addBlockModal #satisfactionSel input[type=radio]:checked").val();
                                var agitation = $("#addBlockModal #agitationSel input[type=radio]:checked").val();
                                var anxiety = $("#addBlockModal #anxietySel input[type=radio]:checked").val();
                                var anger = $("#addBlockModal #angerSel input[type=radio]:checked").val();
                                var fatigue = $("#addBlockModal #fatigueSel input[type=radio]:checked").val();
                                var color = getRandomColor();
                                var textColor = '#333';
                                var calendarStart = moment(start).add(startHour, 'hours');
                                var calendarEnd = moment(end).add(startHour, 'hours');


                                if( confirm('추가 하시겠습니까?') ){
                                    calendar.fullCalendar( 'renderEvent', {
                                      // id: '01062610332',
                                      resourceId: '01062610332',
                                      title: title,
                                      content: {
                                        title: title,
                                        location : location,
                                        happy: happy,
                                        satisfaction: satisfaction,
                                        agitation : agitation,
                                        anxiety: anxiety,
                                        anger: anger,
                                        fatigue: fatigue,
                                      },
                                      start: calendarStart.subtract(startHour, 'hours'),
                                      end: calendarEnd.subtract(startHour, 'hours'),
                                      allDay: false,
                                      color: color,
                                      textColor: textColor,
                                      overlap: false,
                                      timezone: 'local'
                                    }, true);

                                    console.log('이벤트들', calendar.fullCalendar( 'clientEvents' ));
                                    console.log(calendar.fullCalendar('getView').type);
                                    dayType = calendar.fullCalendar('getView').type;
                                    console.log(dayType)
                                    let tempData = {};

                                      var startDate = new Date(calendarStart);
                                      console.log('startDate', startDate);
                                      var fullStartDate = startDate.getFullYear() + "-"
                                                        + Number(startDate.getMonth() + 1) + "-"
                                                        + startDate.getDate() + " "
                                                        + startDate.getHours() + ":"
                                                        + startDate.getMinutes() + ":"
                                                        + startDate.getSeconds();
                                      console.log(fullStartDate)
                                      var endDate = new Date(calendarEnd);
                                      console.log('endDate', endDate);
                                      var fullEndDate = endDate.getFullYear() + "-" + Number(endDate.getMonth() + 1) + "-" + endDate.getDate() + " " + endDate.getHours() + ":"+ endDate.getMinutes() + ":"+ endDate.getSeconds();
                                      console.log(fullEndDate)



                                        tempData['day'] = dayType;
                                        tempData['color'] = color;
                                        tempData['textColor'] = textColor;
                                        tempData['startTime'] = startDate;
                                        tempData['endTime'] = endDate;
                                        tempData['startTimeFormat'] = fullStartDate;
                                        tempData['endTimeFormat'] = fullEndDate;
                                        tempData['title'] = title;
                                        tempData['anger'] = anger;
                                        tempData['anxiety'] = anxiety;
                                        tempData['agitation'] = agitation;
                                        tempData['fatigue'] = fatigue;
                                        tempData['happy'] = happy;
                                        tempData['location'] = location;
                                        tempData['satisfation'] = satisfaction;
                                        console.log("[최종 데이터]")
                                        console.log(tempData);
                                        $.ajax({
                                              type: "POST",
                                              url: '/main',
                                              timeout: 1000000,
                                              data : {data : tempData},
                                              success: function (json) {
                                                  console.log(json)
                                                  if(json.success == 200){
                                                    console.log(json);
                                                    dayType = '';
                                                  }else{
                                                    alert(json.message);
                                                    location.href = '/';
                                                  }
                                              },
                                              error: function (e) {
                                                  console.log(e);
                                              }
                                      });


                                }



                                $("#cancelAddBlockButton, #addBlockButton").off('click');
                                calendar.fullCalendar('option', 'selectable', false);
                                $("#addButton").removeClass('active');
                              });
                            }
                            else{
                              calendar.fullCalendar('unselect');
                            }
                            isAdd= false;
                            $("#addButton").removeClass('active');
                          }, 500);
                        }
                      },
                      snapDuration: "00:10:00",
                    });


                  }else{
                    alert("로그인을 해주세요");
                    location.href = '/'
                  }
              },
              error: function (e) {
                  console.log(e);
              }
      });


  $("#dayDisplay").click( function(e) {
    calendar.fullCalendar('changeView', 'firstday');
    calendar.fullCalendar( 'gotoDate', testDate );
  });

  $("#nextdayDisplay").click( function(e) {
    console.log(testNextDate);
    calendar.fullCalendar('changeView', 'secondday');
    calendar.fullCalendar( 'gotoDate',  testNextDate);
  });

  $("#bothdayDisplay").click( function(e) {
    calendar.fullCalendar('changeView', 'bothday');
    calendar.fullCalendar( 'gotoDate', testDate );
  });

  $("#addButton").click( function(e) {
    console.log('add button click');

    if($(this).hasClass('active')){
      $(this).removeClass('active');
      // calendar.fullCalendar('option', 'selectable', false);
      isAdd = false;
      $("#endMessage, #startMessage").slideUp();
    }
    else{
      $(this).addClass('active');
      // calendar.fucontentEditButtonllCalendar('option', 'selectable', true);
      isAdd = true;
      $("#startMessage").slideDown();
      start = null; end = null;
    }
  });

  $("#currentButton").click( function(e) {
    // $(".fc-scroller.fc-time-grid-container").scrollTop($('.fc-now-indicator').position().top - $(window).height() / 2);
    $(".fc-scroller.fc-time-grid-container").animate({
      scrollTop: $('.fc-now-indicator').position().top - $("#calendar").height() / 2
    });
  });

  //initialize current time for the title
  $("#time").html( moment().format("a h:mm") );

  setInterval(function(){
    console.log('rendering every minute');
    var time = moment().format("a h:mm");
    $("#time").html( time );
  },60000);

  $("#updateBlockButton").click ( function(e) {
    console.log(calendar.fullCalendar( 'clientEvents' ));
    var view = calendar.fullCalendar('getView');
    //check if there any changes
    var start_time = $("#startTime").timepicker('getTime');
    var end_time = $("#endTime").timepicker('getTime');
    var location = $("#eventBlockModal #locationContent input[type=radio]:checked").val();
    var title = $("#eventContent").text();
    var happy = $("#eventBlockModal #happyContent input[type=radio]:checked").val();
    var satisfaction = $("#eventBlockModal #satisfactionContent input[type=radio]:checked").val();
    var agitation = $("#eventBlockModal #agitationContent input[type=radio]:checked").val();
    var anxiety = $("#eventBlockModal #anxietyContent input[type=radio]:checked").val();
    var anger = $("#eventBlockModal #angerContent input[type=radio]:checked").val();
    var fatigue = $("#eventBlockModal #fatigueContent input[type=radio]:checked").val();
    if(view.type === 'firstday'){
      console.log('firstday');
      start_time.setMonth( testMonth - 1 );
      start_time.setDate( testStartDate );
      end_time.setMonth( testMonth - 1);
      end_time.setDate( testStartDate );
    }
    else if(view.type === 'secondday'){
      console.log('secondday');
      start_time.setMonth( testMonth - 1 );
      start_time.setDate( testEndDate );
      end_time.setMonth( testMonth - 1);
      end_time.setDate( testEndDate );
    }
    else{
      console.log(view.type);
      // console.log(currentEvent.start.getDate());
      // console.log(currentEvent.start.toDate().getDate());
      start_time.setMonth( testMonth - 1 );
      start_time.setDate( currentEvent.start.toDate().getDate() );
      end_time.setMonth( testMonth - 1);
      end_time.setDate( currentEvent.end.toDate().getDate() );
    }
    var newEvent = {};
    console.log(start_time, end_time);
    // newEvent.start = view.type === 'secondday' ? moment(endTestDate + ' ' + start_time.getHours() + ':' + start_time.getMinutes() + ':00') : moment(startTestDate + ' ' + start_time.getHours() + ':' + start_time.getMinutes() + ':00');
    // newEvent.end = view.type === 'secondday' ? moment(endTestDate + ' ' + end_time.getHours() + ':' + end_time.getMinutes() + ':00') : moment(startTestDate + ' ' + end_time.getHours() + ':' + end_time.getMinutes() + ':00');
    newEvent.start = moment(start_time);
    newEvent.end = moment(end_time);
    newEvent.title = title;
    newEvent.content = {};
    newEvent.content.title = title;
    newEvent.content.location = location;
    newEvent.content.happy = happy;
    newEvent.content.satisfaction = satisfaction;
    newEvent.content.agitation = agitation;
    newEvent.content.anxiety = anxiety;
    newEvent.content.anger = anger;
    newEvent.content.fatigue = fatigue;
    if(newEvent.start.format('a h:mm') === currentEvent.start.format('a h:mm')
        && newEvent.end.format('a h:mm') === currentEvent.end.format('a h:mm')
        && newEvent.content.location === currentEvent.content.location
        && newEvent.content.happy === currentEvent.content.happy
        && newEvent.content.satisfaction === currentEvent.content.satisfaction
        && newEvent.content.agitation === currentEvent.content.agitation
        && newEvent.content.anxiety === currentEvent.content.anxiety
        && newEvent.content.anger === currentEvent.content.anger
        && newEvent.content.fatigue === currentEvent.content.fatigue
        && newEvent.title === currentEvent.title
      ){
      if(confirm('수정사항이 없습니다. 진행하시겠습니까?')){
        $("#eventBlockModal").modal('hide');
      }
    }
    else {
      if(confirm('수정사항이 있습니다. 진행하시겠습니까?')) {
            currentEvent.start = moment(start_time);
            currentEvent.end = moment(end_time);
            currentEvent.title = title;
            currentEvent.content.title = title;
            currentEvent.content.location = location;
            currentEvent.content.happy = happy;
            currentEvent.content.satisfaction = satisfaction;
            currentEvent.content.agitation = agitation;
            currentEvent.content.anxiety = anxiety;
            currentEvent.content.anger = anger;
            currentEvent.content.fatigue = fatigue;
            console.log(currentEvent);
            calendar.fullCalendar( 'updateEvent', currentEvent );


            let tempData = {};
            console.log(currentEvent.start.toDate());
            console.log(new Date(currentEvent.start));
            tempData['startTime'] = currentEvent.start.toDate();
            tempData['endTime'] = currentEvent.end.toDate();
            tempData['startTimeFormat'] = currentEvent.start.toDate();
            tempData['endTimeFormat'] = currentEvent.end.toDate();
            tempData['title'] = title;
            tempData['anger'] = anger;
            tempData['anxiety'] = anxiety;
            tempData['agitation'] = agitation;
            tempData['fatigue'] = fatigue;
            tempData['happy'] = happy;
            tempData['location'] = location;
            tempData['satisfation'] = satisfaction;
            console.log(tempData);
            //수정
            $.ajax({
                    type: "put",
                    url: '/main',
                    data: {data : tempData, id: currentEvent.id},
                    timeout: 1000000,
                    success: function (json) {
                        console.log('success', json)
                        if(json.success == 200){
                          console.log(json);
                          alert(json.message);
                        }else{
                          alert(json.message);
                          location.href = '/';
                        }
                    },
                    error: function (e) {
                        console.log('error', e);
                    }
            });

            updateTotTime();
            $("#eventBlockModal").modal('hide');
      }
    }
    // else {
    //   if ( confirm('수정사항이 있습니다. 진행하시겠습니까?') ){
    //
    //     // currentEvent.start = view.type === 'secondday' || moment(start_time).format('DD') !== moment(currentEvent.start).format('DD') ? moment(start_time).add(1,'days') : moment(start_time);
    //     // currentEvent.end = view.type === 'secondday' || moment(start_time).format('DD') !== moment(currentEvent.start).format('DD') ? moment(end_time).add(1,'days') : moment(end_time);
    //     currentEvent.start = (view.type === 'secondday' || (moment(endTestDate).format('DD') === moment(currentEvent.start).format('DD')) ) ?
    //                                     moment(endTestDate + ' ' + start_time.getHours() + ':' + start_time.getMinutes() + ':00')
    //                                   : moment(startTestDate + ' ' + start_time.getHours() + ':' + start_time.getMinutes() + ':00');
    //     currentEvent.end = (view.type === 'secondday' || (moment(endTestDate).format('DD') === moment(currentEvent.start).format('DD'))) ?
    //                                    moment(endTestDate + ' ' + end_time.getHours() + ':' + end_time.getMinutes() + ':00')
    //                                   : moment(startTestDate + ' ' + end_time.getHours() + ':' + end_time.getMinutes() + ':00');
    //     currentEvent.title = title;
    //     currentEvent.content.title = title;
    //     currentEvent.content.location = location;
    //     currentEvent.content.happy = happy;
    //     currentEvent.content.satisfaction = satisfaction;
    //     currentEvent.content.agitation = agitation;
    //     currentEvent.content.anxiety = anxiety;
    //     currentEvent.content.anger = anger;
    //     currentEvent.content.fatigue = fatigue;
    //     console.log('2');
    //     calendar.fullCalendar( 'updateEvent', currentEvent );
    //     dayType = calendar.fullCalendar('getView').type;
    //     let tempData = {};
    //
    //     var startDate = new Date(currentEvent.start);
    //     var fullStartDate = startDate.getFullYear() + "-" + Number(startDate.getMonth() + 1) + "-" + startDate.getDate() + " " + startDate.getHours() + ":"+ startDate.getMinutes() + ":"+ startDate.getSeconds();
    //     var endDate = new Date(currentEvent.end);
    //     var fullEndDate = endDate.getFullYear() + "-" + Number(endDate.getMonth() + 1) + "-" + endDate.getDate() + " " + endDate.getHours() + ":"+ endDate.getMinutes() + ":"+ endDate.getSeconds();
    //
    //     // tempData['day'] = dayType;
    //     // tempData['color'] = color;
    //     // tempData['textColor'] = textColor;
    //     tempData['startTime'] = startDate;
    //     tempData['endTime'] = endDate;
    //     tempData['startTimeFormat'] = fullStartDate;
    //     tempData['endTimeFormat'] = fullEndDate;
    //     tempData['title'] = title;
    //     tempData['anger'] = anger;
    //     tempData['anxiety'] = anxiety;
    //     tempData['agitation'] = agitation;
    //     tempData['fatigue'] = fatigue;
    //     tempData['happy'] = happy;
    //     tempData['location'] = location;
    //     tempData['satisfation'] = satisfaction;
    //
    //     //수정
    //     $.ajax({
    //             type: "put",
    //             url: '/main',
    //             data: {data : tempData, id: currentEvent.id},
    //             timeout: 1000000,
    //             success: function (json) {
    //                 console.log(json)
    //                 if(json.success == 200){
    //                   console.log(json);
    //                   alert(json.message)
    //                 }else{
    //                   alert(json.message)
    //                 }
    //             },
    //             error: function (e) {
    //                 console.log(e);
    //             }
    //     });
    //
    //     var view = calendar.fullCalendar('getView');
    //     var curDate = view.start.format('DD');
    //     var type = view.type;
    //     var events = calendar.fullCalendar( 'clientEvents' );
    //     var totTime = {
    //       total: 0,
    //     };
    //     console.log('3');
    //     $.each(events, function( index, event ) {
    //       var diff = moment.duration( event.end.diff(event.start) ).asMinutes();
    //       var date = event.start.format('DD');
    //       //if no key, initialize by 0
    //       if( !(date in totTime) ) totTime[date] = 0;
    //       totTime[date] += diff;
    //       totTime['total'] += diff;
    //     });
    //     console.log('4');
    //     if(!events.length) {
    //       $("#spent-time-hm").html('-');
    //     }
    //     else {
    //       var curHour = Math.floor(totTime[curDate] / 60).toFixed(0);
    //       var curMin = (totTime[curDate]) % 60;
    //
    //       curHour = isNaN(curHour) ? 0 : curHour;
    //       curMin = isNaN(curMin) ? 0 : curMin;
    //
    //       var totHour = Math.floor(totTime['total'] / 60).toFixed(0);
    //       var totMin =  totTime['total'] % 60;
    //
    //       totHour = isNaN(totHour) ? 0 : totHour;
    //       totMin = isNaN(totMin) ? 0 : totMin;
    //       $("#spent-time-hm").html(
    //         type !== 'bothday' ? curHour  + '시간 ' + curMin + '분' :
    //                             totHour + '시간 ' + totMin + '분'
    //       );
    //     }
    //
    //
    //     $("#remaining-time").html (
    //       type !== 'bothday' ? '/ 24시간' : '/ 48시간'
    //     );
    //
    //     $("#eventBlockModal").modal('hide');
    //   }
    // }
  });

  $("#deleteBlockButton").click( function(e) {

    if(confirm('삭제하시겠습니까?')) {
      calendar.fullCalendar('removeEvents', function(event) {
        return (event._id === currentEvent._id);
      });

      //삭제
      $.ajax({
              type: "delete",
              url: '/main',
              data: {id : currentEvent.id},
              timeout: 1000000,
              success: function (json) {
                  console.log(json)
                  if(json.succes == 200){
                    console.log(json);
                    alert(json.message);
                  }else{
                    alert(json.message);
                    location.href = '/';
                  }
              },
              error: function (e) {
                  console.log(e);
              }
      });

      updateTotTime();
      $("#eventBlockModal").modal("hide");
    }
  });

  function updateTotTime() {
    var view = calendar.fullCalendar('getView');
    var events = calendar.fullCalendar( 'clientEvents' );
    var totTime = { total: 0, };
    var curDate = view.start.format('DD');
    var type = view.type;
    $.each( events, function( index, event ) {
      var diff = moment.duration( event.end.diff(event.start) ).asMinutes()
      var date = event.start.format('DD');
      if( !(date in totTime) ) totTime[date] = 0;
      totTime[date] += diff;
      totTime['total'] += diff;
    })

      if(!events.length) {
        $("#spent-time-hm").html('-');
      }
      else {
        var curHour = Math.floor(totTime[curDate] / 60).toFixed(0);
        var curMin = (totTime[curDate]) % 60;

        curHour = isNaN(curHour) ? 0 : curHour;
        curMin = isNaN(curMin) ? 0 : curMin;

        var totHour = Math.floor(totTime['total'] / 60).toFixed(0);
        var totMin =  totTime['total'] % 60;

        totHour = isNaN(totHour) ? 0 : totHour;
        totMin = isNaN(totMin) ? 0 : totMin;
        $("#spent-time-hm").html(
          type !== 'bothday' ? curHour  + '시간 ' + curMin + '분' :
                              totHour + '시간 ' + totMin + '분'
        );
      }


      $("#remaining-time").html (
        type !== 'bothday' ? '/ 24시간' : '/ 48시간'
      );
  }
});



function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

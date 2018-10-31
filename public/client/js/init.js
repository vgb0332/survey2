$( document ).ready( function() {
  // global varibles
  var start, end;
  var calendar = $( "#calendar" );
  var currentEvent;
  var isAdd = false;
  var username = '';
  var dayType = '';
  var globalEvent = {};
  var startDateString = '2018-10-25';
  var endDateString = '2018-10-26';
  var startDate = new moment( startDateString );
  var endDate = new moment( endDateString );
  var startHour = 7;
  var fromCurrent = false;
  var _id = 1;
  var current = moment(new Date());
  var defaultDate = startDate;
  var defaultView = 'firstday';

  if( current.isAfter(endDate.clone().add(7, 'hours')) ){
    defaultDate = endDate;
    defaultView = 'secondday';
  }
  //initialize with user data
  $.ajax ( {
    type: 'GET',
    url: '/getData',
    timeout: 1000000,
    success: function(res){
        if(res.success == 200){
          calendarInit( res );
        }
        else {
          alert("로그인 해주세요!");
          location.href = '/';
        }
    },
    error: function (e) {
        console.log(e);
        alert('서버 오류, 잠시 후 다시 시도해주세요');
        location.href = '/';
    }
  });

  //calendar init with user data
  function calendarInit(res) {
    var eventDatas = res.data;
    console.log(eventDatas);
    _id = eventDatas.length ? eventDatas[eventDatas.length-1].id + 1 : 1;
    console.log('wtf', _id);
    var tempArray = [];
    for( var i = 0; i < eventDatas.length; ++i){
      tempArray.push({
        "id":eventDatas[i]._id,
        "title":eventDatas[i].title,
        "start": moment(eventDatas[i].startTimeFormat).subtract( startHour, 'hours' ),
        "end": moment(eventDatas[i].endTimeFormat).subtract( startHour, 'hours' ),
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
      });
    }

    console.log(tempArray);

    calendar.fullCalendar({
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      themeSystem: 'standard',
      defaultView: 'firstday',
      groupByResource: true,
      allDaySlot: false,
      slotDuration: '00:10:00',
      slotLabelFormat: 'HH:mm',
      nowIndicator: true,
      timezone: 'local',
      header: false,
      defaultDate: defaultDate,
      defaultView: defaultView,
      events : tempArray,
      eventBorderColor: '#333',
      selectHelper: true,
      selectOverlap: false,
      eventOverlap: false,
      snapDuration: "00:10:00",
      // maxTime: '23:50:00',
      now: moment().subtract(startHour, 'hours'),
      scrollTime: new Date().getHours()-1+':'+Math.floor(new Date().getMinutes()/10)*10+':'+new Date().getSeconds(),
      height: function() {
        return $(window).outerHeight() - $(".fixed-top").height() - 10;
      },
      views: {
        firstday: {
          type: 'agenda', duration: { days: 1 }, buttonText: '1일',
        },
        secondday: {
          type: 'agenda', duration: { days: 1 }, buttonText: '1일',
        },
        bothday: {
          type: 'agenda', duration: { days: 2 }, buttonText: '2일'
        }
      },

      viewRender: function( view, element ) {

        var title = view.title;
        var type = view.type;
        var view = calendar.fullCalendar( 'getView' );
        var timeLabels = $(element).find('.fc-axis span');
        for( var i = 0; i < timeLabels.length; ++i ){
          var time = $( timeLabels[i] ).text();
          var hour = time.split(':')[0];
          var mins = time.split(':')[1];

          var alteredHour = (Number(hour) + startHour) % 24 ;
          var prefix = alteredHour < 12 ? '오전' : '오후';

          // alteredHour = alteredHour == 0 ? 24 : alteredHour;
          var alteredTime = prefix + ' ' + alteredHour + ':' + mins;

          // $( timeLabels[i] ).text( alteredTime + '(' + time + ')');
          $( timeLabels[i] ).text( alteredTime );
        }


          // $(element).find('.fc-day-header').text( startDate.format('MM/DD(dd)') );



        // calendar.fullCalendar('updateViewSize');
        updateTotTime();
      },

      eventClick:  function( event, element, view ) {
        console.log( event );
        if(isAdd) return false;
        $('#eventBlockModal').off('show.bs.modal').on('show.bs.modal', function () {
          // $('#startTime').timepicker('remove');
          // $('#endTime').timepicker('remove');

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



          // var events = calendar.fullCalendar( 'clientEvents' );
          //
          //
          //             var start_hour = moment( $("#startTime").timepicker('getTime') ).clone().subtract( startHour, 'hours' ).format('HH');
          //             var start_min = moment( $("#startTime").timepicker('getTime') ).clone().subtract( startHour, 'hours' ).format('mm');
          //
          //             var end_hour = moment( $("#endTime").timepicker('getTime') ).clone().subtract( startHour, 'hours' ).format('HH');
          //             var end_min = moment( $("#endTime").timepicker('getTime') ).clone().subtract( startHour, 'hours' ).format('mm');
          //             console.log(currentEvent);
          //             if( currentEvent.start.clone().subtract(startHour, 'hours').format('DD') === startDate.format('DD')
          //               && currentEvent.end.clone().subtract(startHour, 'hours').format('DD') === startDate.format('DD')
          //             ) {
          //               var currentDate = startDate;
          //               var startDate2Compare = moment($("#startTime").timepicker('getTime')).clone().subtract( startHour, 'hours' ).date( startDate.format('DD') );
          //               var endDate2Compare = moment($("#endTime").timepicker('getTime')).clone().subtract( startHour, 'hours' ).date( startDate.format('DD') );
          //             }
          //             else {
          //               var currentDate = endDate;
          //               var startDate2Compare = moment($("#startTime").timepicker('getTime')).clone().subtract( startHour, 'hours' ).date( endDate.format('DD') );
          //               var endDate2Compare = moment($("#endTime").timepicker('getTime')).clone().subtract( startHour, 'hours' ).date( endDate.format('DD') );
          //             }
          //
          //             if( start_hour === end_hour && start_min === end_min){
          //               alert('동일 시간대로 설정하실 수 없습니다!');
          //               return false;
          //             }
          //             // console.log( date2Compare.format('DD HH:mm') );
          //             console.log(startDate2Compare, endDate2Compare);
          //             var isOverlap = false;
          //             $.each( events, function(index, event){
          //               if( startDate2Compare.isBetween(event.start, event.end) || endDate2Compare.isBetween(event.start, event.end)) {
          //                 alert('겹치는 시간대로 설정하실 수 없습니다!');
          //                 isOverlap = true;
          //                 return false;
          //               }
          //             });
          //             if(isOverlap) return false;
          //
          // events.sort(function(a,b) {return a.start - b.start});
          // var target_index = -1;
          // var target_date;
          //
          // var firstdayEvents = events.filter( function( value, index ) {
          //   return moment(value.start).format('DD') === startDate.format('DD');
          // });
          //
          // var seconddayEvents = events.filter( function( value, index ) {
          //   return moment(value.start).format('DD') === endDate.format('DD');
          // });
          //
          // console.log(firstdayEvents, seconddayEvents);
          //
          // $.each( events, function( index, value ) {
          //   if(moment(value.start).isSame(moment(event.start))){
          //     target_index = index;
          //     target_date = moment(value.start).format('DD');
          //   }
          // })
          //
          // console.log(target_date);
          // if(target_date === startDate.format('DD')){
          //   //첫날
          //   $.each( firstdayEvents, function( index, value ) {
          //     if(moment(value.start).isSame(moment(event.start))){
          //       target_index = index;
          //       target_events = firstdayEvents;
          //     }
          //   })
          // }
          // else {
          //   //둘째날
          //   $.each( seconddayEvents, function( index, value ) {
          //     if(moment(value.start).isSame(moment(event.start))){
          //       target_index = index;
          //       target_events = seconddayEvents;
          //     }
          //   })
          // }

          // if(target_index === 0){ //first
          //   console.log('first');
          //   options.minTime = startHour + ':00';
          //   options.maxTime = target_events[target_index + 1] ? target_events[target_index + 1]
          //                   .start.clone()
          //                   .add( startHour, 'hours')
          //                   .subtract( 10, 'minutes')
          //                   .format('HH:mm') : (startHour - 1) + ':50';
          //   $("#startTime").val(event.start.clone().add( startHour, 'hours').format('HH:mm'));
          //   $('#startTime').timepicker(options);
          //   options.minTime = target_events[target_index].start.clone().add( startHour, 'hours').add(10, 'minutes').format('HH:mm');
          //   options.maxTime = target_events[target_index + 1] ?
          //                     target_events[target_index + 1].start.clone().add( startHour, 'hours').format('HH:mm')
          //                     : (startHour) + ':00';
          //   $("#endTime").val(event.end.clone().add( startHour, 'hours').format('HH:mm'));
          //   $('#endTime').timepicker(options);
          // }
          // else if( target_index === target_events.length - 1) { //last
          //   console.log('last');
          //   options.minTime = target_events[target_index - 1].end.clone().add( startHour, 'hours').format('HH:mm');
          //   options.maxTime = (startHour - 1) + ':40';
          //   $("#startTime").val(event.start.clone().add( startHour, 'hours').format('HH:mm'));
          //   $('#startTime').timepicker(options);
          //
          //   options.minTime = target_events[target_index].start.clone().add( startHour, 'hours').format('HH:mm');
          //   options.maxTime = (startHour) + ':00';
          //   $("#endTime").val(event.end.clone().add( startHour, 'hours').format('HH:mm'));
          //   $('#endTime').timepicker(options);
          // }
          // else { //middle
          //   console.log('middle somewhere');
          //   options.minTime = target_events[target_index - 1].end.clone().add( startHour, 'hours').format('HH:mm');
          //   options.maxTime = target_events[target_index + 1] ? target_events[target_index + 1].start.clone().add( startHour, 'hours').subtract(10, 'minutes').format('HH:mm') : (startHour - 1) + ':40';
          //   $("#startTime").val(event.start.clone().add( startHour, 'hours').format('HH:mm'));
          //   $('#startTime').timepicker(options);
          //
          //   options.minTime = target_events[target_index].start.clone().add( startHour, 'hours').add(10, 'minutes').format('HH:mm');
          //   options.maxTime = target_events[target_index + 1] ? target_events[target_index + 1].start.clone().add( startHour, 'hours').format('HH:mm') : (startHour - 1) + ':50';
          //   console.log(options.minTime, options.maxTime);
          //   $("#endTime").val(event.end.clone().add( startHour, 'hours').format('HH:mm'));
          //   $('#endTime').timepicker(options);
          // }

          options.minTime = '07:00';
          options.maxTime = '06:50';
          $("#startTime").val(event.start.clone().add( startHour, 'hours').format('HH:mm'));
          $('#startTime').timepicker(options);

          options.minTime = event.start.clone().add( startHour, 'hours').add(10, 'minutes').format('HH:mm');
          options.maxTime = '07:01';
          $("#endTime").val(event.end.clone().add( startHour, 'hours').format('HH:mm'));
          $('#endTime').timepicker(options);
        });

        $("#eventBlockModal").modal();
        currentEvent = event;
        console.log(currentEvent);
      },

      eventAfterAllRender : function( view ) {
        var type = view.type;
        $("#loader").fadeOut();

        // if(type === 'firstday'){
        //   $(".fc-slats").find('.fc-slats tr[data-time="16:50:00"]')
        //             .after('<tr class="dayDivider">'
        //                       + '<td>'  + '</td>'
        //                       + '<td >' + '<span>' + endDate.format('MM/DD(dd)') + '</span>'
        //                       + '</td>'
        //                   + '</tr>'
        //             );
        //   // $(element).find('.fc-day-header').text( startDate.format('MM/DD(dd)') );
        // } else if(type === 'secondday') {
        //   $(".fc-slats").find('.fc-slats tr[data-time="16:50:00"]')
        //             .after('<tr class="dayDivider">'
        //                       + '<td>'  + '</td>'
        //                       + '<td >' + '<span>' + endDate.clone().add(1, 'day').format('MM/DD(dd)') + '</span>'
        //                       + '</td>'
        //                   + '</tr>'
        //             );
        //   // $(element).find('.fc-day-header').text( endDate.format('MM/DD(dd)') );
        // } else {
        //   $(".fc-slats").find('.fc-slats tr[data-time="16:50:00"]')
        //             .after('<tr class="dayDivider">'
        //                       + '<td>'  + '</td>'
        //                       + '<td class="bothday">' + '<span>' + endDate.format('MM/DD(dd)') + '</span>'
        //                       +           '<span>' + endDate.clone().add(1, 'day').format('MM/DD(dd)') + '</span>'
        //                       + '</td>'
        //                   + '</tr>'
        //             );
        // }
        calendar.fullCalendar('updateViewSize');
      },

      eventRender: function( event, element ) {
        console.log('rendering?');
        console.log(event);
        var time = event.start.add( startHour , 'hours').format('a HH:mm') + ' ~ ' + event.end.add( startHour , 'hours').format('a HH:mm');
        $(element).find('.fc-time').text( time );
        var hours = moment.duration(event.end.diff(event.start)).get("hours");
        var minutes = moment.duration(event.end.diff(event.start)).get("minutes");
        if(hours === 0 && minutes === 10){
          $(element).find('.fc-time').text( event.title );
          $(element).find('.fc-title').remove();
        }
        $(element).find('.fc-event').css('background-color', getRandomColor());

      },

      dayClick: function( date, jsEvent, view ) {
        if( !isAdd ) return false;
        if( !start ) {
          start = date;
          $("#startMessage").slideUp();
          $(jsEvent.target).css('background-color', getRandomColor());
          $("#endMessage").slideDown();
          return false;
        } // end of start

        if( !end ){
          // 시간 가능 여부 체크
          if ( date < start ) {
            alert('시작 시간 보다 끝 시간이 더 빠를 수 없습니다\n다시 선택해 주세요');
            return;
          }

          // 중복 체크
          var events = calendar.fullCalendar('clientEvents');
          var isInclude = false;
          $.each( events, function(index, event) {
            var e_start = moment(event.start);
            var e_end = moment(event.end);
            if( start < e_start && date > e_end ) {
              alert('중복된 이벤트를 기입할 수 없습니다!\n다시 선택해 주세요');
              isInclude = true;
              return false;
            }
            isInclude = false;
          });
          if(isInclude) return false;

          // lets git it
          end = date;
          console.log(end);
          $("#endMessage").slideUp();
          $(jsEvent.target).css('background-color', getRandomColor());
          $(".fc-widget-content").css('background-color', '');

          calendar.fullCalendar( 'select', start, end.add(10, 'minutes') );
          var eventStart = start.add( startHour , 'hours' ).format('a HH:mm');
          var eventEnd = end.add( startHour, 'hours' ).format('a HH:mm');

          $(jsEvent.target).find(".fc-content .fc-time").text( eventStart + ' ~ ' + eventEnd );
          // give a little bit of time drag
          setTimeout( function () {
            var message = '선택한 시간: ' + eventStart + ' ~ ' + eventEnd + '\n계속 진행하시겠습니까?';
            if( confirm( message ) ) {
              console.log( eventStart, eventEnd );
              $("#addBlockModal").off('show.bs.modal').on('show.bs.modal', function() {
                $("#addBlockModal .modal-title").text( eventStart + ' - ' + eventEnd );
                $('#addBlockModal #addContent').focus();
                fromCurrent = true;
              });

              $('#addBlockModal').off('hidden.bs.modal').on('hidden.bs.modal', function () {
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
                // fromCurrent = false;
              });

              $("#addBlockModal").modal();
            }
            else {
              calendar.fullCalendar('unselect');
            }
            isAdd= false;
            $("#addButton").removeClass('active');
          }, 300); // end of timeout
        } // end of end

      },



    })
  } // end of calendar init

  $("#dayDisplay").click( function(e) {
      calendar.fullCalendar('changeView', 'firstday');
      calendar.fullCalendar( 'gotoDate', startDate );
  });

  $("#nextdayDisplay").click( function(e) {
      calendar.fullCalendar('changeView', 'secondday');
      calendar.fullCalendar( 'gotoDate',  endDate);
  });

  $("#bothdayDisplay").click( function(e) {
      calendar.fullCalendar('changeView', 'bothday');
      calendar.fullCalendar( 'gotoDate', startDate );
  });

  $("#addButton").click( function(e) {
      if($(this).hasClass('active')){
        $(this).removeClass('active');
        isAdd = false;
        $("#endMessage, #startMessage").slideUp();
      }
      else{
        $(this).addClass('active');
        isAdd = true;
        $("#startMessage").slideDown();
        start = null;
        end = null;
      }
  });

  $("#cancelAddBlockButton").click(function(e) {
    $("#addButton").removeClass('active');
    isAdd = false;
  });

  $("#addBlockButton").click( function(e) {
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
    var eventStart = start.add(startHour, 'hours');
    var eventEnd = end.add(startHour, 'hours');

    if( confirm('추가 하시겠습니까?') ){
      //moment object immutabiltiy issue need to keep updated with its REAL value
      start.subtract(startHour, 'hours').subtract(startHour, 'hours');
      end.subtract(startHour, 'hours').subtract(startHour, 'hours');

      calendar.fullCalendar( 'renderEvent', {
        title: title,
        id: _id,
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

        start: start,
        end: end,
        allDay: false,
        color: color,
        textColor: textColor,
        overlap: false,
        timezone: 'local'
      }, true);
      start.add( startHour, 'hours')
      end.add( startHour, 'hours')

      console.log(start.format('a HH:mm'), end.format('a HH:mm'));
      console.log(start.format('YYYY-MM-DD HH:mm:ss'));
      dayType = calendar.fullCalendar('getView').type;
      var tempData = {};
      console.log('why?', _id);
      tempData['_id'] = _id++;
      tempData['day'] = dayType;
      tempData['color'] = color;
      tempData['textColor'] = textColor;
      tempData['startTime'] = start.format('YYYY-MM-DD HH:mm:ss');
      tempData['endTime'] = end.format('YYYY-MM-DD HH:mm:ss');
      tempData['startTimeFormat'] = start.format('YYYY-MM-DD HH:mm:ss');
      tempData['endTimeFormat'] = end.format('YYYY-MM-DD HH:mm:ss');
      tempData['title'] = title;
      tempData['anger'] = anger;
      tempData['anxiety'] = anxiety;
      tempData['agitation'] = agitation;
      tempData['fatigue'] = fatigue;
      tempData['happy'] = happy;
      tempData['location'] = location;
      tempData['satisfation'] = satisfaction;

      $.ajax({
            type: "POST",
            url: '/main',
            timeout: 1000000,
            data : {data : tempData},
            success: function (json) {
                console.log(json)
                if(json.success == 200){
                  console.log(json);
                  updateTotTime();
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
    } // end of confirm

    calendar.fullCalendar('option', 'selectable', false);
    $("#addButton").removeClass('active');

  });

  $("#deleteBlockButton").click( function(e) {

    if(confirm('삭제하시겠습니까?')) {
      calendar.fullCalendar('removeEvents', function(event) {
        console.log( event._id , currentEvent._id );
        console.log(currentEvent.id);
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
                  if(json.success == 200){
                    console.log(json);
                    alert(json.message);
                    updateTotTime();

                  }else{
                    alert(json.message);
                    location.href = '/';
                  }
              },
              error: function (e) {
                  console.log(e);
              }
      });
      console.log(calendar.fullCalendar( 'clientEvents' ));
      $("#eventBlockModal").modal("hide");
    }
  });

  function isSameOrBefore( event ) {
    if( event.start.toDate().getTime() === event.end.toDate().getTime() )
      return true;

    return false;
  }
  function isOverlapping( event ) {
      var array = calendar.fullCalendar('clientEvents');
      for(i in array){

          if(array[i].id != event.id){
              if(array[i].start.format('DD') === event.start.format('DD')){
                if (event.end > array[i].start && event.start < array[i].end){
                   return true;
                }
              }

          }
      }
      return false;
  }

  $("#updateBlockButton").click ( function(e) {
    var view = calendar.fullCalendar('getView');
    var start_time = moment( $("#startTime").timepicker('getTime') ).format('HH:mm');
    var end_time = moment( $("#endTime").timepicker('getTime') ).format('HH:mm');
    var location = $("#eventBlockModal #locationContent input[type=radio]:checked").val();
    var title = $("#eventContent").text();
    var happy = $("#eventBlockModal #happyContent input[type=radio]:checked").val();
    var satisfaction = $("#eventBlockModal #satisfactionContent input[type=radio]:checked").val();
    var agitation = $("#eventBlockModal #agitationContent input[type=radio]:checked").val();
    var anxiety = $("#eventBlockModal #anxietyContent input[type=radio]:checked").val();
    var anger = $("#eventBlockModal #angerContent input[type=radio]:checked").val();
    var fatigue = $("#eventBlockModal #fatigueContent input[type=radio]:checked").val();
    var events = calendar.fullCalendar( 'clientEvents' );

    if( start_time !== currentEvent.start.clone().add( startHour, 'hours').format('HH:mm') || end_time !== currentEvent.end.clone().add( startHour, 'hours').format('HH:mm')
      || location !== currentEvent.content.location || title !== currentEvent.title
      || happy !== currentEvent.content.happy || satisfaction !== currentEvent.content.satisfaction
      || agitation !== currentEvent.content.agitation || anxiety !== currentEvent.content.anxiety
      || anger !== currentEvent.content.anger || fatigue !== currentEvent.content.fatigue ) {
        if(confirm('수정사항이 있습니다. 진행하시겠습니까?')) {

            var start_hour = moment( $("#startTime").timepicker('getTime') ).clone().subtract( startHour, 'hours' ).format('HH');
            var start_min = moment( $("#startTime").timepicker('getTime') ).clone().subtract( startHour, 'hours' ).format('mm');

            var end_hour = moment( $("#endTime").timepicker('getTime') ).clone().subtract( startHour, 'hours' ).format('HH');
            var end_min = moment( $("#endTime").timepicker('getTime') ).clone().subtract( startHour, 'hours' ).format('mm');
            console.log(end_hour);
            currentEvent.start.hour(start_hour).minutes(start_min);
            currentEvent.end.hour(end_hour).minutes(end_min);
            if(currentEvent.start.format('DD') !== currentEvent.end.format('DD')){
              currentEvent.end.date( Number(currentEvent.start.format('DD')));

            }
            if( end_hour === '00'){
              console.log('its');
              currentEvent.end.date( Number(currentEvent.start.clone().add(1, 'day').format('DD')));
            }

            currentEvent.title = title;
            currentEvent.content.title = title;
            currentEvent.content.location = location;
            currentEvent.content.happy = happy;
            currentEvent.content.satisfaction = satisfaction;
            currentEvent.content.agitation = agitation;
            currentEvent.content.anxiety = anxiety;
            currentEvent.content.anger = anger;
            currentEvent.content.fatigue = fatigue;
            console.log(currentEvent.start.format('HH:mm'), currentEvent.end.format('HH:mm'));
            if(isOverlapping( currentEvent )){
              alert('중복된 시간입니다');
              return false;
            }
            if(isSameOrBefore( currentEvent )) {
              alert('시작과 끝이 동일한 시간일 수 없습니다');
              return false;
            }
            calendar.fullCalendar( 'updateEvent', currentEvent );

            var tempData = {};
            tempData['startTime'] = currentEvent.start.clone().add(startHour,'hours').format('YYYY-MM-DD HH:mm:ss');
            tempData['endTime'] = currentEvent.end.clone().add(startHour,'hours').format('YYYY-MM-DD HH:mm:ss');
            tempData['startTimeFormat'] = currentEvent.start.clone().add(startHour,'hours').format('YYYY-MM-DD HH:mm:ss');
            tempData['endTimeFormat'] = currentEvent.end.clone().add(startHour,'hours').format('YYYY-MM-DD HH:mm:ss');
            tempData['title'] = title;
            tempData['anger'] = anger;
            tempData['anxiety'] = anxiety;
            tempData['agitation'] = agitation;
            tempData['fatigue'] = fatigue;
            tempData['happy'] = happy;
            tempData['location'] = location;
            tempData['satisfation'] = satisfaction;
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
    else {
        if(confirm('수정사항이 없습니다. 진행하시겠습니까?')){
          $("#eventBlockModal").modal('hide');
        }
    }
  });

  $("#currentButton").click( function(e) {
    $(".fc-scroller.fc-time-grid-container").animate({
      scrollTop: $('.fc-now-indicator').position().top - $("#calendar").height() / 2
    });
  });

  $("#time").html( moment().format("a hh : mm") );

  $("#startTime").on('selectTime', function() {
    var s_time = $('#startTime').timepicker('getTime');
    var e_time = $('#endTime').timepicker('getTime');
    if( s_time >= e_time ){
      $("#endTime").val(moment(s_time).add(10, 'minutes').format('HH:mm'));
      $('#endTime').timepicker('option', 'minTime', moment(s_time).add(10, 'minutes').format('HH:mm'));
    }
    else {
      var minutes = moment.duration(moment(e_time).diff(moment(s_time))).get("minutes");
      if( minutes === 10 ){
        $("#endTime").val(moment(s_time).add(10, 'minutes').format('HH:mm'));
        $('#endTime').timepicker('option', 'minTime', moment(s_time).add(10, 'minutes').format('HH:mm'));
        // $('#endTime').timepicker('option', 'maxTime', moment(s_time).add(10, 'minutes').format('HH:mm'));
        return false;
      }
      $('#endTime').timepicker('option', 'minTime', moment(s_time).add(10, 'minutes').format('HH:mm'));
    }

  });

  $('#endTime').on('selectTime', function(e) {
    var s_time = $('#startTime').timepicker('getTime');
    var e_time = $('#endTime').timepicker('getTime');
    $('#startTime').val( moment(s_time) );
    $('#endTime').val( moment(e_time) );
  })

  setInterval(function(){
    var time = moment().format("a h:mm");
    $("#time").html( time );
  },60000);

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
          type !== 'bothday' ? curHour  + '시간 ' + curMin + '분 ' :
                              totHour + '시간 ' + totMin + '분 '
        );
      }


      $("#remaining-time").html (
        type !== 'bothday' ? '24시간' : '48시간'
      );
  }



}); // end of document ready

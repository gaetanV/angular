/*
 * directive/datePicker.directive.js
 *
 * (c) Gaetan Vigneron
 *  11/05/2015
 *
 */

angular.module('gaetan').directive('datePicker', [
  '$compile',
  function ($compile) {
    var translate = {
      fr: {
        day: [
          'Lundi',
          'Mardi',
          'Mercredi',
          'Jeudi',
          'Vendredi',
          'Samedi',
          'Dimanche',
        ],
        month: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre',
        ],
      },
      en: {
        day: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        month: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'Décember',
        ],
      },
      es: {
        day: [
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
          'Sábado',
          'Domingo',
        ],
        month: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'octubre',
          'Octobre',
          'Noviembre',
          'Dicimbre',
        ],
      },
    };

    function calendar(langue, dateDebut, dateFin) {
      var date = new Date();

      this.date = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };

      this.dateLimit = {
        max: {
          day: this.date.day,
          month: this.date.month,
          year: this.date.year + 1,
        },
        min: {
          day: this.date.day,
          month: this.date.month,
          year: this.date.year - 1,
        },
      };

      this.langage = translate[langue];

      /* TO DO PARAMS max / min */
    }

    calendar.prototype.setLangage = function (langage) {
      this.langage = translate[langue];
    };

    calendar.prototype.nextYear = function () {
      if (this.date.year >= this.dateLimit.max.year) return false;
      this.date.month = 0;
      this.date.year++;
      return true;
    };

    calendar.prototype.nextMonth = function () {
      if (
        this.date.year >= this.dateLimit.max.year &&
        this.date.month >= this.dateLimit.max.month
      )
        return false;
      if (this.date.month !== 11) this.date.month++;
      else this.nextYear();
      return true;
    };

    calendar.prototype.prevYear = function () {
      if (this.date.year <= this.dateLimit.min.year) return false;
      this.date.month = 11;
      this.date.year--;
      return true;
    };

    calendar.prototype.prevMonth = function () {
      if (
        this.date.year <= this.dateLimit.min.year &&
        this.date.month <= this.dateLimit.min.month
      )
        return false;
      if (this.date.month > 0) this.date.month--;
      else this.prevYear();
      return true;
    };

    calendar.prototype.getCountDays = function (date) {
      var days = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
      if (date.year % 4 == 0 && date.year != 1900) {
        days[1] = 29;
      }
      return days[date.month];
    };

    calendar.prototype.getLabelDays = function () {
      return this.langage.day;
    };

    calendar.prototype.getLabelMonths = function () {
      return this.langage.month;
    };

    calendar.prototype.getLabelMonth = function () {
      return this.langage.month[this.date.month];
    };

    calendar.prototype.getMonthDays = function () {
      var result = Array();

      var myDate = new Date();
      myDate.setMonth(this.date.month);
      myDate.setFullYear(this.date.year);
      myDate.setDate(1);

      var prevMonth = {
        count:
          this.date.month - 1 < 0
            ? this.getCountDays({ year: this.date.year - 1, month: 11 })
            : this.getCountDays({
                year: this.date.year,
                month: this.date.month - 1,
              }),
      };

      var curentMonth = {
        dayStart: myDate.getDay(),
        count: this.getCountDays(this.date),
      };

      var count = {
        start: 0,
        end: 0,
      };

      for (var j = 0; j < 6; j++) {
        result[j] = Array();

        for (var i = 0; i < 7; i++) {
          var day = 0;
          var type = 0;
          if (j === 0) {
            if (i <= curentMonth.dayStart) {
              day = prevMonth.count - curentMonth.dayStart + i;
              type = 0;
            } else {
              day = ++count.start;
              type = 1;
            }
          } else {
            if (count.start < curentMonth.count) {
              day = ++count.start;
              type = 1;
            } else {
              day = ++count.end;
              type = 2;
            }
          }
          result[j][i] = {
            day: day,
            type: type,
            month: this.date.month + 1,
            year: this.date.year,
          };
        }
      }
      return result;
    };

    return {
      restrict: 'A',
      require: 'ngModel',
      link: link,
    };

    function link($scope, $element, $attrs, $controller) {
      $element.on('mousedown', mousedown);
      function mousedown(e) {
        var datepickerDom, month, ulDom, liDom;
        var childScope;
        var datepicker = new calendar('fr');

        var init = function () {
          datepickerDom = document.createElement('div');
          datepickerDom.className = 'datePicker';
          month = document.createElement('div');
          month.className = 'dp_labelMonth';
          var node = document.createTextNode('{{year}} {{labelMonth}}');
          month.appendChild(node);
          datepickerDom.appendChild(month);

          ulDom = document.createElement('ul');
          ulDom.className = 'dp_labelDays';
          liDom = document.createElement('li');
          liDom.setAttribute('ng-repeat', 'ligne in labelDay');
          var node = document.createTextNode('{{ligne}}');
          liDom.appendChild(node);
          ulDom.appendChild(liDom);
          datepickerDom.appendChild(ulDom);

          for (var i = 0; i < childScope.calendar.length; i++) {
            ulDom = document.createElement('ul');
            liDom = document.createElement('li');
            liDom.setAttribute('ng-repeat', 'day in calendar[' + i + ']');
            liDom.className = 'typeDay_{{day.type}}';
            liDom.setAttribute('ng-click', 'selectDay(day)');
            var node = document.createTextNode('{{day.day}}');
            liDom.appendChild(node);
            ulDom.appendChild(liDom);
            datepickerDom.appendChild(ulDom);
          }

          $element.after(datepickerDom);
          $compile(datepickerDom)(childScope);
        };

        function setScope() {
          childScope.calendar = datepicker.getMonthDays();
          childScope.labelDay = datepicker.getLabelDays();
          childScope.labelMonth = datepicker.getLabelMonth();
          childScope.year = datepicker.date.year;
        }
        function callback() {
          childScope = $scope.$new();

          setScope();
          childScope.selectDay = function (day) {
            switch (day.type) {
              case 0:
                datepicker.prevMonth();
                setScope();
                break;
              case 1:
                $controller.$setViewValue(
                  day.day + '/' + day.month + '/' + day.year
                );
                $controller.$render();
                break;
              case 2:
                datepicker.nextMonth();
                setScope();
                break;
            }
          };
          init();
        }

        $scope.$apply(callback);
        return false;
      }
    }
    /* TO DO FACTORY OR SERVICE :: AGENDA */
  },
]);

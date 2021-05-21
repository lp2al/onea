import $ from 'jquery';
import datepicker from 'js-datepicker';

const $slider = $('.js-slider');
if ($slider.length) {
  const $slides = $slider.find('.js-slide');
  $slides.each(function() {
    const $this = $(this);
    const src = $this.data('src');
    $this.css({
      backgroundImage: `url(${src})`
    });
  });
}

$('.js-slider-ig').slick({
  centerMode: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
  prevArrow: '<button type="button" class="slick-prev icon-chevron-thin-left"></button>',
  nextArrow: '<button type="button" class="slick-next icon-chevron-thin-right"></button>',
  responsive: [
    {
      breakpoint: 992,
      settings: {
        centerMode: true,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        centerMode: true,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        centerMode: true,
        slidesToShow: 1
        // variableWidth: false
      }
    }
  ]
});

let options = {
  root: document.querySelector('.js-slider-ig'),
  rootMargin: '0px',
  threshold: 1
};

var observer = new IntersectionObserver(function(entries) {
  // isIntersecting is true when element and viewport are overlapping
  entries.forEach(function(el) {
    const $el = $(el.target);
    if (el.isIntersecting === true) {
      console.log($el);
      $el.addClass('is-active');
    } else {
      $el.removeClass('is-active');
    }
  });
}, options);

const newSlides = document.querySelectorAll(`.js-slider-ig .js-slide`);
newSlides.forEach(function(el, index) {
  observer.observe(el);
});

initMapSlider();
initSuiteSlider();
initOfferSlider();

function initMapSlider() {
  const $slider = $('.js-slider-map');
  if (!$slider.length) {
    return;
  }

  const $counter = $slider.find('.js-counter');
  if ($counter.length) {
    $slider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $counter.text(i + '/' + slick.slideCount);
    });
  }

  const $next = $slider.find('.js-next');
  const $prev = $slider.find('.js-prev');
  $next.on('click', function() {
    $slider.slick('slickNext');
  });

  $prev.on('click', function() {
    $slider.slick('slickPrev');
  });

  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  });
}

function initSuiteSlider() {
  const $slider = $('.js-slider-suite');
  if (!$slider.length) {
    return;
  }

  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    prevArrow: '<button type="button" class="slick-prev icon-chevron-thin-left"></button>',
    nextArrow: '<button type="button" class="slick-next icon-chevron-thin-right"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: 'unslick'
      }
    ]
  });
}

function initOfferSlider() {
  const $slider = $('.js-slider-offer');
  if (!$slider.length) {
    return;
  }

  const $counter = $slider.find('.js-counter');
  if ($counter.length) {
    $slider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $counter.text(i + '/' + slick.slideCount);
    });
  }

  const $next = $slider.find('.js-next');
  const $prev = $slider.find('.js-prev');
  $next.on('click', function() {
    $slider.slick('slickNext');
  });

  $prev.on('click', function() {
    $slider.slick('slickPrev');
  });

  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          prevArrow: '<button type="button" class="slick-prev icon-chevron-thin-left"></button>',
          nextArrow: '<button type="button" class="slick-next icon-chevron-thin-right"></button>'
        }
      }
    ]
  });
}

const $open = $('.js-menu-open'),
  $popup = $('.js-menu-popup'),
  $mainMenuItems = $popup.find('.uc-list-menu > .menu-item'),
  $submenu = $popup.find('.sub-menu'),
  $popupBody = $popup.find('.js-menu-popup-body'),
  $close = $popup.find('.js-menu-close');

$mainMenuItems.each(function(index, element) {
  const $this = $(this);
  if ($this.hasClass('menu-item-has-children')) {
    $this.data('target', '#submenu-' + index);
    $this.find('.sub-menu').attr('id', 'submenu-' + index);
    console.log($this.data('target'));
  }
});

const $submenuContainer = $('.js-submenu');
$submenu.appendTo($submenuContainer);

$mainMenuItems.on('mouseover', function() {
  $submenuContainer.find('.sub-menu').removeClass('-active');
  const $this = $(this),
    target = $this.data('target');
  if (target) {
    $(target).addClass('-active');
  }
});

$popupBody.on('mouseleave', function() {
  $submenuContainer.find('.sub-menu').removeClass('-active');
});

$open.on('click', function() {
  const $this = $(this);
  const target = $this.data('target');
  $(target).addClass('-active');
});

$close.on('click', function() {
  $popup.removeClass('-active');
});

(function($) {
  const $tabs = $('.js-tab'),
    $panels = $('.js-panel');

  $tabs.on('click', function() {
    const $this = $(this),
      target = $this.data('target');
    $tabs.removeClass('-active underline');
    $this.addClass('-active underline');
    $panels.removeClass('-active');
    $(target).addClass('-active');
  });

  const date = new Date(),
    datePlusOneDay = moment(date)
      .add(1, 'days')
      .toDate(),
    currentMonth = moment(date).format('MMM'),
    currentDay = moment(date).format('DD');

  function datepicker(selector, picker2 = null) {
    const $datepicker = $(selector),
      $month = $datepicker.find('.js-month'),
      $day = $datepicker.find('.js-day');

    $month.html(moment(date).format('MMM'));
    $day.html(moment(date).format('DD'));

    const picker = datepicker($datepicker[0], {
      minDate: date,
      onSelect: function(instance, date) {
        if (picker2) {
          picker;
        }
        $month.html(moment(date).format('MMM'));
        $day.html(moment(date).format('DD'));

        // $this.data('date', moment(date).format('YYYY-MM-DD'));
      }
    });

    $month.on('click', function(e) {
      e.stopPropagation();
      picker.show();
    });
  }

  // const picker = datepicker( $checkinDatepicker[0], {
  //   minDate: date,
  //   onSelect: function(instance, date) {
  //     $month.html(moment(date).format('MMM'));
  //     $day.html(moment(date).format('DD'));
  //     $this.data('date', moment(date).format('YYYY-MM-DD'));
  //   },

  // $datepicker.each(function(index, el) {
  //   const $this = $(this);
  //   let $month = $this.find('.js-month'),
  //     $day = $this.find('.js-day'),
  //     isCheckOut = $this.hasClass('js-checkout');
  //   $day.html(currentDay);
  //   $month.html(currentMonth);

  //   const picker = datepicker($this[0], {
  //     minDate: isCheckOut ? datePlusOneDay : date,
  //     onSelect: function(instance, date) {
  //       $month.html(moment(date).format('MMM'));
  //       $day.html(moment(date).format('DD'));
  //       $this.data('date', moment(date).format('YYYY-MM-DD'));
  //       console.log($this.data('date'));
  //       console.log(instance);
  //     }
  //   });

  //   if (isCheckOut) {
  //     picker.setDate(moment(datePlusOneDay).toDate(), true);
  //     $month.html(moment(date).format('MMM'));
  //     $day.html(moment(datePlusOneDay).format('DD'));
  //   }
})(jQuery);

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
Swiper.use([Navigation, Pagination]);
const swiper = new Swiper(".grid__swiper", {
  slidesPerView: 1,
  spaceBetween: 15,

  navigation: {
    prevEl:'.grid__arrow--prev',
    nextEl:'.grid__arrow--next'
  }
});

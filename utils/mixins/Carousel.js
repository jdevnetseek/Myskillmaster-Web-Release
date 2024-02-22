export default {
  computed: {
    carouselSettings() {
      return {
        arrows: false,
        dots: false,
        infinite: false,
        centerMode: false,
        variableWidth: true,
        adaptiveHeight: true,
        swipeToSlide: true,
        touchThreshold: 7.5
      }
    }
  }
}

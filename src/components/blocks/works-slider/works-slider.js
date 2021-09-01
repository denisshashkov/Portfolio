import Thumbnails from "../thumbnails/thumbnails";
import xhr from "../../../scripts/xhrRequests";
import EventBus from "../../../scripts/eventBus";
import thumbnails from "../thumbnails/thumbnails";

export default {
  template: "#works-slider-template",
  data() {
    return {
      works: [0],
      activeWork: 0,
    };
  },
  components: {
    vcThumbnails: Thumbnails,
  },
  methods: {
    workFunc(work, index) {
      work.photo = "https://webdev-api.loftschool.com/" + work.photo;
      work.techs = work.techs.split(",");
      work.index = index;

      return work;
    },
    nextSlide() {
      setTimeout(() => this.activeWork--, 200);
    },
    prevSlide() {
      setTimeout(() => this.activeWork++, 200);
    },
  },


  mounted() {
    xhr("get", "works/343")
      .then((works) => works.map((work, index) => this.workFunc(work, index)))
      .then((works) => (this.works = works))
      .then(() => {
        EventBus.$emit("work", this.works[this.activeWork]);
      });

    EventBus.$on("changeSlide", (index) => {
      this.activeWork = +index;
    });
  },
  watch: {
    activeWork: function () {
      EventBus.$emit("work", this.works[this.activeWork]);
    },
  },

  computed: {
    reversedWorks() {
      const works = [...this.works];
      return works.reverse();
    }
  },

};
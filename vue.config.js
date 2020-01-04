// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/variables/colors.scss";
          @import "@/assets/styles/variables/theme.scss";
          @import "@/assets/styles/variables/fonts.scss";
          @import "@/assets/styles/grid.scss";
          @import "@/assets/styles/mixins.scss";
        `
      }
    }
  }
};

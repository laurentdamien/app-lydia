import Config from "@/config/config";

export let getBaseUrl = {
  computed: {
    baseUrl: () => {
      return Config.BASE_URL;
    }
  }
};

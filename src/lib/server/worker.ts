export default {
  async scheduled() {
    try {
      console.log("web-scrapper running");

      await fetch("https://countries-compared.pages.dev/api/update-rankings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("web-scrapper complete");
    } catch (error) {
      console.log({ error });
    }
  },
};

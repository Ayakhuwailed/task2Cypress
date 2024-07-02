describe("API testing", () => {
  const key = "bd7804d00c1a41c784a50313240207";

  it("check the status code when the user sends valid API", () => {
    cy.request({
      method: "GET",
      url: `http://api.weatherapi.com/v1/current.json?key=${key}&q=London&aqi=no`,
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it("check the location name when the user sends valid API with city name all small letter ", () => {
    cy.request({
      url: `http://api.weatherapi.com/v1/current.json?key=${key}&q=london&aqi=no`,
      method: "GET",
    }).then((res) => {
      expect(res.body.location.name).to.eq("London");
    });
  });

  it("check the response body when the user sends invalid city and keeps key input field empty", () => {
    cy.request({
      url: `http://api.weatherapi.com/v1/current.json?key=&q=l&aqi=no`,
      method: "GET",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(403);
    });
  });

  it("check the error message when the user sends invalid city name", () => {
    cy.request({
      method: "GET",
      url: `http://api.weatherapi.com/v1/current.json?key=${key}&q=l&aqi=no`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.error.message).to.contain("No matching location found");
    });
  });
});

export default class GeneralSection {
  get titleDescriptionButton() {
    return cy.get(".gh-setting-first button.gh-btn").contains("Expand");
  }

  get titleDescriptionTitleInput() {
    return cy.get(".gh-setting-first input").first();
  }

  get titleDescriptionDescInput() {
    return cy.get(".gh-setting-first input").eq(1);
  }

  get saveButton() {
    return cy.get(".view-actions button");
  }

  get savedSettingsButton() {
    return cy.get("button").contains("Saved");
  }

  get errorMessage() {
    // return cy.get("p.response:not(:hidden)");
    return cy.get("p.response");
  }

  buscarError(mensaje) {
    return cy.get("p.response").contains(mensaje);
  }

  urlMockaroo(testMockaroo) {
    const apiKey = "e7649c20";
    const URL = `https://my.api.mockaroo.com/${testMockaroo}?key=${apiKey}`;
    return URL;
  }

  editTitleDescriptionMockaroo(testMockaroo) {
    cy.request(this.urlMockaroo(testMockaroo)).then((response) => {
      const description = response.body[0].description;

      this.titleDescriptionButton.click();
      cy.wait(1000);
      this.titleDescriptionDescInput.click();
      this.titleDescriptionDescInput
        .clear({ force: true })
        .type(description, { force: true });
      this.titleDescriptionDescInput.blur();
    });
  }
}

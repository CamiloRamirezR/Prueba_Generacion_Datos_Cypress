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

    buscarError(mensaje) {
        return cy.get('p.response').contains(mensaje)
    }
}

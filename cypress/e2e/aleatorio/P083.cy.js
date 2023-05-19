import { faker } from "@faker-js/faker";

import PostSection from "../../support/elements/postsSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";

const postSection = new PostSection();
const adminMenu = new AdminMenu();
const site = new Site();

describe("Edición del campo Publish date con día siguiente a la fecha actual", () => {
  it("Edición del campo Publish date con día siguiente a la fecha actual", () => {
    /* 
    -------------
      GIVEN
    -------------
    */

    // Autentica un usuario que puede crear posts
    cy.login();

    // Va a la pestaña Posts
    adminMenu.postTab.click();
    cy.wait(1000);

    /* 
    -------------
      WHEN
    -------------
    */

    // Crea el post
    const title = faker.lorem.lines(1);
    let content = faker.lorem.paragraphs(1);
    postSection.createPost(title, content);

    // Publica el post
    postSection.publishPost();

    // Salir y volver a entrar al post
    postSection.goBackToPostsSection.click();
    postSection.postInList(title).click();

    // Edita el publish date
    postSection.editorSettingsButton.click();
    postSection.settingsPublishDate.click();

    const date = new Date();
    date.setDate(date.getDate() + 1);
    postSection.settingsPublishDate.clear().type(date.toLocaleDateString('en-CA'), {parseSpecialCharSequences: false});
    postSection.settingsPublishDate.blur()

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que el mensaje de error exista
    postSection.settingsTimePickerError.should('exist')
  });
});

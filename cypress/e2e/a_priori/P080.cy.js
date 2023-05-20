import PostSection from "../../support/elements/postsSection";
import AdminMenu from "../../support/elements/adminMenu";
import Site from "../../support/elements/site";
import jsonData from "./data/post_settings.json";

const postSection = new PostSection();
const adminMenu = new AdminMenu();

describe("Edición del campo Excerpt con 301 caracteres", () => {
  it("Edición del campo Excerpt con 301 caracteres", () => {
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
    const title = jsonData.title;
    let content = jsonData.content;
    postSection.createPost(title, content);

    // Publica el post
    postSection.publishPost();

    // Salir y volver a entrar al post
    postSection.goBackToPostsSection.click();
    postSection.postInList(title).click();

    // Edita el exerpt
    postSection.editorSettingsButton.click();
    postSection.settingsExerpt.click();
    const exerpt = jsonData.exerpt301;

    postSection.settingsExerpt.clear().type(exerpt);
    postSection.contentCover.click();
    postSection.editorUpdateDropdown.click();
    postSection.editorUpdateButton.click();
    cy.wait(3000);

    /* 
    -------------
      THEN
    -------------
    */
    // Verifica que aparezca mensaje de error
    postSection.buscarError("Excerpt cannot be longer than 300 characters");
  });
});

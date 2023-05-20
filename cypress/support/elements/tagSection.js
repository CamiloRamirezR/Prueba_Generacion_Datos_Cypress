export default class TagSection {
  get newTagButton() {
    return cy.get("a").contains("New tag");
  }

  get saveTag() {
      return cy.get("button").contains("Save");
  }

  get slackTag() {
    //return cy.get("button").contains("Save");
    return cy.get('a.ember-view[href="#/settings/integrations/slack/"]')
    //return cy.get('apps-card-left',  {force : true});
}

  get editorContainerTitle() {
    return cy.get('#tag-name',  {force : true});
  }

  get editorContainerURL() {
    return cy.get('input[name="slack[url]"].ember-text-field.gh-input',  {force : true});
  }

  get editorContainerUser() {
    return cy.get('input[name="slack[username]"].ember-text-field.gh-input',  {force : true});
  }

  get editorContainerSlug() {
    return cy.get('#tag-slug');
  }

  get editorContainerDescription() {
      return cy.get('#tag-description');
  }

  get editorDeleteTagButton() {
    return cy.get("button").contains("Delete tag");
  }

  get editorDeletePostButton() {
    return cy.get("button").contains("Delete tag");
  }

  get editorRetryTagButton() {
    return cy.get("button").contains("Retry");
  }

  get modalDeleteButton() {
    return cy.get('.modal-content button.gh-btn-red', {force : true})
  }

  get msgErrorTitle() {
    this.editorContainerTitle.click();
    return cy.get('span.error p.response').contains("Tag names cannot be longer than 191 characters.");
    }

  get msgErrorTitleEmpty() {
    this.editorContainerTitle.click();
    return cy.get('span.error p.response').contains("You must specify a name for the tag.");
    }

  tagInList(title) {
      return cy
        .get("li.gh-list-row.gh-tags-list-item", {force: true})
        .filter(`:contains(${title})`)
        .first();
    }

    tagInListLong(title) {
      return cy
        .get("a.ember-view.gh-list-data.middarkgrey.f8.gh-tag-list-slug.gh-list-cellwidth-10 span", {force: true})
        .filter(`:contains(${title})`)
        .first();
    }
    
  createTag(title, slug , content) {
    this.newTagButton.click();
    cy.wait(1000);
    this.editorContainerTitle.type(title);
    cy.wait(5000);
    this.editorContainerSlug.type(slug);
    this.editorContainerDescription.type(content);
  }

  createHeader(URL, user) {
    cy.wait(1000);

    this.editorContainerURL.clear();
    this.editorContainerURL.type(URL);
    this.editorContainerUser.clear();
    this.editorContainerUser.type(user);
    
    cy.wait(2000);
  }

  updateTag(title) {
    this.editorContainerTitle.clear().type(title, {force: true});
  }

  updateTagSlug(slug) {
    this.editorContainerSlug.clear();    
    this.editorContainerSlug.click();
    this.editorContainerTitle.click();    
    this.editorContainerSlug.type(slug);  
  }

  updateTagSlugEmpty() {
    this.editorContainerSlug.clear();
  }

  updateTagDescriptionEmpty() {
    this.editorContainerDescription.clear();
  }

  updateTagDescription(content) {
    this.editorContainerDescription.clear();
    this.editorContainerTitle.click();  
    this.editorContainerDescription.type(content);
  }

  urlMockaroo (testMockaroo)
  { 
    const apiKey = 'e7649c20';
    const URL = `https://my.api.mockaroo.com/${testMockaroo}?key=${apiKey}`
    return (URL)
  }

  getDinamicTagMockaroo(testMockaroo) { 
    return cy.request(this.urlMockaroo(testMockaroo)).then((response) => {
      const { title, slug, description } = response.body;
  
      return {
        title,
        slug,
        description
      };
    });
  }

  getDinamicCodeMockaroo(testMockaroo) { 
    return cy.request(this.urlMockaroo(testMockaroo)).then((response) => {
      const { URL, user } = response.body;
  
      return {
        URL,
        user
      };
    });
  }



  dataMockaroo (testMockarooData)
  { 
    const dataPrueba = require(`../../e2e/a_priori/data/${testMockarooData}`)
    return (dataPrueba)
  }

  tagInListMockaroo(testMockarooData) {
     return this.dataMockaroo(testMockarooData)[0].title; 
    }


  createTagMockarooData(title, slug , content) {
    this.newTagButton.click();
    this.editorContainerTitle.type(title); 
    cy.wait(2000);   
    this.editorContainerSlug.click();
    this.editorContainerTitle.click();    
    this.editorContainerSlug.clear();    
    this.editorContainerSlug.click();
    this.editorContainerTitle.click();    
    this.editorContainerSlug.type(slug);    
    this.editorContainerDescription.type(content);
  }
  
  createTagMockarooDataTitle(slug , content) {
    this.newTagButton.click();
    cy.wait(2000);   
    this.editorContainerSlug.click();
    this.editorContainerTitle.click();    
    this.editorContainerSlug.clear();    
    this.editorContainerSlug.click();
    this.editorContainerTitle.click();    
    this.editorContainerSlug.type(slug);    
    this.editorContainerDescription.type(content);
  } 


  editTagMockarooDataTitle(slug , content) {    
    cy.wait(2000);   
    this.editorContainerTitle.clear(); 
    this.editorContainerSlug.click();
    this.editorContainerTitle.click();    
    this.editorContainerSlug.clear();    
    this.editorContainerSlug.click();
    this.editorContainerTitle.click();    
    this.editorContainerSlug.type(slug);    
    this.editorContainerDescription.type(content);
  }

  createTagMockarooDataDescription(title, slug) {
    this.newTagButton.click();
    this.editorContainerTitle.type(title); 
    cy.wait(2000);   
    this.editorContainerSlug.click();
    this.editorContainerTitle.click();    
    this.editorContainerSlug.clear();    
    this.editorContainerSlug.click();
    this.editorContainerTitle.click();    
    this.editorContainerSlug.type(slug);
  } 

  getDataTagMockaroo(testMockarooData) {
    const tagData = this.dataMockaroo(testMockarooData);
    return tagData;
  }

  
}
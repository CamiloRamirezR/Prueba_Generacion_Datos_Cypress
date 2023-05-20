import AdminMenu from "../../support/elements/adminMenu";
import StaffSection from "../../support/elements/staffSection";
import { faker } from "@faker-js/faker";

const adminMenu = new AdminMenu();
const staffSection = new StaffSection();
const website = faker.internet.url();

describe("Editar website de usuario", () => {
    it('Editar el website de usuario con un expresión válida', () => {
        /*
    -------------
    GIVEN
    -------------
         */
        // Autenticar usuario
        cy.login();
        // Ir a la pestaña Staff
        adminMenu.staffTab.click();
        cy.wait(1000);
        staffSection.ghostStaffMember.click();
        cy.wait(1000);
        /*
    -------------
    WHEN
    -------------
         */
        // Editar el website de usuario
        staffSection.websiteField.clear();
        cy.wait(1000);
        staffSection.websiteField.type(website, { force: true });
        cy.wait(1000);
        // Guardar cambios
        staffSection.saveChanges.click();
        /*
    -------------
    THEN
    -------------
         */
        // Verificar que el website de usuario se haya actualizado
        cy.reload();
        cy.wait(1000);
        staffSection.websiteField.should('have.value', website);
        // Retornar a condiciones iniciales
        staffSection.websiteField.clear();
        cy.wait(1000);
        staffSection.websiteField.type('https://ghost.org', { force: true });
        staffSection.saveChanges.click();
    });
});
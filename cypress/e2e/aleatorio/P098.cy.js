import AdminMenu from "../../support/elements/adminMenu";
import StaffSection from "../../support/elements/staffSection";
import { faker } from "@faker-js/faker";

const adminMenu = new AdminMenu();
const staffSection = new StaffSection();
const city = faker.address.city();
const country = faker.address.country();
const location = `${city}, ${country}`;

describe("Editar location de usuario", () => {
    it('Editar el location de usuario con un expresión válida', () => {
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
        // Editar el location de usuario
        staffSection.userLocationField.clear();
        cy.wait(1000);
        staffSection.userLocationField.type(location, { force: true });
        cy.wait(1000);
        // Guardar cambios
        staffSection.saveChanges.click();
        /*
    -------------
    THEN
    -------------
         */
        // Verificar que el location de usuario se haya actualizado
        cy.reload();
        cy.wait(1000);
        staffSection.userLocationField.should('have.value', location);
        // Retornar a condiciones iniciales
        staffSection.userLocationField.clear();
        cy.wait(1000);
        staffSection.userLocationField.type('Earth', { force: true });
        staffSection.saveChanges.click();
    });
});
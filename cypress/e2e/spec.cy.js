describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit('')

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}')

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software')
  })

  it('Insere e deleta uma tarefa', () => {
    cy.visit('')

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}')

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click()

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0)
  })

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('')

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}')

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click()

    cy.get('[data-cy=filter-active-link]')
      .click()
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES')

    cy.get('[data-cy=filter-completed-link]')
      .click()
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES')

    cy.get('[data-cy=filter-all-link]')
      .click()
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2)
  })

  it('Marca e desmarca uma tarefa', () => {
    cy.visit('')

    cy.get('[data-cy=todo-input]')
      .type('Ler Cap.-8 do livro{enter}')

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('not.have.class', 'completed')

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click()

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.class', 'completed')

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click()

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('not.have.class', 'completed')
  })

  it('Remove a primeira tarefa sem afetar as demais', () => {
    cy.visit('')

    cy.get('[data-cy=todo-input]')
      .type('Comprar café{enter}')
      .type('Preparar slides da aula{enter}')

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2)

    cy.get('[data-cy=todos-list] > li')
      .first()
      .within(() => {
        cy.get('[data-cy=remove-todo-btn]')
          .invoke('show')
          .click()
      })

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Preparar slides da aula')
  })

  it('Mantém as tarefas após recarregar a página', () => {
    cy.visit('')

    cy.get('[data-cy=todo-input]')
      .type('Estudar Cypress{enter}')
      .type('Enviar TP2{enter}')

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2)

    cy.reload()

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2)
      .first()
      .should('have.text', 'Estudar Cypress')
  })
})
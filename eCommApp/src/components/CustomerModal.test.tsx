import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from './Header';

const renderHeader = () => render(
    <MemoryRouter>
        <Header />
    </MemoryRouter>,
);

const openCustomerModal = async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole('button', { name: 'Cadastrar cliente' }));
    return user;
};

describe('customer registration modal', () => {
    it('opens an accessible dialog with CPF, Nome, and Apelido fields', async () => {
        await openCustomerModal();

        expect(screen.getByRole('dialog', { name: 'Cadastro de cliente' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'CPF' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Nome' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Apelido' })).toBeInTheDocument();
    });

    it('requires all customer fields before submission', async () => {
        const user = await openCustomerModal();
        const cpf = screen.getByRole('textbox', { name: 'CPF' });
        const name = screen.getByRole('textbox', { name: 'Nome' });
        const nickname = screen.getByRole('textbox', { name: 'Apelido' });

        expect(cpf).toBeRequired();
        expect(name).toBeRequired();
        expect(nickname).toBeRequired();

        await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cadastrar cliente' }));

        expect(cpf).toBeInvalid();
        expect(name).toBeInvalid();
        expect(nickname).toBeInvalid();
        expect(screen.queryByText('Cliente cadastrado com sucesso.')).not.toBeInTheDocument();
    });

    it('shows success and clears the form after valid submission', async () => {
        const user = await openCustomerModal();
        const cpf = screen.getByRole('textbox', { name: 'CPF' });
        const name = screen.getByRole('textbox', { name: 'Nome' });
        const nickname = screen.getByRole('textbox', { name: 'Apelido' });

        await user.type(cpf, '123.456.789-09');
        await user.type(name, 'Maria Silva');
        await user.type(nickname, 'Mari');
        await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cadastrar cliente' }));

        expect(screen.getByRole('status')).toHaveTextContent('Cliente cadastrado com sucesso.');
        expect(cpf).toHaveValue('');
        expect(name).toHaveValue('');
        expect(nickname).toHaveValue('');
    });

    it.each([
        ['cancel button', async (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole('button', { name: 'Cancelar' }))],
        ['close button', async (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole('button', { name: 'Fechar cadastro' }))],
    ])('closes the modal with the %s', async (_action, closeModal) => {
        const user = await openCustomerModal();

        await closeModal(user);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes the modal when the backdrop is clicked', async () => {
        await openCustomerModal();
        const backdrop = screen.getByRole('dialog').parentElement;

        expect(backdrop).not.toBeNull();
        fireEvent.click(backdrop!);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
});
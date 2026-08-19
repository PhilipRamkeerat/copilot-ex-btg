import { useState } from 'react';

interface CustomerModalProps {
    onClose: () => void;
}

const CustomerModal = ({ onClose }: CustomerModalProps) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true);
        event.currentTarget.reset();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal-content customer-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="customer-modal-title"
                onClick={event => event.stopPropagation()}
            >
                <h2 id="customer-modal-title">Cadastro de cliente</h2>
                <p>Preencha os dados abaixo para cadastrar um novo cliente.</p>
                <form onSubmit={handleSubmit} className="customer-form">
                    <label htmlFor="customer-cpf">CPF</label>
                    <input
                        id="customer-cpf"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        inputMode="numeric"
                        pattern="[0-9.\\-]{14}"
                        maxLength={14}
                        required
                    />

                    <label htmlFor="customer-name">Nome</label>
                    <input
                        id="customer-name"
                        name="name"
                        type="text"
                        placeholder="Nome completo"
                        required
                    />

                    <label htmlFor="customer-nickname">Apelido</label>
                    <input
                        id="customer-nickname"
                        name="nickname"
                        type="text"
                        placeholder="Como deseja ser chamado"
                        required
                    />

                    {isSubmitted && (
                        <p className="customer-form-success" role="status">
                            Cliente cadastrado com sucesso.
                        </p>
                    )}

                    <div className="customer-form-actions">
                        <button type="submit">Cadastrar cliente</button>
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
                <button type="button" onClick={onClose} className="close-button" aria-label="Fechar cadastro">
                    ×
                </button>
            </div>
        </div>
    );
};

export default CustomerModal;

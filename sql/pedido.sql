CREATE TABLE pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    produtos_ids JSON NOT NULL,
    preco_total DECIMAL(10, 2) NOT NULL,
    metodo_pagamento ENUM('dinheiro', 'cartao_credito', 'cartao_debito', 'pix', 'transferencia') NOT NULL,
    status ENUM('pendente', 'confirmado', 'preparando', 'pronto', 'entregue', 'cancelado') DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    token_pedido INT,
    status ENUM('pendente', 'confirmado', 'preparando', 'despachado', 'entregue', 'cancelado')

    CONSTRAINT fk_pedido_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id_cliente)
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
);

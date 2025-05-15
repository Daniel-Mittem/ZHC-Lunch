-- Active: 1746788373995@@127.0.0.1@4032
-- INSERIMENTO RISTORANTI
INSERT INTO ristorante (nome) VALUES
('Biang Biang Ramen'),
('Bar Marjgio');

-- INSERIMENTO FASCE ORARIE
INSERT INTO fasce_orarie (ristorante_id, orario_inizio, orario_fine) VALUES
(1, '12:00', '12:30'),
(1, '12:30', '13:00'),
(2, '12:00', '12:30'),
(2, '13:30', '14:00');

-- INSERIMENTO PIATTI
INSERT INTO piatto (ristorante_id, nome, tipo, prezzo, max_ingredienti) VALUES
(1, 'Tofu Brasato', 'secondo', 7.50, NULL),
(1, 'Manzo Brasato', 'secondo', 8.00, NULL),
(2, 'Lasagne alla bolognese', 'primo', 6.50, NULL),
(2, 'Tortellini panna e prosciutto', 'primo', 6.50, NULL),
(2, 'Piadina personalizzata', 'piadina', 4.50, 5);

-- INSERIMENTO INGREDIENTI
INSERT INTO ingredienti (nome) VALUES
('Prosciutto'),
('Formaggio'),
('Rucola'),
('Pomodoro'),
('Maionese'),
('Insalata');

-- ASSOCIAZIONE INGREDIENTI A PIADINA
INSERT INTO piatto_ingredienti (piatto_id, ingredienti_id) VALUES
(5, 1), -- Prosciutto
(5, 2), -- Formaggio
(5, 3), -- Rucola
(5, 4), -- Pomodoro
(5, 5), -- Maionese
(5, 6); -- Insalata

-- INSERIMENTO UTENTE AZIENDALE
INSERT INTO utente (email, ospite, nome, token, token_scadenza) VALUES
('Daniel.Mittem@zucchettihc.it', FALSE, 'Daniel Mittem', 'token123', NOW() + INTERVAL '1 day');

-- INSERIMENTO OSPITE (invito)
INSERT INTO inviti_ospiti (id_invitante, token_ospite, scade_il, usato) VALUES
(1, 'ospite123', NOW() + INTERVAL '6 hour', FALSE);

-- INSERIMENTO UTENTE OSPITE
INSERT INTO utente (email, ospite, nome, token, token_scadenza) VALUES
('Dan.Mittem@guest.it', TRUE, 'Dan Mittem', 'ospite123', NOW() + INTERVAL '6 hour');

-- INSERIMENTO ORDINE UTENTE AZIENDALE
INSERT INTO ordini (utente_id, ristorante_id, fascia_oraria_id, stato) VALUES
(1, 1, 1, 'in_attesa');

-- PIATTO ORDINATO DA UTENTE AZIENDALE
INSERT INTO dettagli_ordine (ordine_id, piatto_id, quantita) VALUES
(1, 1, 1); -- Tofu Brasato

-- INSERIMENTO ORDINE UTENTE OSPITE
INSERT INTO ordini (utente_id, ristorante_id, fascia_oraria_id, stato) VALUES
(2, 2, 4, 'in_attesa');

-- PIATTO PERSONALIZZATO DA OSPITE
INSERT INTO dettagli_ordine (ordine_id, piatto_id, quantita, note) VALUES
(2, 5, 1, 'Extra pomodoro');

-- INGREDIENTI EXTRA AGGIUNTI DA OSPITE
INSERT INTO dettagli_ordine_ingredienti (dettaglio_ordine_id, ingrediente_id) VALUES
(2, 4), -- Pomodoro
(2, 2), -- Formaggio
(2, 1); -- Prosciutto

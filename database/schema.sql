-- Active: 1746788373995@@127.0.0.1@4032
-- UTENTI
CREATE TABLE utente (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL CHECK (email LIKE '%@zucchettihc.it'),
    ospite BOOLEAN DEFAULT FALSE,
    nome VARCHAR(100) NOT NULL,
    token VARCHAR(255),
    
    token_scadenza TIMESTAMP,
    creato_il TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RISTORANTE
CREATE TABLE ristorante (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    visibile BOOLEAN DEFAULT TRUE
)

--FASCE ORARIE
CREATE TABLE fasce_orarie (
    id SERIAL PRIMARY KEY,
    ristorante_id INTEGER REFERENCES ristorante(id),
    orario_inizio TIME NOT NULL,
    orario_fine TIME NOT NULL
);

-- MENU PIATTI
CREATE TABLE piatto (
    id SERIAL PRIMARY KEY,
    ristorante_id INTEGER REFERENCES ristorante(id),
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50), --primo, secondo
    prezzo DECIMAL(6,2),
    max_ingredienti INTEGER DEFAULT NULL
);

-- INGREDIENTI 
CREATE TABLE ingredienti (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- RELAZIONE PIATTO - INGREDIENTI
CREATE TABLE piatto_ingredienti (
    piatto_id INTEGER REFERENCES piatto(id),
    ingredienti_id INTEGER REFERENCES ingredienti(id),
    PRIMARY KEY (piatto_id, ingredienti_id)
);



--ORDINI UTENTE
CREATE TABLE ordini (
    id SERIAL PRIMARY KEY,
    utente_id INTEGER REFERENCES utente(id),
    ristorante_id INTEGER REFERENCES ristorante(id),
    fascia_oraria_id INTEGER REFERENCES fasce_orarie(id),
    creato_il TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stato VARCHAR(50) DEFAULT 'in_attesa', 
    nota TEXT
);


--DETTAGLI ORDINE
CREATE TABLE dettagli_ordine (
    id SERIAL PRIMARY KEY,
    ordine_id INTEGER REFERENCES ordini(id),
    piatto_id INTEGER REFERENCES piatto(id),
    quantita INTEGER DEFAULT 1,
    note TEXT
);

--INGREDIENTI EXTRA 
CREATE TABLE dettagli_ordine_ingredienti (
    dettaglio_ordine_id INTEGER REFERENCES dettagli_ordine(id),
    ingrediente_id INTEGER REFERENCES ingredienti(id),
    PRIMARY KEY (dettaglio_ordine_id, ingrediente_id)
);


-- INVITI OSPITI
CREATE TABLE inviti_ospiti (
    id SERIAL PRIMARY KEY,
    id_invitante INTEGER REFERENCES utente(id),
    token_ospite VARCHAR(255) UNIQUE NOT NULL,
    scade_il TIMESTAMP NOT NULL,
    usato BOOLEAN DEFAULT FALSE
);


ZHC Lunch Menu 

Utente normale: 

Pagina benvenuto: 

La prima volta che l’utente accede alla pagina, vedrà un messaggio di benvenuto e avrà la possibilità di effettuare il login con Microsoft o non oppure registrarsi. 

------------------------------------------------------------------------------------------------------------- 

Ipotesi 

Registrazione con doppia autenticazione .... 

Salvare solo la mail aziendale come riferimento “account" = senza registrazione  

Usare account di dominio o account Microsoft (OAuth 2.0 attraverso Microsoft 	Identity Platform.) --> Autenticare utenti aziendali (@zucchettihc.it) con Azure Active Directory 

-------------------------------------------------------------------------------------------------------------- 

Immagine 

 

 

 

Pagina registrazione 

Dopo aver cliccato sul bottone di registrazione, l’utente verrà indirizzato a una schermata in cui potrà registrarsi inserendo l’email e la password (campi obbligatori). Una volta cliccato sul pulsante “avanti”, verrà generato e salvato un token per ricordare l’utente nei futuri accessi, e si verrà reindirizzati alla pagina di scelta del ristorante.  

Immagine 

 

 

 

 

 

 

 

 

 

 

 

 

 

Pagina login 

Dopo aver cliccato sul bottone di login, l’utente verrà indirizzato a una schermata dove potrà inserire l’email e la password. Una volta cliccato sul pulsante “invio”, verrà generato e salvato un token per facilitare gli accessi futuri e l’utente sarà reindirizzato alla pagina di scelta del ristorante. 

Immagine 

 

 

 

 

 

 

 

 

 

 

 

 

 

Pagina scelta ristorante 

Dopo aver effettuato il login o la registrazione, oppure se è già presente un token salvato, verranno mostrati i ristoranti disponibili (nascondibili con il pulsante con l’occhio), ciascuno con le relative fasce orarie e il numero di persone prenotate, colorate in base a quante persone ci sono (da 0 a 5 verde, da 5 a 10 arancione, da 10 in su rosso). 

In fondo alla pagina sarà presente una barra con un pulsante che permette di accedere direttamente al riepilogo degli ordini. 

Sopra alla barra ci sarà un bottone che copia un link (popup di copiatura link con scritto: “link copiato!”) per invitare gli ospiti e a destra per resettare i ristoranti nascosti. 

Immagine 

 

 

 

 

 

 

 

Pagina Menù e ordine 

Dopo aver cliccato su uno una fascia oraria di quel ristorante, gli si aprirà la pagina menu e ordine e in cui vedrà il nome del ristorante, la fascia oraria selezionata/cambiabile e il tempo mancante alla fine della prenotazione per quella fascia oraria selezionata. 

Sotto ci sarà il menù con la possibilità di aggiungere o togliere pietanze con “+” e “-”, tranne per i panini/toast/piadine che si potrà scegliere un max di 5 ingredienti. 

Alla fine della pagina possiamo trovare un riepilogo del nostro ordine con la possibilità di aggiungere ingredienti extra a nostra scelta. 

C’è la possibilità sempre con “+” e “-” di togliere e aggiungere il piatto. 

In fondo alla pagina in basso a sinistra si può vedere il totale e in basso a destra un pulsante per inviare l’ordine.Immagine 

Immagine 

Immagine 

Immagine 

 

 

 

 

 

 

 

 

 

 

Pagina riepilogo ordini 

Dopo aver cliccato su “Invia ordine”, si aprirà una nuova pagina con un ulteriore riepilogo con la possibilità di rimuovere ancora la pietanza che non si vuole o modificarla, al centro della pagina ci sarà la possibilità di scegliere la fascia oraria cosi da vedere cosa è stato prenotato diviso per fasce orarie e ristoranti.  Le modifiche saranno possibili solo fino a un’ora prima dell’orario di prenotazione selezionato. 

Alla chiusura delle fasce orarie, tutti gli ordini verranno salvati in un file di log e inviati automaticamente via Telegram/Email al bar/ristorante.  Alle 15 verrà  azzerata per essere pronta all’uso il giorno successivo. 

Se non hai un ordine non comparirà nulla nel tuo riepilogo ordini, ma vedrai quello generale 

ImmagineFile log esempio: 

DATA: 05/05/2025 

Ristorante Biang Biang Ramen 

12:00 → Ordine utente1: Tofu Brasato 

12:30 → Ordine utente2: Manzo Brasato 

Ristorante Bar Marjgio ... 

12:00 → Ordine utente1: Lasagne alla bolognese 

13:30 → Ordine utente2: Tortellini panna e prosciutto 

Admin: 

????? 

------------------------------------------------------------------------------------------------------------- 

Ipotesi Barista Telegram: 

Riceverà un messaggio con la prenotazione dell’ordine su Telegram, e in base a se il prodotto c’è o non c’è risponderà con dei bottoni prestabiliti.  

Esempio: 

🟢 accettato |❌rifiutato parzialmente 

Se il barista accetta la prenotazione è andata a buon fine 

Se il barista rifiuta parzialmente il barista potrà scrivere nella chat il prodotto che manca. 

------------------------------------------------------------------------------------------------------------- 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

Ipotesi Email Barista 

ImmagineIl barista avrà una sua email personale dove può vedere le fasce orarie di prenotazione con il totale di prenotazioni.  

ImmagineIl barista piò andare indietro nei giorni precedenti e avanti per tornare al giorno che vuole. Avrà poi un bottone esporta che quando lo cliccherà lo porterà alla pagina per esportare gli ordini selezionando la da ___ giorno a ___.  

Quando cliccherà su una fascia oraria visualizzerà gli ordini della giornata in tabellati con numero pietanze – pietanze – prezzo, poi potrà accettare o rifiutare l’ordine (con un bottone accetta tutto finale) 

In alto a destra potrà trovare un pulsante per tornare alla pagina precedente. 

Immagine 

Immagine 

 

 

 

 

 

Ospiti (senza vincolo buono): 

Per invitare un ospite bisogna mandargli un link apposta che si trova nella pagina riepilogo ordini 

Quando l’ospite cliccherà sul link ci sarà una pagina in cui deve inserire Nome e Cognome campi obbligatori e poi potrà inviare  

Immagine 

Hanno la possibilità di accedere con account ospite e di vedere la pagina scelta ristorante e menù e ordine, in cui possono scegliere il ristorante e cosa mangiare 

Il link ha una durata in ore e se si entra scadute quelle ore ci sarà una pagina di errore con scritto ERRORE!  

Richiedere il link 

Con un pulsante “indietro” per portarti alla pagina di login 

Immagine 

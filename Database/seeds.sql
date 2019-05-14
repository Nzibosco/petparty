--stock rows for testing purposes
INSERT INTO users (username, userphoto, email, petTypes, petnames) VALUES('TheCatLady', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFjM_jrux0vsHSmqOr_LSB8sK8GZRaxoCOmneMxUu-fh8N4PZc', 'thecatlady@aol.com', 'dog', 'FluffyMuffins Bruno LadyCrumpetts');
INSERT INTO users (username, userphoto, email, petTypes, petnames) VALUES('TheDogDude', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzkyovR80FZgW2_ZFv5yl2ZMH287YijSj7KOkhfXhitGuSbgOCg', 'thedogdude@aol.com', 'dog', 'Flash Duke Ace');
INSERT INTO users (username, userphoto, email, petTypes, petnames) VALUES('ReptileLovinAussie', 'https://images2.minutemediacdn.com/image/upload/c_crop,h_842,w_1500,x_0,y_52/f_auto,q_auto,w_1100/v1554701032/shape/mentalfloss/gettyimages-1129399.jpg', 'stevesthename@aol.com', 'reptile', 'Kipper Nipper Ripper');


INSERT INTO events (title, date, time, link, address, petTypes, hostname) VALUES('Tea w/ FluufyMuffins', '05/30/19', '02:00pm', 'https://www.mewsickittycafe.com/', '2519 Nolensville Pike, Nashville, TN', 'cat','TheCatLady')
INSERT INTO events (title, date, time, link, address, petTypes, hostname) VALUES('B-day party for Duke', '06/01/19', '03:00pm', 'https://www.bringfido.com/attraction/3483', '401 20th Ave S, Nashville, TN', 'dog','TheDogDude')
INSERT INTO events (title, date, time, link, address, petTypes, hostname) VALUES('Gator Wrestlin w/ Steve', '07/05/19', '10:00am', 'https://repticon.com/tennessee/nashville/', 'The Fairgrounds Nashville, TN', 'reptile','ReptileLovinAussie')
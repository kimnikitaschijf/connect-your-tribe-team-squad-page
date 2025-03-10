import express from 'express'

import { Liquid } from 'liquidjs';


// Vul hier jullie team naam in
const teamName = 'Flux';

const squadResponse = await fetch(
  'https://fdnd.directus.app/items/squad?filter={"_and":[{"cohort":"2425"},{"tribe":{"name":"FDND Jaar 1"}}]}'
);

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const squadResponseJSON = await squadResponse.json();

const app = express()

let filters = {
  name: null,
  fav_color: null,
  birthdate: null,
  avatar: null,
  emoji: null,
};

const baseUrl = "https://fdnd.directus.app/items/person/?fields=id,name,squads.squad_id.name,fav_color,fav_emoji,fav_country,birthdate,avatar,github_handle,fav_animal,fav_hobby,fav_kitchen&filter[squads][squad_id][name][_eq]=1G&filter[birthdate][_neq]=null&sort=birthdate";

app.use(express.static('public'));

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')

app.use(express.urlencoded({ extended: true }))


app.get('/', async function (request, response) {
  const person = await fetch('https://fdnd.directus.app/items/person/?fields=id,name,squads.squad_id.name,fav_color,fav_emoji,fav_country,birthdate,avatar,github_handle,fav_animal,fav_hobby,fav_kitchen&filter[squads][squad_id][name][_eq]=1G&filter[birthdate][_neq]=null&sort=birthdate')
  const personResponseJSON = await person.json()


  response.render('index.liquid', {
    persons: personResponseJSON.data,
    show: "avatar",
    likes:likes
  })
})

app.get('/kim', async function (request, response) {
  const person = await fetch('https://fdnd.directus.app/items/person/?fields=id,name,squads.squad_id.name,fav_color,fav_emoji,fav_country,birthdate,avatar,github_handle,fav_animal,fav_hobby,fav_kitchen&filter[squads][squad_id][name][_eq]=1G&filter[birthdate][_neq]=null&sort=birthdate')
  const personResponseJSON = await person.json()

  response.render('kim.liquid', {
    persons: personResponseJSON.data,
    show: "avatar",
  })
})

app.get('/akiko', async function (request, response) {
  // const person = await fetch('https://fdnd.directus.app/items/person/?fields=id,name,squads.squad_id.name,fav_color,fav_emoji,fav_country,birthdate,avatar,github_handle,fav_animal,fav_hobby,fav_kitchen&filter[squads][squad_id][name][_eq]=1G&filter[birthdate][_neq]=null&sort=birthdate')
  // const personResponseJSON = await person.json()

  const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=id,name,squads.squad_id.name,fav_color,birthdate,avatar,custom&filter=%7B%22_and%22:[%7B%22fav_color%22:%7B%22_neq%22:%22null%22%7D%7D,%7B%22birthdate%22:%7B%22_neq%22:%22null%22%7D%7D,%7B%22squads%22:%7B%22squad_id%22:%7B%22name%22:%7B%22_eq%22:%221G%22%7D%7D%7D%7D,%7B%22avatar%22:%7B%22_neq%22:%22null%22%7D%7D]%7D')
  const personResponseJSON = await personResponse.json()
  

  response.render('akiko.liquid', {
    teamName: teamName,
    // messages: messagesResponseJSON.data,
    likes:likes,
    persons: personResponseJSON.data

  })
})

app.get('/viresh', async function (request, response) {
  const person = await fetch('https://fdnd.directus.app/items/person/?fields=name,squads.squad_id.name,github_handle,fav_color&filter={"github_handle":{"_neq":"null"}}')
  const personResponseJSON = await person.json()

  response.render('viresh.liquid', { persons: personResponseJSON.data })
})

app.get('/chatten', async function (request, response) {
  const person = await fetch('https://fdnd.directus.app/items/person/?fields=name,squads.squad_id.name,github_handle,fav_color&filter={"github_handle":{"_neq":"null"}}')
  const personResponseJSON = await person.json()

  response.render('ties.liquid', { 
    persons: personResponseJSON.data,
    messages: messages
  });
})

  // comment sectie
  let messages = [];

  app.post('/chatten', async function (request, response) {
      let naam = request.body.naam;
      let bericht = request.body.bericht;
  
      if (naam && bericht) {
          let formattedMessage = `${naam}: ${bericht}`;
          messages.push(formattedMessage);
      }
  
      response.redirect(303, '/chatten');
  });
  // comment sectie

app.post('/', async function (request, response) {
  await fetch('https://fdnd.directus.app/items/messages/', {
    method: 'POST',
    body: JSON.stringify({
      for: `Team ${teamName}`,
      from: request.body.from,
      text: request.body.text
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/')
})


app.set('port', process.env.PORT || 8001)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}


// filters app.get!!!


app.get("/emoji/", async function (request, response) {
  const filterString =
    "&filter[_and][0][fav_emoji][_neq]=null&filter[_and][1][squads][squad_id][name][_eq]=1G";

  const personResponse = await fetch(baseUrl + filterString);
  const personResponseJSON = await personResponse.json();

  response.render("index.liquid", {
    persons: personResponseJSON.data,
    show: "fav_emoji",
    squads: squadResponseJSON.data,
  });
});


app.get("/land/", async function (request, response) {
  const filterString =
    "&filter[_and][0][fav_country][_neq]=null&filter[_and][1][squads][squad_id][name][_eq]=1G";

  const personResponse = await fetch(baseUrl + filterString);
  const personResponseJSON = await personResponse.json();

  response.render("index.liquid", {
    persons: personResponseJSON.data,
    show: "fav_country",
    squads: squadResponseJSON.data,
  });
});

app.get("/verjaardag/", async function (request, response) {
  const baseUrl =
    "https://fdnd.directus.app/items/person/?fields=id,name,squads.squad_id.name,fav_color,fav_emoji,fav_country,birthdate,avatar";
  const filterString =
    "&filter[squads][squad_id][name][_eq]=1G&filter[birthdate][_neq]=null&sort=birthdate";

  const fullUrl = baseUrl + filterString;
  const personResponse = await fetch(fullUrl);
  const personResponseJSON = await personResponse.json();

  response.render("index.liquid", {
    persons: personResponseJSON.data,
    show: "birthdate",
    squads: squadResponseJSON.data,
  });
});


app.get("/eten/", async function (request, response) {
  const filterString =
    "&filter[_and][0][fav_kitchen][_neq]=null&filter[_and][1][squads][squad_id][name][_eq]=1G";

  const personResponse = await fetch(baseUrl + filterString);
  const personResponseJSON = await personResponse.json();

  response.render("index.liquid", {
    persons: personResponseJSON.data,
    show: "fav_kitchen",
    squads: squadResponseJSON.data,
  });
});


app.get("/kleur/", async function (request, response) {
  const filterString =
    "&filter[_and][0][fav_color][_neq]=null&filter[_and][1][squads][squad_id][name][_eq]=1G";

  const personResponse = await fetch(baseUrl + filterString);
  const personResponseJSON = await personResponse.json();

  response.render("index.liquid", {
    persons: personResponseJSON.data,
    show: "fav_color",
    squads: squadResponseJSON.data,
  });
});


app.get("/dier/", async function (request, response) {
  const filterString =
    "&filter[_and][0][fav_animal][_neq]=null&filter[_and][1][squads][squad_id][name][_eq]=1G";

  const personResponse = await fetch(baseUrl + filterString);
  const personResponseJSON = await personResponse.json();

  response.render("index.liquid", {
    persons: personResponseJSON.data,
    show: "fav_animal",
    squads: squadResponseJSON.data,
  });
});


app.get("/hobby/", async function (request, response) {
  const filterString =
    "&filter[_and][0][fav_hobby][_neq]=null&filter[_and][1][squads][squad_id][name][_eq]=1G";

  const personResponse = await fetch(baseUrl + filterString);
  const personResponseJSON = await personResponse.json();

  response.render("index.liquid", {
    persons: personResponseJSON.data,
    show: "fav_hobby",
    squads: squadResponseJSON.data,
  });
});

let likes = {}; 

app.use(express.urlencoded({ extended: true })); // Nodig om formulierdata te lezen

app.post('/like', (req, res) => {
  const studentId = req.body.studentid; // Haal het ID uit het formulier

  if (!studentId) {
    return res.status(400).send('Geen student ID ontvangen');
  }


  if (likes[studentId]) {
    likes[studentId]--;
    if (likes[studentId] <= 0) delete likes[studentId]; 
  } else {
    likes[studentId] = 1; 
  }

  console.log("Likes:", likes);


  // Stuur de gebruiker terug naar de hoofdpagina om de nieuwe likes te zien
  // res.json({ success: true, likes: likes[studentId] || 0 });
  res.redirect('/');
});

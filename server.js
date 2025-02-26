import express from 'express'

import { Liquid } from 'liquidjs';


// Vul hier jullie team naam in
const teamName = 'Flux';


const app = express()

const baseUrl =
  "https://fdnd.directus.app/items/person/?fields=id,name,squads.squad_id.name,fav_color,fav_emoji,fav_country,birthdate,avatar,github_handle,fav_animal,fav_hobby,fav_kitchen&filter[squads][squad_id][name][_eq]=1G&filter[birthdate][_neq]=null&sort=birthdate";

app.use(express.static('public'))

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
  const messagesResponse = await fetch(`https://fdnd.directus.app/items/messages/?filter={"for":"Team ${teamName}"}`)
  const messagesResponseJSON = await messagesResponse.json()

  response.render('akiko.liquid', {
    teamName: teamName,
    messages: messagesResponseJSON.data
  })
})

app.get('/viresh', async function (request, response) {
  const person = await fetch('https://fdnd.directus.app/items/person/?fields=name,squads.squad_id.name,github_handle,fav_color&filter={"github_handle":{"_neq":"null"}}')
  const personResponseJSON = await person.json()

  response.render('viresh.liquid', { persons: personResponseJSON.data })
})

app.get('/ties', async function (request, response) {
  const person = await fetch('https://fdnd.directus.app/items/person/?fields=name,squads.squad_id.name,github_handle,fav_color&filter={"github_handle":{"_neq":"null"}}')
  const personResponseJSON = await person.json()

  response.render('ties.liquid', { persons: personResponseJSON.data })
})

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
  const filterString =
    "&filter[squads][squad_id][name][_eq]=1G&filter[birthdate][_neq]=null&sort=birthdate";

  const personResponse = await fetch(baseUrl + filterString);
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

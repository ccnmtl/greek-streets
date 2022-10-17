/* global L */

const streets = [
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/1-anexartisias-st",
        "name": "1 Anexartisias Street",
        "address": "Anexartisias 1 Athina 114 73, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.987170,
        "lng": 23.738330
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/1-ersis-st",
        "name": "1 Ersis Street",
        "address": "Ersis 1 Athina 114 73, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.988430,
        "lng": 23.737090
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/1-klisovis-st",
        "name": "1 Klisovis Street",
        "address": "Klisovis 1 Athina 106 77, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.985130,
        "lng": 23.732200
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/1-satovriandou-st",
        "name": "1 Satovriandou Street",
        "address": "Satovriandou 1 Athina 104 31, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.983813,
        "lng": 23.729216
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/1-solomou-st-8-solomou-st",
        "name": "1 Solomou Street - 8 Solomou Street",
        "address": "Solomou 1 Athina 106 83, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.9862986,
        "lng": 23.7343067
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/11-ioustinianou-st-iptarou-st",
        "name": "11 Ioustinianou Street (Iptarou Street)",
        "address": "Ioustinianou 11 Athina 114 73, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.9893819,
        "lng": 23.7391061
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/111-asklipiou-st",
        "name": "111 Asklipiou Street",
        "address": "Asklipiou 111 Athina 114 72, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98561,
        "lng": 23.74219
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/116-emmanouil-benaki-st",
        "name": "116 Emmanouil Benaki Street",
        "address": "Emmanouil Benaki 116 Athina, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98709,
        "lng": 23.7379
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/12-klisovis-st",
        "name": "12 Klisovis Street",
        "address": "Klisovis 12 Athina 106 77, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.9856,
        "lng": 23.73196
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/12-merlie-oktaviou-st",
        "name": "12 Merlie Oktaviou Street",
        "address": "Merlie Oktaviou 12 Athina 106 80, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98275,
        "lng": 23.73874
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/123-asklipiou-st",
        "name": "123 Asklipiou Street",
        "address": "Asklipiou 123 Athina 114 72, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98593,
        "lng": 23.74282
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/13-anexartisias-st",
        "name": "13 Anexartisias Street",
        "address": "Anexartisias 13 Athina 114 73, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98795,
        "lng": 23.73763
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/13-solomou-st",
        "name": "13 Solomou Street",
        "address": "Solomou 13 Athina 106 83, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98647,
        "lng": 23.73325
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/16-solomou-st",
        "name": "16 Solomou Street",
        "address": "Solomou 16 Athina 106 83, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98652,
        "lng": 23.73367
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/17-plapouta-st",
        "name": "17 Plapouta Street",
        "address": "Plapouta 17 Athina 114 73, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98993,
        "lng": 23.73672
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/2-andrea-metaxa-st",
        "name": "2 Andrea Metaxa Street",
        "address": "Andrea Metaxa 2 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.9849,
        "lng": 23.73562
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/2-dafnomili-st-2nd-epal-athinas-leontos-sgourou-st",
        "name": "2 Dafnomili Street - 2nd EPAL Athinas (Leontos Sgourou Street)",
        "address": "Dafnomili 2 Athina 114 71, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98323,
        "lng": 23.74025
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/2-souliou-st",
        "name": "2 Souliou Street",
        "address": "Souliou 2 Athina 106 78, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98417,
        "lng": 23.73327
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/20-28th-oktovriou-st",
        "name": "20 28th Oktovriou Street",
        "address": "28is Oktovriou 20 Athina, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98611,
        "lng": 23.72994
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/20-andrea-metaxa-st-2-andrea-metaxa-st",
        "name": "20 Andrea Metaxa Street - 2 Andrea Metaxa Street",
        "address": "Andrea Metaxa 20 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98558,
        "lng": 23.73506
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/21-kaniggos-st",
        "name": "21 Kaniggos Street",
        "address": "Kaniggos 21 Athina 106 77, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98601,
        "lng": 23.73073
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/21-nikiforou-ouranou-st",
        "name": "21 Nikiforou Ouranou Street",
        "address": "Nikiforou Ouranou 21 Athina 114 71, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98457,
        "lng": 23.74082
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/22-didotou-st",
        "name": "22 Didotou Street",
        "address": "Didotou 22 Athina 106 80, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98328,
        "lng": 23.73677
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/22-soultanou-st",
        "name": "22 Soultanou Street",
        "address": "Stournari 19, Athina 106 82, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98695,
        "lng": 23.73348
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/23-dervenion-st",
        "name": "23 Dervenion Street",
        "address": "Dervenion 23 Metamorfosi 144 51, Greece",
        "neighborhood": "Exarcheia",
        "lat": 38.05827,
        "lng": 23.75084
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/28-kapodistriou-st",
        "name": "28 Kapodistriou Street",
        "address": "Kapodistriou 28 Athina 106 82, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98649,
        "lng": 23.73019
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/28-solomou-st",
        "name": "28 Solomou Street",
        "address": "Solomou 28 Athina 106 82, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98667,
        "lng": 23.73276
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/2nd-epal-athinas-leontos-sgourou-st",
        "name": "2nd EPAL (Leontos Sgourou Street)",
        "address": "Sina 70, Athina 106 72, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98088,
        "lng": 23.73649
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/31-anexartisias-st",
        "name": "31 Anexartisias Street",
        "address": "Anexartisias 31 Athina 114 73, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98808,
        "lng": 23.73758
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/33-emmanouil-benaki-st",
        "name": "33 Emmanouil Benaki Street",
        "address": "33 Emmanouil Benaki Street",
        "neighborhood": "Exarcheia",
        "lat": 37.98808,
        "lng": 23.73758
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/34-alexandras-blvd-49-zaimi-st",
        "name": "34 Alexandras Boulevard - 49 Zaimi Street",
        "address": "Leof. Alexandras 34 Athina 114 73, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.99084,
        "lng": 23.73599
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/34-methonis-st",
        "name": "34 Methonis Street",
        "address": "Methonis 34 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98635,
        "lng": 23.73785
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/34-tzortz-st",
        "name": "34 Tzortz Street",
        "address": "Tzortz 34 Athina 106 82, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98711,
        "lng": 23.73205
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/36-mavromichali-st",
        "name": "36 Mavromichali Street",
        "address": "Mavromichali 36 Athina 106 80, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98371,
        "lng": 23.7362
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/4-kolleti-st-54-emmanouil-benaki-st",
        "name": "4 Kolleti Street - 54 Emmanouil Benaki Street",
        "address": "Koletti 4 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98438,
        "lng": 23.73452
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/4-zaloggou-st",
        "name": "4 Zaloggou Street",
        "address": "Zaloggou 4 Athina 106 78, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.9839,
        "lng": 23.73349
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/40-28th-oktovriou-st",
        "name": "40 28th Oktovriou Street",
        "address": "28is Oktovriou 40 Athina, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98611,
        "lng": 23.72994
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/43-kallidromiou-st-116-emmanouil-benaki-st",
        "name": "43 Kallidromiou Street - 116 Emmanouil Benaki Street",
        "address": "Kallidromiou 43 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98661,
        "lng": 23.73811
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/45-28th-oktovriou-st",
        "name": "45 28th Oktovriou Street",
        "address": "28is Oktovriou 45 Athina, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98611,
        "lng": 23.72994
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/47-arachovis-st",
        "name": "47 Arachovis Street",
        "address": "Arachovis 47 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98563,
        "lng": 23.73631
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/49-zaimi-st",
        "name": "49 Zaimi Street",
        "address": "Zaimi 49 Athina 106 82, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.99105,
        "lng": 23.73463
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/54-28th-oktovriou-patision-street-st",
        "name": "54 28th Oktovriou Street (Patision Street)",
        "address": "28is Oktovriou 54 Athina, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98611,
        "lng": 23.72994
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/54-emmanouil-benaki-st",
        "name": "54 Emmanouil Benaki Street",
        "address": "Emmanouil Benaki 54 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98507,
        "lng": 23.73408
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/55-kallidromiou-st-34-methonis-st",
        "name": "55 Kallidromiou Street - 34 Methonis Street",
        "address": "Kallidromiou 55 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98724,
        "lng": 23.7376
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/56-eresou-st",
        "name": "56 Eresou Street",
        "address": "Eresou 56 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98682,
        "lng": 23.73689
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/57-arachovis-st",
        "name": "57 Arachovis Street",
        "address": "Arachovis 57 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98604,
        "lng": 23.73597
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/61-arachovis-st-84-emmanouil-benaki-st",
        "name": "61 Arachovis Street - 84 Emmanouil Benaki Street",
        "address": "Arachovis 61 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98649,
        "lng": 23.73559
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/61-eresou-st",
        "name": "61 Eresou Street",
        "address": "Eresou 61 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98713,
        "lng": 23.73648
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/62-methonis-st",
        "name": "62 Methonis Street",
        "address": "Methonis 62 Athina 106 83, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98765,
        "lng": 23.73678
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/63-zoodochou-st-23-dervenion-st",
        "name": "63 Zoodochou Street - 23 Dervenion Street",
        "address": "Zoodochou Pigis 63 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98573,
        "lng": 23.73754
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/66-dafnomili-st",
        "name": "66 Dafnomili Street",
        "address": "Dafnomili 66 Athina 106 72, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98426,
        "lng": 23.74146
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/66-emanouil-benaki-st",
        "name": "66 Emmanouil Benaki Street",
        "address": "Emmanouil Benaki 66 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98541,
        "lng": 23.73469
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/7-metsovou-st",
        "name": "7 Metsovou Street",
        "address": "Metsovou 7 Athina 106 82, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.99075,
        "lng": 23.73192
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/7-tzortz-st",
        "name": "7 Tzortz Street",
        "address": "Tzortz 7 Athina 106 82, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98665,
        "lng": 23.73176
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/72-kallidromiou-st",
        "name": "72 Kallidromiou Street",
        "address": "Kallidromiou 72 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98845,
        "lng": 23.73676
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/78-kallidromiou-st",
        "name": "78 Kallidromiou Street",
        "address": "Kallidromiou 78 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98879,
        "lng": 23.73649
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/8-mesologiou-st",
        "name": "8 Mesologiou Street",
        "address": "Mesologiou 8 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98459,
        "lng": 23.73459
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/8-nikiforou-ouranou-st",
        "name": "8 Nikiforou Ouranou Street",
        "address": "Nikiforou Ouranou 8 Athina 114 71, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98395,
        "lng": 23.74027
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/8-solomou-st",
        "name": "8 Solomou Street",
        "address": "Solomou 8 Athina 106 82, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98645,
        "lng": 23.73412
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/8-zosimadon-st-62-methonis-st",
        "name": "8 Zosimadon Street - 62 Methonis Street",
        "address": "Zosimadon 8 Athina 106 83, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98802,
        "lng": 23.73655
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/84-emmanouil-benaki-st",
        "name": "84 Emmanouil Benaki Street",
        "address": "Emmanouil Benaki 84 Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.986,
        "lng": 23.73577
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/89-solonos-st",
        "name": "89 Solonos Street",
        "address": "Solonos 89 Athina 106 79, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98331,
        "lng": 23.73436
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/91-solonos-st",
        "name": "91 Solonos Street",
        "address": "Solonos 91 Athina 106 79, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98357,
        "lng": 23.73415
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/alexnadros-grigoropoulos-memorial-angle-2",
        "name": "Alexnadros Grigoropoulos Memorial (Angle 2)",
        "address": "Mesolongiou and Tzavella Athina 106 81, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98476,
        "lng": 23.7347
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/strefi-hill-lofos-strefi",
        "name": "Strefi Hill (Lofos Strefi)",
        "address": "Emmanouil Benaki 134, Athina 114 73, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98719,
        "lng": 23.73957
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/strefi-hill-lofos-strefi-approach-video",
        "name": "Strefi Hill (Lofos Strefi) - Approach Video",
        "address": "Emmanouil Benaki 134, Athina 114 73, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98719,
        "lng": 23.73957
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/aiolou",
        "name": "Aiolou",
        "address": "Aiolou 71 Athina 105 51, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.97935,
        "lng": 23.72817
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/dafnomili",
        "name": "Dafnomili Street",
        "address": "Dafnomili 3 Athina 114 71, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.9834,
        "lng": 23.74032
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/solomou",
        "name": "Solomou Street",
        "address": "Solomou 14 Athina 106 83, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.9865,
        "lng": 23.73379
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/stadiou",
        "name": "Stadiou",
        "address": "Stadiou 32 Athina 105 64",
        "neighborhood": "Exarcheia",
        "lat": 37.9796,
        "lng": 23.7321
    },
    {
        "url": "https://greekstreets.ctl.columbia.edu/videos/strefi-hill",
        "name": "Strefi Hill",
        "address": "Emmanouil Benaki 134, Athina 114 73, Greece",
        "neighborhood": "Exarcheia",
        "lat": 37.98719,
        "lng": 23.73957
    }
];

window.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('map')) {
        return;
    }

    const map = L.map('map').setView([37.9838, 23.7275], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    streets.forEach(function(d) {
        if (d.lat && d.lng) {
            const marker = L.marker([d.lat, d.lng], {
                title: d.name,
                alt: d.name
            });
            marker.addTo(map);
            marker.bindPopup(`<a href="${d.url}">${d.name}</a>`);
        }
    });
});

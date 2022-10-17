#!/usr/bin/env bash
#
# Given an address, return its lat/long
#
# Example usage:
#   MAPQUEST_KEY=abcdef ./geocode.sh "535 W 114th St, New York, NY"
#
# Depends on jq:
#   https://stedolan.github.io/jq/
#

addresses=(
    "Anexartisias 1 Athina 114 73, Greece"
    "Ersis 1 Athina 114 73, Greece"
    "Klisovis 1 Athina 106 77, Greece"
    "Satovriandou 1 Athina 104 31, Greece"
    "Solomou 1 Athina 106 83, Greece"
    "Ioustinianou 11 Athina 114 73, Greece"
    "Asklipiou 111 Athina 114 72, Greece"
    "Emmanouil Benaki 116 Athina, Greece"
    "Klisovis 12 Athina 106 77, Greece"
    "Merlie Oktaviou 12 Athina 106 80, Greece"
    "Asklipiou 123 Athina 114 72, Greece"
    "Anexartisias 13 Athina 114 73, Greece"
    "Solomou 13 Athina 106 83, Greece"
    "Solomou 16 Athina 106 83, Greece"
    "Plapouta 17 Athina 114 73, Greece"
    "Andrea Metaxa 2 Athina 106 81, Greece"
    "Dafnomili 2 Athina 114 71, Greece"
    "Souliou 2 Athina 106 78, Greece"
    "28is Oktovriou 20 Athina, Greece"
    "Andrea Metaxa 20 Athina 106 81, Greece"
    "Kaniggos 21 Athina 106 77, Greece"
    "Nikiforou Ouranou 21 Athina 114 71, Greece"
    "Didotou 22 Athina 106 80, Greece"
    "Stournari 19, Athina 106 82, Greece"
    "Dervenion 23 Metamorfosi 144 51, Greece"
    "Kapodistriou 28 Athina 106 82, Greece"
    "Solomou 28 Athina 106 82, Greece"
    "Sina 70, Athina 106 72, Greece"
    "Anexartisias 31 Athina 114 73, Greece"
    "33 Emmanouil Benaki Street, Athens, Greece"
    "Leof. Alexandras 34 Athina 114 73, Greece"
    "Methonis 34 Athina 106 81, Greece"
    "Tzortz 34 Athina 106 82, Greece"
    "Mavromichali 36 Athina 106 80, Greece"
    "Koletti 4 Athina 106 81, Greece"
    "Zaloggou 4 Athina 106 78, Greece"
    "28is Oktovriou 40 Athina, Greece"
    "Kallidromiou 43 Athina 106 81, Greece"
    "28is Oktovriou 45 Athina, Greece"
    "Arachovis 47 Athina 106 81, Greece"
    "Zaimi 49 Athina 106 82, Greece"
    "28is Oktovriou 54 Athina, Greece"
    "Emmanouil Benaki 54 Athina 106 81, Greece"
    "Kallidromiou 55 Athina 106 81, Greece"
    "Eresou 56 Athina 106 81, Greece"
    "Arachovis 57 Athina 106 81, Greece"
    "Arachovis 61 Athina 106 81, Greece"
    "Eresou 61 Athina 106 81, Greece"
    "Methonis 62 Athina 106 83, Greece"
    "Zoodochou Pigis 63 Athina 106 81, Greece"
    "Dafnomili 66 Athina 106 72, Greece"
    "Emmanouil Benaki 66 Athina 106 81, Greece"
    "Metsovou 7 Athina 106 82, Greece"
    "Tzortz 7 Athina 106 82, Greece"
    "Kallidromiou 72 Athina 106 81, Greece"
    "Kallidromiou 78 Athina 106 81, Greece"
    "Mesologiou 8 Athina 106 81, Greece"
    "Nikiforou Ouranou 8 Athina 114 71, Greece"
    "Solomou 8 Athina 106 82, Greece"
    "Zosimadon 8 Athina 106 83, Greece"
    "Emmanouil Benaki 84 Athina 106 81, Greece"
    "Solonos 89 Athina 106 79, Greece"
    "Solonos 91 Athina 106 79, Greece"
    "Mesolongiou and Tzavella Athina 106 81, Greece"
    "Emmanouil Benaki 134, Athina 114 73, Greece"
    "Emmanouil Benaki 134, Athina 114 73, Greece"
    "Aiolou 71 Athina 105 51, Greece"
    "Dafnomili 3 Athina 114 71, Greece"
    "Solomou 14 Athina 106 83, Greece"
    "Stadiou 32 Athina 105 64"
    "Emmanouil Benaki 134, Athina 114 73, Greece"
)

url='https://www.mapquestapi.com/geocoding/v1/address?key='
args='&location='
key=$MAPQUEST_KEY
converter="$url$key$args"

for i in "${addresses[@]}"
do
    echo "$i"
    addr="$(echo $i | sed 's/ /+/g')"
    curl -s "$converter$addr" | jq '.results[0].locations[0].latLng'
done

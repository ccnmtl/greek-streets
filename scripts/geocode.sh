#!/usr/bin/env bash
#
# geocode.sh
# Adapted from:
#   https://www.webgears.com/blog/simple-script-to-get-latitude-and-longitude-from-an-address/
#
# Given an address, return its lat/long
#
# Example usage:
#   MAPQUEST_KEY=abcdef ./geocode.sh "535 W 114th St, New York, NY"
#
# Depends on jq:
#   https://stedolan.github.io/jq/
#

url='https://www.mapquestapi.com/geocoding/v1/address?key='
args='&location='
key=$MAPQUEST_KEY
converter="$url$key$args"

addr="$(echo $* | sed 's/ /+/g')"
curl -s "$converter$addr" | jq '.results[0].locations[0].latLng'

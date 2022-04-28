#!/usr/bin/env python3

from string import Template
from os import environ
import boto3
import botocore

# python-slugify
from slugify import slugify


BUCKET_NAME = 'ctl-hellenicstreets-dev'
PHOTO_DIR = 'photos'


def get_photo_pagename(key):
    """Given a path, return the street name directory title."""
    a = key.split('/')
    return a[2]


def get_photos():
    session = boto3.Session(
        aws_access_key_id=environ['AWS_ACCESS_ID'],
        aws_secret_access_key=environ['AWS_SECRET_KEY'])

    s3 = session.resource('s3')
    my_bucket = s3.Bucket(BUCKET_NAME)

    unsigned_client = boto3.client(
        's3',
        config=botocore.config.Config(signature_version=botocore.UNSIGNED)
    )

    photos = []
    prefix = PHOTO_DIR + '/115_PHOTOS_eXarchia'

    for obj in my_bucket.objects.filter(Prefix=prefix):
        if obj.key.endswith('.html'):
            continue

        # Make a photo page for each folder here, containing all the
        # photo URLs it contains.
        pagename = get_photo_pagename(obj.key)

        public_url = unsigned_client.generate_presigned_url(
            'get_object', ExpiresIn=0,
            Params={'Bucket': BUCKET_NAME, 'Key': obj.key}
        )

        # use cloudfront url
        public_url = public_url.replace(
            'https://ctl-hellenicstreets-dev.s3.amazonaws.com',
            'https://d2b5j58ir6uajk.cloudfront.net')

        photos.append(public_url)

    return photos


def make_photo_page(street_name, photos):
    name = street_name
    slug = slugify(name)

    if not slug:
        # If the slug is empty, skip this file.
        return

    fname = './content/photos/{}.md'.format(slug)
    print('Writing to {}'.format(fname))
    photo_file = open(fname, 'w')

    rendered_photos = ''
    for photo_url in photos:
        rendered_photos += '- {}\n'.format(photo_url)

    templ_string = """---
title: "$street_name"
date: "2022-04-28"
slug: "$street_slug"
photos:
$photos
---

$street_name
"""

    rendered_template = Template(templ_string).substitute(
        street_slug=slug, street_name=name, photos=rendered_photos)
    print(rendered_template)

    photo_file.write(rendered_template)
    photo_file.close()


def make_photo_pages(photo_pages):
    for street_name in photo_pages.keys():
        print(street_name)
        make_photo_page(street_name, photo_pages[street_name])


def main():
    photos = get_photos()

    make_photo_page('115_PHOTOS_eXarchia', photos)

    print('Done!')


if __name__ == '__main__':
    main()

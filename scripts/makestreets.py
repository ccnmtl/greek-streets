#!/usr/bin/env python3

from string import Template
import os
from os import environ
import urllib.parse
import boto3
import botocore

# python-slugify
from slugify import slugify


BUCKET_NAME = 'ctl-hellenicstreets-dev'
VID_DIR = 'transcoded-videos'


def get_videos():
    session = boto3.Session(
        aws_access_key_id=environ['AWS_ACCESS_ID'],
        aws_secret_access_key=environ['AWS_SECRET_KEY'])

    s3 = session.resource('s3')
    my_bucket = s3.Bucket(BUCKET_NAME)

    unsigned_client = boto3.client(
        's3',
        config=botocore.config.Config(signature_version=botocore.UNSIGNED)
    )

    streets = []

    for obj in my_bucket.objects.filter(Prefix=VID_DIR):
        public_url = unsigned_client.generate_presigned_url(
            'get_object', ExpiresIn=0,
            Params={'Bucket': BUCKET_NAME, 'Key': obj.key}
        )

        streets.append(public_url)

    return streets


def get_streetname(vid_url):
    """Based on a video URL, find and clean up the street name."""
    basename = os.path.basename(vid_url)
    name = basename.split('.')[0]
    name = urllib.parse.unquote(name)

    return name


def make_street(vid_url):
    name = get_streetname(vid_url)
    slug = slugify(name)

    if not slug:
        # If the slug is empty, skip this file.
        return

    fname = './content/streets/{}.md'.format(slug)
    afname = './content/aframes/{}.md'.format(slug)
    print('Writing to {}, {}'.format(fname, afname))
    street_file = open(fname, 'w')
    aframe_file = open(afname, 'w')

    templ_string = """---
title: "$street_name"
date: 2022-04-20T15:22:10-05:00
draft: false
slug: "$street_slug"
vidSrc: "$vid_src"
---

$street_name
"""

    rendered_template = Template(templ_string).substitute(
        street_slug=slug, street_name=name, vid_src=vid_url)

    street_file.write(rendered_template)
    aframe_file.write(rendered_template)
    street_file.close()
    aframe_file.close()


def make_streets(videos):
    for vidurl in videos:
        make_street(vidurl)


def main():
    videos = get_videos()

    make_streets(videos)

    print('Done!')


if __name__ == '__main__':
    main()

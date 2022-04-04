# hellenic-streets
Hellenic, or Greek Streets

## Video encoding notes

Here's how to re-encode a video file with the `faststart` flag. See:
https://multimedia.cx/eggs/improving-qt-faststart/

    ffmpeg -i source.mp4
      -movflags faststart out.mp4

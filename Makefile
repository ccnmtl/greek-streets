STAGING_URL=https://greekstreets.stage.ctl.columbia.edu/
PROD_URL=https://greekstreets.ctl.columbia.edu/
STAGING_BUCKET=greekstreets.stage.ctl.columbia.edu
PROD_BUCKET=greekstreets.ctl.columbia.edu
INTERMEDIATE_STEPS ?= echo nothing
HUGO=`which hugo`

all: eslint

JS_FILES=static/js

clean:
	rm -rf $(PUBLIC)/*

$(PUBLIC)/js/all.json: $(PUBLIC)/json/all/index.html
	mkdir $(PUBLIC)/js/ || true
	mv $< $@ && ./checkjson.py

.PHONY: clean

include *.mk

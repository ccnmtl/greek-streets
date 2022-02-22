STAGING_URL=https://hellenic-streets.stage.ctl.columbia.edu/
PROD_URL=https://hellenic-streets.ctl.columbia.edu/
STAGING_BUCKET=hellenic-streets.stage.ccnmtl.columbia.edu
PROD_BUCKET=hellenic-streets.ctl.columbia.edu
INTERMEDIATE_STEPS ?= echo nothing
HUGO=`which hugo`

all: eslint

include *.mk

clean:
	rm -rf $(PUBLIC)/*

$(PUBLIC)/js/all.json: $(PUBLIC)/json/all/index.html
	mkdir $(PUBLIC)/js/ || true
	mv $< $@ && ./checkjson.py

.PHONY: clean

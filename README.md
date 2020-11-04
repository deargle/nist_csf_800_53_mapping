Source repo for input data for [this NIST CSF <-> 800-53 Controls web tool](https://daveeargle.com/nist_csf_800_53_mapping)

Requires: python, pandas

# How to use:

1. Parse the NIST CSF -> 800-53 Mapping.

    * Download [https://www.nist.gov/document/csfsubcategories-sp80053mappingxlsx]
      * Note how the only depth that the mappings
        have is the control ID. Sadness. Ergo this repository.
    * Save the "detailed" sheet to csv as filename
      `csf_subcategories_-_sp_800_53_mapping-detailed`
    * Run the following:

        python parse_NIST_csf.py

2. Download the XML for the 800-53 controls.

  * Download [https://nvd.nist.gov/static/feeds/xml/sp80053/rev4/800-53-controls.xml]
  * Parse it!

       python parse-800-53-controls.py

3. Merge the two parsed files

  * Run this:

      python merge_nist-csf_800-53.py

  * The output of the last step will be a file called `data/joined-condensed.csv`,
    which is a flat file that can be used as input to whatever.

# Links

* [Link to 800-53 controls webpage](https://nvd.nist.gov/800-53/Rev4/control/AC-1)
* [Associated blog post](https://daveeargle.com/blog/2020-11-03-NIST-CSF-800-53-Mapping)

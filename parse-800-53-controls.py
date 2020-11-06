"""
Parse 800-53 controls.

Downloaded from https://nvd.nist.gov/static/feeds/xml/sp80053/rev4/800-53-controls.txt
Above tsv generated from this xml: https://nvd.nist.gov/static/feeds/xml/sp80053/rev4/800-53-controls.xml
Columns are:
    'FAMILY', 'NAME', 'TITLE', 'PRIORITY','BASELINE-IMPACT','DESCRIPTION', 'SUPPLEMENTAL', 'RELATED'

Columns "FAMILY," "TITLE," "PRIORITY," and "BASELINE-IMPACT" are grouping categories.
The "NAME"s uniquely identify a particular grouping of CONTROLS.

The control statements are deeply and recursively nested (e.g., AC-2h.1), but the mapping only
goes one level deep (e.g., AC-1), so we just collapse it all to the highest level.

"""
import xml.etree.ElementTree as ET
import pandas as pd
import json

tree = ET.parse('data/800-53-controls.xml')
root = tree.getroot()

ns = {'controls': 'http://scap.nist.gov/schema/sp800-53/feed/2.0',
      'ns': 'http://scap.nist.gov/schema/sp800-53/2.0'}


def get_statement_info(statement):
    """Get statement info."""
    statement_info = {}
    statement_info['NAME'] = statement.find('ns:number', ns).text
    statement_info['DESCRIPTION'] = statement.find('ns:description', ns).text
    return statement_info


def get_control_info(control):
    """Get control info."""
    control_info = {}

    # not FAMILY because we need to pass that along to other extractions
    # at a higher level

    # number
    control_info['NAME'] = control.find('ns:number', ns).text

    # title
    control_info['TITLE'] = control.find('ns:title', ns).text.lower().title()

    # priority
    if control.find('ns:priority', ns) is not None:
        control_info['PRIORITY'] = control.find('ns:priority', ns).text

    # baseline-impact
    baseline_impacts = control.findall('ns:baseline-impact', ns)
    control_info['BASELINE-IMPACT'] = ','.join([b.text for b in baseline_impacts])

    # description
    if control.find('ns:statement/ns:description', ns) is not None:
        control_info['DESCRIPTION'] = control.find('./ns:statement/ns:description', ns).text

    # supplemental-guidance
    if control.find('ns:supplemental-guidance/ns:description', ns) is not None:
        control_info['SUPPLEMENTAL GUIDANCE'] = control.find('ns:supplemental-guidance/ns:description', ns).text

    control_info['RELATED'] = [r.text for r in control.findall('ns:supplemental-guidance/ns:related', ns)]
    return control_info


def do_control_enhancement(control_enhancement, family):
    """Do control enhancement."""
    statements = []

    control_enhancement_info = get_control_info(control_enhancement)
    control_enhancement_info['FAMILY'] = family
    extended_description = [control_enhancement_info['DESCRIPTION']]

    for statement in control_enhancement.findall('ns:statement/ns:statement', ns):
        processed_statment = do_statement(statement)
        extended_description += processed_statment['extended_description']
        statements.append(processed_statment)

    control_enhancement_info['STATEMENTS'] = statements
    control_enhancement_info['extended_description'] = extended_description
    return control_enhancement_info


def do_statement(statement):
    """Do statement."""
    substatements = []
    statement_info = get_statement_info(statement)  # will return text
    extended_description = [f'{statement_info["NAME"]}: {statement_info["DESCRIPTION"]}']

    for substatement in statement.findall('ns:statement', ns):
        processed_statement = do_statement(substatement)
        extended_description += processed_statement['extended_description']
        substatements.append(processed_statement)

    statement_info['STATEMENTS'] = substatements
    statement_info['extended_description'] = extended_description
    return statement_info


def do_control(control):
    """Do control."""
    family = control.find('ns:family', ns).text.lower().title()
    control_info = get_control_info(control)
    extended_description = [control_info['DESCRIPTION']]
    control_info['FAMILY'] = family

    extra = {'STATEMENT': '', 'CONTROL_ENHANCEMENTS': []}

    if control.find('ns:statement/ns:statement', ns) is not None:
        processed_statement = do_statement(control.find('ns:statement/ns:statement', ns))
        extended_description += processed_statement['extended_description']
        extra['STATEMENT'] = processed_statement

    for control_enhancement in control.findall('ns:control-enhancements/ns:control-enhancement', ns):
        processed_control_enhancement = do_control_enhancement(control_enhancement, family)
        extra['CONTROL_ENHANCEMENTS'].append(processed_control_enhancement)
        extended_description += processed_control_enhancement['extended_description']

    control_info['EXTRA'] = extra
    control_info['info_json'] = json.dumps(control_info)
    control_info['extended_description'] = json.dumps(extended_description)
    rows.append(control_info)


rows = []

for control in root.findall('controls:control', ns):
    do_control(control)

data = pd.DataFrame(rows)
# columns = ['FAMILY', 'NAME', 'TITLE', 'PRIORITY', 'BASELINE-IMPACT', 'DESCRIPTION', 'SUPPLEMENTAL GUIDANCE', 'RELATED', 'EXTRA']
columns = ['FAMILY', 'NAME', 'TITLE', 'DESCRIPTION', 'extended_description', 'info_json']
data.to_csv('data/800-53-controls-condensed.csv', index=False, columns=columns)

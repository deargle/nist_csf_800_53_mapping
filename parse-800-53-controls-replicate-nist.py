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

tree = ET.parse('data/800-53-controls.xml')
root = tree.getroot()

ns = {'controls': 'http://scap.nist.gov/schema/sp800-53/feed/2.0',
      'ns': 'http://scap.nist.gov/schema/sp800-53/2.0'}


def do_statement(statement):
    """Do statement."""
    statement_info = get_statement_info(statement)
    rows.append(statement_info)

    for substatement in statement.findall('ns:statement', ns):
        do_statement(substatement)


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
    control_info['TITLE'] = control.find('ns:title', ns).text

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
    control_enhancement_info = get_control_info(control_enhancement)
    control_enhancement_info['FAMILY'] = family

    rows.append(control_enhancement_info)

    if control_enhancement.find('ns:statement/ns:statement', ns) is not None:
        do_statement(control_enhancement.find('ns:statement/ns:statement', ns))


def do_control(control):
    """Do control."""
    family = control.find('ns:family', ns).text
    control_info = get_control_info(control)
    control_info['FAMILY'] = family

    rows.append(control_info)

    if control.find('ns:statement/ns:statement', ns) is not None:
        do_statement(control.find('ns:statement/ns:statement', ns))

    for control_enhancement in control.findall('ns:control-enhancements/ns:control-enhancement', ns):
        do_control_enhancement(control_enhancement, family)


rows = []

for control in root.findall('controls:control', ns):
    do_control(control)

data = pd.DataFrame(rows)
columns = ['FAMILY', 'NAME', 'TITLE', 'PRIORITY', 'BASELINE-IMPACT', 'DESCRIPTION', 'SUPPLEMENTAL GUIDANCE', 'RELATED']
data.to_csv('800-53-controls.csv', index=False, columns=columns)

"""merge the two."""
import pandas as pd

nist_csf_mapping = pd.read_csv('data/normalized_mapping.csv')\
                     .rename(columns=str.lower)

controls_condensed = pd.read_csv('data/800-53-controls-condensed.csv')\
                       .set_index('NAME', drop=False)\
                       .rename(columns=str.lower)

nist_csf_mapping = nist_csf_mapping.add_prefix('nist_csf_')
controls_condensed = controls_condensed.add_prefix('800-53_')

joined = nist_csf_mapping.join(controls_condensed, on='nist_csf_control')
joined.to_csv('data/joined.csv', index=False)

these_800_53 = ['name', 'title', 'family', 'extended_description']
these_nist_csf = ['subcategory', 'function', 'function_name', 'category', 'category_name', 'category_name_and_code']
these_columns = [f'nist_csf_{x}' for x in these_nist_csf] + [f'800-53_{x}' for x in these_800_53]
joined.to_csv('data/joined-condensed.csv', index=False, columns=these_columns)

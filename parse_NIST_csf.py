import csv
import pandas as pd

nsf_csf = pd.read_csv('data/csf_subcategories_-_sp_800_53_mapping-detailed.csv')

functions = nsf_csf['Function'].dropna()
unique_functions = functions.unique()
functions_df = functions.str.extract(r'^(?P<function_name>.+) \((?P<function_code>..)\)')
functions_df['function_name'] = functions_df['function_name'].str.lower().str.title()
functions = functions_df['function_name'] + ' (' + functions_df['function_code'] + ')'
functions.name = 'function'
functions_df = pd.concat([functions, functions_df], axis=1)

categories = nsf_csf['Category']
unique_categories = categories.dropna().unique()
categories_df = categories.dropna().str.extract(r'(?P<category_name>.+) \((?P<category_code>.{5})\): (?P<category_description>.+)$')
categories_df['category_name_and_code'] = categories_df['category_name'] + ' (' + categories_df['category_code'] + ')'
categories_df = pd.concat([categories, categories_df], axis=1)

subcategories = nsf_csf['Subcategory']
subcategories_df = subcategories.dropna().str.extract(r'^(?P<subcategory_code>.+): (?P<subcategory_description>.+)$')
subcategories_df = pd.concat([subcategories, subcategories_df], axis=1)

subcategory_and_control = nsf_csf[['Subcategory', 'All SP 800-53 Controls']]

function_code = nsf_csf['Subcategory'].str.extract(r'^(..)')
category_code = nsf_csf['Subcategory'].str.extract(r'^(.{5})')

records = nsf_csf[['Subcategory', 'All SP 800-53 Controls']].to_dict(orient='records')

new_records = []
for record in records:
    subcategory = record['Subcategory']

    try:
        controls = record['All SP 800-53 Controls'].split(',')
        for control in controls:
            # if control[:1] == '-1':
            #     continue
            control = control.strip()
            if not control:
                continue
            new_record = {'Subcategory': subcategory, 'Control': control}
            new_records.append(new_record)
    except AttributeError as e:
        new_record = {'Subcategory': subcategory, 'Control': '-999'}
        new_records.append(new_record)

normalized_mapping = pd.DataFrame.from_records(new_records)

normalized_mapping['subcategory_code'] = normalized_mapping['Subcategory'].str.extract(r'^(.+):')
normalized_mapping = normalized_mapping.join(subcategories_df.drop('Subcategory', axis=1).set_index('subcategory_code'), on='subcategory_code')

normalized_mapping['function_code'] = normalized_mapping['Subcategory'].str.extract(r'^(..)')
normalized_mapping = normalized_mapping.join(functions_df.set_index('function_code'), on='function_code')

normalized_mapping['category_code'] = normalized_mapping['Subcategory'].str.extract(r'^(.{5})')
normalized_mapping = normalized_mapping.join(categories_df.set_index('category_code'), on='category_code')

normalized_mapping.to_csv('data/normalized_mapping.csv', index=False)

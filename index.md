---
date: 2020-10-27
layout: default
---
<!-- Required Stylesheets -->
<!-- Load required Bootstrap and BootstrapVue CSS -->
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap@4.5.2/dist/css/bootstrap.min.css" />
<link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@2.19.0/dist/bootstrap-vue.min.css" />

<!-- Load polyfills to support older browsers -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es2015%2CIntersectionObserver"></script>

<!-- Required scripts -->
<script src="https://unpkg.com/vue@2.6.12/dist/vue.js"></script>
<script src="https://unpkg.com/bootstrap-vue@2.19.0/dist/bootstrap-vue.js"></script>

<script src="https://d3js.org/d3-dsv.v2.min.js"></script>
<script src="https://d3js.org/d3-fetch.v2.min.js"></script>


<!-- Our application root element -->
<p class='meta'>11/3/2020 by <a href='https://daveeargle.com'>Dave Eargle</a></p>
<p>Shows details and permits text-searching of the <a href='https://nvd.nist.gov/800-53/Rev4'>NIST Special Publication 800-53 (Rev. 4)</a> security and privacy controls
  <a href='https://www.nist.gov/document/csfsubcategories-sp80053mappingxlsx'>mapped</a> to the <a href='https://www.nist.gov/cyberframework'>NIST Cybersecurity Framework</a> Core.</p>
  <p>Associated blog post <a href='https://daveeargle.com/2020/11/03/NIST-CSF-800-53-Mapping/'>here</a>.</p>
  <hr/>
{::nomarkdown}
{% raw %}
<div id="app" markdown="0" v-cloak>
  <b-container fluid>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
        label="Filter"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        label-for="filterInput"
        class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
              debounce="150"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to filter on all fields"
          class="mb-0">
          <b-form-checkbox-group v-model="filterOn" class="mt-1" stacked>
            <b-form-checkbox value="nist_csf_function">CSF Function</b-form-checkbox>
            <b-form-checkbox value="nist_csf_category_name_and_code">CSF Category Name</b-form-checkbox>
            <b-form-checkbox value="nist_csf_category">CSF Category Description</b-form-checkbox>
            <b-form-checkbox value="nist_csf_subcategory">CSF Subcategory</b-form-checkbox>
            <b-form-checkbox value="800-53_code_and_title">Control Title</b-form-checkbox>
            <b-form-checkbox value="800-53_family">Control Family</b-form-checkbox>
            <b-form-checkbox value="800-53_extended_description">Control Description</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Only Show These Core Functions"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to inlcude all core functions"
          class="mb-0">
          <b-form-checkbox-group v-model="onlyTheseCoreFunctions" class="mt-1" stacked>
            <b-form-checkbox value="Identify (ID)">Identify (ID)</b-form-checkbox>
            <b-form-checkbox value="Protect (PR)">Protect (PR)</b-form-checkbox>
            <b-form-checkbox value="Detect (DE)">Detect (DE)</b-form-checkbox>
            <b-form-checkbox value="Respond (RS)">Respond (RS)</b-form-checkbox>
            <b-form-checkbox value="Recover (RC)">Recover (RC)</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>



    </b-row>

    <!-- https://bootstrap-vue.org/docs/components/table -->
    <b-table
      striped
      hover
      small
      :items="filteredItems"
      :fields="fields"
      :filter="filter"
      :filter-included-fields="filterOn"
    >

      <template #thead-top="data">
        <b-tr>
          <b-th variant='secondary' colspan="3">Cybersecurity Framework Core</b-th>
          <b-th variant='' colspan="2">800-53 Controls</b-th>
          <b-th colspan="1"><span class='sr-only'>Show Details</span></b-th>
        </b-tr>
      </template>

      <template #cell(800-53_name)="data">
        <a :href="`https://nvd.nist.gov/800-53/Rev4/control/${data.value}`">{{ data.value }}</a>
      </template>

      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>CSF Function:</b></b-col>
            <b-col>{{ row.item['nist_csf_function_name'] }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>CSF Category:</b></b-col>
            <b-col>{{ row.item['nist_csf_category'] }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>CSF Subcategory:</b></b-col>
            <b-col>{{ row.item['nist_csf_subcategory'] }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Control Title:</b></b-col>
            <b-col>{{ row.item['800-53_title'] }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Control Family:</b></b-col>
            <b-col>{{ row.item['800-53_family'] }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Control Description:</b></b-col>
            <b-col>
              <ul>
                <li v-for="statement in row.item['800-53_extended_description']">
                  {{ statement }}
                </li>
              </ul>
              <p>(Excludes supplemental guidance, if any.)</p>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Control Source:</b></b-col>
            <b-col><a :href="`https://nvd.nist.gov/800-53/Rev4/control/${row.item['800-53_name']}`">{{ row.item['800-53_name'] }}</a></b-col>
          </b-row>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>

    </b-table>

  </b-container>
</div>

<!-- Start running your app -->
<script>

let debug_items = null;

csf_function_color_map = {
  // function_name : table-<variant>
  'Identify (ID)' : 'blue',
  'Protect (PR)'  : 'purple',
  'Detect (DE)'   : 'orange',
  'Respond (RS)'  : 'red',
  'Recover (RC)'  : 'green'
}

d3.csv("https://raw.githubusercontent.com/deargle/nist_csf_800_53_mapping/master/data/joined-condensed.csv", function(d) {
  if (d['800-53_extended_description']) {
    d['800-53_extended_description'] = JSON.parse(d['800-53_extended_description'])
  }
  return d
}).then(function(items) {
  let new_items = items.map(item => {
    item['_cellVariants'] = { nist_csf_function: csf_function_color_map[item['nist_csf_function']] }
    return item
  })
  // controlsBySubcategory = d3.group(data, d => d.nist_Subcategory)
  _items = new_items;
  window.app = new Vue({
    el: '#app',
    data: {
      fields: [
        {
          key: 'nist_csf_function',
          label: 'CSF Function',
          sortable: true,
        },
        {
          key: 'nist_csf_category_name_and_code',
          label: 'CSF Category',
          sortable: true,
        },
        {
          key: 'nist_csf_subcategory',
          label: 'CSF Subcategory',
          sortable: true,
        },
        {
          key: '800-53_code_and_title',
          label: 'Control Title',
          formatter: 'controlCodeAndTitle',
          filterByFormatted: true,
          tdClass: 'text-capitalize'
        },
        {
          key: '800-53_family',
          label: 'Control Family',
          sortable: true,
        },
        'show_details'],
      items: new_items,
      filter: null,
      filterOn: [],
      onlyTheseCoreFunctions: [],
      // filterOn: ['nist_Subcategory', 'nist_Control', '800-53_TITLE']
    },
    methods: {
      controlCodeAndTitle: function(value, key, item) {
        return `${ item['800-53_name'] }: ${ item['800-53_title'] }`
      }
    },
    computed: {
      filteredItems: function() {
        let items = this.items
        if (!this.onlyTheseCoreFunctions.length) {
          return items
        }
        const filter = item => this.onlyTheseCoreFunctions.includes(item['nist_csf_function'])
        return items.filter(filter)
      }
    }
  })
});
</script>
{% endraw %}
{:/nomarkdown}

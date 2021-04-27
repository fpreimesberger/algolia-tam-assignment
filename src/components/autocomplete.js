import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';

// Instant Search Widgets
import { hits, searchBox, configure, index, pagination } from 'instantsearch.js/es/widgets';

// Autocomplete Template
import autocompleteProductTemplate from '../templates/autocomplete-product';

// Query Suggestion Template
import QSHits from '../templates/QSHits';

/**
 * @class Autocomplete
 * @description Instant Search class to display content in the page's autocomplete
 */
class Autocomplete {
  /**
   * @constructor
   */
  constructor() {
    this._registerClient();
    //this._sendData();
    this._registerWidgets();
    this._startSearch();
  }
  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      '2HAY0H4831',
      'd1a5f9700d192d64009f259db2c8a860'
    );

    this._searchInstance = instantsearch({
      indexName: 'spewi',
      searchClient: this._searchClient,
    });    
  }

   /**
   * @private
   * Sends data from products.json (which was manually chunked into 4 smaller files) off to Algolia
   * @return {void}
   */
  _sendData() {
    const records1 = require('../../data/products-1.json');
    const records2 = require('../../data/products-2.json');
    const records3 = require('../../data/products-3.json');
    const records4 = require('../../data/products-4.json');
    const index = this._searchClient.initIndex('spewi');

    index
      .saveObjects(records1, { autoGenerateObjectIDIfNotExist: true })
      .catch((error) => {
        console.log(error);
    });

    index
      .saveObjects(records2, { autoGenerateObjectIDIfNotExist: true })
      .catch((error) => {
        console.log(error);
    });

    index
      .saveObjects(records3, { autoGenerateObjectIDIfNotExist: true })
      .catch((error) => {
        console.log(error);
    });

    index
      .saveObjects(records4, { autoGenerateObjectIDIfNotExist: true })
      .catch((error) => {
        console.log(error);
    });
  }

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      configure({
        hitsPerPage: 6,
      }),
      // Search Box
      searchBox({
        container: '#searchbox',
        placeholder: 'Search for products',
        showReset: true,
        showSubmit: true,
        showLoadingIndicator: true,
      }),
      // Products
      hits({
        container: '#autocomplete-hits',
        templates: { item: autocompleteProductTemplate },
      }),
      // Suggestions
      index({ indexName: 'spewi_query' })
        .addWidgets([
          configure({ hitsPerPage: 10, }),
            QSHits({
              container: '#suggestions',
            }),
          ])
      ]);    
  }

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }
}

export default Autocomplete;
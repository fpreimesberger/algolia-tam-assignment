import instantsearch from 'instantsearch.js';

// Import Instant Search Connectors
import { connectSearchBox, connectHits } from 'instantsearch.js/es/connectors';

// Customize UI of the Query Suggestion Hits
const renderQSHits = ({ widgetParams, hits }, isFirstRender) => {
    const container = document.querySelector(widgetParams.container);

    container.innerHTML = `<ul>
      ${hits
        .map(
          (item) => `
          <li>${instantsearch.highlight({ hit: item, attribute: 'query' })}</li>
        `
        )
        .join('')}
    </ul>`;
   };
    
const QSHits = connectHits(renderQSHits);

export default QSHits;
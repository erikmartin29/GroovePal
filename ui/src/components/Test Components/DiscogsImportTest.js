import { Fragment, useEffect, useState } from 'react';
import { getDiscogsCollection } from '../../utils/api_provider/api_provider';

export default function DiscogsImportTest() {
    const [collection, setCollection] = useState(null);

    useEffect(() => {
        getDiscogsCollection("emtacolor")
            .then(response => {
                setCollection(response.data["releases"]);
                //console.log(response)
            })
            .catch(error => {
                console.error('Error fetching Discogs collection:', error);
            });
    }, []);

    return (
        <Fragment>
            <h1> DISCOGS IMPORT TEST</h1>
            {/* You can now use the 'collection' state variable to display the data */
                collection ? 
                    <div>
                        <h2>Collection</h2>
                        <ul>
                            {collection.map(item => (
                                <li key={item.id}>
                                    {item.basic_information.title} by {item.basic_information.artists[0].name}
                                </li>
                            ))}
                        </ul>
                    </div>
                : <p>Loading...</p>
            }
        </Fragment>
    );
}
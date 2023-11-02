import { Fragment, useEffect, useState } from 'react';
import { getDiscogsCollection, getDiscogsReleaseImage } from '../../utils/api_provider/api_provider';

export default function DiscogsImportTest() {
    const [collection, setCollection] = useState(null);

    useEffect(() => {
        getDiscogsCollection("emtacolor")
            .then(response => {
                response.data["releases"].forEach(release => {
                    //fetch the image url for each release here
                    release.imgURL = getDiscogsReleaseImage(release.id);
                })
            })
            .then(response => {
                setCollection(response.data["releases"]);
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
                            {collection.map(item => {
                                return (<div>
                                    <img 
                                    src={item.imgURL}
                                    alt={item.basic_information.title}
                                    />

                                    <li key={item.id}>
                                        {item.basic_information.title} by {item.basic_information.artists[0].name}
                                    </li>
                                </div>);
                            }
                            )}
                        </ul>
                    </div>
                : <p>Loading...</p>
            }
        </Fragment>
    );
}
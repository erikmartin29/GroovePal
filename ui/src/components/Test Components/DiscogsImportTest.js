import { Fragment, useEffect, useState } from 'react';
import { AuthConsumer } from '../../context/AuthProvider';
import { getDiscogsCollection, getDiscogsReleaseImage } from '../../utils/api_provider/api_provider';

export default function DiscogsImportTest() {
    const [collection, setCollection] = useState([]);
    const { username } = AuthConsumer();

    const getData = async (username) => {
         let col = await getDiscogsCollection(username)
         var tmpArr = [];
         for(let i = 0; i < 10; i++) {
                let release = col.data["releases"][i];
                let imgRes = await getDiscogsReleaseImage(release.id, username)
                release.imgURL = imgRes.data;
                console.log(release.imgURL)
                tmpArr.push(release)
         }
         setCollection(tmpArr);
    }

    useEffect(() => {
        getData(username);
    }, [username]);

    return (
        <Fragment>
            <h1> DISCOGS IMPORT TEST</h1>
            {/* You can now use the 'collection' state variable to display the data */
                collection ? 
                    <div>
                        <h2>Collection</h2>
                        <ul>
                            {collection.map((item, idx) => {
                                return (<div>
                                    <img 
                                    src={item.imgURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"}
                                    alt={item.basic_information.title}
                                    />

                                    <li key={idx}>
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

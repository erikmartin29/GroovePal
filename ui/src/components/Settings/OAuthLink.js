export default function OAuthLink({ props }) {

    const { authurl, name } = props;

    return authurl !== undefined ? (
        <a href={authurl}>Link {name}</a>           
    ) : <span>Loading</span>;
}


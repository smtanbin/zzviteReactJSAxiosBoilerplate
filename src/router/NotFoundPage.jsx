const NotFoundPage = () => {
    return (
        <div style={{ width: '100vw', padding: 0, margin: 0, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            <br />
            <p>The page you are looking for does not exist.</p>
            <a href="/">Back to home</a>
        </div>
    );
};

export default NotFoundPage;
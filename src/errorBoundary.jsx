import  { Component  } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by error boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI in case of an error
            return (
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}>
                    <p>We are facing an error.</p>
                    <a href="/" style={{ textDecoration: 'none', color: 'blue' }}>Back to home</a>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

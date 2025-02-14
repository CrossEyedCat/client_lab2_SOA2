import React from 'react';

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error || "", errorInfo||"");
    }

    render() {
        if (this.state.hasError) {
            return <h1>Произошла ошибка. Попробуйте позже.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

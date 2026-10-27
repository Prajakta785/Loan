import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 text-2xl font-bold">
            ⚠️
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            काहीतरी अडचण आली आहे / Something went wrong
          </h2>
          <p className="text-xs text-slate-400 max-w-md mb-5">
            कृपया पेज रीलोड करा. समस्या कायम राहिल्यास कॅशे साफ करा.
          </p>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs cursor-pointer shadow-lg transition-all"
          >
            पेज रीलोड करा / Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

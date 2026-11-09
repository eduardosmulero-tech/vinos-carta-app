import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Ninguna excepción deja la app en pantalla blanca (E42 de la auditoría). */
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="px-4 py-24 text-center">
          <p className="font-display text-2xl text-cream">
            Ha ocurrido un error inesperado
          </p>
          <p className="mt-2 text-sm text-muted-dark">
            Vuelve a la carta para seguir consultando los vinos.
          </p>
          <a
            href="/"
            className="mt-8 inline-block rounded-[4px] border border-gold/50 px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-cellar"
          >
            ← Volver a la carta
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

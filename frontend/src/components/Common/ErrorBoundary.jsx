import { Component } from 'react'
export default class ErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? <p className="error" role="alert">Something went wrong. Refresh and try again.</p> : this.props.children }
}
